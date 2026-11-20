import type { ServiceItem, StatItem } from "@/data/homepage";

/** Bold neo-editorial SVG illustrations for the 4 service cards. */
export function ServiceIllustration({ icon }: { icon: ServiceItem["icon"] }) {
  switch (icon) {
    case "palette":
      return (
        <svg width="58" height="58" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <rect x="10" y="14" width="40" height="36" rx="6" fill="#5EEAD4" stroke="#111111" strokeWidth="2.4" />
          <rect x="16" y="20" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
          <path d="M22 36L31 27L36 31" stroke="#580AC7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 12L54 20L46 48L28 40L36 12Z" fill="#FB923C" fillOpacity="0.18" />
          <path d="M44 10L51 17L30 38L23 39L24 32L44 10Z" fill="#FB7185" stroke="#111111" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="20" cy="24" r="2" fill="#580AC7" />
        </svg>
      );
    case "code":
      return (
        <svg width="58" height="58" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <rect x="18" y="14" width="36" height="24" rx="4" fill="#FACC15" stroke="#111111" strokeWidth="2.4" />
          <rect x="22" y="18" width="28" height="16" rx="2" fill="#FFFFFF" stroke="#111111" strokeWidth="1.8" />
          <path d="M12 40H56L52 46H16L12 40Z" fill="#E4E4E7" stroke="#111111" strokeWidth="2.2" strokeLinejoin="round" />
          <rect x="9" y="24" width="18" height="28" rx="4" fill="#5EEAD4" stroke="#111111" strokeWidth="2.4" />
          <path d="M31 24L27 26.5L31 29M41 24L45 26.5L41 29M37.5 22.5L34.5 30.5" stroke="#580AC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 35L13 38L15 41M21 35L23 38L21 41" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg width="58" height="58" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <rect x="18" y="14" width="28" height="38" rx="5" fill="#2DD4BF" stroke="#111111" strokeWidth="2.4" />
          <rect x="23" y="20" width="18" height="24" rx="2" fill="#FFFFFF" stroke="#111111" strokeWidth="1.8" />
          <path d="M29 29L26 32L29 35M35 29L38 32L35 35" stroke="#580AC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 26V16M14 16L10 20M14 16L18 20" stroke="#FB923C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 38V24M50 24L46 28M50 24L54 28" stroke="#FB923C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="40" r="5" fill="#FDE047" stroke="#111111" strokeWidth="2" />
        </svg>
      );
    case "compass":
      return (
        <svg width="58" height="58" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="28" r="17" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M32 14C25.9 14 21 18.9 21 25C21 28.9 23.1 32.3 26.2 34.2L27 39H37L37.8 34.2C40.9 32.3 43 28.9 43 25C43 18.9 38.1 14 32 14Z" fill="#FB7185" stroke="#111111" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M27 44H37" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M29 48H35" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M27 25L31 29L38 21" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="24" r="3.5" fill="#580AC7" />
          <circle cx="50" cy="24" r="3.5" fill="#137D88" />
        </svg>
      );
  }
}

/** Custom editorial illustrations for each Bento stat card. */
export function StatsIllustration({ id }: { id: StatItem["id"] }) {
  switch (id) {
    case "projects":
      return (
        <svg
          viewBox="0 0 260 175"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-36 w-auto shrink-0 min-[1025px]:h-44"
          aria-hidden="true"
        >
          {/* Dot matrices */}
          <circle cx="24" cy="144" r="2.5" fill="#2DD4BF" />
          <circle cx="33" cy="144" r="2.5" fill="#2DD4BF" />
          <circle cx="24" cy="153" r="2.5" fill="#2DD4BF" />
          <circle cx="33" cy="153" r="2.5" fill="#2DD4BF" />
          <circle cx="222" cy="26" r="2.5" fill="#FB923C" />
          <circle cx="231" cy="26" r="2.5" fill="#FB923C" />
          <circle cx="222" cy="35" r="2.5" fill="#FB923C" />

          {/* Store badges */}
          <rect x="16" y="22" width="44" height="44" rx="10" fill="#FFFFFF" stroke="#111111" strokeWidth="2.5" />
          <path d="M31 33L49 44L31 55V33Z" fill="#34D399" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
          <rect x="16" y="76" width="44" height="44" rx="10" fill="#38BDF8" stroke="#111111" strokeWidth="2.5" />
          <path d="M38 87L29 107M38 87L47 107M31 101H45" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />

          {/* Phone silhouette */}
          <rect x="76" y="16" width="52" height="90" rx="8" fill="#2DD4BF" stroke="#111111" strokeWidth="2.6" />
          <rect x="82" y="24" width="40" height="72" rx="4" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />

          {/* Orange laptop */}
          <path d="M88 46H204L192 126H76L88 46Z" fill="#FB923C" stroke="#111111" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M96 56H190L181 116H87L96 56Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
          <rect x="122" y="76" width="38" height="22" rx="4" fill="#FACC15" stroke="#111111" strokeWidth="2" />
          <path d="M160 87H174M174 87V76H182" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 126H194L184 156H42L52 126Z" fill="#FB923C" stroke="#111111" strokeWidth="2.6" strokeLinejoin="round" />
          <rect x="96" y="136" width="30" height="12" rx="3" fill="#FACC15" stroke="#111111" strokeWidth="2" />

          {/* Web globe badge */}
          <rect x="156" y="14" width="52" height="52" rx="11" fill="#FFFFFF" stroke="#111111" strokeWidth="2.5" />
          <circle cx="182" cy="40" r="16" fill="#5EEAD4" stroke="#111111" strokeWidth="2.2" />
          <ellipse cx="182" cy="40" rx="7" ry="16" stroke="#111111" strokeWidth="2" />
          <path d="M166 40H198" stroke="#111111" strokeWidth="2" />
        </svg>
      );

    case "clients":
      return (
        <svg
          viewBox="0 0 260 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[240px]"
          aria-hidden="true"
        >
          <path d="M10 150C25 102 74 78 130 78C186 78 235 102 250 150H10Z" fill="#272742" />
          <path d="M40 32L76 24L70 52L46 58L40 32Z" fill="#FDE047" stroke="#580AC7" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M188 26L222 36L212 60L182 52L188 26Z" fill="#FDE047" stroke="#580AC7" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Handshake */}
          <path d="M74 66C90 54 114 54 130 68L154 88C160 93 158 103 150 107L120 120C112 123 102 121 96 114L74 88C67 80 68 71 74 66Z" fill="#FB923C" stroke="#111111" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M184 66C168 54 144 54 128 68L104 88C98 93 100 103 108 107L138 120C146 123 156 121 162 114L184 88C191 80 190 71 184 66Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M126 108L134 116M136 100L144 108M146 92L154 100" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M130 14L133 21L140 24L133 27L130 34L127 27L120 24L127 21L130 14Z" fill="#FACC15" />
        </svg>
      );

    case "downloads":
      return (
        <svg width="72" height="62" viewBox="0 0 80 70" fill="none" aria-hidden="true">
          <rect x="16" y="8" width="22" height="22" rx="5" transform="rotate(-12 16 8)" fill="#5EEAD4" stroke="#111111" strokeWidth="2" />
          <rect x="44" y="6" width="22" height="22" rx="5" transform="rotate(14 44 6)" fill="#38BDF8" stroke="#111111" strokeWidth="2" />
          <path d="M22 46H58C64 46 68 41 68 35.5C68 30.3 64 26 58.8 25.6C56.8 18.8 50.5 14 43 14C34 14 26.8 21.1 26.5 30C21.7 30.8 18 34.9 18 39.8C18 43.3 19.8 46 22 46Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2.4" />
          <path d="M40 28V56M40 56L31 47M40 56L49 47" stroke="#FB923C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 28V56M40 56L31 47M40 56L49 47" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "ratings":
      return (
        <svg width="72" height="62" viewBox="0 0 80 70" fill="none" aria-hidden="true">
          {[14, 24, 34, 44, 54].map((y, idx) => (
            <path
              key={y}
              d={`M20 ${y}L22 ${y + 3.5}L26 ${y + 4}L23 ${y + 6.5}L23.8 ${y + 10.5}L20 ${y + 8.5}L16.2 ${y + 10.5}L17 ${y + 6.5}L14 ${y + 4}L18 ${y + 3.5}Z`}
              fill={idx < 4 ? "#FACC15" : "#D4D4D8"}
              stroke="#111111"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="52" cy="22" r="9" fill="#FED7AA" stroke="#111111" strokeWidth="2.2" />
          <path d="M43 20C44 13 59 12 61 21C58 17 48 16 43 20Z" fill="#111111" />
          <path d="M38 56C38 44 44 37 52 37C60 37 66 44 66 56H38Z" fill="#FB923C" stroke="#111111" strokeWidth="2.2" />
          <rect x="46" y="42" width="12" height="16" rx="2.5" fill="#38BDF8" stroke="#111111" strokeWidth="1.8" />
        </svg>
      );

    case "retention":
    default:
      return (
        <svg width="72" height="62" viewBox="0 0 80 70" fill="none" aria-hidden="true">
          <path d="M20 26C24 14 38 9 50 14C56 16.5 60 21 62 27" stroke="#2DD4BF" strokeWidth="5" strokeLinecap="round" />
          <path d="M60 44C56 56 42 61 30 56C24 53.5 20 49 18 43" stroke="#2DD4BF" strokeWidth="5" strokeLinecap="round" />
          <rect x="29" y="18" width="24" height="32" rx="4" transform="rotate(-8 29 18)" fill="#FFFFFF" stroke="#111111" strokeWidth="2.2" />
          <path d="M35 28L47 26M36 35L48 33M37 42L45 41" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
          <path d="M51 12L58 18L47 36L41 37L42 30L51 12Z" fill="#FB923C" stroke="#111111" strokeWidth="1.8" />
        </svg>
      );
  }
}

/** Playful 3x2 avatar card grid beside the Testimonials headline. */
export function TestimonialsPeopleGrid() {
  const tiles = [
    { bg: "#FDE047", hair: "#111111", shirt: "#F472B6", skin: "#FDE68A" },
    { bg: "#BAE6FD", hair: "#1E293B", shirt: "#FACC15", skin: "#FED7AA" },
    { bg: "#C4B5FD", hair: "#27272A", shirt: "#38BDF8", skin: "#FDBA74" },
    { bg: "#DDD6FE", hair: "#18181B", shirt: "#FB923C", skin: "#FDE68A" },
    { bg: "#FB923C", hair: "#111111", shirt: "#FACC15", skin: "#FED7AA" },
    { bg: "#2DD4BF", hair: "#1E1B4B", shirt: "#FB7185", skin: "#FDBA74" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 shrink-0" aria-hidden="true">
      {tiles.map((tile, idx) => (
        <div
          key={idx}
          className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#111111] shadow-[0_4px_0_#111111]"
          style={{ backgroundColor: tile.bg }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="20" r="9.5" fill={tile.skin} stroke="#111111" strokeWidth="2.2" />
            <path d="M16.5 18C17.5 10 34.5 10 35.5 18C32 14 20 14 16.5 18Z" fill={tile.hair} />
            <circle cx="22.8" cy="20.5" r="1.3" fill="#111111" />
            <circle cx="29.2" cy="20.5" r="1.3" fill="#111111" />
            <path d="M23.5 24.5C25 26 27 26 28.5 24.5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 46C12 36 18 32 26 32C34 32 40 36 40 46" fill={tile.shirt} stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/** Paper-plane & teal screen illustration for the CTA right column. */
export function CtaIllustration() {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[380px] h-auto"
      aria-hidden="true"
    >
      {/* Background peach & lavender blobs */}
      <circle cx="150" cy="195" r="68" fill="#FCEBE6" />
      <circle cx="310" cy="110" r="64" fill="#F4EEFC" />

      {/* Coral polka dots */}
      <circle cx="112" cy="145" r="3" fill="#FB923C" />
      <circle cx="126" cy="145" r="3" fill="#FB923C" />
      <circle cx="119" cy="158" r="3" fill="#FB923C" />
      <circle cx="133" cy="158" r="3" fill="#FB923C" />

      {/* Teal tablet screen */}
      <rect x="165" y="72" width="168" height="176" rx="34" fill="#2DD4BF" stroke="#111111" strokeWidth="4.5" />
      {/* White dotted grid inside tablet */}
      <path d="M205 110L248 154M220 96L264 140M190 124L234 168" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 11" />

      {/* Paper airplane */}
      <path d="M120 44L194 74L154 96L120 44Z" fill="#FACC15" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M120 44L176 85L154 96L120 44Z" fill="#FB923C" stroke="#111111" strokeWidth="2.6" strokeLinejoin="round" />

      {/* Stylized pointing hand / fingers */}
      <path d="M286 154C266 138 242 152 246 172L284 218C294 230 314 230 326 218" fill="#FFFFFF" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Sparkle stars */}
      <path d="M288 30L294 46L310 52L294 58L288 74L282 58L266 52L282 46L288 30Z" fill="#FFFFFF" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
      <path d="M150 184L155 196L167 201L155 206L150 218L145 206L133 201L145 196L150 184Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2.8" strokeLinejoin="round" />
    </svg>
  );
}

/** Floating pastel organic petal/leaf shapes on Portfolio outer margins. */
export function OrganicPetalAccent({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <svg
        width="130"
        height="220"
        viewBox="0 0 130 220"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none hidden min-[1025px]:block absolute -left-8 top-44 opacity-80"
      >
        <path d="M18 30C62 10 108 32 112 72C116 112 74 134 26 116C-2 105 -8 42 18 30Z" fill="#E9D5FF" fillOpacity="0.65" stroke="#580AC7" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M4 118C44 96 92 112 96 146C100 180 56 202 12 186C-10 176 -14 130 4 118Z" fill="#FCEBE6" stroke="#F0785A" strokeOpacity="0.22" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg
      width="130"
      height="220"
      viewBox="0 0 130 220"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none hidden min-[1025px]:block absolute -right-8 bottom-36 opacity-80"
    >
      <path d="M112 30C68 10 22 32 18 72C14 112 56 134 104 116C132 105 138 42 112 30Z" fill="#E9D5FF" fillOpacity="0.65" stroke="#580AC7" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M126 118C86 96 38 112 34 146C30 180 74 202 118 186C140 176 144 130 126 118Z" fill="#FCEBE6" stroke="#F0785A" strokeOpacity="0.22" strokeWidth="1.5" />
    </svg>
  );
}
