"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { HERO_HEADLINE, HERO_SUBCOPY, HERO_TAGLINE } from "@/data/homepage";

interface HeroSectionProps {
  onOpenContact: (topic?: string) => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [charCount, setCharCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const timerId = window.setTimeout(() => {
        setCharCount(HERO_HEADLINE.length);
        setTypingDone(true);
      }, 0);
      return () => window.clearTimeout(timerId);
    }

    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setCharCount(current);
      if (current >= HERO_HEADLINE.length) {
        window.clearInterval(interval);
        setTypingDone(true);
      }
    }, 24);

    return () => window.clearInterval(interval);
  }, []);

  const typedText = HERO_HEADLINE.slice(0, charCount);

  return (
    <section
      id="home"
      className="relative overflow-x-clip bg-brand-canvas pt-8 pb-12 min-[480px]:pt-10 min-[480px]:pb-14 min-[769px]:pt-12 min-[769px]:pb-16 min-[1025px]:pt-14 min-[1025px]:pb-20"
    >
      {/* Subtle geometric accents derived from palette (#DEE0ED, #33A4FA, #E3FF3B) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-4 h-28 w-72 -rotate-[28deg] rounded-full bg-brand-muted/70 opacity-85 min-[1025px]:top-12 min-[1025px]:left-16 min-[1025px]:h-32 min-[1025px]:w-84"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 left-24 h-20 w-56 rotate-[16deg] rounded-full bg-brand-sky/15 min-[1025px]:top-24 min-[1025px]:left-48"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden min-[1025px]:block absolute bottom-8 right-12 h-24 w-24 rounded-3xl rotate-12 bg-brand-lime/45"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-5 min-[769px]:grid-cols-12 min-[769px]:gap-8 min-[769px]:px-8 min-[1025px]:gap-14 min-[1025px]:px-10">
        {/* Left column: Tagline + Typing headline + body copy + CTAs */}
        <div className="text-center min-[769px]:col-span-6 min-[769px]:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-brand-navy px-3.5 py-1.5 font-heading text-[11.5px] min-[480px]:text-xs font-semibold tracking-wide text-white shadow-[0_8px_20px_rgba(37,41,67,0.14)]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-lime text-brand-navy">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
            <span>{HERO_TAGLINE}</span>
          </div>

          <div className="relative">
            <h1
              aria-label={HERO_HEADLINE}
              className="relative font-heading text-[26px] leading-[1.28] font-bold tracking-tight text-brand-navy min-[480px]:text-[28px] min-[769px]:text-[32px] min-[769px]:leading-[1.28] min-[1025px]:text-[40px] min-[1025px]:leading-[1.28]"
            >
              {/* Invisible full text reserves exact height to eliminate layout shift during typing */}
              <span aria-hidden="true" className="invisible select-none">
                {HERO_HEADLINE}
              </span>
              <span aria-hidden="true" className="absolute inset-0 block">
                <span className="text-brand-gradient">{typedText}</span>
                <span
                  className={`ml-0.5 inline-block h-[0.82em] w-[3px] translate-y-[2px] rounded-full bg-brand-primary ${
                    typingDone ? "animate-caret" : ""
                  }`}
                />
              </span>
            </h1>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-[1.78] text-[#454A66] min-[480px]:text-[15px] min-[769px]:mx-0 min-[1025px]:text-[15.5px]">
            {HERO_SUBCOPY}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 min-[480px]:gap-3.5 min-[769px]:mt-8 min-[769px]:justify-start">
            <a
              href="#trust"
              className="inline-flex min-h-[46px] w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_12px_28px_rgba(58,78,251,0.3)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(58,78,251,0.36)] active:scale-[0.98]"
            >
              Pelajari Layanan Kami ↓
            </a>
            <button
              type="button"
              onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
              className="inline-flex min-h-[46px] w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-xl border border-brand-navy/20 bg-white px-5 py-3 font-heading text-sm font-semibold text-brand-navy transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-primary hover:bg-brand-soft hover:text-brand-primary active:scale-[0.98] cursor-pointer"
            >
              Minta Mini-Audit Gratis
            </button>
          </div>
        </div>

        {/* Right column: Studio photograph framed with electric blue & lime accents */}
        <div className="relative min-[769px]:col-span-6">
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute top-1/2 -left-16 h-64 w-64 -translate-y-1/2 rounded-full border-[14px] border-brand-muted/80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute top-1/2 -left-8 h-48 w-48 -translate-y-1/2 rounded-full border-[12px] border-brand-sky/25"
          />
          <div className="relative overflow-hidden rounded-2xl border border-brand-muted bg-white p-1.5 shadow-[0_24px_60px_rgba(37,41,67,0.12)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_70px_rgba(58,78,251,0.18)]">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/images/hero-team.jpg"
                alt="Tim Nalar Digital berdiskusi merancang UI/UX dan pengembangan aplikasi"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full object-cover aspect-[4/3] min-[1025px]:aspect-[4/3.55]"
              />
              {/* Floating metric pill inspired by the color palette UI card */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-xl bg-brand-navy/90 px-3.5 py-2.5 text-white backdrop-blur-md min-[480px]:right-auto min-[480px]:px-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-lime font-heading text-xs font-extrabold text-brand-navy">
                    ND
                  </span>
                  <div className="text-left">
                    <p className="font-heading text-xs font-bold leading-tight text-white">
                      Build &amp; Grow Ecosystem
                    </p>
                    <p className="text-[11px] text-brand-muted">
                      Malang • D3 TI Universitas Brawijaya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
