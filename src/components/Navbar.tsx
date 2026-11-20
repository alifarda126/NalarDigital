"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/data/homepage";
import { NbsLogo } from "./NbsLogo";

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
        ? "text-[#580AC7]"
        : "text-[#454545] hover:text-[#580AC7]"
    }`;

  const activeBar = (section: NavSectionId) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 mx-auto -bottom-0.5 h-[3px] w-6 rounded-full bg-[#580AC7] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        activeSection === section ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
      }`}
    />
  );

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full bg-[#FFFFFF]/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled
          ? "shadow-[0_6px_24px_rgba(17,17,17,0.06)] border-b border-[#EFEFF5]"
          : "border-b border-transparent"
      }`}
    >
      <div className="relative z-50 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 min-[480px]:px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <a href="#home" aria-label="Nalar Digital Beranda" className="shrink-0">
          <NbsLogo variant="light" />
        </a>

        {/* Desktop & Tablet navigation (>768px) */}
        <nav
          aria-label="Primary"
          className="hidden min-[769px]:flex items-center gap-6 min-[1025px]:gap-9"
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
                  ? "text-[#580AC7]"
                  : "text-[#454545] hover:text-[#580AC7]"
              }`}
            >
              LAYANAN
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  dropdownOpen ? "rotate-180 text-[#580AC7]" : ""
                }`}
              />
              {activeBar("services")}
            </button>

            <div
              role="menu"
              aria-hidden={!dropdownOpen}
              aria-label="Menu layanan Nalar Digital"
              className={`absolute left-0 top-full mt-1.5 w-80 origin-top-left rounded-2xl border border-[#ECECF4] bg-[#FFFFFF] p-2 shadow-[0_18px_40px_rgba(17,17,17,0.12)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                  className="flex w-full flex-col rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-[#F4EEFC] touch-manipulation cursor-pointer"
                >
                  <span className="font-heading text-sm font-semibold text-[#000000]">
                    {service.title}
                  </span>
                  <span className="mt-0.5 text-xs text-[#52525B] line-clamp-1">
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

        <div className="hidden min-[769px]:block shrink-0">
          <button
            type="button"
            onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#580AC7] px-4 py-2 font-heading text-[13px] min-[1025px]:px-5 min-[1025px]:text-[13.5px] font-semibold text-[#FFFFFF] shadow-[0_8px_20px_rgba(88,10,199,0.25)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#4707A3] hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation cursor-pointer whitespace-nowrap"
          >
            Konsultasi Gratis →
          </button>
        </div>

        {/* Mobile hamburger (<=768px) */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex min-[769px]:hidden h-11 w-11 items-center justify-center rounded-lg text-[#000000] transition-colors hover:bg-[#F4EEFC] touch-manipulation cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Tap-outside backdrop for mobile drawer */}
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className={`min-[769px]:hidden fixed inset-0 top-16 z-30 bg-[#111111]/20 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      />

      {/* Smooth overlay Mobile drawer (overlays cleanly without shifting page layout) */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`min-[769px]:hidden absolute inset-x-0 top-full z-40 grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen
            ? "visible grid-rows-[1fr] opacity-100 border-t border-[#EFEFF5] pointer-events-auto"
            : "invisible grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden bg-[#FFFFFF] shadow-[0_18px_40px_rgba(17,17,17,0.14)]">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-5 pb-6 pt-3">
            <a
              href="#home"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "home"
                  ? "bg-[#F4EEFC]/75 text-[#580AC7]"
                  : "text-[#000000] hover:bg-[#F4EEFC]/50"
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
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-heading text-sm font-semibold text-[#000000] hover:bg-[#F4EEFC]/50 touch-manipulation cursor-pointer"
              >
                <span>LAYANAN</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180 text-[#580AC7]" : ""
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
                  <div className="ml-3 flex flex-col gap-1 border-l-2 border-[#E4D7FA] pl-3">
                    {SERVICES.map((service, index) => (
                      <button
                        key={service.id}
                        type="button"
                        tabIndex={mobileMenuOpen && mobileServicesOpen ? 0 : -1}
                        onClick={() => handleServicePick(index)}
                        className="rounded-lg px-2.5 py-2.5 text-left font-heading text-xs font-semibold text-[#27272A] hover:bg-[#F4EEFC] hover:text-[#580AC7] touch-manipulation cursor-pointer"
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
              className={`rounded-lg px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "portfolio"
                  ? "bg-[#F4EEFC]/75 text-[#580AC7]"
                  : "text-[#000000] hover:bg-[#F4EEFC]/50"
              }`}
            >
              PORTOFOLIO
            </a>

            <a
              href="#pricing"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "pricing"
                  ? "bg-[#F4EEFC]/75 text-[#580AC7]"
                  : "text-[#000000] hover:bg-[#F4EEFC]/50"
              }`}
            >
              PAKET
            </a>

            <a
              href="#about"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-3 font-heading text-sm font-semibold transition-colors ${
                activeSection === "about"
                  ? "bg-[#F4EEFC]/75 text-[#580AC7]"
                  : "text-[#000000] hover:bg-[#F4EEFC]/50"
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
              className="mt-3 w-full rounded-lg bg-[#580AC7] px-5 py-3 text-center font-heading text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#4707A3] active:scale-[0.98] touch-manipulation cursor-pointer"
            >
              Konsultasi Gratis →
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
