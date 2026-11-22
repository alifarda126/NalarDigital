import type {
  AppCategoryId,
  PlatformId,
  PortfolioFilterState,
  PortfolioInput,
  PortfolioItem,
  ValidationResult,
} from "../types/portfolio";

export const PORTFOLIO_LIMITS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 80,
  MIN_CLIENT_LENGTH: 2,
  MAX_CLIENT_LENGTH: 60,
  MIN_SUMMARY_LENGTH: 10,
  MAX_SUMMARY_LENGTH: 320,
  MIN_YEAR: 2020,
  MAX_YEAR: 2030,
  MAX_TECH_TAGS: 8,
  MAX_TECH_TAG_LENGTH: 32,
  MAX_IMAGE_BYTES: 5 * 1024 * 1024, // 5 MB
} as const;

export const ALLOWED_IMAGE_MIME_TYPES = new Set<string>([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export const ALLOWED_IMAGE_EXTENSIONS = new Set<string>([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

const VALID_CATEGORIES = new Set<AppCategoryId>([
  "keuangan",
  "jasa",
  "fnb",
  "kesehatan",
  "properti",
  "pendidikan",
  "ecommerce",
  "umkm-b2b",
  "branding",
]);

const VALID_PLATFORMS = new Set<PlatformId>(["android", "ios", "web", "uiux"]);

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const SAFE_RELATIVE_ASSET_PATTERN =
  /^\/(?:assets|images)\/[a-zA-Z0-9/_\-.]+$/;
const SAFE_DATA_IMAGE_PATTERN =
  /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "proyek-nalar";
}

export function normalizeTechStack(rawTags: unknown): string[] {
  if (!Array.isArray(rawTags)) return [];
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of rawTags) {
    if (typeof raw !== "string") continue;
    const cleaned = raw.trim().replace(/\s+/g, " ");
    if (
      cleaned.length === 0 ||
      cleaned.length > PORTFOLIO_LIMITS.MAX_TECH_TAG_LENGTH
    ) {
      continue;
    }
    const key = cleaned.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(cleaned);
    }
    if (result.length >= PORTFOLIO_LIMITS.MAX_TECH_TAGS) {
      break;
    }
  }

  return result;
}

export function isSafeHttpUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function isSafeImageAssetPath(rawPath: string): boolean {
  const trimmed = rawPath.trim();
  if (!trimmed) return true;
  if (trimmed.includes("..") || trimmed.includes("\\")) {
    return false;
  }
  return (
    SAFE_RELATIVE_ASSET_PATTERN.test(trimmed) ||
    SAFE_DATA_IMAGE_PATTERN.test(trimmed)
  );
}

export function validatePortfolioInput(
  raw: unknown
): ValidationResult<PortfolioInput> {
  const errors: Record<string, string> = {};

  if (!raw || typeof raw !== "object") {
    return {
      ok: false,
      errors: { form: "Payload portofolio tidak valid." },
    };
  }

  const record = raw as Record<string, unknown>;

  const name = typeof record.name === "string" ? record.name.trim() : "";
  if (
    name.length < PORTFOLIO_LIMITS.MIN_NAME_LENGTH ||
    name.length > PORTFOLIO_LIMITS.MAX_NAME_LENGTH
  ) {
    errors.name = `Nama proyek harus ${PORTFOLIO_LIMITS.MIN_NAME_LENGTH}–${PORTFOLIO_LIMITS.MAX_NAME_LENGTH} karakter.`;
  }

  const clientName =
    typeof record.clientName === "string" ? record.clientName.trim() : "";
  if (
    clientName.length < PORTFOLIO_LIMITS.MIN_CLIENT_LENGTH ||
    clientName.length > PORTFOLIO_LIMITS.MAX_CLIENT_LENGTH
  ) {
    errors.clientName = `Nama klien harus ${PORTFOLIO_LIMITS.MIN_CLIENT_LENGTH}–${PORTFOLIO_LIMITS.MAX_CLIENT_LENGTH} karakter.`;
  }

  const categoryId = record.categoryId as AppCategoryId;
  if (typeof categoryId !== "string" || !VALID_CATEGORIES.has(categoryId)) {
    errors.categoryId = "Pilih kategori aplikasi yang valid.";
  }

  const summary =
    typeof record.summary === "string" ? record.summary.trim() : "";
  if (
    summary.length < PORTFOLIO_LIMITS.MIN_SUMMARY_LENGTH ||
    summary.length > PORTFOLIO_LIMITS.MAX_SUMMARY_LENGTH
  ) {
    errors.summary = `Ringkasan proyek harus ${PORTFOLIO_LIMITS.MIN_SUMMARY_LENGTH}–${PORTFOLIO_LIMITS.MAX_SUMMARY_LENGTH} karakter.`;
  }

  const rawPlatforms = Array.isArray(record.platforms) ? record.platforms : [];
  const platforms = Array.from(
    new Set(
      rawPlatforms.filter(
        (p): p is PlatformId =>
          typeof p === "string" && VALID_PLATFORMS.has(p as PlatformId)
      )
    )
  );
  if (platforms.length === 0) {
    errors.platforms = "Pilih minimal satu platform (Android, iOS, Web, atau UI/UX).";
  }

  const techStack = normalizeTechStack(record.techStack);
  if (techStack.length === 0) {
    errors.techStack =
      "Tambahkan minimal satu bahasa pemrograman atau tech stack (mis. Kotlin, Next.js).";
  }

  const yearNum =
    typeof record.year === "number" ? record.year : Number(record.year);
  if (
    !Number.isInteger(yearNum) ||
    yearNum < PORTFOLIO_LIMITS.MIN_YEAR ||
    yearNum > PORTFOLIO_LIMITS.MAX_YEAR
  ) {
    errors.year = `Tahun proyek harus antara ${PORTFOLIO_LIMITS.MIN_YEAR} dan ${PORTFOLIO_LIMITS.MAX_YEAR}.`;
  }

  const demoUrl =
    typeof record.demoUrl === "string" ? record.demoUrl.trim() : "";
  if (demoUrl && !isSafeHttpUrl(demoUrl)) {
    errors.demoUrl = "URL demo harus diawali dengan https:// atau http://.";
  }

  const imageAssetPath =
    typeof record.imageAssetPath === "string"
      ? record.imageAssetPath.trim()
      : "";
  if (imageAssetPath && !isSafeImageAssetPath(imageAssetPath)) {
    errors.imageAssetPath =
      "Path gambar asset tidak valid atau tidak diizinkan.";
  }

  const clientLogoPath =
    typeof record.clientLogoPath === "string"
      ? record.clientLogoPath.trim()
      : "";
  if (clientLogoPath && !isSafeImageAssetPath(clientLogoPath)) {
    errors.clientLogoPath =
      "Path logo klien tidak valid atau tidak diizinkan.";
  }

  const accent =
    typeof record.accent === "string" ? record.accent.trim() : undefined;
  if (accent && !HEX_COLOR_PATTERN.test(accent)) {
    errors.accent = "Warna aksen harus format hex valid (mis. #3A4EFB).";
  }

  const secondaryAccent =
    typeof record.secondaryAccent === "string"
      ? record.secondaryAccent.trim()
      : undefined;
  if (secondaryAccent && !HEX_COLOR_PATTERN.test(secondaryAccent)) {
    errors.secondaryAccent = "Warna sekunder harus format hex valid.";
  }

  const surfaceTint =
    typeof record.surfaceTint === "string"
      ? record.surfaceTint.trim()
      : undefined;
  if (surfaceTint && !HEX_COLOR_PATTERN.test(surfaceTint)) {
    errors.surfaceTint = "Warna tint latar harus format hex valid.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const id =
    typeof record.id === "string" && record.id.trim().length > 0
      ? record.id.trim()
      : undefined;

  return {
    ok: true,
    data: {
      id,
      name,
      clientName,
      categoryId,
      summary,
      platforms,
      techStack,
      year: yearNum,
      featured: Boolean(record.featured),
      imageAssetPath: imageAssetPath || undefined,
      clientLogoPath: clientLogoPath || undefined,
      demoUrl: demoUrl || undefined,
      accent,
      secondaryAccent,
      surfaceTint,
    },
  };
}

/**
 * Detect actual image format using binary magic bytes to prevent spoofed file extensions.
 */
export function detectImageFormatFromBytes(
  bytes: Uint8Array
): "png" | "jpeg" | "webp" | null {
  if (bytes.length < 12) return null;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }

  // WebP: RIFF....WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }

  return null;
}

export function sanitizeAssetFileName(
  originalName: string,
  forcedExtension: "png" | "jpg" | "webp"
): string {
  const baseOnly = originalName.replace(/^.*[\\/]/, "");
  const withoutExt = baseOnly.replace(/\.[^.]+$/, "");
  const safeStem =
    withoutExt
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "asset";

  return `${safeStem}-${Date.now()}.${forcedExtension}`;
}

export function validateImageUpload(
  meta: { name: string; type: string; size: number },
  bytes: Uint8Array
): ValidationResult<{ format: "png" | "jpeg" | "webp"; ext: "png" | "jpg" | "webp" }> {
  if (!meta.name || meta.name.trim().length === 0) {
    return { ok: false, errors: { file: "Nama file tidak boleh kosong." } };
  }

  if (meta.size <= 0) {
    return { ok: false, errors: { file: "File gambar kosong." } };
  }

  if (meta.size > PORTFOLIO_LIMITS.MAX_IMAGE_BYTES) {
    return {
      ok: false,
      errors: {
        file: "Ukuran gambar maksimal 5 MB agar performa website tetap cepat.",
      },
    };
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(meta.type)) {
    return {
      ok: false,
      errors: {
        file: "Format file hanya mendukung PNG, JPG/JPEG, atau WEBP.",
      },
    };
  }

  const lower = meta.name.toLowerCase();
  const extMatch = /\.[a-z0-9]+$/.exec(lower);
  if (!extMatch || !ALLOWED_IMAGE_EXTENSIONS.has(extMatch[0])) {
    return {
      ok: false,
      errors: {
        file: "Ekstensi file tidak diizinkan. Gunakan .png, .jpg, .jpeg, atau .webp.",
      },
    };
  }

  const detected = detectImageFormatFromBytes(bytes);
  if (!detected) {
    return {
      ok: false,
      errors: {
        file: "Isi file tidak cocok dengan format gambar PNG, JPEG, atau WebP yang valid.",
      },
    };
  }

  const ext: "png" | "jpg" | "webp" =
    detected === "jpeg" ? "jpg" : detected;

  return { ok: true, data: { format: detected, ext } };
}

export function filterPortfolios(
  items: readonly PortfolioItem[],
  filter: PortfolioFilterState
): PortfolioItem[] {
  const normalizedSearch = filter.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filter.categoryId !== "all" && item.categoryId !== filter.categoryId) {
      return false;
    }

    if (
      filter.platform !== "all" &&
      !item.platforms.includes(filter.platform)
    ) {
      return false;
    }

    if (normalizedSearch.length > 0) {
      const searchable = [
        item.name,
        item.clientName,
        item.categoryLabel,
        item.summary,
        ...item.techStack,
        ...item.platforms,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });
}
