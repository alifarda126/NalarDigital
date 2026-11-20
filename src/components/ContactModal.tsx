"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { PRICING_PACKAGES, SERVICES } from "@/data/homepage";

interface ContactModalProps {
  open: boolean;
  initialTopic: string;
  onClose: () => void;
}

function ContactModalBody({
  initialTopic,
  onClose,
}: {
  initialTopic: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sector, setSector] = useState("Food & Beverage (F&B)");
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#FFFFFF] p-6 shadow-2xl min-[769px]:p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F3F9] text-[#000000] transition-colors hover:bg-[#F4EEFC] hover:text-[#580AC7] cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>

      <h2
        id="contact-modal-title"
        className="pr-8 font-heading text-xl font-bold text-[#000000] min-[480px]:text-2xl"
      >
        Konsultasi &amp; Mini-Audit Gratis
      </h2>
      <p className="mt-1.5 text-sm text-[#52525B]">
        Tim Nalar Digital akan menganalisis kondisi website, branding, dan media sosial bisnis Anda sebelum sesi diskusi.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-[#D9C6FA] bg-[#F4EEFC] p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-[#580AC7]" />
          <h3 className="mt-3 font-heading text-lg font-bold text-[#000000]">
            Permintaan Konsultasi Diterima
          </h3>
          <p className="mt-1.5 text-sm text-[#3F3F46]">
            Terima kasih{name ? `, ${name}` : ""}. Tim Business Development Nalar Digital akan menghubungi Anda terkait{" "}
            <span className="font-semibold text-[#580AC7]">{topic}</span> ({sector}).
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-lg bg-[#580AC7] px-6 py-2.5 font-heading text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#4707A3] cursor-pointer"
          >
            Selesai
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-heading text-xs font-semibold uppercase tracking-wide text-[#27272A]"
            >
              Nama Lengkap / Bisnis
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="cth. Raka Pratama — Kopi Nusantara"
              className="mt-1 w-full rounded-xl border border-[#D4D4D8] px-3.5 py-2.5 text-sm text-[#000000] focus:border-[#580AC7] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5 min-[769px]:grid-cols-2">
            <div>
              <label
                htmlFor="contact-email"
                className="block font-heading text-xs font-semibold uppercase tracking-wide text-[#27272A]"
              >
                Email / WhatsApp Bisnis
              </label>
              <input
                id="contact-email"
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="halo@bisnisanda.id"
                className="mt-1 w-full rounded-xl border border-[#D4D4D8] px-3.5 py-2.5 text-sm text-[#000000] focus:border-[#580AC7] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-sector"
                className="block font-heading text-xs font-semibold uppercase tracking-wide text-[#27272A]"
              >
                Bidang Usaha
              </label>
              <select
                id="contact-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#D4D4D8] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#000000] focus:border-[#580AC7] focus:outline-none"
              >
                <option value="Food & Beverage (F&B)">Food &amp; Beverage (F&B)</option>
                <option value="Klinik Kesehatan">Klinik Kesehatan</option>
                <option value="Jasa Profesional">Jasa Profesional</option>
                <option value="Properti">Properti</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="UMKM / B2B Lainnya">UMKM / B2B Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-topic"
              className="block font-heading text-xs font-semibold uppercase tracking-wide text-[#27272A]"
            >
              Layanan / Paket Diminati
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#D4D4D8] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#000000] focus:border-[#580AC7] focus:outline-none"
            >
              <option value="Discovery & Mini-Audit Gratis">
                Discovery &amp; Mini-Audit Gratis
              </option>
              {PRICING_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.name}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
              {SERVICES.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-heading text-xs font-semibold uppercase tracking-wide text-[#27272A]"
            >
              Ceritakan Kendala / Target Anda
            </label>
            <textarea
              id="contact-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sertakan link website atau Instagram jika ingin langsung diaudit..."
              className="mt-1 w-full rounded-xl border border-[#D4D4D8] px-3.5 py-2.5 text-sm text-[#000000] focus:border-[#580AC7] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#580AC7] py-3 font-heading text-sm font-semibold text-[#FFFFFF] shadow-[0_10px_24px_rgba(88,10,199,0.25)] transition-all duration-200 hover:bg-[#4707A3] active:scale-[0.98] cursor-pointer"
          >
            Kirim Permintaan Konsultasi
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactModal({
  open,
  initialTopic,
  onClose,
}: ContactModalProps) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#111111]/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <ContactModalBody
        key={initialTopic}
        initialTopic={initialTopic}
        onClose={onClose}
      />
    </div>
  );
}
