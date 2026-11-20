interface NbsLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/** Original geometric Nalar Digital wordmark with 3x3 teal/purple rounded-square grid. */
export function NbsLogo({ variant = "light", className = "" }: NbsLogoProps) {
  const textColor = variant === "dark" ? "#FFFFFF" : "#1E1B4B";
  const purple = variant === "dark" ? "#9D6BFF" : "#580AC7";

  return (
    <span className={`inline-flex items-center gap-2 min-[480px]:gap-2.5 select-none whitespace-nowrap ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 min-[480px]:h-7 min-[480px]:w-7 shrink-0"
        aria-hidden="true"
      >
        {/* Left column: Teal (#137D88) */}
        <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="2" fill="#137D88" />
        <rect x="1.5" y="10.75" width="6.5" height="6.5" rx="2" fill="#137D88" />
        <rect x="1.5" y="20" width="6.5" height="6.5" rx="2" fill="#137D88" />
        {/* Middle column: Purple (#580AC7) */}
        <rect x="10.75" y="1.5" width="6.5" height="6.5" rx="2" fill={purple} />
        <rect x="10.75" y="10.75" width="6.5" height="6.5" rx="2" fill={purple} />
        <rect x="10.75" y="20" width="6.5" height="6.5" rx="2" fill={purple} />
        {/* Right column: Purple (#580AC7) */}
        <rect x="20" y="1.5" width="6.5" height="6.5" rx="2" fill={purple} />
        <rect x="20" y="10.75" width="6.5" height="6.5" rx="2" fill={purple} />
        <rect x="20" y="20" width="6.5" height="6.5" rx="2" fill={purple} />
      </svg>
      <span
        className="font-heading text-[19px] min-[480px]:text-[22px] font-bold tracking-tight leading-none"
        style={{ color: textColor }}
      >
        nalar{" "}
        <span className="font-semibold" style={{ color: purple }}>
          digital
        </span>
        <span className="text-[#137D88]">.</span>
      </span>
    </span>
  );
}

export const NalarLogo = NbsLogo;
