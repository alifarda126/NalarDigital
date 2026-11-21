import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  detectImageFormatFromBytes,
  filterPortfolios,
  isSafeHttpUrl,
  isSafeImageAssetPath,
  normalizeTechStack,
  sanitizeAssetFileName,
  validateImageUpload,
  validatePortfolioInput,
} from "../src/lib/portfolio-validation.ts";
import type { PortfolioItem } from "../src/types/portfolio.ts";

describe("validatePortfolioInput", () => {
  it("accepts a valid Android Keuangan portfolio with Kotlin & Flutter", () => {
    const result = validatePortfolioInput({
      name: "DompetNalar UMKM",
      clientName: "Koperasi Sejahtera",
      categoryId: "keuangan",
      summary:
        "Aplikasi pencatatan kas harian dan laporan arus kas otomatis untuk UMKM lokal.",
      platforms: ["android", "web"],
      techStack: ["Kotlin", "Flutter", "kotlin", "Next.js"],
      year: 2026,
      demoUrl: "https://demo.nalardigital.id/dompetnalar",
      imageAssetPath: "/assets/portfolio/dompet-nalar.png",
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.deepEqual(result.data.techStack, ["Kotlin", "Flutter", "Next.js"]);
      assert.deepEqual(result.data.platforms, ["android", "web"]);
      assert.equal(result.data.categoryId, "keuangan");
    }
  });

  it("rejects empty required fields and invalid category/platform", () => {
    const result = validatePortfolioInput({
      name: "A",
      clientName: "",
      categoryId: "unknown-category",
      summary: "Pendek",
      platforms: [],
      techStack: [],
      year: 2010,
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.name);
      assert.ok(result.errors.clientName);
      assert.ok(result.errors.categoryId);
      assert.ok(result.errors.summary);
      assert.ok(result.errors.platforms);
      assert.ok(result.errors.techStack);
      assert.ok(result.errors.year);
    }
  });

  it("blocks XSS / unsafe URL schemes and path traversal image paths", () => {
    const result = validatePortfolioInput({
      name: "Aplikasi Jasa",
      clientName: "PT Jasa Maju",
      categoryId: "jasa",
      summary: "Aplikasi booking jasa profesional berbasis mobile Android.",
      platforms: ["android"],
      techStack: ["Kotlin"],
      year: 2026,
      demoUrl: "javascript:alert(1)",
      imageAssetPath: "/assets/portfolio/../../etc/passwd",
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.demoUrl);
      assert.ok(result.errors.imageAssetPath);
    }
  });
});

describe("URL & asset path safety helpers", () => {
  it("accepts only http/https URLs", () => {
    assert.equal(isSafeHttpUrl("https://nalardigital.id"), true);
    assert.equal(isSafeHttpUrl("http://localhost:3000"), true);
    assert.equal(isSafeHttpUrl("javascript:void(0)"), false);
    assert.equal(isSafeHttpUrl("data:text/html,<script>alert(1)</script>"), false);
  });

  it("accepts safe relative asset paths and raster data URLs only", () => {
    assert.equal(isSafeImageAssetPath("/assets/portfolio/demo.png"), true);
    assert.equal(isSafeImageAssetPath("/images/brand/logo-nd-transparent.png"), true);
    assert.equal(
      isSafeImageAssetPath("data:image/png;base64,iVBORw0KGgo="),
      true
    );
    assert.equal(
      isSafeImageAssetPath("data:image/svg+xml;base64,PHN2Zz4="),
      false
    );
    assert.equal(isSafeImageAssetPath("/assets/../secret.png"), false);
  });

  it("normalizes, deduplicates, and caps tech stack tags", () => {
    const tags = normalizeTechStack([
      "  Kotlin ",
      "kotlin",
      "Next.js",
      "",
      "Flutter",
      "TypeScript",
      "Laravel",
      "Go",
      "Python",
      "Swift",
      "ExtraTag9",
    ]);
    assert.equal(tags.length, 8);
    assert.equal(tags[0], "Kotlin");
    assert.equal(tags.includes("ExtraTag9"), false);
  });
});

describe("Image upload magic-byte & filename validation", () => {
  const pngHeader = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  ]);
  const jpegHeader = new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
  ]);
  const webpHeader = new Uint8Array([
    0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
  ]);
  const fakeScript = new TextEncoder().encode("<svg onload=alert(1)>");

  it("detects PNG, JPEG, and WebP magic bytes accurately", () => {
    assert.equal(detectImageFormatFromBytes(pngHeader), "png");
    assert.equal(detectImageFormatFromBytes(jpegHeader), "jpeg");
    assert.equal(detectImageFormatFromBytes(webpHeader), "webp");
    assert.equal(detectImageFormatFromBytes(fakeScript), null);
  });

  it("rejects spoofed PNG files containing HTML/SVG text", () => {
    const res = validateImageUpload(
      { name: "evil.png", type: "image/png", size: fakeScript.length },
      fakeScript
    );
    assert.equal(res.ok, false);
  });

  it("rejects oversized files (> 5 MB)", () => {
    const res = validateImageUpload(
      { name: "huge.png", type: "image/png", size: 6 * 1024 * 1024 },
      pngHeader
    );
    assert.equal(res.ok, false);
  });

  it("accepts valid PNG uploads and sanitizes traversal filenames", () => {
    const res = validateImageUpload(
      { name: "../../My Mockup App!!.PNG", type: "image/png", size: 1024 },
      pngHeader
    );
    assert.equal(res.ok, true);
    const safeName = sanitizeAssetFileName("../../My Mockup App!!.PNG", "png");
    assert.equal(safeName.includes(".."), false);
    assert.equal(safeName.includes("/"), false);
    assert.equal(safeName.endsWith(".png"), true);
    assert.ok(safeName.startsWith("my-mockup-app-"));
  });
});

describe("filterPortfolios", () => {
  const sampleItems: PortfolioItem[] = [
    {
      id: "1",
      slug: "kasnalar",
      name: "KasNalar UMKM",
      clientName: "Koperasi Malang",
      categoryId: "keuangan",
      categoryLabel: "Keuangan & Fintech",
      summary: "Aplikasi pembukuan kas UMKM.",
      platforms: ["android", "web"],
      techStack: ["Kotlin", "Next.js"],
      year: 2026,
      accent: "#3A4EFB",
      secondaryAccent: "#252943",
      surfaceTint: "#33A4FA",
      mockupKind: "finance",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      slug: "jasarapi",
      name: "JasaRapi Pro",
      clientName: "JasaRapi",
      categoryId: "jasa",
      categoryLabel: "Jasa Profesional",
      summary: "Booking teknisi dan jasa rumah.",
      platforms: ["ios"],
      techStack: ["Swift", "Firebase"],
      year: 2026,
      accent: "#33A4FA",
      secondaryAccent: "#1B1E35",
      surfaceTint: "#3A4EFB",
      mockupKind: "service",
      createdAt: "",
      updatedAt: "",
    },
  ];

  it("filters by category, platform, and programming language search", () => {
    assert.equal(
      filterPortfolios(sampleItems, {
        categoryId: "keuangan",
        platform: "all",
        search: "",
      }).length,
      1
    );

    assert.equal(
      filterPortfolios(sampleItems, {
        categoryId: "all",
        platform: "android",
        search: "kotlin",
      }).length,
      1
    );

    assert.equal(
      filterPortfolios(sampleItems, {
        categoryId: "jasa",
        platform: "android",
        search: "",
      }).length,
      0
    );
  });
});
