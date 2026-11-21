"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Download,
  FolderPlus,
  ImagePlus,
  Palette,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { BRAND_COLOR_SWATCHES, BRAND_LOGO_ASSETS } from "@/config/theme";
import type { AssetFolder, AssetItem, StorageMode } from "@/types/portfolio";

interface AssetLibraryTabProps {
  assets: AssetItem[];
  storageMode: StorageMode;
  onUploadAsset: (
    file: File
  ) => Promise<{ ok: boolean; data?: AssetItem; error?: string }>;
  onDeleteAsset: (asset: AssetItem) => Promise<{ ok: boolean; error?: string }>;
  onUseInPortfolio: (assetUrl: string) => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function AssetLibraryTab({
  assets,
  storageMode,
  onUploadAsset,
  onDeleteAsset,
  onUseInPortfolio,
  onNotify,
}: AssetLibraryTabProps) {
  const [folderFilter, setFolderFilter] = useState<AssetFolder | "all">("all");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = useMemo(() => {
    if (folderFilter === "all") return assets;
    return assets.filter((a) => a.folder === folderFilter);
  }, [assets, folderFilter]);

  const handleCopyText = async (id: string, value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      onNotify("success", `${label} disalin: ${value}`);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 1800);
    } catch {
      onNotify("error", "Browser tidak mengizinkan akses clipboard otomatis.");
    }
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    let successCount = 0;

    for (const file of Array.from(fileList)) {
      const res = await onUploadAsset(file);
      if (res.ok) {
        successCount += 1;
      } else {
        onNotify("error", `${file.name}: ${res.error ?? "Gagal diunggah."}`);
      }
    }

    setUploading(false);
    if (successCount > 0) {
      onNotify(
        "success",
        `${successCount} asset gambar berhasil ditambahkan ke Pustaka Asset.`
      );
    }
  };

  const handleDelete = async (asset: AssetItem) => {
    const res = await onDeleteAsset(asset);
    if (!res.ok) {
      onNotify("error", res.error ?? "Gagal menghapus asset.");
      return;
    }
    onNotify("success", `Asset "${asset.name}" telah dihapus.`);
  };

  return (
    <div className="space-y-10">
      {/* 1. Upload Dropzone */}
      <section className="rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy min-[480px]:text-xl">
              Unggah Asset Visual Portofolio
            </h2>
            <p className="mt-0.5 text-xs text-[#525775]">
              Format didukung: PNG, JPG/JPEG, WEBP (maks.{" "}
              {storageMode === "local-file" ? "5 MB" : "1,5 MB di mode browser"}) dengan validasi magic bytes.
            </p>
          </div>
          <span className="rounded-full bg-brand-soft px-3 py-1 font-heading text-[11px] font-bold text-brand-primary">
            Folder: public/assets/portfolio/
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            void processFiles(e.dataTransfer.files);
          }}
          className={`mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragActive
              ? "border-brand-primary bg-brand-soft"
              : "border-brand-muted bg-brand-canvas hover:border-brand-sky"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-lime shadow-md">
            <UploadCloud className="h-7 w-7" />
          </span>
          <p className="mt-4 font-heading text-base font-bold text-brand-navy">
            Seret &amp; lepas screenshot / mockup portofolio di sini
          </p>
          <p className="mt-1 text-xs text-[#525775]">
            Atau klik tombol di bawah untuk memilih satu atau beberapa file gambar dari perangkat Anda.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              void processFiles(e.target.files);
              e.target.value = "";
            }}
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-gradient px-6 py-2.5 font-heading text-sm font-bold text-white shadow-[0_10px_24px_rgba(58,78,251,0.28)] transition-all hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Memvalidasi & Mengunggah..." : "Pilih Gambar Asset"}
          </button>
        </div>
      </section>

      {/* 2. Asset Gallery */}
      <section className="rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-7">
        <div className="flex flex-col gap-3 border-b border-brand-muted/70 pb-5 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy min-[480px]:text-xl">
              Pustaka Asset ({filteredAssets.length})
            </h2>
            <p className="mt-0.5 text-xs text-[#525775]">
              Gunakan langsung pada portofolio baru atau salin path relatifnya untuk kebutuhan development.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: "all", label: "Semua" },
                { id: "portfolio", label: "Portofolio" },
                { id: "brand", label: "Brand Logo" },
                { id: "general", label: "Umum" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFolderFilter(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors cursor-pointer ${
                  folderFilter === tab.id
                    ? "bg-brand-navy text-brand-lime"
                    : "border border-brand-muted bg-brand-canvas text-[#525775] hover:border-brand-sky hover:text-brand-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-brand-muted bg-brand-canvas p-8 text-center">
            <p className="font-heading text-sm font-bold text-brand-navy">
              Belum ada asset pada kategori ini
            </p>
            <p className="mt-1 text-xs text-[#525775]">
              Unggah gambar mockup, banner, atau screenshot aplikasi Anda pada panel di atas.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1025px]:grid-cols-3">
            {filteredAssets.map((asset) => (
              <article
                key={asset.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-brand-muted/80 bg-brand-canvas/40 transition-all hover:border-brand-sky hover:shadow-[0_12px_28px_rgba(58,78,251,0.1)]"
              >
                <div
                  className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden p-3 ${
                    asset.folder === "brand"
                      ? "bg-checker-preview"
                      : "bg-brand-navy/95"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className={`max-h-full max-w-full rounded-lg ${
                      asset.folder === "brand" ? "object-contain p-2" : "h-full w-full object-cover"
                    }`}
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-brand-navy/85 px-2.5 py-0.5 font-heading text-[10px] font-bold uppercase text-brand-lime">
                    {asset.folder}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p
                      title={asset.name}
                      className="truncate font-heading text-sm font-bold text-brand-navy"
                    >
                      {asset.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#525775]">
                      {formatBytes(asset.sizeBytes)} • {asset.mimeType.replace("image/", "").toUpperCase()}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onUseInPortfolio(asset.url)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary px-3 py-2 font-heading text-xs font-semibold text-white hover:bg-[#2C3EDB] cursor-pointer"
                    >
                      <FolderPlus className="h-3.5 w-3.5" />
                      Pakai di Portofolio
                    </button>

                    <button
                      type="button"
                      title="Salin path asset"
                      onClick={() =>
                        void handleCopyText(
                          asset.id,
                          asset.storageSource === "disk" ? asset.url : asset.name,
                          "Path asset"
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-muted bg-white text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                    >
                      {copiedId === asset.id ? (
                        <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {asset.isCustom && (
                      <button
                        type="button"
                        title="Hapus asset"
                        onClick={() => void handleDelete(asset)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-muted bg-white text-[#DC2626] hover:border-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. Brand Kit: Official Palette + ND Logo Variants */}
      <section className="rounded-3xl border border-brand-muted bg-white p-5 shadow-[0_12px_36px_rgba(37,41,67,0.06)] min-[480px]:p-7">
        <div className="flex items-center gap-2.5 border-b border-brand-muted/70 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-brand-lime">
            <Palette className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy min-[480px]:text-xl">
              Brand Kit &amp; Palet Warna Resmi Nalar Digital
            </h2>
            <p className="text-xs text-[#525775]">
              Acuan warna desain &amp; varian logo resmi agar pengembangan halaman berikutnya tetap konsisten.
            </p>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="mt-5 grid grid-cols-1 gap-3.5 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-5">
          {BRAND_COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() =>
                void handleCopyText(`swatch-${swatch.id}`, swatch.hex, `Warna ${swatch.name}`)
              }
              className="group flex flex-col overflow-hidden rounded-2xl border border-brand-muted text-left transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <div
                className="flex h-24 w-full items-end justify-between p-3"
                style={{
                  backgroundColor: swatch.hex,
                  color: swatch.textOnColor,
                }}
              >
                <span className="font-heading text-sm font-extrabold tracking-wide">
                  {swatch.hex}
                </span>
                <span className="rounded-md bg-black/15 p-1 backdrop-blur-xs">
                  {copiedId === `swatch-${swatch.id}` ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </span>
              </div>
              <div className="flex-1 bg-white p-3">
                <p className="font-heading text-xs font-bold text-brand-navy">
                  {swatch.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#525775]">
                  {swatch.usage}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Logo Variants */}
        <div className="mt-7 grid grid-cols-1 gap-4 min-[769px]:grid-cols-3">
          {BRAND_LOGO_ASSETS.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-brand-muted bg-brand-canvas/40"
            >
              <div
                className={`flex h-36 items-center justify-center p-6 ${
                  logo.previewBg === "dark"
                    ? "bg-[#000000]"
                    : logo.previewBg === "light"
                      ? "bg-white"
                      : "bg-checker-preview"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-heading text-sm font-bold text-brand-navy">
                    {logo.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#525775]">
                    {logo.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={logo.url}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 font-heading text-xs font-semibold text-white hover:bg-brand-primary"
                  >
                    <Download className="h-3.5 w-3.5 text-brand-lime" />
                    Unduh
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      void handleCopyText(logo.id, logo.url, "Path logo")
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-muted bg-white px-3 py-1.5 font-heading text-xs font-semibold text-brand-navy hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                  >
                    {copiedId === logo.id ? (
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    Salin Path
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
