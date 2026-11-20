# Nalar Digital

> **Insight-Driven Growth. Decisions That Matter.**

Website profil dan *landing page* resmi **Nalar Digital**, sebuah *full-service digital agency* berkonsep **Build & Grow** dengan pendekatan *Insight-Driven Decision Making* untuk UMKM skala menengah dan bisnis B2B lokal (F&B, Klinik Kesehatan, Jasa Profesional, Properti, dan Pendidikan).

Dikembangkan secara *remote-first* dari Malang oleh tim mahasiswa **D3 Teknologi Informasi Universitas Brawijaya**.

- **Repository:** [https://github.com/alifarda126/NalarDigital](https://github.com/alifarda126/NalarDigital)

---

## Fitur & Struktur Halaman

Halaman utama dirangkai dalam `src/components/HomePageClient.tsx` menjadi 11 *section* terstruktur ditambah modal konsultasi (`ContactModal.tsx`):

1. **Sticky Navbar (`src/components/Navbar.tsx`)**  
   Navigasi atas dengan *Scroll-Spy* otomatis, dropdown `LAYANAN`, tombol CTA `Konsultasi Gratis`, serta *drawer* overlay responsif untuk tampilan mobile dan tablet.
2. **Hero Section (`src/components/HeroSection.tsx`)**  
   Menampilkan *tagline*, judul utama dengan animasi ketik *zero-CLS*, dua tombol aksi (*Pelajari Layanan Kami* & *Minta Mini-Audit Gratis*), dan foto tim studio lokal (`public/images/hero-team.jpg`).
3. **Sektor Target (`src/components/TrustStrip.tsx`)**  
   Menyoroti 6 sektor fokus UMKM dan B2B lokal: *Food & Beverage (F&B)*, *Klinik Kesehatan*, *Jasa Profesional*, *Properti*, *Pendidikan*, dan *UMKM & B2B Lokal*.
4. **Layanan Build & Grow (`src/components/ServicesSection.tsx`)**  
   4 kartu layanan interaktif dengan efek kartu aktif yang melebar:
   - *Branding & Creative Data-Driven*
   - *UI/UX & Web / Mobile App*
   - *SEO, SEM & ASO Growth*
   - *Paket All-in-One (Build & Grow)*
5. **Portofolio (`src/components/PortfolioSection.tsx`)**  
   Grid 3 kolom pada desktop (2 kolom pada `≤1024px`, 1 kolom pada `≤768px`) berisi 12 kartu *placeholder* yang disiapkan agar mudah diisi proyek semester tim.
6. **Statistik & Keunggulan (`src/components/StatsSection.tsx`)**  
   Tata letak *Bento grid* 12 kolom dengan animasi *count-up* saat masuk viewport: `20%` *Hemat Bundling All-in-One*, `5` *Tim Inti D3 TI UB*, `40%` *Produksi Lebih Efisien*, `3` *Pilar Pertumbuhan*, dan `30 Hari` *Strategi Quick Win*.
7. **Pilihan Paket & Harga (`src/components/HappyClientsSection.tsx` / `#pricing`)**  
   4 paket transparan sesuai kesiapan bisnis:
   - **Paket Build** (`Rp2,5 jt – Rp10 jt+`, *Project-Based*)
   - **Paket Creative & Sosmed** (`Rp1,2 jt – Rp3 jt / bulan`)
   - **Paket Grow** (`Rp1,5 jt – Rp5 jt / bulan`, retainer 3–12 bulan)
   - **Paket All-in-One** (*Bundling Khusus*, hemat `15%–20%`)
8. **Alur Kerja & Tim Inti (`src/components/TestimonialsSection.tsx` / `#workflow`)**  
   Carousel geser horizontal 6 tahap kolaborasi (`01` hingga `06`) dari *Discovery & Mini-Audit* hingga *Monthly Strategic Review & Scaling*, diikuti ringkasan 3 peran tim inti.
9. **CTA Mini-Audit Gratis (`src/components/CtaSection.tsx`)**  
   Blok ajakan 2 kolom dengan ilustrasi vektor (`EditorialIllustrations.tsx`) yang membuka modal konsultasi.
10. **Floating WhatsApp Widget (`src/components/WhatsAppWidget.tsx`)**  
    Tombol WhatsApp melayang di sudut kanan bawah dengan panel pemilihan 5 topik konsultasi.
11. **Footer 4-Band (`src/components/Footer.tsx`)**  
    Footer gelap (`#111111`) berlatar kontur gelombang tipis berisi misi agensi, informasi operasional *remote-first* Malang, tautan navigasi, pintasan 4 layanan, serta kontak dan ikon media sosial.

> Dirancang *desktop-first* dan teruji responsif pada viewport `1440px`, `1024px`, `768px`, `440px`, dan `375px`, serta menghormati preferensi `prefers-reduced-motion`.

---

## Tech Stack & Design Tokens

| Kategori | Teknologi / Nilai |
| --- | --- |
| Framework | Next.js `16.4.6` (App Router & Turbopack) |
| UI Library | React `19.3.0` |
| Bahasa | TypeScript `^5` |
| Styling | Tailwind CSS `4.3.3` (`@tailwindcss/turbopack`) |
| Ikon | `lucide-react` `^1.77.0` |
| Tipografi | `Rubik` (heading) & `Open Sans` (body) via `next/font/google` |
| Linter | ESLint `^9` (`eslint-config-next`) |

### Warna Utama (`src/app/globals.css`)

| Token CSS | Hex | Kegunaan |
| --- | --- | --- |
| `--color-primary` | `#580AC7` | Aksen utama, tombol CTA, indikator aktif |
| `--color-teal` | `#137D88` | Aksen sekunder merek, tautan kontak, angka statistik |
| `--color-bg` | `#FBFBFB` | Permukaan latar halaman utama |
| `--color-service-idle` | `#F4EEFC` | Latar kartu layanan non-aktif & aksen lembut |
| `--color-footer-bg` | `#111111` | Latar bagian footer |
| `--color-whatsapp` | `#25D366` | Tombol dan header widget WhatsApp |

---

## Struktur Direktori

```text
KWU/
├── public/
│   └── images/
│       └── hero-team.jpg              # Foto tim studio untuk Hero section
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css                # Token warna, utilitas animasi & carousel
│   │   ├── layout.tsx                 # Metadata & font Google (Rubik + Open Sans)
│   │   └── page.tsx                   # Entrypoint halaman utama
│   ├── components/
│   │   ├── ClientLogoMark.tsx         # Komponen logo klien portofolio
│   │   ├── ContactModal.tsx           # Modal pengajuan Mini-Audit & konsultasi
│   │   ├── CtaSection.tsx             # Section CTA Mini-Audit Gratis
│   │   ├── EditorialIllustrations.tsx # Ilustrasi SVG editorial (Stats & CTA)
│   │   ├── Footer.tsx                 # Footer 4-band
│   │   ├── HappyClientsSection.tsx    # Section 4 paket harga (#pricing)
│   │   ├── HeroSection.tsx            # Hero banner dengan efek ketik
│   │   ├── HomePageClient.tsx         # Orkestrator 11 section + modal
│   │   ├── Navbar.tsx                 # Header sticky + drawer mobile
│   │   ├── NbsLogo.tsx                # Logo wordmark Nalar Digital (3x3 grid)
│   │   ├── PortfolioMockup.tsx        # Mockup visual kartu portofolio
│   │   ├── PortfolioSection.tsx       # Grid portofolio 3 kolom
│   │   ├── Reveal.tsx                 # Wrapper animasi scroll reveal
│   │   ├── ServicesSection.tsx        # Kartu layanan interaktif melebar
│   │   ├── StatsSection.tsx           # Bento grid statistik dengan count-up
│   │   ├── TestimonialsSection.tsx    # Carousel alur kerja + struktur tim (#workflow)
│   │   ├── TrustStrip.tsx             # Strip 6 sektor target UMKM & B2B
│   │   └── WhatsAppWidget.tsx         # Widget konsultasi WhatsApp melayang
│   └── data/
│       └── homepage.ts                # Pusat data layanan, paket, alur kerja, tim & portofolio
├── package.json
└── README.md
```

---

## Cara Menjalankan Secara Lokal

### Prasyarat

- **Node.js** versi 20 atau lebih baru
- **npm**

### Langkah Instalasi

```bash
git clone https://github.com/alifarda126/NalarDigital.git
cd NalarDigital
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### Perintah yang Tersedia

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js (Turbopack) |
| `npm run lint` | Menjalankan pemeriksaan ESLint pada seluruh proyek |
| `npm run build` | Membangun bundle produksi (`next build`) |
| `npm run start` | Menjalankan server produksi dari hasil build (`next start`) |

---

## Panduan Kustomisasi Cepat

1. **Mengisi Portofolio Proyek Tim**  
   Bagian portofolio sengaja masih menggunakan 12 data *placeholder*. Untuk menggantinya dengan proyek semester tim Anda, perbarui array `PORTFOLIO_ITEMS` (serta `CLIENT_LOGOS` jika diperlukan) di `src/data/homepage.ts`, lalu sesuaikan tampilan mockup di `src/components/PortfolioMockup.tsx`.
2. **Mengubah Layanan, Paket Harga, Alur Kerja & Struktur Tim**  
   Seluruh teks utama dan daftar data (`HERO_HEADLINE`, `TARGET_SECTORS`, `SERVICES`, `STATS`, `PRICING_PACKAGES`, `WORKFLOW_STEPS`, `TEAM_ROLES`, dan `WHATSAPP_OPTIONS`) terpusat di `src/data/homepage.ts`.
3. **Mengganti Kontak & Tautan WhatsApp / Media Sosial**  
   - Perbarui alamat email (`halo@nalardigital.id`), nomor telepon (`+62 812-0000-0000`), dan URL profil Medium, LinkedIn, serta Instagram di `src/components/Footer.tsx`.
   - Arahkan tombol **Chat dengan kami** pada `src/components/WhatsAppWidget.tsx` ke URL `https://wa.me/<nomor>?text=...` saat deployment produksi.

---

## Tim Inti (D3 Teknologi Informasi Universitas Brawijaya)

| Peran | Jumlah | Tanggung Jawab Utama |
| --- | --- | --- |
| **Lead Fullstack Developer** | 1 Orang | Pengembangan website & aplikasi mobile, optimasi performa, keamanan, serta implementasi Technical SEO. |
| **Creative, Branding & UI/UX Designer (FE)** | 2 Orang | Identitas visual, konten media sosial berbasis data, riset serta desain Figma, dan pengembangan front-end. |
| **Business Development & Project Manager** | 2 Orang | Riset prospek, pengelolaan CRM, komunikasi klien, serta *Quality Control* terhadap mitra *freelancer* SEO/SEM/ASO. |

---

© 2026 **Nalar Digital** — *Insight-Driven Growth. Decisions That Matter.*
