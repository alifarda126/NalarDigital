import type { PortfolioItem } from "@/data/homepage";

function DualPhones({
  left,
  right,
  darkFrame = true,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  darkFrame?: boolean;
}) {
  const frameBorder = darkFrame ? "border-[#18181B]" : "border-[#3F3F46]";
  return (
    <div className="relative mx-auto flex h-[176px] w-full max-w-[260px] items-center justify-center">
      <div
        className={`relative z-10 w-[124px] -translate-x-5 translate-y-2 rounded-[18px] border-[3.5px] ${frameBorder} bg-[#FFFFFF] p-1.5 shadow-[0_14px_26px_rgba(17,17,17,0.22)]`}
      >
        <div className="mx-auto mb-1 h-1 w-7 rounded-full bg-[#E4E4E7]" />
        {left}
      </div>
      <div
        className={`relative z-20 w-[126px] translate-x-6 -translate-y-1 rounded-[18px] border-[3.5px] ${frameBorder} bg-[#FFFFFF] p-1.5 shadow-[0_18px_32px_rgba(17,17,17,0.26)]`}
      >
        <div className="mx-auto mb-1 h-1 w-7 rounded-full bg-[#E4E4E7]" />
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
      <div className="w-[222px] -translate-x-3 rounded-xl border border-[#D4D4D8] bg-[#FFFFFF] shadow-[0_14px_28px_rgba(17,17,17,0.2)] overflow-hidden">
        <div className="flex items-center gap-1 border-b border-[#E4E4E7] bg-[#F4F4F5] px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FCA5A5]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FDE047]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#86EFAC]" />
        </div>
        <div className="p-2">{desktop}</div>
      </div>
      <div className="absolute right-1 bottom-1 z-20 w-[86px] rounded-[14px] border-[3px] border-[#18181B] bg-[#FFFFFF] p-1 shadow-[0_14px_24px_rgba(17,17,17,0.26)]">
        <div className="mx-auto mb-1 h-0.5 w-5 rounded-full bg-[#E4E4E7]" />
        {phone}
      </div>
    </div>
  );
}

/** Vivid coded multi-device showcase mockups matching the visual density of each project. */
export function PortfolioMockup({ item }: { item: PortfolioItem }) {
  const renderScene = () => {
    switch (item.kind) {
      case "streaming":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 bg-[#18181B] rounded-lg p-2 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#DC2626] px-1.5 py-0.5 text-[7px] font-bold">
                    LIVE TV
                  </span>
                  <span className="text-[7px] text-[#A1A1AA]">HD Stream</span>
                </div>
                <div className="h-12 rounded bg-gradient-to-r from-[#DC2626]/70 to-[#580AC7]/60 p-1.5 flex items-end">
                  <span className="text-[8px] font-semibold">Cinema Premiere</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-6 rounded bg-white/10" />
                  <div className="h-6 rounded bg-white/10" />
                  <div className="h-6 rounded bg-white/10" />
                </div>
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#18181B] p-1.5 text-white">
                <div className="h-10 rounded bg-[#DC2626]" />
                <div className="h-2 w-4/5 rounded bg-white/40" />
                <div className="h-8 rounded bg-white/15" />
              </div>
            }
          />
        );

      case "insurance":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#ECFDF5] p-1.5">
                <div className="rounded-md bg-[#16A34A] p-1.5 text-white">
                  <div className="text-[7px] opacity-85">JHT Balance</div>
                  <div className="text-[9px] font-bold">Rp 48.2M</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-7 rounded bg-white" />
                  <div className="h-7 rounded bg-white" />
                </div>
                <div className="h-7 rounded bg-white" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#F0FDF4] p-1.5">
                <div className="text-[7px] font-bold text-[#064E3B]">
                  Claim Status
                </div>
                <div className="h-2 w-full rounded bg-[#86EFAC]" />
                <div className="h-10 rounded-md bg-white p-1 shadow-2xs">
                  <div className="h-1.5 w-3/4 rounded bg-[#16A34A]" />
                  <div className="mt-1 h-1.5 w-1/2 rounded bg-[#D4D4D8]" />
                </div>
                <div className="h-6 rounded bg-[#16A34A]" />
              </div>
            }
          />
        );

      case "ecommerce":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#EFF6FF] p-1.5">
                <div className="h-3 rounded bg-white" />
                <div className="h-12 rounded-md bg-[#1D4ED8] p-1.5 text-white">
                  <div className="text-[8px] font-bold">Flash Deal</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-9 rounded bg-white" />
                  <div className="h-9 rounded bg-white" />
                </div>
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#0F172A] p-1.5 text-white">
                <div className="h-12 rounded bg-[#2563EB]/40" />
                <div className="h-2 w-3/4 rounded bg-white/80" />
                <div className="h-2 w-1/2 rounded bg-[#60A5FA]" />
                <div className="h-6 rounded bg-[#2563EB]" />
              </div>
            }
          />
        );

      case "transit":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#F0F9FF] p-1.5">
                <div className="rounded bg-[#0284C7] p-1.5 text-white text-[7px] font-bold">
                  Lebak Bulus → HI
                </div>
                <div className="h-10 rounded bg-white p-1">
                  <div className="h-1.5 w-4/5 rounded bg-[#0284C7]" />
                  <div className="mt-1.5 h-1.5 w-2/3 rounded bg-[#BAE6FD]" />
                </div>
                <div className="h-7 rounded bg-[#E0F2FE]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#0C4A6E] p-1.5 text-white">
                <div className="text-[7px] font-semibold">QR Gate Ticket</div>
                <div className="mx-auto h-14 w-14 rounded-lg bg-white p-1.5">
                  <div className="h-full w-full rounded bg-[#0C4A6E]/20" />
                </div>
                <div className="h-4 rounded bg-[#0284C7]" />
              </div>
            }
          />
        );

      case "sales":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#EFF6FF] p-1.5">
                <div className="rounded bg-[#1E40AF] p-1.5 text-white">
                  <div className="text-[7px] opacity-80">Field Target</div>
                  <div className="text-[10px] font-bold">94.2%</div>
                </div>
                <div className="h-14 rounded bg-white p-1.5 flex items-end gap-1">
                  <span className="w-1/4 h-4 rounded-t bg-[#93C5FD]" />
                  <span className="w-1/4 h-7 rounded-t bg-[#60A5FA]" />
                  <span className="w-1/4 h-6 rounded-t bg-[#3B82F6]" />
                  <span className="w-1/4 h-10 rounded-t bg-[#1E40AF]" />
                </div>
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#FFFFFF] p-1.5">
                <div className="text-[7px] font-bold text-[#1E40AF]">Outlet Scan</div>
                <div className="h-14 rounded-lg bg-[#DBEAFE]" />
                <div className="h-6 rounded bg-[#1D4ED8]" />
              </div>
            }
          />
        );

      case "ticketing":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#0F172A] p-1.5 text-white">
                <div className="text-[7px] font-bold text-[#FACC15]">NOW SHOWING</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-14 rounded bg-[#1D4ED8]" />
                  <div className="h-14 rounded bg-[#E11D48]" />
                </div>
                <div className="h-4 rounded bg-white/15" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#F8FAFC] p-1.5">
                <div className="text-[7px] font-bold text-[#0F172A]">Select Seats</div>
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-xs ${
                        i === 7 || i === 8 ? "bg-[#1D4ED8]" : "bg-[#CBD5E1]"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 h-5 rounded bg-[#0F172A]" />
              </div>
            }
          />
        );

      case "automotive":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#FFFFFF] p-1.5">
                <div className="rounded bg-[#1E3A8A] p-1.5 text-white text-[7px] font-bold">
                  New Hatchback
                </div>
                <div className="h-11 rounded bg-[#FEE2E2]" />
                <div className="h-7 rounded bg-[#F4F4F5]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#FFF7ED] p-1.5">
                <div className="text-[7px] font-bold text-[#EA580C]">Service Booking</div>
                <div className="h-9 rounded bg-white" />
                <div className="h-9 rounded bg-white" />
                <div className="h-4 rounded bg-[#EA580C]" />
              </div>
            }
          />
        );

      case "rental":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#F0FDFA] p-1.5">
                <div className="h-5 rounded bg-[#0D9488] p-1 text-[7px] font-bold text-white">
                  Jakarta Selatan
                </div>
                <div className="h-11 rounded bg-white" />
                <div className="h-7 rounded bg-[#CCFBF1]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#FFFFFF] p-1.5">
                <div className="h-10 rounded bg-[#99F6E4]" />
                <div className="h-2 w-4/5 rounded bg-[#134E4A]" />
                <div className="h-2 w-1/2 rounded bg-[#0D9488]" />
                <div className="h-6 rounded bg-[#0D9488]" />
              </div>
            }
          />
        );

      case "loyalty":
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#365314] p-1.5 text-white">
                <div className="text-[7px] font-bold text-[#BEF264]">JUARA POINTS</div>
                <div className="text-[11px] font-extrabold">12,480</div>
                <div className="h-11 rounded bg-white/15" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#F7FEE7] p-1.5">
                <div className="h-8 rounded bg-white" />
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-8 rounded bg-[#D9F99D]" />
                  <div className="h-8 rounded bg-white" />
                </div>
                <div className="h-4 rounded bg-[#65A30D]" />
              </div>
            }
          />
        );

      case "learning":
      case "corporate":
        return (
          <DesktopWithPhone
            desktop={
              <div className="space-y-1.5 rounded-lg bg-[#F0F9FF] p-2">
                <div className="h-11 rounded bg-[#0284C7] p-1.5 text-white">
                  <div className="text-[7px] font-bold uppercase opacity-80">
                    {item.kind === "learning" ? "Digital Academy" : "Corporate Portal"}
                  </div>
                  <div className="mt-1 h-2 w-2/3 rounded bg-white/90" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-8 rounded bg-white" />
                  <div className="h-8 rounded bg-white" />
                  <div className="h-8 rounded bg-white" />
                </div>
              </div>
            }
            phone={
              <div className="space-y-1 rounded-lg bg-[#F0F9FF] p-1.5">
                <div className="h-8 rounded bg-[#0369A1]" />
                <div className="h-5 rounded bg-white" />
                <div className="h-5 rounded bg-white" />
              </div>
            }
          />
        );

      case "eoffice":
      default:
        return (
          <DualPhones
            left={
              <div className="space-y-1.5 rounded-lg bg-[#1E3A8A] p-1.5 text-white">
                <div className="text-[7px] font-bold">Welcome Back</div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <span key={idx} className="h-3 rounded-full bg-white/25" />
                  ))}
                </div>
                <div className="h-5 rounded bg-[#3B82F6]" />
              </div>
            }
            right={
              <div className="space-y-1.5 rounded-lg bg-[#EFF6FF] p-1.5">
                <div className="h-9 rounded bg-[#2563EB] p-1.5 text-white text-[7px] font-bold">
                  3 Approvals
                </div>
                <div className="h-7 rounded bg-white" />
                <div className="h-7 rounded bg-white" />
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
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-25"
        style={{ backgroundColor: item.accent }}
      />
      <div className="relative z-10 w-full transition-transform duration-300 group-hover:-translate-y-1">
        {renderScene()}
      </div>
    </div>
  );
}
