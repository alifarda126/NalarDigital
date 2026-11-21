# Nalar Digital

> **Insight-Driven Growth. Decisions That Matter.**

Website profil, katalog portofolio dinamis, dan **Asset & Portofolio Studio** resmi **Nalar Digital** — *full-service digital agency* berkonsep **Build & Grow** dengan pendekatan *Insight-Driven Decision Making* untuk UMKM skala menengah dan bisnis B2B lokal (Keuangan, Jasa Profesional, F&B, Klinik Kesehatan, Properti, dan Pendidikan).

Dikembangkan secara *remote-first* dari Malang oleh tim mahasiswa **D3 Teknologi Informasi Universitas Brawijaya**.

- **Repository:** [https://github.com/alifarda126/NalarDigital](https://github.com/alifarda126/NalarDigital)

---

## Fitur Utama

### 1. Landing Page Profil Agensi (`/`)
Dirangkai dalam `src/components/HomePageClient.tsx` menjadi section terstruktur ditambah modal konsultasi (`ContactModal.tsx`) dan detail portofolio (`PortfolioDetailModal.tsx`):
- **Sticky Navbar (`Navbar.tsx`)** — Logo resmi **ND** (`BrandLogo.tsx`), Scroll-Spy otomatis, dropdown `LAYANAN`, navigasi langsung ke `ASSET` (`/assets`), CTA `Konsultasi Gratis`, dan mobile drawer.
- **Hero Section (`HeroSection.tsx`)** — Tagline, judul utama animasi ketik *zero-CLS* dengan aksen gradien biru elektrik & neon lime, CTA ganda, dan foto tim studio.
- **Sektor Target (`TrustStrip.tsx`)** — 6 sektor fokus UMKM dan B2B lokal.
- **Layanan Build & Grow (`ServicesSection.tsx`)** — 4 kartu layanan interaktif melebar.
- **Portofolio Interaktif (`PortfolioSection.tsx`)** — Terhubung langsung ke `src/data/portfolios.json`, dilengkapi filter **Bidang Aplikasi** (Keuangan, Jasa, F&B, Kesehatan, Properti, Pendidikan, E-Commerce, B2B, Branding), filter **Platform** (`Android`, `iOS`, `Web`, `UI/UX`), pencarian berdasarkan nama/klien/**bahasa pemrograman** (`Kotlin`, `Flutter`, `Next.js`, dll.), serta Modal Detail proyek.
- **Statistik Bento (`StatsSection.tsx`)**, **Paket & Harga (`HappyClientsSection.tsx`)**, **Alur Kerja & Tim Inti (`TestimonialsSection.tsx`)**, **CTA Mini-Audit (`CtaSection.tsx`)**, **Floating WhatsApp (`WhatsAppWidget.tsx`)**, dan **Footer Deep Navy (`Footer.tsx`)**.

### 2. Asset & Portofolio Studio (`/assets`)
Halaman studio khusus yang dirancang untuk memudahkan tim mengembangkan portofolio tanpa harus mengedit kode secara manual:
- **Kelola Portofolio (Tambah / Edit / Hapus):**
  - Pilih **Bidang Aplikasi** (Keuangan & Fintech, Jasa Profesional, F&B, Klinik Kesehatan, Properti, Pendidikan, E-Commerce UMKM, Operasional B2B, Branding & Konten).
  - Pilih **Platform** (`Android`, `iOS`, `Web App`, `UI/UX & Branding`).
  - Pilih **Bahasa Pemrograman & Tech Stack** kontekstual (mis. memilih `Android` langsung menampilkan saran `Kotlin`, `Java`, `Flutter`, `React Native`, `Jetpack Compose`, `Firebase`) + input bahasa kustom.
  - Pilih **Asset Visual** dari Pustaka Asset, unggah gambar langsung, atau gunakan *Auto Mockup* sesuai kategori — lengkap dengan **Live Preview Card**.
- **Pustaka Asset & Brand Kit:**
  - Upload gambar *drag-and-drop* (`PNG`, `JPG/JPEG`, `WEBP`, maks. `5 MB`) dengan validasi *magic bytes* & sanitasi nama file.
  - Koleksi **Brand Kit** resmi: 3 varian logo **ND** (`Transparent`, `Dark`, `Light`) + 5 swatch palet warna resmi dengan 1-klik *Copy Hex*.
- **Hybrid Persistence:**
  - **Local Development (`npm run dev`):** Menulis langsung ke `src/data/portfolios.json` dan `public/assets/portfolio/` melalui Route Handlers `/api/portfolios` dan `/api/assets`.
  - **Environment Read-Only (mis. Vercel):** Otomatis beralih ke `localStorage` browser dilengkapi fitur **Export JSON** dan **Import JSON**.

---

## Design Tokens & Palet Warna (`src/app/globals.css` & `src/config/theme.ts`)

| Token CSS | Hex | Kegunaan |
| --- | --- | --- |
| `--color-primary` | `#3A4EFB` | Electric Cobalt — gradien utama, tombol CTA, link & tab aktif |
| `--color-primary-end` | `#33A4FA` | Sky Electric — ujung gradien primer, tautan pada latar gelap |
| `--color-accent-lime` | `#E3FF3B` | Neon Lime — badge highlight, kartu metrik, CTA kontras di latar navy |
| `--color-navy` | `#252943` | Deep Navy — teks utama, heading, panel header studio, footer |
| `--color-surface-muted` | `#DEE0ED` | Periwinkle Mist — latar strip section, border lembut, kartu non-aktif |
| `--color-bg` | `#F7F8FC` | Kanvas latar halaman terang |

---

## Tech Stack

- **Framework:** Next.js `16.4.6` (App Router, Turbopack, `cacheComponents: true`)
- **UI Library:** React `19.3.0` + `lucide-react`
- **Bahasa:** TypeScript `^5` (Strict mode)
- **Styling:** Tailwind CSS `4.3.3` (`@tailwindcss/turbopack`)
- **Testing:** Node.js native test runner (`node --test`)

---

## Menjalankan & Menguji Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk beranda, dan [http://localhost:3000/assets](http://localhost:3000/assets) untuk Asset & Portofolio Studio.

### Perintah Pengembangan & Kualitas Kode

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js (Turbopack) |
| `npm test` | Menjalankan unit test validasi, keamanan upload, dan filter portofolio |
| `npm run typecheck` | Pemeriksaan tipe TypeScript penuh (`tsc --noEmit`) |
| `npm run lint` | Pemeriksaan ESLint pada seluruh codebase |
| `npm run build` | Membangun bundle produksi (`next build`) |

---

## Struktur Modul Utama

```text
NalarDigital/
├── public/
│   ├── assets/portfolio/           # Asset gambar portofolio (unggah via /assets atau manual)
│   └── images/
│       ├── brand/                  # Logo resmi ND (transparent, dark, light)
│       └── hero-team.jpg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assets/route.ts     # REST API daftar, upload (magic-byte check) & hapus asset
│   │   │   └── portfolios/route.ts # REST API CRUD src/data/portfolios.json (atomic write)
│   │   ├── assets/page.tsx         # Halaman Asset & Portofolio Studio (/assets)
│   │   ├── globals.css             # Design tokens terpusat & animasi
│   │   ├── icon.png                # Favicon logo ND
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── assets/                 # Komponen Studio Asset & Manajemen Portofolio
│   │   ├── BrandLogo.tsx           # Lockup resmi logo ND + wordmark
│   │   ├── PortfolioSection.tsx    # Grid portofolio dengan filter bidang/platform/bahasa
│   │   ├── PortfolioDetailModal.tsx
│   │   └── ...                     # Section landing page lainnya
│   ├── config/
│   │   ├── portfolio-taxonomy.ts   # Konfigurasi kategori, platform & saran bahasa pemrograman
│   │   └── theme.ts                # Token warna & Brand Kit resmi
│   ├── data/
│   │   ├── homepage.ts             # Data layanan, paket, alur kerja & tim inti
│   │   └── portfolios.json         # Sumber data portofolio (editable via /assets & kode)
│   ├── hooks/
│   │   └── usePortfolioStore.ts    # Hybrid store (Disk API <-> localStorage + sync lintas tab)
│   ├── lib/
│   │   ├── portfolio-validation.ts # Validasi input, sanitasi URL, magic-byte check & filter
│   │   ├── portfolio-client-store.ts
│   │   └── server/local-cms.ts     # Operasi baca/tulis file atomik & proteksi path traversal
│   └── types/
│       └── portfolio.ts            # Definisi tipe TypeScript ketat
└── tests/
    └── portfolio-validation.test.ts
```

---

© 2026 **Nalar Digital** — *Insight-Driven Growth. Decisions That Matter.*
