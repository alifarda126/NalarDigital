"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { TEAM_ROLES, WORKFLOW_STEPS } from "@/data/homepage";
import { TestimonialsPeopleGrid } from "./EditorialIllustrations";
import { Reveal } from "./Reveal";

const SLIDE_ITEMS = [...WORKFLOW_STEPS, WORKFLOW_STEPS[0]];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = WORKFLOW_STEPS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const trackStyle = {
    "--slide-index": currentIndex,
  } as CSSProperties;

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="scroll-mt-20 bg-brand-canvas py-14 min-[769px]:py-16 min-[1025px]:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-8 min-[769px]:flex-row">
            <div className="max-w-lg text-center min-[769px]:text-left">
              <h2
                id="workflow-heading"
                className="font-heading text-[26px] leading-tight font-bold text-brand-navy min-[769px]:text-[28px] min-[1025px]:text-[36px]"
              >
                Alur Kerja Terstruktur dari Audit hingga Pertumbuhan
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#525775] min-[1025px]:text-base">
                Setiap klien menjalani tahapan konsultatif terukur dengan dukungan Client Portal dan strategi Quick Win sejak bulan pertama.
              </p>
            </div>

            <TestimonialsPeopleGrid />
          </div>
        </Reveal>

        <Reveal delayMs={100} className="mt-10 min-[769px]:mt-12">
          <div aria-live="polite" className="overflow-hidden -mx-2 px-2 py-2">
            <div className="workflow-track" style={trackStyle}>
              {SLIDE_ITEMS.map((step, idx) => (
                <article
                  key={`${step.id}-${idx}`}
                  aria-hidden={idx !== currentIndex && idx !== currentIndex + 1}
                  className="workflow-slide relative overflow-hidden rounded-2xl border border-brand-muted bg-white p-6 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-7 min-[1025px]:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -left-10 h-44 w-44 rotate-12 rounded-3xl bg-brand-soft"
                  />

                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-[480px]:gap-4">
                      <div className="flex h-11 w-11 min-[480px]:h-12 min-[480px]:w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-heading text-sm font-bold text-white ring-4 ring-brand-lime/70">
                        {step.stepNumber}
                      </div>
                      <h3 className="font-heading text-base font-bold text-brand-navy min-[480px]:text-lg">
                        {step.title}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-soft px-3 py-1 font-heading text-[11px] font-bold text-brand-primary">
                      {step.phase}
                    </span>
                  </div>

                  <p className="relative z-10 mt-5 text-[14.5px] leading-relaxed text-[#454A66] min-[480px]:mt-6 min-[480px]:text-[15px]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous workflow step"
              onClick={handlePrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/35 bg-white text-brand-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-primary hover:bg-brand-primary hover:text-white active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Pilih tahap alur kerja"
            >
              {WORKFLOW_STEPS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Lihat tahap ${item.stepNumber}: ${item.title}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                    index === currentIndex
                      ? "w-8 bg-brand-primary"
                      : "w-2.5 bg-brand-muted hover:bg-brand-sky"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next workflow step"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/35 bg-white text-brand-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-primary hover:bg-brand-primary hover:text-white active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <span className="ml-2 font-heading text-xs font-semibold tabular-nums text-[#525775]">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-12 rounded-2xl border border-brand-muted bg-white p-5 shadow-[0_8px_28px_rgba(37,41,67,0.05)] min-[480px]:p-6 min-[1025px]:mt-14 min-[1025px]:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-muted/70 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-primary">
                  <Users className="h-4 w-4" />
                </span>
                <h3 className="font-heading text-base font-bold text-brand-navy min-[1025px]:text-lg">
                  Struktur Tim Inti Nalar Digital
                </h3>
              </div>
              <span className="rounded-full bg-brand-navy px-3 py-1 font-heading text-xs font-semibold text-brand-lime">
                5 Anggota • D3 Teknologi Informasi Universitas Brawijaya
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 min-[769px]:grid-cols-3">
              {TEAM_ROLES.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl border border-brand-muted/80 bg-brand-canvas p-4 transition-colors hover:border-brand-sky"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-sm font-bold text-brand-navy">
                      {member.role}
                    </span>
                    <span className="shrink-0 rounded-md bg-brand-soft px-2 py-0.5 font-heading text-[11px] font-bold text-brand-primary">
                      {member.count}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#525775]">
                    {member.responsibilities}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
