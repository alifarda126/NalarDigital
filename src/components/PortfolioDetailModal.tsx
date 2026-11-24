"use client";

import { useEffect } from "react";
import { Code2, ExternalLink, Layers, Sparkles, X } from "lucide-react";
import {
  buildPortfolioWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import type { PortfolioItem } from "@/types/portfolio";
import { PlatformIcon } from "./PlatformIcon";
import { PortfolioMockup } from "./PortfolioMockup";

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function PortfolioDetailModal({
  item,
  onClose,
}: PortfolioDetailModalProps) {
  useEffect(() => {
    if (!item) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-detail-title"
      onClick={onClose}
      className="fixed inset-0 z-[65] flex items-center justify-center bg-brand-navy/65 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_32px_80px_rgba(27,30,53,0.35)] min-[480px]:p-7"
      >
        <button
          type="button"
          aria-label="Tutup detail portofolio"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-navy transition-colors hover:bg-brand-primary hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-navy px-3 py-1 font-heading text-[11px] font-bold text-brand-lime">
              <Layers className="h-3 w-3" />
              {item.categoryLabel}
            </span>
            <span className="rounded-full bg-brand-soft px-3 py-1 font-heading text-[11px] font-semibold text-brand-navy">
              {item.clientName} • {item.year}
            </span>
          </div>

          <h2
            id="portfolio-detail-title"
            className="mt-3 font-heading text-xl font-bold text-brand-navy min-[480px]:text-2xl"
          >
            {item.name}
          </h2>
        </div>

        <div className="mt-4">
          <PortfolioMockup item={item} />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#454A66] min-[480px]:text-[15px]">
          {item.summary}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-brand-muted/80 bg-brand-canvas p-4 min-[480px]:grid-cols-2">
          <div>
            <div className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#525775]">
              Platform Target
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.platforms.map((platform) => (
                <PlatformIcon key={platform} platform={platform} showLabel />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 font-heading text-[11px] font-bold uppercase tracking-wider text-[#525775]">
              <Code2 className="h-3.5 w-3.5 text-brand-primary" />
              Bahasa &amp; Tech Stack
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-brand-muted bg-white px-2.5 py-1 font-heading text-xs font-semibold text-brand-navy"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <a
            href={buildWhatsAppUrl(buildPortfolioWhatsAppMessage(item.name))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-[0_10px_24px_rgba(58,78,251,0.28)] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Buat Proyek Serupa via WhatsApp
          </a>

          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-brand-muted bg-white px-4 py-2.5 font-heading text-sm font-semibold text-brand-navy transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              Lihat Demo
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
