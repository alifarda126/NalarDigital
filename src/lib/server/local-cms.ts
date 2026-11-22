import { mkdir, readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { CATEGORY_BY_ID } from "@/config/portfolio-taxonomy";
import { DEFAULT_PORTFOLIOS } from "@/data/homepage";
import { sanitizeAssetFileName, slugify } from "@/lib/portfolio-validation";
import type {
  AssetFolder,
  AssetItem,
  PortfolioInput,
  PortfolioItem,
} from "@/types/portfolio";

const PROJECT_ROOT = process.cwd();
const PORTFOLIOS_DATA_PATH = path.join(PROJECT_ROOT, "src", "data", "portfolios.json");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const PORTFOLIO_ASSETS_DIR = path.join(PUBLIC_DIR, "assets", "portfolio");
const BRAND_ASSETS_DIR = path.join(PUBLIC_DIR, "images", "brand");
const GENERAL_IMAGES_DIR = path.join(PUBLIC_DIR, "images");

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export function isLocalWriteEnabled(): boolean {
  if (process.env.ALLOW_LOCAL_CMS_WRITE === "true") {
    return true;
  }
  if (process.env.ALLOW_LOCAL_CMS_WRITE === "false") {
    return false;
  }
  return process.env.NODE_ENV !== "production";
}

export async function readPortfoliosFromDisk(): Promise<PortfolioItem[]> {
  try {
    const raw = await readFile(PORTFOLIOS_DATA_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...DEFAULT_PORTFOLIOS];
    }
    return parsed as PortfolioItem[];
  } catch (error) {
    console.warn("[local-cms] Failed to read portfolios.json, using bundled defaults:", error);
    return [...DEFAULT_PORTFOLIOS];
  }
}

export async function writePortfoliosToDisk(items: PortfolioItem[]): Promise<void> {
  const dir = path.dirname(PORTFOLIOS_DATA_PATH);
  await mkdir(dir, { recursive: true });
  const tempPath = path.join(
    dir,
    `.portfolios.${process.pid}.${Date.now()}.tmp.json`
  );
  const serialized = `${JSON.stringify(items, null, 2)}\n`;
  await writeFile(tempPath, serialized, "utf-8");
  await rename(tempPath, PORTFOLIOS_DATA_PATH);
}

export function buildPortfolioItem(
  input: PortfolioInput,
  existing?: PortfolioItem
): PortfolioItem {
  const category = CATEGORY_BY_ID[input.categoryId];
  const now = new Date().toISOString();
  const baseSlug = slugify(input.name);
  const id =
    existing?.id ??
    input.id ??
    `${baseSlug}-${Date.now().toString(36)}`;

  return {
    id,
    slug: existing?.slug ?? baseSlug,
    name: input.name,
    clientName: input.clientName,
    categoryId: input.categoryId,
    categoryLabel: category.label,
    summary: input.summary,
    platforms: input.platforms,
    techStack: input.techStack,
    year: input.year,
    featured: input.featured ?? false,
    imageAssetPath: input.imageAssetPath,
    clientLogoPath: input.clientLogoPath,
    demoUrl: input.demoUrl,
    accent: input.accent ?? category.accent,
    secondaryAccent: input.secondaryAccent ?? category.secondaryAccent,
    surfaceTint: input.surfaceTint ?? category.surfaceTint,
    mockupKind: category.mockupKind,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

async function scanImageDirectory(
  directoryPath: string,
  urlPrefix: string,
  folder: AssetFolder,
  isCustom: boolean
): Promise<AssetItem[]> {
  try {
    const entries = await readdir(directoryPath, { withFileTypes: true });
    const results: AssetItem[] = [];

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      const mimeType = MIME_BY_EXT[ext];
      if (!mimeType) continue;

      const fullPath = path.join(directoryPath, entry.name);
      const info = await stat(fullPath);

      results.push({
        id: `${folder}:${entry.name}`,
        name: entry.name,
        url: `${urlPrefix}/${entry.name}`,
        folder,
        sizeBytes: info.size,
        mimeType,
        uploadedAt: info.mtime.toISOString(),
        isCustom,
        storageSource: "disk",
      });
    }

    return results.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  } catch {
    return [];
  }
}

export async function listDiskAssets(): Promise<AssetItem[]> {
  const [portfolioAssets, brandAssets, generalAssets] = await Promise.all([
    scanImageDirectory(PORTFOLIO_ASSETS_DIR, "/assets/portfolio", "portfolio", true),
    scanImageDirectory(BRAND_ASSETS_DIR, "/images/brand", "brand", false),
    scanImageDirectory(GENERAL_IMAGES_DIR, "/images", "general", false),
  ]);

  return [...portfolioAssets, ...brandAssets, ...generalAssets];
}

export async function savePortfolioAssetToDisk(
  originalName: string,
  ext: "png" | "jpg" | "webp",
  bytes: Uint8Array
): Promise<AssetItem> {
  await mkdir(PORTFOLIO_ASSETS_DIR, { recursive: true });
  const safeFileName = sanitizeAssetFileName(originalName, ext);
  const resolvedRoot = path.resolve(PORTFOLIO_ASSETS_DIR);
  const resolvedTarget = path.resolve(PORTFOLIO_ASSETS_DIR, safeFileName);

  if (!resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error("Path asset di luar direktori yang diizinkan.");
  }

  await writeFile(resolvedTarget, bytes);
  const info = await stat(resolvedTarget);

  return {
    id: `portfolio:${safeFileName}`,
    name: safeFileName,
    url: `/assets/portfolio/${safeFileName}`,
    folder: "portfolio",
    sizeBytes: info.size,
    mimeType: MIME_BY_EXT[`.${ext}`] ?? "image/png",
    uploadedAt: info.mtime.toISOString(),
    isCustom: true,
    storageSource: "disk",
  };
}

export async function deletePortfolioAssetFromDisk(
  fileName: string
): Promise<boolean> {
  if (!fileName || path.basename(fileName) !== fileName) {
    throw new Error("Nama file asset tidak valid.");
  }

  const ext = path.extname(fileName).toLowerCase();
  if (!MIME_BY_EXT[ext]) {
    throw new Error("Tipe file tidak diizinkan untuk dihapus.");
  }

  const resolvedRoot = path.resolve(PORTFOLIO_ASSETS_DIR);
  const resolvedTarget = path.resolve(PORTFOLIO_ASSETS_DIR, fileName);

  if (!resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error("Akses penghapusan di luar direktori asset portofolio ditolak.");
  }

  try {
    await unlink(resolvedTarget);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
