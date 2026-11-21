export interface BrandColorSwatch {
  id: string;
  name: string;
  hex: string;
  role: string;
  textOnColor: string;
  usage: string;
}

/**
 * Centralized Nalar Digital Brand Design Tokens.
 * Derived from the Electric Blue + Neon Lime + Deep Navy + Soft Surface palette.
 */
export const BRAND_THEME = {
  primary: "#3A4EFB",
  primaryEnd: "#33A4FA",
  primaryHover: "#2C3EDB",
  accentLime: "#E3FF3B",
  accentLimeHover: "#D4F229",
  navy: "#252943",
  navyDeep: "#1B1E35",
  surfaceMuted: "#DEE0ED",
  surfaceSoft: "#EEF0F8",
  bgCanvas: "#F7F8FC",
  surfaceWhite: "#FFFFFF",
  inkMuted: "#525775",
  whatsapp: "#25D366",
} as const;

export const BRAND_COLOR_SWATCHES: BrandColorSwatch[] = [
  {
    id: "primary-start",
    name: "Electric Cobalt",
    hex: "#3A4EFB",
    role: "Primary Gradient Start",
    textOnColor: "#FFFFFF",
    usage: "CTA utama, link aktif, fokus, highlight heading & komponen interaktif",
  },
  {
    id: "primary-end",
    name: "Sky Electric",
    hex: "#33A4FA",
    role: "Primary Gradient End",
    textOnColor: "#FFFFFF",
    usage: "Gradien tombol, aksen tautan di latar gelap, ilustrasi data",
  },
  {
    id: "accent-lime",
    name: "Neon Lime",
    hex: "#E3FF3B",
    role: "High-Contrast Accent",
    textOnColor: "#252943",
    usage: "Badge highlight, tombol di atas latar navy, metrik unggulan",
  },
  {
    id: "navy",
    name: "Deep Navy",
    hex: "#252943",
    role: "Primary Ink & Dark Surface",
    textOnColor: "#FFFFFF",
    usage: "Heading utama, teks kontras di atas lime, footer & panel gelap",
  },
  {
    id: "surface-muted",
    name: "Periwinkle Mist",
    hex: "#DEE0ED",
    role: "Neutral Surface & Border",
    textOnColor: "#252943",
    usage: "Latar strip section, kartu non-aktif, border lembut, chip filter",
  },
];

export const BRAND_LOGO_ASSETS = [
  {
    id: "logo-nd-transparent",
    name: "Logo ND — Transparan (PNG)",
    url: "/images/brand/logo-nd-transparent.png",
    description: "Logo utama Nalar Digital tanpa latar. Ideal untuk Navbar, Footer gelap, dan overlay.",
    previewBg: "checker" as const,
  },
  {
    id: "logo-nd-dark",
    name: "Logo ND — Latar Gelap (JPG)",
    url: "/images/brand/logo-nd-dark.jpg",
    description: "Varian siap pakai untuk presentasi dark mode, sosial media, dan profil avatar gelap.",
    previewBg: "dark" as const,
  },
  {
    id: "logo-nd-light",
    name: "Logo ND — Latar Terang (JPG)",
    url: "/images/brand/logo-nd-light.jpg",
    description: "Varian siap pakai untuk dokumen proposal, kop surat, dan media cetak terang.",
    previewBg: "light" as const,
  },
] as const;
