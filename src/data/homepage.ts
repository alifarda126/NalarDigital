export type PlatformType = "android" | "ios" | "web";

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: "palette" | "code" | "refresh" | "compass";
}

export interface PortfolioItem {
  id: string;
  clientId: string;
  name: string;
  category: string;
  platforms: PlatformType[];
  accent: string;
  secondaryAccent: string;
  surfaceTint: string;
  kind:
    | "streaming"
    | "insurance"
    | "ecommerce"
    | "transit"
    | "sales"
    | "ticketing"
    | "automotive"
    | "rental"
    | "loyalty"
    | "learning"
    | "corporate"
    | "eoffice";
}

export interface StatItem {
  id: "projects" | "clients" | "downloads" | "ratings" | "retention";
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ClientLogoItem {
  id: string;
  name: string;
}

export interface TargetSectorItem {
  id: string;
  label: string;
  icon: "utensils" | "stethoscope" | "briefcase" | "building" | "graduation" | "store";
}

export interface PricingPackageItem {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  featured?: boolean;
  highlights: string[];
  ctaLabel: string;
}

export interface WorkflowStepItem {
  id: string;
  stepNumber: string;
  title: string;
  phase: string;
  description: string;
}

export interface TeamRoleItem {
  id: string;
  role: string;
  count: string;
  responsibilities: string;
}

export interface WhatsAppOption {
  id: string;
  label: string;
}

export const HERO_TAGLINE = "Insight-Driven Growth. Decisions That Matter.";

export const HERO_HEADLINE =
  "Partner Build & Grow Digital Berbasis Data untuk UMKM dan Bisnis B2B";

export const HERO_SUBCOPY =
  "Nalar Digital adalah full-service digital agency dengan pendekatan Insight-Driven Decision Making. Kami mengintegrasikan Branding, Konten Media Sosial berbasis data, UI/UX, Web & Mobile App Development, hingga optimasi SEO, SEM, dan ASO dalam satu ekosistem terpadu.";

export const TARGET_SECTORS: TargetSectorItem[] = [
  { id: "fnb", label: "Food & Beverage (F&B)", icon: "utensils" },
  { id: "klinik", label: "Klinik Kesehatan", icon: "stethoscope" },
  { id: "jasa", label: "Jasa Profesional", icon: "briefcase" },
  { id: "properti", label: "Properti", icon: "building" },
  { id: "pendidikan", label: "Pendidikan", icon: "graduation" },
  { id: "umkm-b2b", label: "UMKM & B2B Lokal", icon: "store" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "branding-creative",
    title: "Branding & Creative Data-Driven",
    shortDesc:
      "Identitas visual terpadu serta konten feed, reels, dan carousel berbasis data audiens.",
    description:
      "Bangun identitas visual terpadu yang mudah dikenali sekaligus konten media sosial (feed, reels, carousel, kampanye) berbasis data audiens dan kebutuhan bisnis Anda.",
    icon: "palette",
  },
  {
    id: "uiux-web-mobile",
    title: "UI/UX & Web / Mobile App",
    shortDesc:
      "Desain Figma berorientasi konversi serta pengembangan website & aplikasi SEO-ready.",
    description:
      "Perancangan antarmuka Figma berorientasi konversi serta pengembangan website & aplikasi mobile dari awal maupun pengembangan lanjutan yang cepat, aman, dan SEO-ready.",
    icon: "code",
  },
  {
    id: "seo-sem-aso",
    title: "SEO, SEM & ASO Growth",
    shortDesc:
      "Technical SEO internal, Google Business Profile, Google Ads, dan ASO terkurasi.",
    description:
      "Optimalkan visibilitas pencarian dan akuisisi leads melalui Technical SEO internal, Google Business Profile, Google Ads (SEM), serta optimasi Play Store & App Store (ASO) dengan QC ketat.",
    icon: "refresh",
  },
  {
    id: "all-in-one",
    title: "Paket All-in-One (Build & Grow)",
    shortDesc:
      "Layanan menyeluruh dari identitas merek, aplikasi, hingga pemasaran — hemat 15%–20%.",
    description:
      "Solusi digital terintegrasi yang menggabungkan Branding, Creative, UI/UX, Web/App Development, dan optimasi SEO/SEM/ASO dalam satu strategi dan satu pintu komunikasi — lebih hemat 15%–20%.",
    icon: "compass",
  },
];

/* Portofolio dibiarkan utuh sesuai permintaan untuk diisi proyek semester sebelumnya */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "indihometv",
    clientId: "telkom",
    name: "IndiHomeTV",
    category: "Streaming • Video on Demand",
    platforms: ["android", "ios", "web"],
    accent: "#DC2626",
    secondaryAccent: "#450A0A",
    surfaceTint: "#991B1B",
    kind: "streaming",
  },
  {
    id: "jmo",
    clientId: "bpjs",
    name: "JMO (BPJS Ketenagakerjaan)",
    category: "Insurance • Finance",
    platforms: ["android", "ios"],
    accent: "#16A34A",
    secondaryAccent: "#064E3B",
    surfaceTint: "#BAE6FD",
    kind: "insurance",
  },
  {
    id: "eraspace",
    clientId: "erajaya",
    name: "Eraspace",
    category: "E-Commerce • Lifestyle",
    platforms: ["android", "ios"],
    accent: "#1D4ED8",
    secondaryAccent: "#0F172A",
    surfaceTint: "#2563EB",
    kind: "ecommerce",
  },
  {
    id: "mrt-jakarta",
    clientId: "mrt",
    name: "MRT Jakarta",
    category: "Transportation • Lifestyle",
    platforms: ["android", "ios", "web"],
    accent: "#0284C7",
    secondaryAccent: "#0C4A6E",
    surfaceTint: "#E0F2FE",
    kind: "transit",
  },
  {
    id: "paragon-sfm",
    clientId: "paragon",
    name: "Paragon SFM",
    category: "Productivity • Sales Force",
    platforms: ["android", "web"],
    accent: "#1E40AF",
    secondaryAccent: "#172554",
    surfaceTint: "#1D4ED8",
    kind: "sales",
  },
  {
    id: "tix-id",
    clientId: "tixid",
    name: "TIX ID",
    category: "Ticketing • Streaming • Video on Demand",
    platforms: ["android", "ios", "web"],
    accent: "#1E293B",
    secondaryAccent: "#0F172A",
    surfaceTint: "#1E1B4B",
    kind: "ticketing",
  },
  {
    id: "daihatsuku",
    clientId: "astra",
    name: "DaihatsuKu",
    category: "Automotive • Sales Force",
    platforms: ["android"],
    accent: "#EA580C",
    secondaryAccent: "#1E3A8A",
    surfaceTint: "#1D4ED8",
    kind: "automotive",
  },
  {
    id: "movic-id",
    clientId: "astra",
    name: "Movic.id",
    category: "On Demand Rental Service • Transportation",
    platforms: ["android", "ios"],
    accent: "#0D9488",
    secondaryAccent: "#134E4A",
    surfaceTint: "#CCFBF1",
    kind: "rental",
  },
  {
    id: "acer-juara",
    clientId: "acer",
    name: "Acer Juara",
    category: "Loyalty App • Sales Force",
    platforms: ["android", "web"],
    accent: "#65A30D",
    secondaryAccent: "#365314",
    surfaceTint: "#84CC16",
    kind: "loyalty",
  },
  {
    id: "pln-digital-learning",
    clientId: "pln",
    name: "PLN Digital Learning",
    category: "Digital Learning • Education",
    platforms: ["web"],
    accent: "#0284C7",
    secondaryAccent: "#0C4A6E",
    surfaceTint: "#38BDF8",
    kind: "learning",
  },
  {
    id: "pusri",
    clientId: "pegadaian",
    name: "PUSRI",
    category: "Company Profile",
    platforms: ["web"],
    accent: "#0369A1",
    secondaryAccent: "#0F172A",
    surfaceTint: "#E0F2FE",
    kind: "corporate",
  },
  {
    id: "tbig-mobile-apps",
    clientId: "tbig",
    name: "TBIG Mobile Apps",
    category: "E-Office • Productivity",
    platforms: ["android", "ios", "web"],
    accent: "#2563EB",
    secondaryAccent: "#1E3A8A",
    surfaceTint: "#1E40AF",
    kind: "eoffice",
  },
];

/* Lookup label klien untuk PortfolioSection agar tetap utuh */
export const HAPPY_CLIENTS: ClientLogoItem[] = [
  { id: "telkom", name: "Telkom" },
  { id: "astra", name: "Astra" },
  { id: "google", name: "Google" },
  { id: "gojek", name: "Gojek" },
  { id: "ovo", name: "OVO" },
  { id: "acer", name: "Acer" },
  { id: "pln", name: "PLN" },
  { id: "bpjs", name: "BPJS" },
  { id: "paragon", name: "Paragon" },
  { id: "pegadaian", name: "Pegadaian" },
  { id: "tbig", name: "Tower Bersama Group" },
  { id: "mrt", name: "MRT Jakarta" },
  { id: "tixid", name: "TixID" },
  { id: "olx", name: "OLX" },
  { id: "erajaya", name: "Erajaya" },
];

export const STATS: StatItem[] = [
  {
    id: "projects",
    target: 20,
    decimals: 0,
    suffix: "%",
    label: "Hemat Bundling All-in-One",
    description:
      "Integrasi menyeluruh layanan Build, Creative, dan Grow lebih hemat 15%–20% dibanding pemesanan terpisah.",
  },
  {
    id: "clients",
    target: 5,
    decimals: 0,
    suffix: "",
    label: "Tim Inti D3 TI UB",
    description:
      "Kolaborasi tim in-house mahasiswa D3 Teknologi Informasi Universitas Brawijaya & spesialis terkurasi.",
  },
  {
    id: "downloads",
    target: 40,
    decimals: 0,
    suffix: "%",
    label: "Produksi Lebih Efisien",
    description:
      "Pustaka komponen UI/UX, template mini-audit, & boilerplate SEO-ready menghemat waktu 30%–40%.",
  },
  {
    id: "ratings",
    target: 3,
    decimals: 0,
    suffix: "",
    label: "Pilar Pertumbuhan",
    description:
      "High-Intent Commercial Traffic, Market Gap & Opportunity Lighting, dan Bottom-Line Analytics Dashboard.",
  },
  {
    id: "retention",
    target: 30,
    decimals: 0,
    suffix: " Hari",
    label: "Strategi Quick Win",
    description:
      "Perbaikan teknis website, Google Business Profile, & konten awal yang berdampak sejak bulan pertama.",
  },
];

export const PRICING_PACKAGES: PricingPackageItem[] = [
  {
    id: "paket-build",
    name: "Paket Build",
    badge: "Project-Based",
    price: "Rp2,5 jt – Rp10 jt+",
    period: "Per proyek • DP 50% / 50%",
    highlights: [
      "Branding & identitas visual terpadu",
      "Riset & desain UI/UX di Figma",
      "Pembuatan / pengembangan Web & Mobile App",
      "Fondasi performa, keamanan & SEO-ready",
    ],
    ctaLabel: "Pilih Paket Build",
  },
  {
    id: "paket-creative",
    name: "Paket Creative & Sosmed",
    badge: "Bulanan",
    price: "Rp1,2 jt – Rp3 jt",
    period: "/ bulan",
    highlights: [
      "Desain feed, reels, carousel & kampanye",
      "Perencanaan konten berbasis data audiens",
      "Konsistensi bahasa visual merek",
      "Laporan evaluasi performa bulanan",
    ],
    ctaLabel: "Pilih Paket Creative",
  },
  {
    id: "paket-grow",
    name: "Paket Grow",
    badge: "Retainer 3–12 Bln",
    price: "Rp1,5 jt – Rp5 jt",
    period: "/ bulan",
    highlights: [
      "Pemeliharaan & Technical SEO internal",
      "Optimasi Google Business Profile",
      "Strategi SEO komersial, SEM (Ads) / ASO",
      "Monthly Strategic Review & QC ketat",
    ],
    ctaLabel: "Pilih Paket Grow",
  },
  {
    id: "paket-all-in-one",
    name: "Paket All-in-One",
    badge: "Hemat 15%–20%",
    price: "Bundling Khusus",
    period: "Full Build & Grow",
    featured: true,
    highlights: [
      "Seluruh cakupan Build, Creative & Grow",
      "Satu strategi & satu pintu komunikasi",
      "Strategi Quick Win sejak bulan pertama",
      "Client Portal & Bottom-Line Analytics Dashboard",
    ],
    ctaLabel: "Konsultasi Bundling",
  },
];

export const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Konsultasi Awal & Mini-Audit",
    phase: "Tahap Discovery",
    description:
      "Pemetaan hambatan bisnis, target pertumbuhan, serta mini-audit gratis terhadap website, identitas visual, dan media sosial Anda.",
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Analisis Data & Insight Pitching",
    phase: "Perencanaan Strategis",
    description:
      "Analisis ekosistem digital dan celah pasar untuk menyusun peta jalan Build & Grow beserta pilihan paket sesuai kesiapan anggaran.",
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Fase Build & Quick Win Bulan 1",
    phase: "Eksekusi In-House",
    description:
      "Produksi branding, konten awal, UI/UX, serta perbaikan teknis website dan Google Business Profile agar progres terasa sejak bulan pertama.",
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Optimasi Fase Grow",
    phase: "In-House + Spesialis Terkurasi",
    description:
      "Implementasi Technical SEO internal dipadukan kampanye SEO komersial, Google Ads (SEM), dan ASO di bawah pengawasan QC Project Manager.",
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Client Portal & Bottom-Line Dashboard",
    phase: "Pelaporan Transparan",
    description:
      "Pemantauan kinerja yang menghubungkan performa digital langsung dengan indikator bisnis: jumlah leads, conversion rate, dan biaya akuisisi.",
  },
  {
    id: "step-6",
    stepNumber: "06",
    title: "Monthly Strategic Review & Scaling",
    phase: "Kemitraan Jangka Panjang",
    description:
      "Evaluasi berkala bersama klien untuk meninjau pencapaian leads, kepuasan klien (CSAT), serta peluang perpanjangan atau upgrade ke Paket All-in-One.",
  },
];

export const TEAM_ROLES: TeamRoleItem[] = [
  {
    id: "fullstack",
    role: "Lead Fullstack Developer",
    count: "1 Orang",
    responsibilities:
      "Pengembangan website & aplikasi mobile, optimasi performa, keamanan, serta implementasi Technical SEO.",
  },
  {
    id: "creative-uiux",
    role: "Creative, Branding & UI/UX Designer (FE)",
    count: "2 Orang",
    responsibilities:
      "Identitas visual, konten media sosial berbasis data, riset serta desain Figma, dan pengembangan front-end.",
  },
  {
    id: "bd-pm",
    role: "Business Development & Project Manager",
    count: "2 Orang",
    responsibilities:
      "Riset prospek, pengelolaan CRM, komunikasi klien, serta Quality Control terhadap mitra freelancer SEO/SEM/ASO.",
  },
];

export const WHATSAPP_OPTIONS: WhatsAppOption[] = [
  {
    id: "mini-audit",
    label: "Minta Mini-Audit Gratis (Website, Branding & Sosmed)",
  },
  {
    id: "paket-build",
    label: "Paket Build (Branding, UI/UX, Web / Mobile App)",
  },
  {
    id: "paket-creative",
    label: "Paket Creative & Konten Media Sosial Berbasis Data",
  },
  {
    id: "paket-grow",
    label: "Paket Grow (Technical SEO, SEM / Google Ads, ASO)",
  },
  {
    id: "paket-all-in-one",
    label: "Paket All-in-One (Hemat 15%–20%)",
  },
];
