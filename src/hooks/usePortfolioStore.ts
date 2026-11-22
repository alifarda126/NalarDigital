"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PORTFOLIOS } from "@/data/homepage";
import {
  clearBrowserPortfolios,
  createLocalPortfolioItem,
  notifyPortfolioSync,
  parseStoredPortfolios,
  PORTFOLIO_SYNC_EVENT,
  readBrowserAssets,
  readBrowserPortfolios,
  writeBrowserAssets,
  writeBrowserPortfolios,
} from "@/lib/portfolio-client-store";
import {
  sanitizeAssetFileName,
  validateImageUpload,
  validatePortfolioInput,
} from "@/lib/portfolio-validation";
import type {
  AssetItem,
  PortfolioInput,
  PortfolioItem,
  StorageMode,
} from "@/types/portfolio";

interface MutationResult<T = void> {
  ok: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
  unauthorized?: boolean;
}

interface UsePortfolioStoreOptions {
  includeAssets?: boolean;
}

const MAX_BROWSER_ASSET_BYTES = 1_500_000; // 1.5 MB safeguard for localStorage quota

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Gagal membaca gambar sebagai Data URL."));
      }
    };
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.readAsDataURL(file);
  });
}

export function usePortfolioStore(options: UsePortfolioStoreOptions = {}) {
  const { includeAssets = false } = options;
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIOS);
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [storageMode, setStorageMode] = useState<StorageMode>("local-file");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      const portfolioRes = await fetch("/api/portfolios", { cache: "no-store" });
      const assetsRes = includeAssets
        ? await fetch("/api/assets", { cache: "no-store" })
        : null;

      let serverWritable = false;
      let serverPortfolios: PortfolioItem[] = DEFAULT_PORTFOLIOS;
      let diskAssets: AssetItem[] = [];

      if (portfolioRes.ok) {
        const json = (await portfolioRes.json()) as {
          items?: PortfolioItem[];
          writable?: boolean;
        };
        if (Array.isArray(json.items)) {
          serverPortfolios = json.items;
        }
        serverWritable = Boolean(json.writable);
      }

      if (assetsRes && assetsRes.ok) {
        const json = (await assetsRes.json()) as {
          assets?: AssetItem[];
          writable?: boolean;
        };
        if (Array.isArray(json.assets)) {
          diskAssets = json.assets;
        }
        serverWritable = serverWritable && Boolean(json.writable);
      }

      const mode: StorageMode = serverWritable ? "local-file" : "browser-storage";
      setErrorMessage(null);
      setStorageMode(mode);

      if (mode === "local-file") {
        setPortfolios(serverPortfolios);
        if (includeAssets) {
          setAssets(diskAssets);
        }
      } else {
        const storedPortfolios = readBrowserPortfolios();
        setPortfolios(storedPortfolios ?? serverPortfolios);
        if (includeAssets) {
          const browserAssets = readBrowserAssets();
          setAssets([...browserAssets, ...diskAssets]);
        }
      }
    } catch {
      setErrorMessage(
        "Tidak dapat terhubung ke API lokal, menggunakan penyimpanan browser."
      );
      setStorageMode("browser-storage");
      const storedPortfolios = readBrowserPortfolios();
      setPortfolios(storedPortfolios ?? DEFAULT_PORTFOLIOS);
      if (includeAssets) {
        setAssets(readBrowserAssets());
      }
    } finally {
      setLoading(false);
    }
  }, [includeAssets]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!active) return;
      await loadAll();
    };
    void run();

    const handleSync = () => {
      if (active) void loadAll();
    };
    window.addEventListener(PORTFOLIO_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      active = false;
      window.removeEventListener(PORTFOLIO_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [loadAll]);

  const savePortfolio = useCallback(
    async (
      input: PortfolioInput,
      isEdit: boolean
    ): Promise<MutationResult<PortfolioItem>> => {
      const validated = validatePortfolioInput(input);
      if (!validated.ok) {
        return {
          ok: false,
          error: "Periksa kembali isian formulir portofolio.",
          errors: validated.errors,
        };
      }

      if (storageMode === "local-file") {
        try {
          const res = await fetch("/api/portfolios", {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validated.data),
          });

          if (res.status === 401) {
            return {
              ok: false,
              unauthorized: true,
              error: "Sesi Superadmin telah berakhir. Silakan login kembali.",
            };
          }

          if (res.status === 501) {
            setStorageMode("browser-storage");
          } else {
            const payload = (await res.json()) as {
              item?: PortfolioItem;
              items?: PortfolioItem[];
              error?: string;
              errors?: Record<string, string>;
            };

            if (!res.ok) {
              return {
                ok: false,
                error: payload.error ?? "Gagal menyimpan portofolio.",
                errors: payload.errors,
              };
            }

            if (Array.isArray(payload.items)) {
              setPortfolios(payload.items);
            }
            notifyPortfolioSync();
            return { ok: true, data: payload.item };
          }
        } catch {
          setStorageMode("browser-storage");
        }
      }

      const existingTarget = isEdit
        ? portfolios.find((p) => p.id === validated.data.id)
        : undefined;
      const item = createLocalPortfolioItem(validated.data, existingTarget);
      const nextList = isEdit
        ? portfolios.map((p) => (p.id === item.id ? item : p))
        : [item, ...portfolios];

      const saved = writeBrowserPortfolios(nextList);
      if (!saved) {
        return {
          ok: false,
          error:
            "Gagal menyimpan ke localStorage browser (kemungkinan kuota penuh). Gunakan fitur Export JSON.",
        };
      }

      setPortfolios(nextList);
      notifyPortfolioSync();
      return { ok: true, data: item };
    },
    [portfolios, storageMode]
  );

  const deletePortfolio = useCallback(
    async (id: string): Promise<MutationResult> => {
      if (storageMode === "local-file") {
        try {
          const res = await fetch(
            `/api/portfolios?id=${encodeURIComponent(id)}`,
            { method: "DELETE" }
          );

          if (res.status === 401) {
            return {
              ok: false,
              unauthorized: true,
              error: "Sesi Superadmin telah berakhir. Silakan login kembali.",
            };
          }

          if (res.status === 501) {
            setStorageMode("browser-storage");
          } else {
            const payload = (await res.json()) as {
              items?: PortfolioItem[];
              error?: string;
            };
            if (!res.ok) {
              return {
                ok: false,
                error: payload.error ?? "Gagal menghapus portofolio.",
              };
            }
            if (Array.isArray(payload.items)) {
              setPortfolios(payload.items);
            }
            notifyPortfolioSync();
            return { ok: true };
          }
        } catch {
          setStorageMode("browser-storage");
        }
      }

      const nextList = portfolios.filter((p) => p.id !== id);
      writeBrowserPortfolios(nextList);
      setPortfolios(nextList);
      notifyPortfolioSync();
      return { ok: true };
    },
    [portfolios, storageMode]
  );

  const uploadAsset = useCallback(
    async (file: File): Promise<MutationResult<AssetItem>> => {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const validation = validateImageUpload(
        { name: file.name, type: file.type, size: file.size },
        bytes
      );

      if (!validation.ok) {
        return {
          ok: false,
          error: validation.errors.file ?? "File gambar tidak valid.",
          errors: validation.errors,
        };
      }

      if (storageMode === "local-file") {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/assets", {
            method: "POST",
            body: formData,
          });

          if (res.status === 401) {
            return {
              ok: false,
              unauthorized: true,
              error: "Sesi Superadmin telah berakhir. Silakan login kembali.",
            };
          }

          if (res.status === 501) {
            setStorageMode("browser-storage");
          } else {
            const payload = (await res.json()) as {
              asset?: AssetItem;
              assets?: AssetItem[];
              error?: string;
            };
            if (!res.ok) {
              return {
                ok: false,
                error: payload.error ?? "Gagal mengunggah asset.",
              };
            }
            if (Array.isArray(payload.assets)) {
              setAssets(payload.assets);
            }
            notifyPortfolioSync();
            return { ok: true, data: payload.asset };
          }
        } catch {
          setStorageMode("browser-storage");
        }
      }

      if (file.size > MAX_BROWSER_ASSET_BYTES) {
        return {
          ok: false,
          error:
            "Pada mode browser (read-only server), ukuran gambar maksimal 1,5 MB agar tidak melebihi batas localStorage.",
        };
      }

      try {
        const dataUrl = await fileToDataUrl(file);
        const safeName = sanitizeAssetFileName(file.name, validation.data.ext);
        const newAsset: AssetItem = {
          id: `browser:${safeName}`,
          name: safeName,
          url: dataUrl,
          folder: "portfolio",
          sizeBytes: file.size,
          mimeType: file.type,
          uploadedAt: new Date().toISOString(),
          isCustom: true,
          storageSource: "browser",
        };
        const prevBrowser = readBrowserAssets();
        const nextBrowser = [newAsset, ...prevBrowser];
        const persisted = writeBrowserAssets(nextBrowser);
        if (!persisted) {
          return {
            ok: false,
            error:
              "Kuota penyimpanan browser penuh. Hapus beberapa asset lama terlebih dahulu.",
          };
        }
        setAssets((prev) => [newAsset, ...prev]);
        notifyPortfolioSync();
        return { ok: true, data: newAsset };
      } catch (error) {
        return {
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "Gagal memproses gambar di browser.",
        };
      }
    },
    [storageMode]
  );

  const deleteAsset = useCallback(
    async (asset: AssetItem): Promise<MutationResult> => {
      if (!asset.isCustom) {
        return {
          ok: false,
          error: "Asset inti brand/website tidak dapat dihapus dari CMS.",
        };
      }

      if (asset.storageSource === "disk" && storageMode === "local-file") {
        try {
          const res = await fetch(
            `/api/assets?name=${encodeURIComponent(asset.name)}`,
            { method: "DELETE" }
          );

          if (res.status === 401) {
            return {
              ok: false,
              unauthorized: true,
              error: "Sesi Superadmin telah berakhir. Silakan login kembali.",
            };
          }

          const payload = (await res.json()) as {
            assets?: AssetItem[];
            error?: string;
          };
          if (!res.ok) {
            return {
              ok: false,
              error: payload.error ?? "Gagal menghapus asset dari disk.",
            };
          }
          if (Array.isArray(payload.assets)) {
            setAssets(payload.assets);
          }
          notifyPortfolioSync();
          return { ok: true };
        } catch {
          return {
            ok: false,
            error: "Gagal terhubung ke server untuk menghapus asset.",
          };
        }
      }

      const prevBrowser = readBrowserAssets();
      const nextBrowser = prevBrowser.filter((a) => a.id !== asset.id);
      writeBrowserAssets(nextBrowser);
      setAssets((prev) => prev.filter((a) => a.id !== asset.id));
      notifyPortfolioSync();
      return { ok: true };
    },
    [storageMode]
  );

  const exportPortfoliosJson = useCallback(() => {
    const jsonString = JSON.stringify(portfolios, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nalar-digital-portfolios-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [portfolios]);

  const importPortfoliosJson = useCallback(
    async (rawJson: string): Promise<MutationResult<number>> => {
      const parsed = parseStoredPortfolios(rawJson);
      if (!parsed || parsed.length === 0) {
        return {
          ok: false,
          error:
            "File JSON tidak valid atau tidak berisi item portofolio yang memenuhi skema.",
        };
      }

      if (storageMode === "local-file") {
        let importedCount = 0;
        for (const item of parsed) {
          const res = await fetch("/api/portfolios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: item.name,
              clientName: item.clientName,
              categoryId: item.categoryId,
              summary: item.summary,
              platforms: item.platforms,
              techStack: item.techStack,
              year: item.year,
              featured: item.featured,
              imageAssetPath: item.imageAssetPath,
              clientLogoPath: item.clientLogoPath,
              demoUrl: item.demoUrl,
              accent: item.accent,
              secondaryAccent: item.secondaryAccent,
              surfaceTint: item.surfaceTint,
            }),
          });
          if (res.status === 401) {
            return {
              ok: false,
              unauthorized: true,
              error: "Sesi Superadmin telah berakhir. Silakan login kembali.",
            };
          }
          if (res.ok) importedCount += 1;
        }
        await loadAll();
        notifyPortfolioSync();
        return { ok: true, data: importedCount };
      }

      writeBrowserPortfolios(parsed);
      setPortfolios(parsed);
      notifyPortfolioSync();
      return { ok: true, data: parsed.length };
    },
    [loadAll, storageMode]
  );

  const resetToDefaults = useCallback(async () => {
    clearBrowserPortfolios();
    setPortfolios(DEFAULT_PORTFOLIOS);
    notifyPortfolioSync();
    await loadAll();
  }, [loadAll]);

  return {
    portfolios,
    assets,
    storageMode,
    loading,
    errorMessage,
    refresh: loadAll,
    savePortfolio,
    deletePortfolio,
    uploadAsset,
    deleteAsset,
    exportPortfoliosJson,
    importPortfoliosJson,
    resetToDefaults,
  };
}
