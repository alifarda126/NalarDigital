import { CtaIllustration } from "./EditorialIllustrations";
import { Reveal } from "./Reveal";

interface CtaSectionProps {
  onOpenContact: (topic?: string) => void;
}

export function CtaSection({ onOpenContact }: CtaSectionProps) {
  return (
    <section
      id="contact-cta"
      aria-labelledby="cta-heading"
      className="relative overflow-x-clip bg-[#FFFFFF] py-14 min-[769px]:py-16 min-[1025px]:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 min-[769px]:grid-cols-12 min-[769px]:px-8 min-[1025px]:px-10">
        <Reveal className="text-center min-[769px]:col-span-6 min-[769px]:text-left">
          <h2
            id="cta-heading"
            className="font-heading text-[30px] leading-tight font-bold text-[#111111] min-[480px]:text-[34px] min-[1025px]:text-[44px]"
          >
            Siap Tumbuh Berbasis Data?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#454545] min-[769px]:mx-0 min-[1025px]:text-lg">
            Ceritakan tantangan digital bisnis Anda dan jadwalkan Discovery &amp; Mini-Audit Gratis bersama tim Nalar Digital — tanpa komitmen awal!
          </p>
          <div className="mt-8 flex justify-center min-[769px]:justify-start">
            <button
              type="button"
              onClick={() => onOpenContact("Discovery & Mini-Audit Gratis")}
              className="inline-flex min-h-[48px] w-full min-[480px]:w-auto items-center justify-center gap-2 rounded-lg bg-[#580AC7] px-7 py-3.5 font-heading text-sm font-semibold text-[#FFFFFF] shadow-[0_14px_30px_rgba(88,10,199,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#4707A3] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              Minta Mini-Audit Gratis →
            </button>
          </div>
        </Reveal>

        <Reveal
          delayMs={120}
          className="flex justify-center min-[769px]:col-span-6 min-[769px]:justify-end"
        >
          <CtaIllustration />
        </Reveal>
      </div>
    </section>
  );
}
