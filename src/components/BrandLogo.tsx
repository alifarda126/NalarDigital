import Image from "next/image";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { imgClass: "h-6 w-auto", textClass: "text-[17px]" },
  md: { imgClass: "h-7 w-auto min-[480px]:h-8", textClass: "text-[19px] min-[480px]:text-[21px]" },
  lg: { imgClass: "h-9 w-auto min-[480px]:h-10", textClass: "text-[23px] min-[480px]:text-[26px]" },
} as const;

/**
 * Official Nalar Digital brand lockup featuring the transparent ND gradient mark.
 * Adapts contrast cleanly across light (#FFFFFF / #F7F8FC) and dark (#252943) surfaces.
 */
export function BrandLogo({
  variant = "light",
  size = "md",
  showWordmark = true,
  className = "",
}: BrandLogoProps) {
  const { imgClass, textClass } = SIZE_CONFIG[size];
  const isDark = variant === "dark";

  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap ${className}`}
    >
      <Image
        src="/images/brand/logo-nd-transparent.png"
        alt="Logo Nalar Digital"
        width={1024}
        height={526}
        priority
        className={`${imgClass} shrink-0 object-contain`}
      />
      {showWordmark && (
        <span
          className={`font-heading ${textClass} font-bold tracking-tight leading-none ${
            isDark ? "text-white" : "text-brand-navy"
          }`}
        >
          nalar{" "}
          <span
            className={`font-semibold ${
              isDark ? "text-brand-sky" : "text-brand-primary"
            }`}
          >
            digital
          </span>
          <span className={isDark ? "text-brand-lime" : "text-brand-sky"}>
            .
          </span>
        </span>
      )}
    </span>
  );
}
