"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  FolderPlus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { APP_CATEGORIES, PLATFORM_OPTIONS } from "@/config/portfolio-taxonomy";
import { usePortfolioStore } from "@/hooks/usePortfolioStore";
import { filterPortfolios } from "@/lib/portfolio-validation";
import type {
  AppCategoryId,
  PlatformId,
  PortfolioItem,
} from "@/types/portfolio";
import { OrganicPetalAccent } from "./EditorialIllustrations";
import { PlatformIcon } from "./PlatformIcon";
import { PortfolioDetailModal } from "./PortfolioDetailModal";
import { PortfolioMockup } from "./PortfolioMockup";

interface PortfolioSectionProps {
  onOpenContact?: (topic?: string) => void;
}

export function PortfolioSection({ onOpenContact }: PortfolioSectionProps) {
  const { portfolios } = usePortfolioStore();
  const [selectedCategory, setSelectedCategory] = useState<
    AppCategoryId | "all"
  >("all");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDetail, setActiveDetail] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(
    () =>
      filterPortfolios(portfolios, {
        categoryId: selectedCategory,
        platform: selectedPlatform,
        search: searchQuery,
      }),
    [portfolios, selectedCategory, selectedPlatform, searchQuery]
  );

  const hasActiveFilter =
    selectedCategory !== "all" ||
    selectedPlatform !== "all" ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSearchQuery("");
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 relative overflow-x-clip bg-white py-16 min-[1025px]:py-24"
    >
      <OrganicPetalAccent side="left" />
      <OrganicPetalAccent side="right" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        {/* Section header + Studio Asset shortcut */}
        <div className="flex flex-col items-center justify-between gap-5 text-center min-[1025px]:flex-row min-[1025px]:items-end min-[1025px]:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 font-heading text-xs font-bold text-brand-primary">
              Portofolio &amp; Studi Kasus
            </span>
            <h2
              id="portfolio-heading"
              className="mt-3 font-heading text-[26px] leading-tight font-bold text-brand-navy min-[769px]:text-[30px] min-[1025px]:text-[36px]"
            >
              Karya Digital Lintas Industri &amp; Platform
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#525775] min-[1025px]:text-base">
              Eksplorasi solusi aplikasi keuangan, jasa profesional, F&amp;B, kesehatan, hingga branding yang dirancang berbasis data — filter berdasarkan bidang, platform, maupun bahasa pemrograman.
            </p>
          </div>

          <Link
            href="/assets"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 font-heading text-xs min-[480px]:text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,41,67,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary"
          >
            <FolderPlus className="h-4 w-4 text-brand-lime" />
            <span>Tambah Portofolio &amp; Asset</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Interactive Filter Panel */}
        <div className="mt-8 rounded-2xl border border-brand-muted/80 bg-brand-canvas p-4 min-[769px]:p-5">
          <div className="flex flex-col gap-3.5 min-[1025px]:flex-row min-[1025px]:items-center min-[1025px]:justify-between">
            {/* Search by title / client / programming language */}
            <div className="relative flex-1 min-[1025px]:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#525775]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Cari portofolio atau bahasa pemrograman"
                placeholder="Cari proyek, kategori, atau bahasa (mis. Kotlin, Flutter)..."
                className="w-full rounded-xl border border-brand-muted bg-white py-2.5 pr-3.5 pl-10 text-sm text-brand-navy placeholder:text-[#787E9C] focus:border-brand-primary focus:outline-none"
              />
            </div>

            {/* Platform filter pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 inline-flex items-center gap-1 font-heading text-xs font-semibold text-[#525775]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Platform:
              </span>
              <button
                type="button"
                onClick={() => setSelectedPlatform("all")}
                className={`rounded-lg px-3 py-1.5 font-heading text-xs font-semibold transition-colors cursor-pointer ${
                  selectedPlatform === "all"
                    ? "bg-brand-navy text-brand-lime"
                    : "bg-white text-[#525775] border border-brand-muted hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                Semua
              </button>
              {PLATFORM_OPTIONS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`rounded-lg px-3 py-1.5 font-heading text-xs font-semibold transition-colors cursor-pointer ${
                    selectedPlatform === platform.id
                      ? "bg-brand-primary text-white shadow-[0_6px_16px_rgba(58,78,251,0.28)]"
                      : "bg-white text-[#525775] border border-brand-muted hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {platform.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-brand-muted/70 pt-3.5">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-brand-gradient text-white shadow-[0_6px_16px_rgba(58,78,251,0.25)]"
                  : "bg-white text-brand-navy border border-brand-muted hover:border-brand-sky"
              }`}
            >
              Semua Bidang ({portfolios.length})
            </button>
            {APP_CATEGORIES.map((category) => {
              const count = portfolios.filter(
                (p) => p.categoryId === category.id
              ).length;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-brand-gradient text-white shadow-[0_6px_16px_rgba(58,78,251,0.25)]"
                      : "bg-white text-[#454A66] border border-brand-muted hover:border-brand-sky hover:text-brand-primary"
                  }`}
                >
                  {category.shortLabel}
                  {count > 0 ? ` (${count})` : ""}
                </button>
              );
            })}

            {hasActiveFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-lime px-3 py-1.5 font-heading text-xs font-bold text-brand-navy transition-opacity hover:opacity-90 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Portfolio Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-brand-muted bg-brand-canvas p-10 text-center">
            <p className="font-heading text-lg font-bold text-brand-navy">
              Belum ada portofolio yang cocok dengan filter ini
            </p>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-[#525775]">
              Coba ubah kata kunci pencarian atau tambahkan proyek baru untuk bidang &amp; bahasa ini melalui halaman Studio Asset.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl border border-brand-muted bg-white px-4 py-2.5 font-heading text-sm font-semibold text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
              >
                Tampilkan Semua
              </button>
              <Link
                href="/assets"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 font-heading text-sm font-semibold text-white"
              >
                <FolderPlus className="h-4 w-4" />
                Tambah Portofolio Baru
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveDetail(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDetail(item);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group flex flex-col rounded-2xl border border-brand-muted/80 bg-white p-4 text-left shadow-[0_10px_30px_rgba(37,41,67,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand-sky hover:shadow-[0_20px_44px_rgba(58,78,251,0.14)] cursor-pointer"
              >
                <PortfolioMockup item={item} />

                <div className="flex flex-1 flex-col justify-between px-1 pt-4 pb-1">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-brand-soft px-2.5 py-0.5 font-heading text-[11px] font-bold text-brand-primary">
                        {item.categoryLabel}
                      </span>
                      <div className="inline-flex items-center gap-1">
                        {item.platforms.map((platform) => (
                          <PlatformIcon key={platform} platform={platform} />
                        ))}
                      </div>
                    </div>

                    <h3 className="mt-2.5 font-heading text-[17px] leading-snug font-bold text-brand-navy group-hover:text-brand-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-[#525775]">
                      {item.clientName}
                    </p>

                    <p className="mt-2 text-[13px] leading-relaxed text-[#525775] line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  {/* Tech Stack / Bahasa Pemrograman badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-brand-muted/60 pt-3">
                    <Code2 className="h-3.5 w-3.5 shrink-0 text-brand-sky" />
                    {item.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-brand-canvas px-2 py-0.5 font-heading text-[11px] font-semibold text-brand-navy border border-brand-muted/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.techStack.length > 4 && (
                      <span className="font-heading text-[11px] font-semibold text-[#525775]">
                        +{item.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <PortfolioDetailModal
        item={activeDetail}
        onClose={() => setActiveDetail(null)}
        onConsultSimilar={(topic) => onOpenContact?.(topic)}
      />
    </section>
  );
}
