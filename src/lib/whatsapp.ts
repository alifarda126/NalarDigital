/**
 * Centralized WhatsApp direct-chat configuration & URL builders for Nalar Digital.
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (digits only with country code, e.g. 6281234567890)
 * or edit DEFAULT_WHATSAPP_NUMBER below.
 */
export const DEFAULT_WHATSAPP_NUMBER = "6281200000000";

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
  const digits = raw.replace(/\D/g, "");
  return digits || DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppUrl(message: string, phoneNumber?: string): string {
  const target = (phoneNumber || getWhatsAppNumber()).replace(/\D/g, "");
  return `https://wa.me/${target}?text=${encodeURIComponent(message.trim())}`;
}

export function buildPortfolioWhatsAppMessage(projectName: string): string {
  return `Halo Nalar Digital, saya ingin buat project seperti "${projectName}". Bisa diskusi lebih lanjut?`;
}

export function buildConsultationWhatsAppMessage(topic?: string): string {
  const cleaned = topic?.trim();
  if (!cleaned || cleaned === "Discovery & Mini-Audit Gratis") {
    return "Halo Nalar Digital, saya ingin konsultasi dan minta Discovery & Mini-Audit Gratis untuk bisnis saya.";
  }
  return `Halo Nalar Digital, saya ingin konsultasi terkait ${cleaned}. Bisa diskusi lebih lanjut?`;
}

export function openWhatsAppChat(message: string): void {
  if (typeof window === "undefined") return;
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
