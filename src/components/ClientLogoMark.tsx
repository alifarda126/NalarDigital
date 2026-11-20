interface ClientLogoMarkProps {
  id: string;
  name: string;
  variant?: "bare" | "mini" | "card";
}

const CLIENT_PALETTE: Record<
  string,
  {
    bg: string;
    fg: string;
    glyph: "rings" | "hex" | "spark" | "grid" | "wave" | "shield" | "bolt";
  }
> = {
  telkom: { bg: "#FEE2E2", fg: "#DC2626", glyph: "rings" },
  astra: { bg: "#DBEAFE", fg: "#1D4ED8", glyph: "hex" },
  google: { bg: "#E0E7FF", fg: "#4338CA", glyph: "spark" },
  gojek: { bg: "#DCFCE7", fg: "#15803D", glyph: "rings" },
  ovo: { bg: "#F3E8FF", fg: "#580AC7", glyph: "grid" },
  acer: { bg: "#ECFCCB", fg: "#4D7C0F", glyph: "wave" },
  pln: { bg: "#FEF9C3", fg: "#CA8A04", glyph: "bolt" },
  bpjs: { bg: "#D1FAE5", fg: "#047857", glyph: "shield" },
  paragon: { bg: "#EDE9FE", fg: "#6D28D9", glyph: "spark" },
  pegadaian: { bg: "#DCFCE7", fg: "#166534", glyph: "hex" },
  tbig: { bg: "#E0F2FE", fg: "#0369A1", glyph: "grid" },
  mrt: { bg: "#E0F2FE", fg: "#0284C7", glyph: "wave" },
  tixid: { bg: "#DBEAFE", fg: "#1E40AF", glyph: "bolt" },
  olx: { bg: "#CCFBF1", fg: "#0F766E", glyph: "rings" },
  erajaya: { bg: "#E0E7FF", fg: "#3730A3", glyph: "shield" },
};

function PlaceholderEmblem({
  glyph,
  fg,
  size = 18,
}: {
  glyph: string;
  fg: string;
  size?: number;
}) {
  switch (glyph) {
    case "rings":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke={fg} strokeWidth="2.2" />
          <circle cx="10" cy="10" r="2.6" fill={fg} />
        </svg>
      );
    case "hex":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2.5L16.5 6.25V13.75L10 17.5L3.5 13.75V6.25L10 2.5Z" stroke={fg} strokeWidth="2" />
          <circle cx="10" cy="10" r="2" fill={fg} />
        </svg>
      );
    case "spark":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2L12.1 7.9L18 10L12.1 12.1L10 18L7.9 12.1L2 10L7.9 7.9L10 2Z" fill={fg} />
        </svg>
      );
    case "grid":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="6" height="6" rx="1.5" fill={fg} />
          <rect x="11" y="3" width="6" height="6" rx="1.5" fill={fg} opacity="0.55" />
          <rect x="3" y="11" width="6" height="6" rx="1.5" fill={fg} opacity="0.55" />
          <rect x="11" y="11" width="6" height="6" rx="1.5" fill={fg} />
        </svg>
      );
    case "wave":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 12C5.2 7.5 7.5 7.5 10 10C12.5 12.5 14.8 12.5 17 8" stroke={fg} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2.5L16 5V9.8C16 13.6 13.4 16.4 10 17.5C6.6 16.4 4 13.6 4 9.8V5L10 2.5Z" stroke={fg} strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M11.5 2.5L5.5 11H10L8.5 17.5L14.5 9H10L11.5 2.5Z" fill={fg} />
        </svg>
      );
  }
}

/** Original stylized placeholder emblem + wordmark for client logo grids & cards. */
export function ClientLogoMark({
  id,
  name,
  variant = "bare",
}: ClientLogoMarkProps) {
  const palette = CLIENT_PALETTE[id] ?? {
    bg: "#F4EEFC",
    fg: "#580AC7",
    glyph: "rings" as const,
  };

  if (variant === "mini") {
    return (
      <span className="inline-flex items-center gap-1.5 select-none">
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: palette.bg }}
        >
          <PlaceholderEmblem glyph={palette.glyph} fg={palette.fg} size={13} />
        </span>
        <span
          className="font-heading text-xs font-bold tracking-tight"
          style={{ color: palette.fg }}
        >
          {name}
        </span>
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div
        title={name}
        className="group flex items-center justify-center gap-2.5 rounded-xl border border-[#ECECF4] bg-[#FFFFFF] px-3 py-3.5 shadow-[0_2px_10px_rgba(17,17,17,0.03)] transition-all hover:border-[#D9C6FA]"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: palette.bg }}
        >
          <PlaceholderEmblem glyph={palette.glyph} fg={palette.fg} />
        </span>
        <span className="font-heading text-[13px] font-semibold text-[#27272A]">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div
      title={name}
      className="group flex items-center justify-center gap-2.5 px-2 py-2 transition-transform duration-200 hover:scale-[1.03]"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: palette.bg }}
      >
        <PlaceholderEmblem glyph={palette.glyph} fg={palette.fg} />
      </span>
      <span
        className="font-heading text-[14px] min-[1025px]:text-[15px] leading-tight font-bold tracking-tight text-[#27272A] group-hover:text-[#000000]"
        style={{ color: palette.fg }}
      >
        {name}
      </span>
    </div>
  );
}
