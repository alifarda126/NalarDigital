"use client";

import { useState } from "react";
import { DEFAULT_PORTFOLIOS } from "@/data/homepage";
import type { PortfolioItem } from "@/types/portfolio";
import { OrganicPetalAccent } from "./EditorialIllustrations";
import { PlatformIcon } from "./PlatformIcon";
import { PortfolioDetailModal } from "./PortfolioDetailModal";
import { PortfolioMockup } from "./PortfolioMockup";

function ClientMark({ item }: { item: PortfolioItem }) {
  const [logoBroken, setLogoBroken] = useState(false);

  if (item.clientLogoPath && !logoBroken) {
    return (
      <div className="flex h-7 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.clientLogoPath}
          alt={item.clientName}
          onError={() => setLogoBroken(true)}
          className="h-6 max-w-[120px] object-contain"
        />
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 select-none">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-heading text-[10px] font-extrabold text-white"
        style={{ backgroundColor: item.accent === "#E3FF3B" ? "#252943" : item.accent }}
      >
        {item.clientName.slice(0, 1).toUpperCase()}
      </span>
      <span className="font-heading text-xs font-bold tracking-tight text-brand-primary">
        {item.clientName}
      </span>
    </span>
  );
}

/**
 * Clean public portfolio showcase grid.
 * Entries are maintained manually in src/data/portfolios.json.
 */
export function PortfolioSection() {
  const portfolios = DEFAULT_PORTFOLIOS;
  const [activeDetail, setActiveDetail] = useState<PortfolioItem | null>(null);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 relative overflow-x-clip bg-white py-16 min-[1025px]:py-24"
    >
      <OrganicPetalAccent side="left" />
      <OrganicPetalAccent side="right" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="portfolio-heading"
            className="font-heading text-[28px] leading-tight font-bold text-brand-navy min-[1025px]:text-[34px]"
          >
            Karya Digital yang Dicintai Klien
          </h2>
          <p className="mt-3 text-base text-[#525775] min-[1025px]:text-lg">
            Dirancang dengan data, dibangun dengan presisi, dan siap mendorong pertumbuhan bisnis
          </p>
        </div>

        {/* Clean 3-column grid matching the editorial reference with Nalar Digital's palette */}
        <div className="mt-12 grid grid-cols-1 gap-7 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
          {portfolios.map((item) => (
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
              className="group flex flex-col rounded-2xl border border-brand-muted/75 bg-white p-4 text-left shadow-[0_10px_30px_rgba(37,41,67,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-sky hover:shadow-[0_20px_44px_rgba(58,78,251,0.12)] cursor-pointer"
            >
              <PortfolioMockup item={item} />

              <div className="flex flex-1 flex-col justify-between px-1 pt-4 pb-1">
                <div>
                  <ClientMark item={item} />
                  <h3 className="mt-2 font-heading text-lg font-bold text-brand-navy transition-colors group-hover:text-brand-primary line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#525775]">
                  <span className="truncate max-w-[180px]">{item.categoryLabel}</span>
                  <span aria-hidden="true" className="text-[#9BA1BC]">
                    •
                  </span>
                  <div className="inline-flex items-center gap-1.5">
                    {item.platforms.map((platform) => (
                      <PlatformIcon key={platform} platform={platform} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <PortfolioDetailModal
        item={activeDetail}
        onClose={() => setActiveDetail(null)}
      />
    </section>
  );
}
