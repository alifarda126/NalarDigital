import type { PlatformId } from "@/types/portfolio";

interface PlatformIconProps {
  platform: PlatformId;
  showLabel?: boolean;
}

const PLATFORM_META: Record<
  PlatformId,
  { label: string; colorClass: string; badgeBg: string }
> = {
  android: {
    label: "Android",
    colorClass: "text-[#16A34A]",
    badgeBg: "bg-[#ECFDF5] border-[#BBF7D0]",
  },
  ios: {
    label: "iOS",
    colorClass: "text-brand-navy",
    badgeBg: "bg-brand-soft border-brand-muted",
  },
  web: {
    label: "Web",
    colorClass: "text-brand-primary",
    badgeBg: "bg-[#EEF1FF] border-[#C9D1FF]",
  },
  uiux: {
    label: "UI/UX",
    colorClass: "text-[#0284C7]",
    badgeBg: "bg-[#EBF7FF] border-[#BAE6FD]",
  },
};

function PlatformSvg({ platform }: { platform: PlatformId }) {
  if (platform === "android") {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.6 9.48l1.84-3.18a.58.58 0 0 0-.21-.79.58.58 0 0 0-.79.21l-1.87 3.24a11.46 11.46 0 0 0-9.14 0L5.56 5.72a.58.58 0 0 0-.79-.21.58.58 0 0 0-.21.79l1.84 3.18A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 15zm10 0a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 17 15z" />
      </svg>
    );
  }

  if (platform === "ios") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.36 12.76c0-2.31 1.88-3.42 1.97-3.47-1.08-1.57-2.75-1.79-3.34-1.81-1.41-.14-2.77.84-3.49.84-.73 0-1.84-.82-3.03-.8-1.55.02-2.99.91-3.79 2.3-1.63 2.82-.42 6.99 1.15 9.27.78 1.12 1.7 2.37 2.9 2.33 1.17-.05 1.62-.75 3.04-.75 1.42 0 1.83.75 3.05.72 1.26-.02 2.05-1.13 2.81-2.26.9-1.31 1.26-2.59 1.28-2.66-.03-.01-2.55-.98-2.55-3.71zM14.07 6.02c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.85 1.04.08 2.09-.53 2.72-1.31z" />
      </svg>
    );
  }

  if (platform === "uiux") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

export function PlatformIcon({ platform, showLabel = false }: PlatformIconProps) {
  const meta = PLATFORM_META[platform];

  if (showLabel) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-heading text-[11px] font-semibold ${meta.badgeBg} ${meta.colorClass}`}
      >
        <PlatformSvg platform={platform} />
        <span>{meta.label}</span>
      </span>
    );
  }

  return (
    <span
      title={meta.label}
      aria-label={meta.label}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${meta.badgeBg} ${meta.colorClass}`}
    >
      <PlatformSvg platform={platform} />
    </span>
  );
}
