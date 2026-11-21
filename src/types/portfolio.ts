export type PlatformId = "android" | "ios" | "web" | "uiux";

export type AppCategoryId =
  | "keuangan"
  | "jasa"
  | "fnb"
  | "kesehatan"
  | "properti"
  | "pendidikan"
  | "ecommerce"
  | "umkm-b2b"
  | "branding";

export type MockupKind =
  | "finance"
  | "service"
  | "fnb"
  | "health"
  | "property"
  | "education"
  | "ecommerce"
  | "b2b"
  | "branding";

export interface PortfolioItem {
  id: string;
  slug: string;
  name: string;
  clientName: string;
  categoryId: AppCategoryId;
  categoryLabel: string;
  summary: string;
  platforms: PlatformId[];
  /** Bahasa pemrograman, framework, atau tools utama (mis. Kotlin, Flutter, Next.js, Laravel, Figma). */
  techStack: string[];
  year: number;
  featured?: boolean;
  /** Path asset gambar (/assets/portfolio/... atau /images/...) atau data URL untuk fallback browser. */
  imageAssetPath?: string;
  demoUrl?: string;
  accent: string;
  secondaryAccent: string;
  surfaceTint: string;
  mockupKind: MockupKind;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioInput {
  id?: string;
  name: string;
  clientName: string;
  categoryId: AppCategoryId;
  summary: string;
  platforms: PlatformId[];
  techStack: string[];
  year: number;
  featured?: boolean;
  imageAssetPath?: string;
  demoUrl?: string;
  accent?: string;
  secondaryAccent?: string;
  surfaceTint?: string;
}

export type AssetFolder = "portfolio" | "brand" | "general";

export interface AssetItem {
  id: string;
  name: string;
  url: string;
  folder: AssetFolder;
  sizeBytes: number;
  mimeType: string;
  uploadedAt: string;
  isCustom: boolean;
  storageSource: "disk" | "browser";
}

export interface PortfolioFilterState {
  categoryId: AppCategoryId | "all";
  platform: PlatformId | "all";
  search: string;
}

export type StorageMode = "local-file" | "browser-storage";

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };
