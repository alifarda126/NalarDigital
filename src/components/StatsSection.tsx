"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/homepage";
import { StatsIllustration } from "./EditorialIllustrations";
import { Reveal } from "./Reveal";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const triggerAnimation = () => {
      setHasAnimated(true);

      if (prefersReducedMotion) {
        setValues(STATS.map((stat) => stat.target));
        return;
      }

      const duration = 1200;
      const start = performance.now();

      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setValues(
          STATS.map((stat) => {
            const raw = stat.target * eased;
            return stat.decimals > 0
              ? Number(raw.toFixed(stat.decimals))
              : Math.round(raw);
          })
        );

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setValues(STATS.map((stat) => stat.target));
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          triggerAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatStat = (idx: number) => {
    const stat = STATS[idx];
    return stat.decimals > 0
      ? values[idx].toFixed(stat.decimals)
      : values[idx].toString();
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="stats-heading"
      className="scroll-mt-20 bg-brand-canvas py-14 min-[1025px]:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-heading text-base leading-relaxed font-medium text-brand-navy min-[1025px]:text-[20px]">
            Pendekatan Insight-Driven Decision Making yang memadukan estetika branding, performa aplikasi, dan pertumbuhan pelanggan yang terukur.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 min-[769px]:mt-12 min-[769px]:grid-cols-12 min-[769px]:gap-6">
          {/* Top-Left (8 cols): Heading + 20% Bundling Bento card */}
          <div className="flex flex-col justify-between gap-6 min-[769px]:col-span-8">
            <Reveal>
              <h2
                id="stats-heading"
                className="font-heading text-[22px] leading-[1.35] font-bold text-brand-navy min-[480px]:text-[24px] min-[1025px]:text-[30px]"
              >
                Dibangun oleh tim mahasiswa D3 Teknologi Informasi Universitas Brawijaya bersama mitra spesialis terkurasi.
              </h2>
            </Reveal>

            <Reveal delayMs={80}>
              <div
                data-stat-card="projects"
                className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-brand-muted bg-white p-6 min-[480px]:p-7 min-[769px]:flex-row min-[1025px]:p-8 shadow-[0_10px_28px_rgba(37,41,67,0.05)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
              >
                <div className="text-center min-[769px]:text-left">
                  <div className="font-heading text-5xl font-extrabold tracking-tight text-brand-primary min-[1025px]:text-[54px]">
                    {formatStat(0)}
                    <span className="align-super text-2xl font-bold">
                      {STATS[0].suffix}
                    </span>
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-brand-navy">
                    {STATS[0].label}
                  </div>
                  <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-[#525775]">
                    {STATS[0].description}
                  </p>
                </div>
                <div className="max-w-full overflow-hidden">
                  <StatsIllustration id="projects" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Top-Right (4 cols): 5 Tim Inti tall Bento card in Deep Navy + Electric Blue */}
          <Reveal delayMs={140} className="min-[769px]:col-span-4 flex">
            <div
              data-stat-card="clients"
              className="flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#3A4EFB] via-[#2B3EC9] to-[#252943] p-6 pb-0 text-center text-white min-[480px]:p-7 min-[480px]:pb-0 shadow-[0_18px_44px_rgba(58,78,251,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              <div>
                <p className="text-sm font-medium text-white/90">
                  {STATS[1].description}
                </p>
                <div className="mt-5 font-heading text-5xl font-extrabold tracking-tight text-brand-lime min-[1025px]:text-[56px]">
                  {formatStat(1)}
                </div>
                <div className="mt-1 font-heading text-base font-bold text-white">
                  {STATS[1].label}
                </div>
              </div>
              <div className="mt-6 max-w-full">
                <StatsIllustration id="clients" />
              </div>
            </div>
          </Reveal>

          {/* Bottom Row: 3 harmonious Bento cards */}
          <Reveal delayMs={100} className="min-[769px]:col-span-4 flex">
            <div
              data-stat-card="downloads"
              className="flex w-full flex-col justify-between rounded-2xl border border-brand-muted bg-brand-soft p-6 min-[480px]:p-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-heading text-4xl font-extrabold tracking-tight text-brand-primary min-[1025px]:text-[46px]">
                    {formatStat(2)}
                    <span className="align-super text-xl font-bold">
                      {STATS[2].suffix}
                    </span>
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-brand-navy">
                    {STATS[2].label}
                  </div>
                </div>
                <StatsIllustration id="downloads" />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[#454A66]">
                {STATS[2].description}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={180} className="min-[769px]:col-span-4 flex">
            <div
              data-stat-card="ratings"
              className="flex w-full flex-col justify-between rounded-2xl bg-brand-navy p-6 text-white min-[480px]:p-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-heading text-4xl font-extrabold tracking-tight text-brand-sky min-[1025px]:text-[46px]">
                    {formatStat(3)}
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-white">
                    {STATS[3].label}
                  </div>
                </div>
                <StatsIllustration id="ratings" />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                {STATS[3].description}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={260} className="min-[769px]:col-span-4 flex">
            <div
              data-stat-card="retention"
              className="flex w-full flex-col justify-between rounded-2xl bg-brand-lime p-6 text-brand-navy min-[480px]:p-7 shadow-[0_14px_34px_rgba(227,255,59,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-heading text-4xl font-extrabold tracking-tight text-brand-navy min-[1025px]:text-[42px]">
                    {formatStat(4)}
                    <span className="ml-1.5 text-xl font-bold">Hari</span>
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-brand-navy">
                    {STATS[4].label}
                  </div>
                </div>
                <StatsIllustration id="retention" />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-brand-navy/90">
                {STATS[4].description}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
