"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Code2,
  Download,
  ImagePlus,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  APP_CATEGORIES,
  CATEGORY_BY_ID,
  getSuggestedTechForPlatforms,
  PLATFORM_OPTIONS,
} from "@/config/portfolio-taxonomy";
import {
  filterPortfolios,
  PORTFOLIO_LIMITS,
  validatePortfolioInput,
} from "@/lib/portfolio-validation";
import type {
  AppCategoryId,
  AssetItem,
  PlatformId,
  PortfolioInput,
  PortfolioItem,
  StorageMode,
} from "@/types/portfolio";
import { PlatformIcon } from "../PlatformIcon";
import { PortfolioMockup } from "../PortfolioMockup";

interface PortfolioManagerTabProps {
  portfolios: PortfolioItem[];
  assets: AssetItem[];
  storageMode: StorageMode;
  preselectedAssetUrl: string | null;
  onConsumePreselectedAsset: () => void;
  onSavePortfolio: (
    input: PortfolioInput,
    isEdit: boolean
  ) => Promise<{
    ok: boolean;
    error?: string;
    errors?: Record<string, string>;
  }>;
  onDeletePortfolio: (id: string) => Promise<{ ok: boolean; error?: string }>;
  onUploadAsset: (
    file: File
  ) => Promise<{ ok: boolean; data?: AssetItem; error?: string }>;
  onExportJson: () => void;
  onImportJson: (
    rawJson: string
  ) => Promise<{ ok: boolean; data?: number; error?: string }>;
  onResetDefaults: () => Promise<void>;
  onNotify: (type: "success" | "error", message: string) => void;
}

interface FormState {
  id?: string;
  name: string;
  clientName: string;
  categoryId: AppCategoryId;
  summary: string;
  platforms: PlatformId[];
  techStack: string[];
  year: number;
  featured: boolean;
  imageAssetPath: string;
  demoUrl: string;
}

function createInitialForm(preselectedAssetUrl?: string | null): FormState {
  return {
    name: "",
    clientName: "",
    categoryId: "keuangan",
    summary: "",
    platforms: ["android"],
    techStack: ["Kotlin"],
    year: new Date().getFullYear(),
    featured: false,
    imageAssetPath: preselectedAssetUrl ?? "",
    demoUrl: "",
  };
}

export function PortfolioManagerTab({
  portfolios,
  assets,
  storageMode,
  preselectedAssetUrl,
  onConsumePreselectedAsset,
  onSavePortfolio,
  onDeletePortfolio,
  onUploadAsset,
  onExportJson,
  onImportJson,
  onResetDefaults,
  onNotify,
}: PortfolioManagerTabProps) {
  const [form, setForm] = useState<FormState>(() =>
    createInitialForm(preselectedAssetUrl)
  );
  const [customTechInput, setCustomTechInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [listSearch, setListSearch] = useState("");
  const [listCategory, setListCategory] = useState<AppCategoryId | "all">("all");
  const importInputRef = useRef<HTMLInputElement>(null);
  const inlineFileRef = useRef<HTMLInputElement>(null);

  // Initial form picks up preselectedAssetUrl on mount via key in AssetsStudioClient.
  void onConsumePreselectedAsset;

  const isEditing = Boolean(form.id);

  const suggestedTechs = useMemo(
    () => getSuggestedTechForPlatforms(form.platforms),
    [form.platforms]
  );

  const portfolioAssets = useMemo(
    () => assets.filter((a) => a.folder === "portfolio" || a.folder === "general"),
    [assets]
  );

  const filteredPortfolios = useMemo(
    () =>
      filterPortfolios(portfolios, {
        categoryId: listCategory,
        platform: "all",
        search: listSearch,
      }),
    [portfolios, listCategory, listSearch]
  );

  const previewItem: PortfolioItem = useMemo(() => {
    const cat = CATEGORY_BY_ID[form.categoryId];
    return {
      id: form.id ?? "preview",
      slug: "preview",
      name: form.name.trim() || "Nama Aplikasi Anda",
      clientName: form.clientName.trim() || "Nama Klien / Mitra",
      categoryId: form.categoryId,
      categoryLabel: cat.label,
      summary:
        form.summary.trim() ||
        "Ringkasan solusi, dampak bisnis, dan fitur utama proyek akan tampil di sini.",
      platforms: form.platforms.length > 0 ? form.platforms : ["android"],
      techStack: form.techStack.length > 0 ? form.techStack : ["Kotlin"],
      year: form.year,
      featured: form.featured,
      imageAssetPath: form.imageAssetPath || undefined,
      demoUrl: form.demoUrl || undefined,
      accent: cat.accent,
      secondaryAccent: cat.secondaryAccent,
      surfaceTint: cat.surfaceTint,
      mockupKind: cat.mockupKind,
      createdAt: "",
      updatedAt: "",
    };
  }, [form]);

  const togglePlatform = (platformId: PlatformId) => {
    setForm((prev) => {
      const exists = prev.platforms.includes(platformId);
      const nextPlatforms = exists
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId];
      return { ...prev, platforms: nextPlatforms };
    });
    setFieldErrors((prev) => ({ ...prev, platforms: "" }));
  };

  const toggleTech = (tech: string) => {
    setForm((prev) => {
      const exists = prev.techStack.some(
        (t) => t.toLowerCase() === tech.toLowerCase()
      );
      if (exists) {
        return {
          ...prev,
          techStack: prev.techStack.filter(
            (t) => t.toLowerCase() !== tech.toLowerCase()
          ),
        };
      }
      if (prev.techStack.length >= PORTFOLIO_LIMITS.MAX_TECH_TAGS) {
        onNotify(
          "error",
          `Maksimal ${PORTFOLIO_LIMITS.MAX_TECH_TAGS} bahasa/tech stack per portofolio.`
        );
        return prev;
      }
      return { ...prev, techStack: [...prev.techStack, tech] };
    });
    setFieldErrors((prev) => ({ ...prev, techStack: "" }));
  };

  const handleAddCustomTech = () => {
    const cleaned = customTechInput.trim().replace(/\s+/g, " ");
    if (!cleaned) return;
    if (cleaned.length > PORTFOLIO_LIMITS.MAX_TECH_TAG_LENGTH) {
      setFieldErrors((prev) => ({
        ...prev,
        techStack: `Nama bahasa/tech maksimal ${PORTFOLIO_LIMITS.MAX_TECH_TAG_LENGTH} karakter.`,
      }));
      return;
    }
    if (
      form.techStack.some((t) => t.toLowerCase() === cleaned.toLowerCase())
    ) {
      setCustomTechInput("");
      return;
    }
    if (form.techStack.length >= PORTFOLIO_LIMITS.MAX_TECH_TAGS) {
      onNotify(
        "error",
        `Maksimal ${PORTFOLIO_LIMITS.MAX_TECH_TAGS} bahasa/tech stack per portofolio.`
      );
      return;
    }
    setForm((prev) => ({ ...prev, techStack: [...prev.techStack, cleaned] }));
    setCustomTechInput("");
    setFieldErrors((prev) => ({ ...prev, techStack: "" }));
  };

  const handleInlineUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingInline(true);
    const res = await onUploadAsset(file);
    setUploadingInline(false);
    event.target.value = "";

    if (!res.ok || !res.data) {
      onNotify("error", res.error ?? "Gagal mengunggah asset gambar.");
      return;
    }
    setForm((prev) => ({ ...prev, imageAssetPath: res.data!.url }));
    onNotify("success", `Asset "${res.data.name}" diunggah & langsung dipilih.`);
  };

  const handleEditStart = (item: PortfolioItem) => {
    setForm({
      id: item.id,
      name: item.name,
      clientName: item.clientName,
      categoryId: item.categoryId,
      summary: item.summary,
      platforms: [...item.platforms],
      techStack: [...item.techStack],
      year: item.year,
      featured: Boolean(item.featured),
      imageAssetPath: item.imageAssetPath ?? "",
      demoUrl: item.demoUrl ?? "",
    });
    setFieldErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setForm(createInitialForm());
    setFieldErrors({});
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload: PortfolioInput = {
      id: form.id,
      name: form.name,
      clientName: form.clientName,
      categoryId: form.categoryId,
      summary: form.summary,
      platforms: form.platforms,
      techStack: form.techStack,
      year: Number(form.year),
      featured: form.featured,
      imageAssetPath: form.imageAssetPath || undefined,
      demoUrl: form.demoUrl || undefined,
    };

    const clientCheck = validatePortfolioInput(payload);
    if (!clientCheck.ok) {
      setFieldErrors(clientCheck.errors);
      onNotify("error", "Mohon lengkapi data yang masih kurang pada formulir.");
      return;
    }

    setSubmitting(true);
    const res = await onSavePortfolio(clientCheck.data, isEditing);
    setSubmitting(false);

    if (!res.ok) {
      if (res.errors) setFieldErrors(res.errors);
      onNotify("error", res.error ?? "Gagal menyimpan portofolio.");
      return;
    }

    setFieldErrors({});
    setForm(createInitialForm());
    onNotify(
      "success",
      isEditing
        ? `Portofolio "${payload.name}" berhasil diperbarui.`
        : `Portofolio "${payload.name}" berhasil ditambahkan dan langsung tayang di beranda.`
    );
  };

  const handleDelete = async (id: string, name: string) => {
    const res = await onDeletePortfolio(id);
    setConfirmDeleteId(null);
    if (!res.ok) {
      onNotify("error", res.error ?? "Gagal menghapus portofolio.");
      return;
    }
    if (form.id === id) {
      setForm(createInitialForm());
    }
    onNotify("success", `Portofolio "${name}" telah dihapus.`);
  };

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rawText = await file.text();
      const res = await onImportJson(rawText);
      if (!res.ok) {
        onNotify("error", res.error ?? "Gagal mengimpor file JSON.");
      } else {
        onNotify(
          "success",
          `Berhasil mengimpor ${res.data ?? 0} data portofolio.`
        );
      }
    } catch {
      onNotify("error", "File JSON tidak dapat dibaca.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Grid: Form (7 cols) + Live Preview (5 cols) */}
      <div className="grid grid-cols-1 gap-7 min-[1025px]:grid-cols-12">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-7 min-[1025px]:col-span-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-muted/70 pb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-navy min-[480px]:text-xl">
                {isEditing ? "Edit Portofolio" : "Tambah Portofolio Baru"}
              </h2>
              <p className="mt-0.5 text-xs text-[#525775]">
                Atur bidang aplikasi (Keuangan, Jasa, F&amp;B, dll.), platform target, bahasa pemrograman, dan asset visual.
              </p>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-muted px-3 py-1.5 font-heading text-xs font-semibold text-brand-navy hover:bg-brand-soft cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                Batal Edit
              </button>
            )}
          </div>

          <div className="mt-5 space-y-5">
            {/* Row 1: Name & Client */}
            <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
              <div>
                <label
                  htmlFor="pf-name"
                  className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
                >
                  Nama Aplikasi / Proyek *
                </label>
                <input
                  id="pf-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, name: e.target.value }));
                    setFieldErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="cth. DompetUMKM — Aplikasi Kas"
                  className="mt-1.5 w-full rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2.5 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs font-medium text-[#DC2626]">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pf-client"
                  className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
                >
                  Nama Klien / Mitra *
                </label>
                <input
                  id="pf-client"
                  type="text"
                  value={form.clientName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, clientName: e.target.value }));
                    setFieldErrors((prev) => ({ ...prev, clientName: "" }));
                  }}
                  placeholder="cth. CV Maju Jaya Malang"
                  className="mt-1.5 w-full rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2.5 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
                {fieldErrors.clientName && (
                  <p className="mt-1 text-xs font-medium text-[#DC2626]">
                    {fieldErrors.clientName}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Category & Year */}
            <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-12">
              <div className="min-[640px]:col-span-8">
                <label
                  htmlFor="pf-category"
                  className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
                >
                  Aplikasi Tentang Apa? (Bidang / Kategori) *
                </label>
                <select
                  id="pf-category"
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      categoryId: e.target.value as AppCategoryId,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-brand-muted bg-white px-3.5 py-2.5 text-sm font-medium text-brand-navy focus:border-brand-primary focus:outline-none"
                >
                  {APP_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label} — {category.description}
                    </option>
                  ))}
                </select>
                {fieldErrors.categoryId && (
                  <p className="mt-1 text-xs font-medium text-[#DC2626]">
                    {fieldErrors.categoryId}
                  </p>
                )}
              </div>

              <div className="min-[640px]:col-span-4">
                <label
                  htmlFor="pf-year"
                  className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
                >
                  Tahun *
                </label>
                <input
                  id="pf-year"
                  type="number"
                  min={PORTFOLIO_LIMITS.MIN_YEAR}
                  max={PORTFOLIO_LIMITS.MAX_YEAR}
                  value={form.year}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      year: Number(e.target.value) || new Date().getFullYear(),
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2.5 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
                {fieldErrors.year && (
                  <p className="mt-1 text-xs font-medium text-[#DC2626]">
                    {fieldErrors.year}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Platforms multi-select */}
            <div>
              <span className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy">
                Platform Target *
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2.5 min-[640px]:grid-cols-4">
                {PLATFORM_OPTIONS.map((platform) => {
                  const selected = form.platforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      aria-pressed={selected}
                      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left font-heading text-xs font-bold transition-all cursor-pointer ${
                        selected
                          ? "border-brand-primary bg-brand-primary text-white shadow-[0_8px_18px_rgba(58,78,251,0.24)]"
                          : "border-brand-muted bg-brand-canvas/60 text-brand-navy hover:border-brand-sky"
                      }`}
                    >
                      <span>{platform.label}</span>
                      {selected && <Check className="h-3.5 w-3.5 shrink-0 text-brand-lime" />}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.platforms && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.platforms}
                </p>
              )}
            </div>

            {/* Row 4: Programming Languages & Tech Stack */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-brand-navy">
                  <Code2 className="h-3.5 w-3.5 text-brand-primary" />
                  Bahasa Pemrograman &amp; Tech Stack *
                </span>
                <span className="text-[11px] font-medium text-[#525775]">
                  {form.techStack.length}/{PORTFOLIO_LIMITS.MAX_TECH_TAGS} dipilih
                </span>
              </div>

              {/* Selected tags */}
              {form.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-navy px-3 py-1 font-heading text-xs font-semibold text-brand-lime"
                    >
                      {tech}
                      <button
                        type="button"
                        aria-label={`Hapus ${tech}`}
                        onClick={() => toggleTech(tech)}
                        className="rounded-full p-0.5 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Contextual quick-pick chips based on selected platforms */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {suggestedTechs.map((tech) => {
                  const active = form.techStack.some(
                    (t) => t.toLowerCase() === tech.toLowerCase()
                  );
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`rounded-lg border px-2.5 py-1 font-heading text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? "border-brand-primary bg-brand-soft text-brand-primary"
                          : "border-brand-muted bg-white text-[#525775] hover:border-brand-sky hover:text-brand-navy"
                      }`}
                    >
                      {active ? "✓ " : "+ "}
                      {tech}
                    </button>
                  );
                })}
              </div>

              {/* Custom language input */}
              <div className="mt-2.5 flex gap-2">
                <input
                  type="text"
                  value={customTechInput}
                  onChange={(e) => setCustomTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomTech();
                    }
                  }}
                  placeholder="Tambah bahasa/framework lain (mis. Dart, Vue, Express)..."
                  className="flex-1 rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2 text-xs text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTech}
                  className="inline-flex items-center gap-1 rounded-xl border border-brand-navy/20 bg-brand-soft px-3.5 py-2 font-heading text-xs font-bold text-brand-navy hover:bg-brand-primary hover:text-white cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Tambah
                </button>
              </div>
              {fieldErrors.techStack && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.techStack}
                </p>
              )}
            </div>

            {/* Row 5: Summary */}
            <div>
              <label
                htmlFor="pf-summary"
                className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
              >
                Ringkasan &amp; Nilai Bisnis Proyek *
              </label>
              <textarea
                id="pf-summary"
                rows={3}
                value={form.summary}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, summary: e.target.value }));
                  setFieldErrors((prev) => ({ ...prev, summary: "" }));
                }}
                placeholder="Jelaskan masalah klien, fitur utama yang dibangun, dan dampak bisnis yang dicapai..."
                className="mt-1.5 w-full rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2.5 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
              />
              {fieldErrors.summary && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.summary}
                </p>
              )}
            </div>

            {/* Row 6: Asset Visual selector + inline upload */}
            <div className="rounded-2xl border border-brand-muted/80 bg-brand-canvas p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-heading text-xs font-bold uppercase tracking-wide text-brand-navy">
                  Asset Visual Portofolio (Opsional)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    ref={inlineFileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleInlineUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingInline}
                    onClick={() => inlineFileRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 font-heading text-xs font-semibold text-white hover:bg-brand-primary disabled:opacity-50 cursor-pointer"
                  >
                    <ImagePlus className="h-3.5 w-3.5 text-brand-lime" />
                    {uploadingInline ? "Mengunggah..." : "Upload Gambar Baru"}
                  </button>
                </div>
              </div>

              <p className="mt-1 text-[11px] text-[#525775]">
                Pilih gambar dari Pustaka Asset, unggah baru (PNG/JPG/WebP), atau kosongkan untuk memakai Auto Mockup sesuai kategori.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, imageAssetPath: "" }))
                  }
                  className={`rounded-xl border px-3 py-2 font-heading text-xs font-semibold transition-all cursor-pointer ${
                    form.imageAssetPath === ""
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-brand-muted bg-white text-brand-navy hover:border-brand-sky"
                  }`}
                >
                  Auto Mockup ({CATEGORY_BY_ID[form.categoryId].shortLabel})
                </button>

                {portfolioAssets.map((asset) => {
                  const selected = form.imageAssetPath === asset.url;
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, imageAssetPath: asset.url }))
                      }
                      className={`group flex items-center gap-2 rounded-xl border p-1.5 pr-3 text-left transition-all cursor-pointer ${
                        selected
                          ? "border-brand-primary bg-brand-soft ring-2 ring-brand-primary/30"
                          : "border-brand-muted bg-white hover:border-brand-sky"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="h-8 w-10 rounded-lg object-cover bg-brand-navy/10"
                      />
                      <span className="max-w-[120px] truncate font-heading text-[11px] font-semibold text-brand-navy">
                        {asset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              {fieldErrors.imageAssetPath && (
                <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.imageAssetPath}
                </p>
              )}
            </div>

            {/* Row 7: Optional Demo URL */}
            <div>
              <label
                htmlFor="pf-demo"
                className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
              >
                Tautan Demo / Repositori (Opsional)
              </label>
              <input
                id="pf-demo"
                type="url"
                value={form.demoUrl}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, demoUrl: e.target.value }));
                  setFieldErrors((prev) => ({ ...prev, demoUrl: "" }));
                }}
                placeholder="https://demo.nalardigital.id/proyek-anda"
                className="mt-1.5 w-full rounded-xl border border-brand-muted bg-brand-canvas/50 px-3.5 py-2.5 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
              />
              {fieldErrors.demoUrl && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.demoUrl}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-heading text-sm font-bold text-white shadow-[0_14px_30px_rgba(58,78,251,0.28)] transition-all hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-brand-lime" />
              {submitting
                ? "Menyimpan..."
                : isEditing
                  ? "Simpan Perubahan Portofolio"
                  : "Simpan & Publikasikan ke Portofolio"}
            </button>
          </div>
        </form>

        {/* Right column: Live Card Preview */}
        <div className="space-y-4 min-[1025px]:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-6">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-brand-muted/70">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-lime px-2.5 py-0.5 font-heading text-[10px] font-extrabold uppercase tracking-wider text-brand-navy">
                  Live Preview
                </span>
                <h3 className="mt-1 font-heading text-base font-bold text-brand-navy">
                  Pratinjau Kartu di Beranda
                </h3>
              </div>
              <Layers className="h-5 w-5 text-brand-primary" />
            </div>

            <div className="mt-4 group rounded-2xl border border-brand-muted/80 bg-white p-4 shadow-[0_10px_28px_rgba(37,41,67,0.06)]">
              <PortfolioMockup item={previewItem} />
              <div className="px-1 pt-4 pb-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-heading text-[11px] font-bold text-brand-primary">
                    {previewItem.categoryLabel}
                  </span>
                  <div className="inline-flex items-center gap-1">
                    {previewItem.platforms.map((platform) => (
                      <PlatformIcon key={platform} platform={platform} />
                    ))}
                  </div>
                </div>
                <h4 className="mt-2.5 font-heading text-base font-bold text-brand-navy">
                  {previewItem.name}
                </h4>
                <p className="mt-0.5 text-xs font-semibold text-[#525775]">
                  {previewItem.clientName}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#525775] line-clamp-2">
                  {previewItem.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-brand-muted/60 pt-3">
                  <Code2 className="h-3.5 w-3.5 text-brand-sky" />
                  {previewItem.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-brand-muted/70 bg-brand-canvas px-2 py-0.5 font-heading text-[11px] font-semibold text-brand-navy"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Export / Import / Reset toolbar */}
            <div className="mt-5 rounded-2xl bg-brand-canvas p-4 border border-brand-muted/70">
              <p className="font-heading text-xs font-bold text-brand-navy">
                Sinkronisasi &amp; Portabilitas Data
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#525775]">
                {storageMode === "local-file"
                  ? "Perubahan langsung tertulis ke src/data/portfolios.json — siap di-commit ke Git."
                  : "Berjalan pada mode browser (localStorage). Gunakan Export JSON untuk menyalin data ke src/data/portfolios.json."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onExportJson}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-muted bg-white px-3 py-1.5 font-heading text-xs font-semibold text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export JSON
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => importInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-muted bg-white px-3 py-1.5 font-heading text-xs font-semibold text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Import JSON
                </button>
                {storageMode === "browser-storage" && (
                  <button
                    type="button"
                    onClick={() => void onResetDefaults()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-muted bg-white px-3 py-1.5 font-heading text-xs font-semibold text-[#525775] hover:border-brand-navy hover:text-brand-navy cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Default
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Portfolios Management List */}
      <div className="rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.05)] min-[480px]:p-7">
        <div className="flex flex-col gap-4 border-b border-brand-muted/70 pb-5 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy min-[480px]:text-xl">
              Daftar Portofolio Aktif ({filteredPortfolios.length})
            </h2>
            <p className="mt-0.5 text-xs text-[#525775]">
              Klik Edit untuk mengubah bahasa, bidang aplikasi, atau mengganti gambar asset.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#525775]" />
              <input
                type="search"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Cari nama / bahasa..."
                className="rounded-xl border border-brand-muted bg-brand-canvas py-2 pr-3 pl-9 text-xs text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
              />
            </div>
            <select
              aria-label="Filter bidang portofolio"
              value={listCategory}
              onChange={(e) =>
                setListCategory(e.target.value as AppCategoryId | "all")
              }
              className="rounded-xl border border-brand-muted bg-white px-3 py-2 text-xs font-semibold text-brand-navy focus:border-brand-primary focus:outline-none"
            >
              <option value="all">Semua Bidang</option>
              {APP_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
          {filteredPortfolios.map((item) => (
            <article
              key={item.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                form.id === item.id
                  ? "border-brand-primary bg-brand-soft/45 ring-2 ring-brand-primary/20"
                  : "border-brand-muted/80 bg-brand-canvas/40 hover:border-brand-sky"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-heading text-[11px] font-bold text-brand-primary">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.platforms.map((p) => (
                      <PlatformIcon key={p} platform={p} />
                    ))}
                  </div>
                </div>

                <h3 className="mt-2.5 font-heading text-sm font-bold text-brand-navy line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-[#525775]">
                  {item.clientName} • {item.year}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-brand-muted bg-white px-2 py-0.5 font-heading text-[10.5px] font-semibold text-brand-navy"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-brand-muted/70 pt-3">
                <span className="text-[11px] text-[#525775]">
                  {item.imageAssetPath ? "Asset Gambar" : "Auto Mockup"}
                </span>

                {confirmDeleteId === item.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void handleDelete(item.id, item.name)}
                      className="rounded-lg bg-[#DC2626] px-2.5 py-1 font-heading text-[11px] font-bold text-white cursor-pointer"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-brand-muted bg-white px-2.5 py-1 font-heading text-[11px] font-semibold text-brand-navy cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEditStart(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-muted bg-white px-2.5 py-1.5 font-heading text-xs font-semibold text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-muted bg-white px-2.5 py-1.5 font-heading text-xs font-semibold text-[#DC2626] hover:border-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
