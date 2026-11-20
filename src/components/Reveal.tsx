"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/** Smooth GPU-composited scroll-triggered fade-up container. */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible && delayMs ? `${delayMs}ms` : "0ms" }}
      className={`${visible ? "reveal-visible" : "reveal-hidden"} ${className}`}
    >
      {children}
    </div>
  );
}
