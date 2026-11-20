import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PRICING_PACKAGES } from "@/data/homepage";
import { Reveal } from "./Reveal";

interface HappyClientsSectionProps {
  onOpenContact: (topic?: string) => void;
}

export function HappyClientsSection({
  onOpenContact,
}: HappyClientsSectionProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 bg-[#FFFFFF] py-14 min-[769px]:py-16 min-[1025px]:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-heading"
            className="font-heading text-[26px] leading-tight font-bold text-[#000000] min-[769px]:text-[28px] min-[1025px]:text-[36px]"
          >
            Pilihan Paket Fleksibel untuk UMKM &amp; B2B
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#52525B] min-[1025px]:text-base">
            Pendekatan Value-Based &amp; Tiered Pricing — lebih terjangkau dibanding agensi besar dengan kualitas terstandarisasi dan laporan transparan.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 min-[769px]:mt-12 min-[769px]:grid-cols-2 min-[769px]:gap-6 min-[1025px]:grid-cols-4">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.id} delayMs={idx * 70} className="flex">
              <article
                data-pricing-card={pkg.id}
                className={`flex w-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-2 border-[#580AC7] bg-[#FCFCFC] shadow-[0_20px_48px_rgba(88,10,199,0.12)] hover:shadow-[0_24px_56px_rgba(88,10,199,0.18)]"
                    : "border border-[#ECECF4] bg-[#FBFBFB] shadow-[0_6px_22px_rgba(17,17,17,0.03)] hover:border-[#D9C6FA] hover:shadow-[0_16px_38px_rgba(88,10,199,0.08)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-wide ${
                        pkg.featured
                          ? "bg-[#580AC7] text-[#FFFFFF]"
                          : "bg-[#F4EEFC] text-[#580AC7]"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-[#000000]">
                    {pkg.name}
                  </h3>

                  <div className="mt-3">
                    <div className="font-heading text-[22px] font-extrabold tracking-tight text-[#580AC7]">
                      {pkg.price}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-[#52525B]">
                      {pkg.period}
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-[#ECECF4] pt-5">
                    {pkg.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#27272A]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#137D88]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact(pkg.name)}
                  className={`mt-7 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer ${
                    pkg.featured
                      ? "bg-[#580AC7] text-[#FFFFFF] shadow-[0_10px_24px_rgba(88,10,199,0.28)] hover:bg-[#4707A3]"
                      : "border border-[#580AC7]/35 bg-[#FFFFFF] text-[#580AC7] hover:border-[#580AC7] hover:bg-[#F4EEFC]"
                  }`}
                >
                  <span>{pkg.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={160}>
          <p className="mt-9 text-center font-heading text-sm font-semibold text-[#3F3F46] min-[1025px]:text-base">
            Tersedia program <span className="text-[#580AC7]">Pilot Project</span> untuk bisnis lokal terpilih &amp; penawaran <span className="text-[#137D88]">Mini-Audit Gratis</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
