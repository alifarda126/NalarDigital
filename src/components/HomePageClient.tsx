"use client";

import { useState } from "react";
import {
  buildConsultationWhatsAppMessage,
  openWhatsAppChat,
} from "@/lib/whatsapp";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import { HappyClientsSection } from "./HappyClientsSection";
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { PortfolioSection } from "./PortfolioSection";
import { ServicesSection } from "./ServicesSection";
import { StatsSection } from "./StatsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { TrustStrip } from "./TrustStrip";
import { WhatsAppWidget } from "./WhatsAppWidget";

export function HomePageClient() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const handleOpenContact = (topic = "Discovery & Mini-Audit Gratis") => {
    openWhatsAppChat(buildConsultationWhatsAppMessage(topic));
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-canvas text-brand-navy">
      {/* 1. Navbar */}
      <Navbar
        onSelectService={setActiveServiceIndex}
        onOpenContact={handleOpenContact}
      />

      <main className="flex-1">
        {/* 2. Hero */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* 3. Sektor Target (UMKM & B2B) */}
        <TrustStrip />

        {/* 4. Layanan Build & Grow */}
        <ServicesSection
          activeIndex={activeServiceIndex}
          onSelectIndex={setActiveServiceIndex}
          onDiscoverMore={handleOpenContact}
        />

        {/* 5. Portofolio Showcase (dikelola manual via src/data/portfolios.json) */}
        <PortfolioSection />

        {/* 6. Statistik & Keunggulan Nalar Digital */}
        <StatsSection />

        {/* 7. Pilihan Paket & Harga */}
        <HappyClientsSection onOpenContact={handleOpenContact} />

        {/* 8. Alur Kerja & Tim Inti */}
        <TestimonialsSection />

        {/* 9. CTA Mini-Audit Gratis */}
        <CtaSection onOpenContact={handleOpenContact} />
      </main>

      {/* 10. Floating WhatsApp widget */}
      <WhatsAppWidget />

      {/* 11. Footer */}
      <Footer
        onSelectService={setActiveServiceIndex}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
