"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/data/homepage";
import { BrandLogo } from "./BrandLogo";

interface NavbarProps {
  onSelectService: (index: number) => void;
  onOpenContact: (topic?: string) => void;
}

type NavSectionId = "home" | "services" | "portfolio" | "about" | "pricing";

const SCROLL_SPY_SECTIONS: NavSectionId[] = [
  "home",
  "services",
  "portfolio",
  "about",
  "pricing",
];

export function Navbar({ onSelectService, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOnScroll = () => {
      setScrolled(window.scrollY > 8);

      const probeY = window.scrollY + 140;
      let current: NavSectionId = "home";
      for (const id of SCROLL_SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probeY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateOnScroll();
    window.addEventListener("scroll", updateOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateOnScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleServicePick = (index: number) => {
    onSelectService(index);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkClass = (section: NavSectionId) =>
    `relative py-2 font-heading text-[13.5px] font-medium tracking-wide transition-colors duration-200 ${
      activeSection === section
        ? "text-brand-primary"
        : "text-[#525775] hover:text-brand-primary"
    }`;

  const activeBar = (section: NavSectionId) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 mx-auto -bottom-0.5 h-[3px] w-6 rounded-full bg-brand-gradient transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        activeSection === section ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
      }`}
    />
  );

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled
          ? "shadow-[0_8px_28px_rgba(37,41,67,0.08)] border-b border-brand-muted/80"
          : "border-b border-transparent"
      }`}
    >
      <div className="relative z-50 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 min-[480px]:px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <a
          href="#home"
          aria-label="Nalar Digital Beranda"
          className="shrink-0 transition-opacity hover:opacity-90"
        >
          <BrandLogo variant="light" size="md" />
        </a>

        {/* Desktop navigation (>=900px) — purely public landing page links */}
        <nav
          aria-label="Primary"
          className="hidden min-[900px]:flex items-center gap-6 min-[1025px]:gap-9"
        >
          <a href="#home" className={navLinkClass("home")}>
            HOME
            {activeBar("home")}
          </a>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 py-2 font-heading text-[13.5px] font-medium tracking-wide transition-colors duration-200 touch-manipulation cursor-pointer ${
                activeSection === "services" || dropdownOpen
                  ? "text-brand-primary"
                  : "text-[#525775] hover:text-brand-primary"
              }`}
            >
              LAYANAN
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  dropdownOpen ? "rotate-180 text-brand-primary" : ""
                }`}
              />
              {activeBar("services")}
            </button>

            <div
              role="menu"
              aria-hidden={!dropdownOpen}
              aria-label="Menu layanan Nalar Digital"
              className={`absolute left-0 top-full mt-1.5 w-80 origin-top-left rounded-2xl border border-brand-muted bg-white p-2 shadow-[0_18px_40px_rgba(37,41,67,0.14)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                dropdownOpen
                  ? "visible opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "invisible opacity-0 -translate-y-2 scale-[0.98] pointer-events-none"
              }`}
            >
              {SERVICES.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  role="menuitem"
                  tabIndex={dropdownOpen ? 0 : -1}
                  onClick={() => handleServicePick(index)}
                  className="flex w-full flex-col rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-brand-soft touch-manipulation cursor-pointer"
                >
                  <span className="font-heading text-sm font-semibold text-brand-navy">
                    {service.title}
                  </span>
                  <span className="mt-0.5 text-xs text-[#525775] line-clamp-1">
                    {service.shortDesc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <a href="#portfolio" className={navLinkClass("portfolio")}>
            PORTOFOLIO
            {activeBar("portfolio")}
          </a>

          <a href="#pricing" className={navLinkClass("pricing")}>
            PAKET
            {activeBar("pricing")}
          </a>

          <a href="#about" className={navLinkClass("about")}>
            TENTANG
            {activeBar("about")}
          </a>
        </nav>

        <div className="hidden min-[900px]:block shrink-0">
          <button
            type="button"
            onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-brand-gradient px-4 py-2 font-heading text-[13px] min-[1025px]:px-5 min-[1025px]:text-[13.5px] font-semibold text-white shadow-[0_10px_24px_rgba(58,78,251,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(58,78,251,0.35)] active:scale-[0.98] touch-manipulation cursor-pointer whitespace-nowrap"
          >
            Konsultasi Gratis →
          </button>
        </div>

        {/* Mobile & Tablet hamburger (<900px) */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex min-[900px]:hidden h-11 w-11 items-center justify-center rounded-xl text-brand-navy transition-colors hover:bg-brand-soft touch-manipulation cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Tap-outside backdrop for mobile drawer */}
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className={`min-[900px]:hidden fixed inset-0 top-16 z-30 bg-brand-navy/25 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      />

      {/* Smooth overlay Mobile drawer */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`min-[900px]:hidden absolute inset-x-0 top-full z-40 grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen
            ? "visible grid-rows-[1fr] opacity-100 border-t border-brand-muted pointer-events-auto"
            : "invisible grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden bg-white shadow-[0_18px_40px_rgba(37,41,67,0.16)]">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 px-5 pb-6 pt-3"
          >
            <a
              href="#home"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "home"
                  ? "bg-brand-soft text-brand-primary"
                  : "text-brand-navy hover:bg-brand-soft/60"
              }`}
            >
              HOME
            </a>

            <div>
              <button
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-heading text-sm font-semibold text-brand-navy hover:bg-brand-soft/60 touch-manipulation cursor-pointer"
              >
                <span>LAYANAN</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180 text-brand-primary" : ""
                  }`}
                />
              </button>
              <div
                aria-hidden={!mobileServicesOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileServicesOpen
                    ? "visible grid-rows-[1fr] opacity-100 mt-1 pointer-events-auto"
                    : "invisible grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-3 flex flex-col gap-1 border-l-2 border-brand-muted pl-3">
                    {SERVICES.map((service, index) => (
                      <button
                        key={service.id}
                        type="button"
                        tabIndex={mobileMenuOpen && mobileServicesOpen ? 0 : -1}
                        onClick={() => handleServicePick(index)}
                        className="rounded-lg px-2.5 py-2.5 text-left font-heading text-xs font-semibold text-brand-navy hover:bg-brand-soft hover:text-brand-primary touch-manipulation cursor-pointer"
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#portfolio"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "portfolio"
                  ? "bg-brand-soft text-brand-primary"
                  : "text-brand-navy hover:bg-brand-soft/60"
              }`}
            >
              PORTOFOLIO
            </a>

            <a
              href="#pricing"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "pricing"
                  ? "bg-brand-soft text-brand-primary"
                  : "text-brand-navy hover:bg-brand-soft/60"
              }`}
            >
              PAKET
            </a>

            <a
              href="#about"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "about"
                  ? "bg-brand-soft text-brand-primary"
                  : "text-brand-navy hover:bg-brand-soft/60"
              }`}
            >
              TENTANG
            </a>

            <button
              type="button"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact("Discovery & Mini-Audit Gratis");
              }}
              className="mt-3 w-full rounded-xl bg-brand-gradient px-5 py-3 text-center font-heading text-sm font-semibold text-white transition-all active:scale-[0.98] touch-manipulation cursor-pointer"
            >
              Konsultasi Gratis →
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
