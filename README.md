# Nalar Digital

> **Insight-Driven Growth. Decisions That Matter.**

Landing page resmi **Nalar Digital** — *full-service digital agency* berkonsep **Build & Grow** dengan pendekatan *Insight-Driven Decision Making* untuk UMKM skala menengah dan bisnis B2B lokal (Keuangan, Jasa Profesional, F&B, Klinik Kesehatan, Properti, dan Pendidikan).

Dikembangkan secara *remote-first* dari Malang oleh tim mahasiswa **D3 Teknologi Informasi Universitas Brawijaya**.

- **Repository:** [https://github.com/alifarda126/NalarDigital](https://github.com/alifarda126/NalarDigital)

---

## Fitur Utama

- **Landing Page Publik Murni (`/`)**: Tanpa halaman login admin atau API CMS — ringan, cepat, dan mudah di-deploy.
- **Sticky Navbar (`Navbar.tsx`)**: Logo resmi **ND** (`BrandLogo.tsx`), Scroll-Spy otomatis (`HOME`, `LAYANAN`, `PORTOFOLIO`, `PAKET`, `TENTANG`), CTA langsung ke WhatsApp, dan mobile drawer.
- **Hero, Layanan, Paket, Statistik Bento, Alur Kerja & CTA**: Seluruh tombol konsultasi (`Konsultasi Gratis`, `Minta Mini-Audit Gratis`, `Konsultasi Layanan`, `Pilih Paket`, `Kontak`, dan `WhatsAppWidget`) mengarah langsung ke WhatsApp dengan pesan otomatis sesuai konteks.
- **Portofolio Manual via Kode (`src/data/portfolios.json`)**:
  - Untuk menambah/mengubah portofolio, cukup edit `src/data/portfolios.json` dan taruh gambar poster di `public/assets/portfolio/`.
  - Klik kartu portofolio untuk membuka modal detail (`PortfolioDetailModal.tsx`), lengkap dengan tombol **Buat Proyek Serupa via WhatsApp** yang langsung membuka chat WhatsApp berisi:
    `Halo Nalar Digital, saya ingin buat project seperti "<nama proyek>". Bisa diskusi lebih lanjut?`

---

## Konfigurasi Nomor WhatsApp

Atur nomor WhatsApp tujuan melalui `.env.local` (salin dari `.env.example`) atau ubah langsung `DEFAULT_WHATSAPP_NUMBER` di `src/lib/whatsapp.ts`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=6281200000000
```

---

## Perintah Pengembangan & Kualitas Kode

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js (Turbopack) |
| `npm test` | Menjalankan unit test helper WhatsApp & validasi portofolio |
| `npm run typecheck` | Pemeriksaan tipe TypeScript penuh (`tsc --noEmit`) |
| `npm run lint` | Pemeriksaan ESLint pada seluruh codebase |
| `npm run build` | Membangun bundle produksi (`next build`) |

---

© 2026 **Nalar Digital** — *Insight-Driven Growth. Decisions That Matter.*
