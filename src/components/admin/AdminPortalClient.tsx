"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  ExternalLink,
  FolderKanban,
  HardDrive,
  Images,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import { usePortfolioStore } from "@/hooks/usePortfolioStore";
import { BrandLogo } from "../BrandLogo";
import { AssetLibraryTab } from "../assets/AssetLibraryTab";
import { PortfolioManagerTab } from "../assets/PortfolioManagerTab";
import { AdminLoginForm } from "./AdminLoginForm";

type ActiveTab = "portfolio" | "assets";

interface SessionState {
  checked: boolean;
  authenticated: boolean;
  configured: boolean;
  username: string;
}

function AdminDashboardContent({
  username,
  onLogout,
  onSessionExpired,
}: {
  username: string;
  onLogout: () => Promise<void>;
  onSessionExpired: () => void;
}) {
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
  } = usePortfolioStore({ includeAssets: true });

  const [activeTab, setActiveTab] = useState<ActiveTab>("portfolio");
  const [preselectedAssetUrl, setPreselectedAssetUrl] = useState<string | null>(
    null
  );
  const [loggingOut, setLoggingOut] = useState(false);
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

  const wrappedSavePortfolio: typeof savePortfolio = async (input, isEdit) => {
    const res = await savePortfolio(input, isEdit);
    if (res.unauthorized) onSessionExpired();
    return res;
  };

  const wrappedDeletePortfolio: typeof deletePortfolio = async (id) => {
    const res = await deletePortfolio(id);
    if (res.unauthorized) onSessionExpired();
    return res;
  };

  const wrappedUploadAsset: typeof uploadAsset = async (file) => {
    const res = await uploadAsset(file);
    if (res.unauthorized) onSessionExpired();
    return res;
  };

  const wrappedDeleteAsset: typeof deleteAsset = async (asset) => {
    const res = await deleteAsset(asset);
    if (res.unauthorized) onSessionExpired();
    return res;
  };

  const wrappedImportJson: typeof importPortfoliosJson = async (raw) => {
    const res = await importPortfoliosJson(raw);
    if (res.unauthorized) onSessionExpired();
    return res;
  };

  const handleLogoutClick = async () => {
    setLoggingOut(true);
    await onLogout();
    setLoggingOut(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-canvas text-brand-navy">
      {/* Dedicated Superadmin Topbar — completely separate from public landing Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy text-white shadow-[0_8px_28px_rgba(27,30,53,0.22)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 min-[480px]:px-6 min-[1025px]:px-10">
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogo variant="dark" size="sm" />
            <span className="hidden min-[640px]:inline-flex items-center gap-1 rounded-full bg-brand-lime px-2.5 py-0.5 font-heading text-[10px] font-extrabold uppercase tracking-wider text-brand-navy">
              <ShieldCheck className="h-3 w-3" />
              Superadmin CMS
            </span>
          </div>

          <div className="flex items-center gap-2 min-[480px]:gap-3">
            <span className="hidden min-[769px]:inline-block rounded-lg bg-white/10 px-3 py-1.5 font-heading text-xs font-semibold text-brand-muted">
              Login sebagai{" "}
              <strong className="text-white">{username}</strong>
            </span>

            <Link
              href="/#portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 font-heading text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              <span className="hidden min-[480px]:inline">Lihat Web Publik</span>
              <span className="min-[480px]:hidden">Web</span>
              <ExternalLink className="h-3.5 w-3.5 text-brand-lime" />
            </Link>

            <button
              type="button"
              disabled={loggingOut}
              onClick={() => void handleLogoutClick()}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-white/15 bg-[#DC2626]/20 px-3 py-1.5 font-heading text-xs font-semibold text-[#FCA5A5] transition-colors hover:bg-[#DC2626] hover:text-white disabled:opacity-50 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{loggingOut ? "Keluar..." : "Keluar"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Superadmin Sub-header & Tab Navigation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#252943] via-[#252943] to-[#2C3EDB] py-8 text-white min-[769px]:py-10">
        <div className="mx-auto max-w-7xl px-4 min-[480px]:px-6 min-[1025px]:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white min-[769px]:text-3xl">
                Manajemen Portofolio &amp; Pustaka Asset
              </h1>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-muted min-[480px]:text-sm">
                Tambahkan atau ubah portofolio (bidang aplikasi, platform, bahasa pemrograman, logo klien, dan gambar mockup). Perubahan langsung tersinkron ke bagian portofolio beranda.
              </p>
            </div>

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
                  Mode Lokal — File Proyek
                </>
              ) : (
                <>
                  <Database className="h-3.5 w-3.5" />
                  Mode Browser — LocalStorage
                </>
              )}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Menu Superadmin CMS"
            className="mt-6 inline-flex flex-wrap gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur-sm"
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

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 min-[480px]:px-6 min-[1025px]:px-10 min-[1025px]:py-10">
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
            onSavePortfolio={wrappedSavePortfolio}
            onDeletePortfolio={wrappedDeletePortfolio}
            onUploadAsset={wrappedUploadAsset}
            onExportJson={exportPortfoliosJson}
            onImportJson={wrappedImportJson}
            onResetDefaults={resetToDefaults}
            onNotify={showToast}
          />
        ) : (
          <AssetLibraryTab
            assets={assets}
            storageMode={storageMode}
            onUploadAsset={wrappedUploadAsset}
            onDeleteAsset={wrappedDeleteAsset}
            onUseInPortfolio={handleUseAssetInPortfolio}
            onNotify={showToast}
          />
        )}
      </main>

      <footer className="border-t border-brand-muted bg-white py-5 text-center text-xs font-medium text-[#525775]">
        Nalar Digital Superadmin CMS • Akses Internal Terproteksi
      </footer>
    </div>
  );
}

export function AdminPortalClient() {
  const [session, setSession] = useState<SessionState>({
    checked: false,
    authenticated: false,
    configured: true,
    username: "",
  });
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      if (!res.ok) {
        setSession({
          checked: true,
          authenticated: false,
          configured: true,
          username: "",
        });
        return;
      }
      const data = (await res.json()) as {
        authenticated?: boolean;
        configured?: boolean;
        username?: string;
      };
      setSession({
        checked: true,
        authenticated: Boolean(data.authenticated),
        configured: data.configured !== false,
        username: data.username ?? "",
      });
    } catch {
      setSession({
        checked: true,
        authenticated: false,
        configured: true,
        username: "",
      });
    }
  }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!active) return;
      await checkSession();
    };
    void run();
    return () => {
      active = false;
    };
  }, [checkSession]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Clear local UI state even if network request fails
    }
    setAuthNotice(null);
    setSession((prev) => ({
      ...prev,
      authenticated: false,
      username: "",
    }));
  };

  const handleSessionExpired = () => {
    setAuthNotice("Sesi Superadmin berakhir. Silakan login kembali.");
    setSession((prev) => ({
      ...prev,
      authenticated: false,
      username: "",
    }));
  };

  if (!session.checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-navy text-white">
        <p className="font-heading text-sm font-semibold text-brand-muted">
          Memeriksa sesi Superadmin...
        </p>
      </div>
    );
  }

  if (!session.authenticated) {
    return (
      <AdminLoginForm
        configured={session.configured}
        initialError={authNotice}
        onSuccess={(username) => {
          setAuthNotice(null);
          setSession({
            checked: true,
            authenticated: true,
            configured: true,
            username,
          });
        }}
      />
    );
  }

  return (
    <AdminDashboardContent
      username={session.username}
      onLogout={handleLogout}
      onSessionExpired={handleSessionExpired}
    />
  );
}
