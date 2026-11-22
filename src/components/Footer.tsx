"use client";

import { SERVICES } from "@/data/homepage";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onSelectService: (index: number) => void;
  onOpenContact: (topic?: string) => void;
}

export function Footer({ onSelectService, onOpenContact }: FooterProps) {
  const handleServiceClick = (index: number) => {
    onSelectService(index);
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-brand-navy pt-14 pb-28 text-white min-[769px]:pt-16 min-[769px]:pb-24 min-[1025px]:pt-20">
      {/* Delicate layered topographic wave strokes in electric sky blue */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full opacity-20"
      >
        {[0, 14, 28, 42, 56, 70, 84].map((offset) => (
          <path
            key={offset}
            d={`M-40,${120 + offset} C260,${50 + offset} 520,${190 + offset} 820,${110 + offset} C1060,${45 + offset} 1280,${150 + offset} 1480,${95 + offset}`}
            fill="none"
            stroke="#33A4FA"
            strokeWidth="1.2"
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        {/* Band 1: Official ND Logo + Brand mission statement + Remote-First Malang & contact */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-10 min-[769px]:grid-cols-12 min-[769px]:items-start">
          <div className="min-[769px]:col-span-7">
            <a href="#home" aria-label="Nalar Digital Beranda" className="inline-flex">
              <BrandLogo variant="dark" size="lg" />
            </a>
            <p className="mt-4 max-w-xl font-heading text-base leading-relaxed font-semibold text-white/95 min-[1025px]:text-[19px]">
              Nalar Digital hadir sebagai mitra pertumbuhan digital berbasis Insight-Driven Decision Making bagi UMKM dan perusahaan B2B.
            </p>
            <p className="mt-2 font-heading text-sm font-bold text-brand-lime">
              Insight-Driven Growth. Decisions That Matter.
            </p>
          </div>

          <div className="min-[769px]:col-span-5 space-y-2.5 text-sm leading-relaxed text-brand-muted">
            <div className="font-heading text-sm font-bold text-white">
              Operasional Remote-First — Malang
            </div>
            <p className="max-w-sm">
              Dikembangkan oleh Tim Mahasiswa D3 Teknologi Informasi Universitas Brawijaya
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
              <a
                href="mailto:halo@nalardigital.id"
                className="font-heading text-sm font-bold text-brand-sky transition-colors hover:text-brand-lime"
              >
                halo@nalardigital.id
              </a>
              <a
                href="tel:+6281200000000"
                className="font-heading text-sm font-bold text-brand-sky transition-colors hover:text-brand-lime"
              >
                +62 812-0000-0000
              </a>
            </div>
          </div>
        </div>

        {/* Band 2: Primary public links */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-white/15 py-7 font-heading text-sm font-medium text-white min-[769px]:flex min-[769px]:items-center min-[769px]:justify-between"
        >
          <a href="#home" className="transition-colors hover:text-brand-lime">
            Home
          </a>
          <a href="#services" className="transition-colors hover:text-brand-lime">
            Layanan
          </a>
          <a href="#portfolio" className="transition-colors hover:text-brand-lime">
            Portofolio
          </a>
          <a href="#pricing" className="transition-colors hover:text-brand-lime">
            Paket
          </a>
          <button
            type="button"
            onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
            className="text-left transition-colors hover:text-brand-lime cursor-pointer"
          >
            Kontak
          </button>
        </nav>

        {/* Band 3: Layanan label + 4 Nalar Digital services */}
        <div className="flex flex-col gap-4 border-b border-white/15 py-7 min-[769px]:flex-row min-[769px]:items-center min-[769px]:gap-8">
          <div className="flex items-center gap-6 shrink-0">
            <span className="font-heading text-sm font-bold text-brand-lime">
              Layanan
            </span>
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-white/25 min-[769px]:inline-block"
            />
          </div>

          <div className="grid grid-cols-1 gap-y-3.5 gap-x-6 font-heading text-sm font-medium text-white min-[480px]:grid-cols-2 min-[1025px]:flex min-[1025px]:flex-1 min-[1025px]:items-center min-[1025px]:justify-between">
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceClick(index)}
                className="text-left transition-colors hover:text-brand-sky cursor-pointer"
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Band 4: Copyright left + 3 social icons right */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 pt-8 min-[769px]:flex-row">
          <div className="font-heading text-xs font-semibold text-brand-muted min-[1025px]:text-sm">
            © Copyright 2026 Nalar Digital
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://medium.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nalar Digital di Medium"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-brand-lime"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nalar Digital di LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-brand-lime"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nalar Digital di Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-brand-lime"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
