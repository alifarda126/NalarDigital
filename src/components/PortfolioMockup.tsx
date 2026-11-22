"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";

function DualPhones({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex h-[176px] w-full max-w-[260px] items-center justify-center">
      <div className="relative z-10 w-[122px] -translate-x-5 translate-y-2 rounded-[18px] border-[3.5px] border-[#1B1E35] bg-white p-1.5 shadow-[0_14px_26px_rgba(27,30,53,0.28)]">
        <div className="mx-auto mb-1 h-1 w-7 rounded-full bg-[#DEE0ED]" />
        {left}
      </div>
      <div className="relative z-20 w-[124px] translate-x-6 -translate-y-1 rounded-[18px] border-[3.5px] border-[#1B1E35] bg-white p-1.5 shadow-[0_18px_32px_rgba(27,30,53,0.32)]">
        <div className="mx-auto mb-1 h-1 w-7 rounded-full bg-[#DEE0ED]" />
        {right}
      </div>
    </div>
  );
}

function DesktopWithPhone({
  desktop,
  phone,
}: {
  desktop: React.ReactNode;
  phone: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex h-[176px] w-full max-w-[270px] items-center justify-center">
      <div className="w-[222px] -translate-x-3 rounded-xl border border-[#DEE0ED] bg-white shadow-[0_14px_28px_rgba(27,30,53,0.26)] overflow-hidden">
        <div className="flex items-center gap-1 border-b border-[#DEE0ED] bg-[#F7F8FC] px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3A4EFB]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#33A4FA]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3FF3B]" />
        </div>
        <div className="p-2">{desktop}</div>
      </div>
      <div className="absolute right-1 bottom-1 z-20 w-[86px] rounded-[14px] border-[3px] border-[#1B1E35] bg-white p-1 shadow-[0_14px_24px_rgba(27,30,53,0.3)]">
        <div className="mx-auto mb-1 h-0.5 w-5 rounded-full bg-[#DEE0ED]" />
        {phone}
      </div>
    </div>
  );
}

/**
 * Renders either the real uploaded/selected portfolio image asset (with graceful error fallback)
 * or a vivid coded UI device showcase tailored to the project's category and brand palette.
 */
export function PortfolioMockup({ item }: { item: PortfolioItem }) {
  const [imageBroken, setImageBroken] = useState(false);

  const hasValidImage = Boolean(item.imageAssetPath && !imageBroken);

  if (hasValidImage && item.imageAssetPath) {
    return (
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-brand-muted/70 bg-brand-navy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageAssetPath}
          alt={`Preview visual ${item.name}`}
          onError={() => setImageBroken(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const renderScene = () => {
    switch (item.mockupKind) {
      case "finance":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#252943] p-2 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#E3FF3B] px-1.5 py-0.5 text-[7px] font-extrabold text-[#252943]">
                    CASHFLOW +28%
                  </span>
                  <span className="text-[7px] text-[#DEE0ED]">KasNalar</span>
                </div>
                <div className="rounded bg-gradient-to-r from-[#3A4EFB] to-[#33A4FA] p-1.5">
                  <div className="text-[6.5px] opacity-85">Saldo Bersih Bulan Ini</div>
                  <div className="text-[10px] font-extrabold">Rp 142.850.000</div>
                </div>
                <div className="grid grid-cols-4 items-end gap-1 pt-1">
                  <div className="h-4 rounded-t bg-[#33A4FA]/60" />
                  <div className="h-6 rounded-t bg-[#33A4FA]" />
                  <div className="h-5 rounded-t bg-[#3A4EFB]" />
                  <div className="h-8 rounded-t bg-[#E3FF3B]" />
                </div>
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#F7F8FC] p-1.5">
                <div className="rounded bg-[#3A4EFB] p-1 text-white">
                  <div className="text-[6px] opacity-80">Omzet</div>
                  <div className="text-[8px] font-bold">Rp 18.4jt</div>
                </div>
                <div className="h-2 w-4/5 rounded bg-[#DEE0ED]" />
                <div className="h-7 rounded bg-[#E3FF3B]/70" />
              </div>
            }
          />
        );

      case "service":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-1.5">
                <div className="rounded-md bg-gradient-to-r from-[#3A4EFB] to-[#33A4FA] p-1.5 text-white">
                  <div className="text-[7px] font-bold">Booking Jasa</div>
                  <div className="text-[6px] opacity-85">Teknisi Terdekat • 12 mnt</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-7 rounded bg-white border border-[#DEE0ED]" />
                  <div className="h-7 rounded bg-white border border-[#DEE0ED]" />
                </div>
                <div className="h-6 rounded bg-[#E3FF3B] flex items-center justify-center text-[7px] font-bold text-[#252943]">
                  Pesan Sekarang
                </div>
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#252943] p-1.5 text-white">
                <div className="text-[7px] font-bold text-[#E3FF3B]">LIVE TRACKING</div>
                <div className="h-12 rounded-md bg-[#3A4EFB]/35 border border-[#33A4FA]/40 p-1">
                  <div className="h-2 w-2 rounded-full bg-[#E3FF3B]" />
                </div>
                <div className="h-2 w-3/4 rounded bg-white/75" />
                <div className="h-5 rounded bg-[#33A4FA]" />
              </div>
            }
          />
        );

      case "fnb":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-2">
                <div className="flex items-center justify-between rounded bg-[#252943] px-2 py-1 text-white">
                  <span className="text-[7px] font-bold">POS Kasir Outlet</span>
                  <span className="rounded bg-[#E3FF3B] px-1 text-[6px] font-bold text-[#252943]">
                    OPEN
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-10 rounded bg-[#3A4EFB]/15 border border-[#3A4EFB]/30" />
                  <div className="h-10 rounded bg-[#33A4FA]/15 border border-[#33A4FA]/30" />
                  <div className="h-10 rounded bg-[#E3FF3B]/45 border border-[#252943]/15" />
                </div>
                <div className="h-4 rounded bg-[#3A4EFB]" />
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#252943] p-1.5 text-white">
                <div className="text-[6.5px] font-bold text-[#E3FF3B]">1,240 POIN</div>
                <div className="h-8 rounded bg-gradient-to-r from-[#3A4EFB] to-[#33A4FA]" />
                <div className="h-4 rounded bg-[#E3FF3B]" />
              </div>
            }
          />
        );

      case "health":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#F0F7FF] p-1.5">
                <div className="rounded bg-[#33A4FA] p-1.5 text-white">
                  <div className="text-[6.5px] opacity-90">Antrean Poli Umum</div>
                  <div className="text-[10px] font-extrabold">A-014</div>
                </div>
                <div className="h-8 rounded bg-white border border-[#DEE0ED] p-1">
                  <div className="h-1.5 w-3/4 rounded bg-[#252943]" />
                  <div className="mt-1 h-1.5 w-1/2 rounded bg-[#33A4FA]" />
                </div>
                <div className="h-5 rounded bg-[#3A4EFB]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-white p-1.5">
                <div className="text-[7px] font-bold text-[#252943]">Jadwal Dokter</div>
                <div className="h-7 rounded bg-[#EEF0F8]" />
                <div className="h-7 rounded bg-[#EEF0F8]" />
                <div className="h-5 rounded bg-[#E3FF3B]" />
              </div>
            }
          />
        );

      case "property":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-2">
                <div className="h-12 rounded bg-gradient-to-r from-[#252943] to-[#3A4EFB] p-1.5 text-white flex flex-col justify-between">
                  <span className="text-[6.5px] font-bold text-[#E3FF3B]">CLUSTER MALANG</span>
                  <span className="text-[8px] font-bold">Simulasi KPR Instan</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-7 rounded bg-white border border-[#DEE0ED]" />
                  <div className="h-7 rounded bg-white border border-[#DEE0ED]" />
                  <div className="h-7 rounded bg-[#E3FF3B]/60" />
                </div>
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-white p-1.5">
                <div className="h-8 rounded bg-[#3A4EFB]" />
                <div className="h-2 w-4/5 rounded bg-[#252943]" />
                <div className="h-5 rounded bg-[#33A4FA]" />
              </div>
            }
          />
        );

      case "education":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-2">
                <div className="rounded bg-gradient-to-r from-[#3A4EFB] to-[#33A4FA] p-1.5 text-white">
                  <div className="text-[7px] font-bold">KelasNalar LMS</div>
                  <div className="mt-1 h-1.5 w-4/5 rounded bg-[#E3FF3B]" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-8 rounded bg-white border border-[#DEE0ED]" />
                  <div className="h-8 rounded bg-white border border-[#DEE0ED]" />
                </div>
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#252943] p-1.5 text-white">
                <div className="text-[6.5px] text-[#E3FF3B] font-bold">86% SELESAI</div>
                <div className="h-6 rounded bg-white/15" />
                <div className="h-5 rounded bg-[#33A4FA]" />
              </div>
            }
          />
        );

      case "ecommerce":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-1.5">
                <div className="h-11 rounded-md bg-gradient-to-r from-[#3A4EFB] to-[#33A4FA] p-1.5 text-white">
                  <div className="text-[7px] font-bold">Koleksi UMKM</div>
                  <div className="mt-0.5 inline-block rounded bg-[#E3FF3B] px-1 text-[6px] font-extrabold text-[#252943]">
                    QRIS READY
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-9 rounded bg-white border border-[#DEE0ED]" />
                  <div className="h-9 rounded bg-white border border-[#DEE0ED]" />
                </div>
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#252943] p-1.5 text-white">
                <div className="h-11 rounded bg-[#33A4FA]/30" />
                <div className="h-2 w-3/4 rounded bg-white/80" />
                <div className="h-2 w-1/2 rounded bg-[#33A4FA]" />
                <div className="h-6 rounded bg-[#E3FF3B]" />
              </div>
            }
          />
        );

      case "b2b":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#1B1E35] p-2 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-bold text-[#E3FF3B]">B2B ANALYTICS</span>
                  <span className="h-2 w-2 rounded-full bg-[#33A4FA]" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-7 rounded bg-[#3A4EFB]/40" />
                  <div className="h-7 rounded bg-[#33A4FA]/35" />
                  <div className="h-7 rounded bg-[#E3FF3B]/80" />
                </div>
                <div className="h-7 rounded bg-white/10" />
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#F7F8FC] p-1.5">
                <div className="text-[6.5px] font-bold text-[#252943]">Scan Stok</div>
                <div className="h-9 rounded bg-[#252943]" />
                <div className="h-4 rounded bg-[#3A4EFB]" />
              </div>
            }
          />
        );

      case "branding":
      default:
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#252943] p-1.5 text-white">
                <div className="text-[7px] font-bold text-[#E3FF3B]">BRAND SYSTEM</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-8 rounded bg-[#3A4EFB]" />
                  <div className="h-8 rounded bg-[#33A4FA]" />
                </div>
                <div className="h-6 rounded bg-[#E3FF3B]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#F7F8FC] p-1.5">
                <div className="h-9 rounded bg-gradient-to-br from-[#3A4EFB] to-[#33A4FA]" />
                <div className="h-2 w-4/5 rounded bg-[#252943]" />
                <div className="h-2 w-3/5 rounded bg-[#DEE0ED]" />
                <div className="h-5 rounded bg-[#252943]" />
              </div>
            }
          />
        );
    }
  };

  return (
    <div
      className="relative flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-xl p-4"
      style={{
        background: `linear-gradient(135deg, ${item.surfaceTint} 0%, ${item.secondaryAccent} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-30"
        style={{ backgroundColor: item.accent }}
      />
      <div className="relative z-10 w-full transition-transform duration-300 group-hover:-translate-y-1">
        {renderScene()}
      </div>
    </div>
  );
}
