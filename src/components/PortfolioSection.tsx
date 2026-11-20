import { HAPPY_CLIENTS, PORTFOLIO_ITEMS, type PlatformType } from "@/data/homepage";
import { ClientLogoMark } from "./ClientLogoMark";
import { OrganicPetalAccent } from "./EditorialIllustrations";
import { PortfolioMockup } from "./PortfolioMockup";

const CLIENT_NAME_BY_ID = Object.fromEntries(
  HAPPY_CLIENTS.map((c) => [c.id, c.name])
);

function PlatformIcon({ platform }: { platform: PlatformType }) {
  if (platform === "android") {
    return (
      <span
        title="Android"
        aria-label="Android"
        className="inline-flex items-center justify-center text-[#22C55E]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.6 9.48l1.84-3.18a.58.58 0 0 0-.21-.79.58.58 0 0 0-.79.21l-1.87 3.24a11.46 11.46 0 0 0-9.14 0L5.56 5.72a.58.58 0 0 0-.79-.21.58.58 0 0 0-.21.79l1.84 3.18A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 15zm10 0a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 17 15z" />
        </svg>
      </span>
    );
  }

  if (platform === "ios") {
    return (
      <span
        title="iOS"
        aria-label="iOS"
        className="inline-flex items-center justify-center text-[#454545]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.36 12.76c0-2.31 1.88-3.42 1.97-3.47-1.08-1.57-2.75-1.79-3.34-1.81-1.41-.14-2.77.84-3.49.84-.73 0-1.84-.82-3.03-.8-1.55.02-2.99.91-3.79 2.3-1.63 2.82-.42 6.99 1.15 9.27.78 1.12 1.7 2.37 2.9 2.33 1.17-.05 1.62-.75 3.04-.75 1.42 0 1.83.75 3.05.72 1.26-.02 2.05-1.13 2.81-2.26.9-1.31 1.26-2.59 1.28-2.66-.03-.01-2.55-.98-2.55-3.71zM14.07 6.02c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.85 1.04.08 2.09-.53 2.72-1.31z" />
        </svg>
      </span>
    );
  }

  return (
    <span
      title="Web"
      aria-label="Web"
      className="inline-flex items-center justify-center text-[#580AC7]"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
      </svg>
    </span>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 relative overflow-x-clip bg-[#FFFFFF] py-16 min-[1025px]:py-24"
    >
      <OrganicPetalAccent side="left" />
      <OrganicPetalAccent side="right" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="portfolio-heading"
            className="font-heading text-[28px] leading-tight font-bold text-[#000000] min-[1025px]:text-[34px]"
          >
            We build ONLY what customers love
          </h2>
          <p className="mt-3 text-base text-[#52525B] min-[1025px]:text-lg">
            Beautifully designed, passionately engineered, and incredibly reliable
          </p>
        </div>

        {/* 3-column grid on desktop (>1024px), 2 columns on tablet (769-1024px), 1 column on mobile (<=768px) */}
        <div className="mt-12 grid grid-cols-1 gap-7 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item) => {
            const clientLabel = CLIENT_NAME_BY_ID[item.clientId] ?? item.name;
            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-2xl border border-[#F1F1F6] bg-[#FFFFFF] p-4 shadow-[0_10px_30px_rgba(17,17,17,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D9C6FA] hover:shadow-[0_20px_44px_rgba(88,10,199,0.1)]"
              >
                <PortfolioMockup item={item} />

                <div className="flex flex-1 flex-col justify-between px-1 pt-4 pb-1">
                  <div>
                    <ClientLogoMark
                      id={item.clientId}
                      name={clientLabel}
                      variant="mini"
                    />
                    <h3 className="mt-2 font-heading text-lg font-bold text-[#000000]">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#52525B]">
                    <span>{item.category}</span>
                    <span aria-hidden="true" className="text-[#A1A1AA]">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
