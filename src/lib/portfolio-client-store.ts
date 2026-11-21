import { CATEGORY_BY_ID } from "../config/portfolio-taxonomy";
import { slugify, validatePortfolioInput } from "./portfolio-validation";
import type {
  AssetItem,
  PortfolioInput,
  PortfolioItem,
} from "../types/portfolio";

export const PORTFOLIOS_STORAGE_KEY = "nalar_digital_portfolios_v1";
export const ASSETS_STORAGE_KEY = "nalar_digital_browser_assets_v1";
export const PORTFOLIO_SYNC_EVENT = "nalar:portfolio-updated";

export function parseStoredPortfolios(rawJson: string | null): PortfolioItem[] | null {
  if (!rawJson) return null;
  try {
    const parsed: unknown = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return null;

    const validItems: PortfolioItem[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const candidate = item as Record<string, unknown>;
      const check = validatePortfolioInput(candidate);
      if (!check.ok) continue;

      const cat = CATEGORY_BY_ID[check.data.categoryId];
      const now = new Date().toISOString();
      validItems.push({
        id:
          typeof candidate.id === "string" && candidate.id.trim().length > 0
            ? candidate.id.trim()
            : `${slugify(check.data.name)}-${validItems.length + 1}`,
        slug:
          typeof candidate.slug === "string" && candidate.slug.trim().length > 0
            ? candidate.slug.trim()
            : slugify(check.data.name),
        name: check.data.name,
        clientName: check.data.clientName,
        categoryId: check.data.categoryId,
        categoryLabel: cat.label,
        summary: check.data.summary,
        platforms: check.data.platforms,
        techStack: check.data.techStack,
        year: check.data.year,
        featured: check.data.featured ?? false,
        imageAssetPath: check.data.imageAssetPath,
        demoUrl: check.data.demoUrl,
        accent: check.data.accent ?? cat.accent,
        secondaryAccent: check.data.secondaryAccent ?? cat.secondaryAccent,
        surfaceTint: check.data.surfaceTint ?? cat.surfaceTint,
        mockupKind: cat.mockupKind,
        createdAt:
          typeof candidate.createdAt === "string" ? candidate.createdAt : now,
        updatedAt:
          typeof candidate.updatedAt === "string" ? candidate.updatedAt : now,
      });
    }

    return validItems;
  } catch {
    return null;
  }
}

export function parseStoredAssets(rawJson: string | null): AssetItem[] {
  if (!rawJson) return [];
  try {
    const parsed: unknown = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is AssetItem =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as AssetItem).id === "string" &&
        typeof (item as AssetItem).url === "string" &&
        typeof (item as AssetItem).name === "string"
    );
  } catch {
    return [];
  }
}

export function createLocalPortfolioItem(
  input: PortfolioInput,
  existing?: PortfolioItem
): PortfolioItem {
  const category = CATEGORY_BY_ID[input.categoryId];
  const now = new Date().toISOString();
  const baseSlug = slugify(input.name);

  return {
    id: existing?.id ?? input.id ?? `${baseSlug}-${Date.now().toString(36)}`,
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
    demoUrl: input.demoUrl,
    accent: input.accent ?? category.accent,
    secondaryAccent: input.secondaryAccent ?? category.secondaryAccent,
    surfaceTint: input.surfaceTint ?? category.surfaceTint,
    mockupKind: category.mockupKind,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export function readBrowserPortfolios(): PortfolioItem[] | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredPortfolios(window.localStorage.getItem(PORTFOLIOS_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeBrowserPortfolios(items: PortfolioItem[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PORTFOLIOS_STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

export function clearBrowserPortfolios(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PORTFOLIOS_STORAGE_KEY);
  } catch {
    // Ignore storage removal errors in restricted browser contexts
  }
}

export function readBrowserAssets(): AssetItem[] {
  if (typeof window === "undefined") return [];
  try {
    return parseStoredAssets(window.localStorage.getItem(ASSETS_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function writeBrowserAssets(assets: AssetItem[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(assets));
    return true;
  } catch {
    return false;
  }
}

export function notifyPortfolioSync(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PORTFOLIO_SYNC_EVENT));
}
