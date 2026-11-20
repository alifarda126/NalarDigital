"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
      className="relative overflow-x-clip bg-[#FBFBFB] pt-8 pb-12 min-[480px]:pt-10 min-[480px]:pb-14 min-[769px]:pt-12 min-[769px]:pb-16 min-[1025px]:pt-14 min-[1025px]:pb-20"
    >
      {/* Diagonal peach (#FCEBE6) & soft purple (#F4EEFC) pill accent behind hero headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 left-6 h-24 w-72 -rotate-[38deg] rounded-full bg-[#FCEBE6] opacity-90 min-[769px]:top-10 min-[769px]:left-4 min-[1025px]:top-12 min-[1025px]:left-16 min-[1025px]:h-28 min-[1025px]:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 left-24 h-20 w-56 rotate-[18deg] rounded-full bg-[#F4EEFC] opacity-85 min-[1025px]:top-24 min-[1025px]:left-48"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-5 min-[769px]:grid-cols-12 min-[769px]:gap-8 min-[769px]:px-8 min-[1025px]:gap-14 min-[1025px]:px-10">
        {/* Left column: Tagline + Typing headline + body copy + CTAs */}
        <div className="text-center min-[769px]:col-span-6 min-[769px]:text-left">
          <div className="mb-4 inline-flex items-center rounded-full border border-[#E4D7FA] bg-[#F4EEFC] px-3.5 py-1.5 font-heading text-[11.5px] min-[480px]:text-xs font-semibold tracking-wide text-[#580AC7]">
            {HERO_TAGLINE}
          </div>

          <div className="relative">
            <h1
              aria-label={HERO_HEADLINE}
              className="relative font-heading text-[26px] leading-[1.28] font-bold tracking-tight text-[#580AC7] min-[480px]:text-[28px] min-[769px]:text-[32px] min-[769px]:leading-[1.28] min-[1025px]:text-[40px] min-[1025px]:leading-[1.3]"
            >
              {/* Invisible full text reserves exact height to eliminate layout shift during typing */}
              <span aria-hidden="true" className="invisible select-none">
                {HERO_HEADLINE}
              </span>
              <span aria-hidden="true" className="absolute inset-0 block">
                {typedText}
                <span
                  className={`ml-0.5 inline-block h-[0.82em] w-[3px] translate-y-[2px] rounded-full bg-[#580AC7] ${
                    typingDone ? "animate-caret" : ""
                  }`}
                />
              </span>
            </h1>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-[1.78] text-[#000000] min-[480px]:text-[15px] min-[769px]:mx-0 min-[1025px]:text-[15.5px]">
            {HERO_SUBCOPY}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 min-[480px]:gap-3.5 min-[769px]:mt-8 min-[769px]:justify-start">
            <a
              href="#trust"
              className="inline-flex min-h-[46px] w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-lg bg-[#580AC7] px-6 py-3 font-heading text-sm font-semibold text-[#FFFFFF] shadow-[0_12px_28px_rgba(88,10,199,0.26)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#4707A3] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Pelajari Layanan Kami ↓
            </a>
            <button
              type="button"
              onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
              className="inline-flex min-h-[46px] w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-lg border border-[#580AC7]/35 bg-[#FFFFFF] px-5 py-3 font-heading text-sm font-semibold text-[#580AC7] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#580AC7] hover:bg-[#F4EEFC] active:scale-[0.98] cursor-pointer"
            >
              Minta Mini-Audit Gratis
            </button>
          </div>
        </div>

        {/* Right column: Generous studio team photograph with subtle concentric ripple rings */}
        <div className="relative min-[769px]:col-span-6">
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute top-1/2 -left-16 h-64 w-64 -translate-y-1/2 rounded-full border-[14px] border-[#F4EEFC]/90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none hidden min-[1025px]:block absolute top-1/2 -left-8 h-48 w-48 -translate-y-1/2 rounded-full border-[12px] border-[#FCEBE6]/70"
          />
          <div className="relative overflow-hidden rounded-xl border border-[#ECECF4] bg-[#FFFFFF] shadow-[0_24px_60px_rgba(17,17,17,0.1)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_70px_rgba(88,10,199,0.14)]">
            <Image
              src="/images/hero-team.jpg"
              alt="Tim Nalar Digital berdiskusi merancang UI/UX dan pengembangan aplikasi"
              width={1200}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover aspect-[4/3] min-[1025px]:aspect-[4/3.55]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
