"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Database,
  FolderKanban,
  HardDrive,
  Images,
  X,
} from "lucide-react";
import { usePortfolioStore } from "@/hooks/usePortfolioStore";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { AssetLibraryTab } from "./AssetLibraryTab";
import { PortfolioManagerTab } from "./PortfolioManagerTab";

type ActiveTab = "portfolio" | "assets";

export function AssetsStudioClient() {
  const {
    portfolios,
    assets,
    storageMode,
    loading,
    savePortfolio,
    deletePortfolio,
    uploadAsset,
    deleteAsset,
    exportPortfoliosJson,
    importPortfoliosJson,
    resetToDefaults,
  } = usePortfolioStore();

  const [activeTab, setActiveTab] = useState<ActiveTab>("portfolio");
  const [preselectedAssetUrl, setPreselectedAssetUrl] = useState<string | null>(
    null
  );
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const handleUseAssetInPortfolio = (assetUrl: string) => {
    setPreselectedAssetUrl(assetUrl);
    setActiveTab("portfolio");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("success", "Asset dipilih untuk form portofolio baru.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-canvas text-brand-navy">
      <Navbar />

      {/* Studio Header Banner in Deep Navy + Electric Blue Gradient */}
      <section className="relative overflow-hidden bg-brand-navy py-10 text-white min-[769px]:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-primary/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-brand-sky/25 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-heading text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Beranda
            </Link>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-heading text-xs font-bold ${
                storageMode === "local-file"
                  ? "bg-brand-lime text-brand-navy"
                  : "bg-white/15 text-brand-lime border border-brand-lime/40"
              }`}
            >
              {storageMode === "local-file" ? (
                <>
                  <HardDrive className="h-3.5 w-3.5" />
                  Mode Lokal — Tersimpan ke File Proyek
                </>
              ) : (
                <>
                  <Database className="h-3.5 w-3.5" />
                  Mode Browser — LocalStorage + Export JSON
                </>
              )}
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white min-[480px]:text-3xl min-[1025px]:text-4xl">
              Asset &amp; Portofolio Studio Nalar Digital
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-brand-muted min-[1025px]:text-base">
              Tambahkan proyek portofolio baru lengkap dengan bidang aplikasi (Keuangan, Jasa, F&amp;B, Kesehatan, dll.), platform, bahasa pemrograman, serta unggah dan kelola asset visual &amp; Brand Kit dalam satu tempat.
            </p>
          </div>

          {/* Primary Tab Switcher */}
          <div
            role="tablist"
            aria-label="Navigasi Studio Asset"
            className="mt-7 inline-flex flex-wrap gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "portfolio"}
              onClick={() => setActiveTab("portfolio")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-heading text-xs min-[480px]:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "portfolio"
                  ? "bg-brand-lime text-brand-navy shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FolderKanban className="h-4 w-4" />
              Kelola Portofolio ({portfolios.length})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "assets"}
              onClick={() => setActiveTab("assets")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-heading text-xs min-[480px]:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "assets"
                  ? "bg-brand-lime text-brand-navy shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Images className="h-4 w-4" />
              Pustaka Asset &amp; Brand Kit ({assets.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Studio Body */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 min-[769px]:px-8 min-[1025px]:px-10 min-[1025px]:py-12">
        {toast && (
          <div
            role="status"
            className={`mb-6 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
              toast.type === "success"
                ? "border-[#BBF7D0] bg-[#ECFDF5] text-[#166534]"
                : "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              aria-label="Tutup notifikasi"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-brand-muted bg-white p-12 text-center">
            <p className="font-heading text-sm font-semibold text-[#525775]">
              Memuat data portofolio dan pustaka asset...
            </p>
          </div>
        ) : activeTab === "portfolio" ? (
          <PortfolioManagerTab
            key={preselectedAssetUrl ?? "default-form"}
            portfolios={portfolios}
            assets={assets}
            storageMode={storageMode}
            preselectedAssetUrl={preselectedAssetUrl}
            onConsumePreselectedAsset={() => setPreselectedAssetUrl(null)}
            onSavePortfolio={savePortfolio}
            onDeletePortfolio={deletePortfolio}
            onUploadAsset={uploadAsset}
            onExportJson={exportPortfoliosJson}
            onImportJson={importPortfoliosJson}
            onResetDefaults={resetToDefaults}
            onNotify={showToast}
          />
        ) : (
          <AssetLibraryTab
            assets={assets}
            storageMode={storageMode}
            onUploadAsset={uploadAsset}
            onDeleteAsset={deleteAsset}
            onUseInPortfolio={handleUseAssetInPortfolio}
            onNotify={showToast}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
