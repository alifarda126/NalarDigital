import type {
  AppCategoryId,
  MockupKind,
  PlatformId,
} from "../types/portfolio";

export interface AppCategoryOption {
  id: AppCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  mockupKind: MockupKind;
  accent: string;
  secondaryAccent: string;
  surfaceTint: string;
}

export interface PlatformOption {
  id: PlatformId;
  label: string;
  shortLabel: string;
  description: string;
}

export const APP_CATEGORIES: readonly AppCategoryOption[] = [
  {
    id: "keuangan",
    label: "Keuangan & Fintech",
    shortLabel: "Keuangan",
    description: "Pembukuan kas, manajemen arus kas, pembayaran, dan dompet digital",
    mockupKind: "finance",
    accent: "#3A4EFB",
    secondaryAccent: "#252943",
    surfaceTint: "#33A4FA",
  },
  {
    id: "jasa",
    label: "Jasa Profesional",
    shortLabel: "Jasa",
    description: "Booking layanan, marketplace teknisi, konsultasi, dan manajemen klien",
    mockupKind: "service",
    accent: "#33A4FA",
    secondaryAccent: "#1B1E35",
    surfaceTint: "#3A4EFB",
  },
  {
    id: "fnb",
    label: "Food & Beverage (F&B)",
    shortLabel: "F&B",
    description: "Aplikasi kasir POS, pemesanan meja/menu, dan loyalitas pelanggan",
    mockupKind: "fnb",
    accent: "#E3FF3B",
    secondaryAccent: "#252943",
    surfaceTint: "#3A4EFB",
  },
  {
    id: "kesehatan",
    label: "Klinik & Kesehatan",
    shortLabel: "Kesehatan",
    description: "Antrean online, rekam medis ringkas, jadwal dokter, dan telekonsultasi",
    mockupKind: "health",
    accent: "#33A4FA",
    secondaryAccent: "#252943",
    surfaceTint: "#5CC0FF",
  },
  {
    id: "properti",
    label: "Properti & Hunian",
    shortLabel: "Properti",
    description: "Katalog unit, tur visual, simulasi KPR, dan penjadwalan survei",
    mockupKind: "property",
    accent: "#3A4EFB",
    secondaryAccent: "#1B1E35",
    surfaceTint: "#6374FF",
  },
  {
    id: "pendidikan",
    label: "Pendidikan & LMS",
    shortLabel: "Pendidikan",
    description: "Kelas daring, modul belajar, kuis interaktif, dan laporan progres",
    mockupKind: "education",
    accent: "#33A4FA",
    secondaryAccent: "#252943",
    surfaceTint: "#3A4EFB",
  },
  {
    id: "ecommerce",
    label: "E-Commerce UMKM",
    shortLabel: "E-Commerce",
    description: "Katalog produk, keranjang belanja, integrasi ongkir, dan checkout cepat",
    mockupKind: "ecommerce",
    accent: "#3A4EFB",
    secondaryAccent: "#252943",
    surfaceTint: "#4F6BFF",
  },
  {
    id: "umkm-b2b",
    label: "Operasional & B2B",
    shortLabel: "B2B",
    description: "Dashboard inventaris, tracking distribusi, CRM, dan laporan performa",
    mockupKind: "b2b",
    accent: "#E3FF3B",
    secondaryAccent: "#1B1E35",
    surfaceTint: "#252943",
  },
  {
    id: "branding",
    label: "Branding & Konten",
    shortLabel: "Branding",
    description: "Identitas visual, sistem desain Figma, konten sosial media & SEO",
    mockupKind: "branding",
    accent: "#E3FF3B",
    secondaryAccent: "#252943",
    surfaceTint: "#3A4EFB",
  },
] as const;

export const PLATFORM_OPTIONS: readonly PlatformOption[] = [
  {
    id: "android",
    label: "Android",
    shortLabel: "Android",
    description: "Aplikasi mobile Android (Native / Cross-platform)",
  },
  {
    id: "ios",
    label: "iOS",
    shortLabel: "iOS",
    description: "Aplikasi mobile iOS untuk iPhone & iPad",
  },
  {
    id: "web",
    label: "Web App",
    shortLabel: "Web",
    description: "Website profil, SaaS, dashboard, dan web app SEO-ready",
  },
  {
    id: "uiux",
    label: "UI/UX & Branding",
    shortLabel: "UI/UX",
    description: "Riset pengalaman pengguna, prototipe Figma & identitas merek",
  },
] as const;

export const SUGGESTED_TECH_BY_PLATFORM: Record<PlatformId, readonly string[]> = {
  android: [
    "Kotlin",
    "Java",
    "Flutter",
    "React Native",
    "Jetpack Compose",
    "Firebase",
  ],
  ios: ["Swift", "SwiftUI", "Flutter", "React Native", "Firebase"],
  web: [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Laravel",
    "PHP",
    "Node.js",
    "PostgreSQL",
    "Go",
    "Python",
  ],
  uiux: [
    "Figma",
    "Design System",
    "Illustrator",
    "Prototyping",
    "SEO",
    "Google Analytics",
  ],
};

export const ALL_TECH_SUGGESTIONS: readonly string[] = Array.from(
  new Set([
    ...SUGGESTED_TECH_BY_PLATFORM.android,
    ...SUGGESTED_TECH_BY_PLATFORM.ios,
    ...SUGGESTED_TECH_BY_PLATFORM.web,
    ...SUGGESTED_TECH_BY_PLATFORM.uiux,
  ])
);

export const CATEGORY_BY_ID: Record<AppCategoryId, AppCategoryOption> =
  APP_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {} as Record<AppCategoryId, AppCategoryOption>
  );

export const VALID_CATEGORY_IDS = new Set<AppCategoryId>(
  APP_CATEGORIES.map((c) => c.id)
);

export const VALID_PLATFORM_IDS = new Set<PlatformId>(
  PLATFORM_OPTIONS.map((p) => p.id)
);

export function getSuggestedTechForPlatforms(platforms: PlatformId[]): string[] {
  if (platforms.length === 0) {
    return [...ALL_TECH_SUGGESTIONS];
  }
  const merged = new Set<string>();
  for (const platform of platforms) {
    const list = SUGGESTED_TECH_BY_PLATFORM[platform] ?? [];
    for (const item of list) {
      merged.add(item);
    }
  }
  return Array.from(merged);
}
