import {
  Briefcase,
  Building2,
  GraduationCap,
  Stethoscope,
  Store,
  Utensils,
} from "lucide-react";
import { TARGET_SECTORS, type TargetSectorItem } from "@/data/homepage";
import { Reveal } from "./Reveal";

function SectorIcon({ icon }: { icon: TargetSectorItem["icon"] }) {
  const cls = "h-4 w-4 shrink-0 text-[#580AC7]";
  switch (icon) {
    case "utensils":
      return <Utensils className={cls} />;
    case "stethoscope":
      return <Stethoscope className={cls} />;
    case "briefcase":
      return <Briefcase className={cls} />;
    case "building":
      return <Building2 className={cls} />;
    case "graduation":
      return <GraduationCap className={cls} />;
    case "store":
      return <Store className={cls} />;
  }
}

export function TrustStrip() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="scroll-mt-20 w-full rounded-t-[28px] bg-[#F3F3F9] py-11 min-[1025px]:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal>
          <h2
            id="trust-heading"
            className="text-center font-heading text-[17px] font-semibold text-[#454545] min-[769px]:text-lg min-[1025px]:text-[20px]"
          >
            Dirancang Khusus untuk UMKM Skala Menengah &amp; Perusahaan B2B Lokal
          </h2>

          {/* Responsive grid ensures 3x2 symmetry at 768px & 1024px (zero orphan) and 1 full row at 1440px */}
          <div className="mt-7 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:mt-8 min-[1025px]:flex min-[1025px]:flex-wrap min-[1025px]:items-center min-[1025px]:justify-center min-[1025px]:gap-4">
            {TARGET_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="inline-flex items-center justify-center min-[1025px]:justify-start gap-2.5 rounded-xl border border-[#E4D7FA] bg-[#FFFFFF] px-4 py-2.5 shadow-[0_2px_10px_rgba(17,17,17,0.03)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#CFB8F6] hover:shadow-[0_8px_20px_rgba(88,10,199,0.08)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F4EEFC]">
                  <SectorIcon icon={sector.icon} />
                </span>
                <span className="font-heading text-xs font-semibold text-[#111111] min-[1025px]:text-[13.5px]">
                  {sector.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
