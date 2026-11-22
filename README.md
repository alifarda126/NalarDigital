# Nalar Digital

> **Insight-Driven Growth. Decisions That Matter.**

Website profil, katalog portofolio dinamis, dan **Superadmin CMS** terpisah resmi **Nalar Digital** — *full-service digital agency* berkonsep **Build & Grow** dengan pendekatan *Insight-Driven Decision Making* untuk UMKM skala menengah dan bisnis B2B lokal (Keuangan, Jasa Profesional, F&B, Klinik Kesehatan, Properti, dan Pendidikan).

Dikembangkan secara *remote-first* dari Malang oleh tim mahasiswa **D3 Teknologi Informasi Universitas Brawijaya**.

- **Repository:** [https://github.com/alifarda126/NalarDigital](https://github.com/alifarda126/NalarDigital)

---

## Fitur Utama

### 1. Landing Page Publik (`/`)
Halaman publik bersih tanpa menu/tombol CMS di Navbar, Portofolio, maupun Footer:
- **Sticky Navbar (`Navbar.tsx`)** — Logo resmi **ND** (`BrandLogo.tsx`), Scroll-Spy otomatis (`HOME`, `LAYANAN`, `PORTOFOLIO`, `PAKET`, `TENTANG`), CTA `Konsultasi Gratis`, dan mobile drawer.
- **Hero Section (`HeroSection.tsx`)** — Tagline, judul utama animasi ketik *zero-CLS* dengan gradien biru elektrik & aksen neon lime, CTA ganda, dan foto tim studio.
- **Sektor Target (`TrustStrip.tsx`)** & **Layanan Build & Grow (`ServicesSection.tsx`)**.
- **Portofolio Bersih (`PortfolioSection.tsx`)** — Grid 3 kolom editorial tanpa *filter/pagination* berlebihan di atasnya, menampilkan visual mockup/gambar, logo/nama klien, judul proyek, kategori aplikasi, dan ikon platform (`Android`, `iOS`, `Web`, `UI/UX`). Klik kartu untuk membuka Modal Detail (`PortfolioDetailModal.tsx`) lengkap dengan bahasa/tech stack dan CTA konsultasi.
- **Statistik Bento (`StatsSection.tsx`)**, **Paket & Harga (`HappyClientsSection.tsx`)**, **Alur Kerja & Tim Inti (`TestimonialsSection.tsx`)**, **CTA Mini-Audit (`CtaSection.tsx`)**, **Floating WhatsApp (`WhatsAppWidget.tsx`)**, dan **Footer Deep Navy (`Footer.tsx`)**.

### 2. Superadmin CMS Terproteksi (`/admin`)
Dipisahkan sepenuhnya dari landing page dan dilindungi oleh **autentikasi Superadmin** (*HttpOnly* HMAC-SHA256 signed session cookie + *rate limiting*):
- **Kelola Portofolio (Tambah / Edit / Hapus):**
  - Ubah **Bidang Aplikasi** (Keuangan & Fintech, Jasa Profesional, F&B, Klinik Kesehatan, Properti, Pendidikan, E-Commerce UMKM, Operasional B2B, Branding & Konten).
  - Ubah **Platform** (`Android`, `iOS`, `Web App`, `UI/UX & Branding`) yang langsung tampil sebagai ikon pada kartu portofolio.
  - Ubah **Bahasa Pemrograman & Tech Stack** kontekstual (`Kotlin`, `Flutter`, `React Native`, `Swift`, `Next.js`, `TypeScript`, `Laravel`, `Go`, `Figma`, dll. + tag kustom).
  - Pilih/unggah **Gambar Portofolio** dan **Logo Klien** opsional, lengkap dengan **Live Preview Card**.
- **Pustaka Asset & Brand Kit:**
  - Upload gambar *drag-and-drop* (`PNG`, `JPG/JPEG`, `WEBP`, maks. `5 MB`) dengan validasi *magic bytes* & sanitasi nama file.
  - Koleksi **Brand Kit** resmi: 3 varian logo **ND** (`Transparent`, `Dark`, `Light`) + 5 swatch palet warna resmi dengan 1-klik *Copy Hex*.
- **Proteksi API:**
  - `GET /api/portfolios` publik (read-only untuk beranda).
  - `POST`, `PUT`, `DELETE /api/portfolios` serta seluruh endpoint `/api/assets` wajib sesi login Superadmin (`401 Unauthorized` jika belum login).
- **Hybrid Persistence:** Menulis atomik ke `src/data/portfolios.json` & `public/assets/portfolio/` saat development lokal, dan fallback otomatis ke `localStorage` + **Export/Import JSON** saat deploy *read-only*.

---

## Konfigurasi Superadmin CMS (`.env.local`)

Salin `.env.example` menjadi `.env.local` (file `.env.local` otomatis diabaikan Git):

```bash
cp .env.example .env.local
```

Isi variabel berikut:

```env
ADMIN_USERNAME=superadmin
ADMIN_PASSWORD=ganti-dengan-password-kuat-anda
ADMIN_SESSION_SECRET=minimal-32-karakter-acak-untuk-signing-session
```

Lalu akses CMS di `http://localhost:3000/admin`.

---

## Design Tokens & Palet Warna (`src/app/globals.css` & `src/config/theme.ts`)

| Token CSS | Hex | Kegunaan |
| --- | --- | --- |
| `--color-primary` | `#3A4EFB` | Electric Cobalt — gradien utama, tombol CTA, link aktif |
| `--color-primary-end` | `#33A4FA` | Sky Electric — ujung gradien primer, tautan pada latar gelap |
| `--color-accent-lime` | `#E3FF3B` | Neon Lime — badge highlight, tab aktif CMS, kartu metrik |
| `--color-navy` | `#252943` | Deep Navy — teks utama, heading, header CMS, footer |
| `--color-surface-muted` | `#DEE0ED` | Periwinkle Mist — latar strip section, border lembut, kartu idle |
| `--color-bg` | `#F7F8FC` | Kanvas latar halaman terang |

---

## Perintah Pengembangan & Kualitas Kode

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js (Turbopack) |
| `npm test` | Menjalankan unit test autentikasi Superadmin, validasi, keamanan upload, dan filter |
| `npm run typecheck` | Pemeriksaan tipe TypeScript penuh (`tsc --noEmit`) |
| `npm run lint` | Pemeriksaan ESLint pada seluruh codebase |
| `npm run build` | Membangun bundle produksi (`next build`) |

---

© 2026 **Nalar Digital** — *Insight-Driven Growth. Decisions That Matter.*
