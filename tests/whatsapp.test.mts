import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildConsultationWhatsAppMessage,
  buildPortfolioWhatsAppMessage,
  buildWhatsAppUrl,
} from "../src/lib/whatsapp.ts";

describe("WhatsApp direct chat helpers", () => {
  it("builds portfolio inquiry message with project name", () => {
    const msg = buildPortfolioWhatsAppMessage(
      "MoneFlo — Manajemen Keuangan Organisasi"
    );
    assert.equal(
      msg,
      'Halo Nalar Digital, saya ingin buat project seperti "MoneFlo — Manajemen Keuangan Organisasi". Bisa diskusi lebih lanjut?'
    );
  });

  it("builds consultation messages for default and custom topics", () => {
    const defaultMsg = buildConsultationWhatsAppMessage();
    assert.ok(defaultMsg.includes("Mini-Audit Gratis"));

    const pkgMsg = buildConsultationWhatsAppMessage("Paket All-in-One");
    assert.ok(pkgMsg.includes("Paket All-in-One"));
  });

  it("encodes wa.me URL cleanly with digits-only phone number", () => {
    const url = buildWhatsAppUrl(
      'Halo Nalar Digital, saya ingin buat project seperti "MoneFlo".',
      "+62 812-3456-7890"
    );
    assert.ok(url.startsWith("https://wa.me/6281234567890?text="));
    assert.equal(
      decodeURIComponent(url.split("?text=")[1]),
      'Halo Nalar Digital, saya ingin buat project seperti "MoneFlo".'
    );
  });
});
