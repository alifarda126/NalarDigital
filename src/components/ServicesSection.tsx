"use client";

import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/homepage";
import { ServiceIllustration } from "./EditorialIllustrations";
import { Reveal } from "./Reveal";

interface ServicesSectionProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onDiscoverMore: (serviceTitle: string) => void;
}

export function ServicesSection({
  activeIndex,
  onSelectIndex,
  onDiscoverMore,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 relative overflow-x-clip bg-brand-canvas py-14 min-[769px]:py-16 min-[1025px]:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="font-heading text-[24px] leading-tight font-bold text-brand-navy min-[769px]:text-[28px] min-[1025px]:text-[32px]"
          >
            Solusi Build &amp; Grow untuk Bisnis Anda
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[#525775] min-[1025px]:text-base">
            Dari pembangunan aset digital secara in-house hingga optimasi pertumbuhan bersama spesialis terkurasi — tersedia dalam satu pintu terintegrasi.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="relative mt-10 min-[1025px]:mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute -top-9 left-32 h-24 w-24 rounded-full bg-brand-muted/80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute -bottom-9 left-8 h-24 w-24 rounded-full bg-brand-lime/55"
          />

          <div className="relative z-10 grid grid-cols-1 gap-4 min-[769px]:grid-cols-2 min-[769px]:gap-5 min-[1025px]:flex min-[1025px]:flex-row min-[1025px]:items-stretch min-[1025px]:gap-5">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={service.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => onSelectIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectIndex(index);
                    }
                  }}
                  className={`group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-6 min-[1025px]:h-[344px] min-[1025px]:p-8 transition-[flex-grow,background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] touch-manipulation cursor-pointer ${
                    isActive
                      ? "min-[1025px]:flex-[2.25] bg-white border border-brand-primary/30 shadow-[0_20px_50px_rgba(58,78,251,0.12)]"
                      : "min-[1025px]:flex-1 bg-brand-muted/65 border border-brand-muted hover:-translate-y-0.5 hover:border-brand-sky"
                  }`}
                >
                  {/* Top row: editorial illustration left + gliding vertical rail right */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-[72px] w-[72px] min-[1025px]:h-20 min-[1025px]:w-20 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "bg-brand-soft scale-100"
                          : "bg-white/80 group-hover:scale-105"
                      }`}
                    >
                      <ServiceIllustration icon={service.icon} />
                    </div>

                    <div
                      aria-hidden="true"
                      className="relative flex h-[52px] w-4 shrink-0 justify-center"
                    >
                      <span
                        className={`h-full w-[2px] rounded-full transition-colors duration-500 ${
                          isActive ? "bg-brand-sky" : "bg-[#BCC2DC]"
                        }`}
                      />
                      <span
                        className={`absolute top-0 h-3.5 w-3.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "translate-y-[38px] bg-brand-primary shadow-[0_0_0_5px_rgba(227,255,59,0.65)]"
                            : "translate-y-0 bg-brand-navy/60"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="mt-6 min-[1025px]:mt-auto">
                    <h3
                      className={`font-heading text-[20px] leading-snug font-bold transition-colors duration-300 min-[1025px]:text-[22px] ${
                        isActive ? "text-brand-navy" : "text-[#454A66]"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <div
                      aria-hidden={!isActive}
                      className={`grid transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "visible mt-3 grid-rows-[1fr] opacity-100 translate-y-0 pointer-events-auto"
                          : "invisible mt-0 grid-rows-[0fr] opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="min-[1025px]:w-[365px] max-w-full">
                          <p className="text-[14px] leading-relaxed text-[#454A66] min-[1025px]:text-[14.5px]">
                            {service.description}
                          </p>
                          <div className="mt-4">
                            <button
                              type="button"
                              tabIndex={isActive ? 0 : -1}
                              onClick={(event) => {
                                event.stopPropagation();
                                onDiscoverMore(service.title);
                              }}
                              className="inline-flex min-h-[40px] items-center gap-2 font-heading text-sm font-bold text-brand-primary transition-transform duration-200 hover:translate-x-0.5 hover:underline touch-manipulation cursor-pointer"
                            >
                              Konsultasi Layanan
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      aria-hidden={isActive}
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "invisible mt-0 grid-rows-[0fr] opacity-0 pointer-events-none"
                          : "visible mt-3 grid-rows-[1fr] opacity-100 pointer-events-auto"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <span className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold text-brand-primary/85 transition-colors group-hover:text-brand-primary">
                          Lihat detail
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
