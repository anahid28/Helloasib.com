// Stand-in project shots drawn as believable UI (browser pages, phone screens,
// dashboards) so the layout reads like a real portfolio until real
// screenshots arrive. Palettes are fixed: project imagery is never recoloured
// by the mood system.

export type ShotKind = "web" | "app" | "dash";

const TONES = [
  { bg: "#DCE8E4", ink: "#0E3B43", accent: "#F2994A", soft: "#F6FAF8", mid: "#9DC3B8" }, // teal / health
  { bg: "#E9E1D3", ink: "#22311F", accent: "#C2542D", soft: "#F7F2EA", mid: "#B9A88A" }, // sand / estate
  { bg: "#2A1B4A", ink: "#FFF4E8", accent: "#FF6A3D", soft: "#3B2A63", mid: "#8C6CF0" }, // night / events
  { bg: "#0F1A2B", ink: "#E6F0FF", accent: "#3DDC97", soft: "#16263D", mid: "#4F7CFF" }, // navy / fintech
  { bg: "#F1ECE4", ink: "#1D1D1B", accent: "#2F5BFF", soft: "#FFFFFF", mid: "#D9D2C5" }, // paper / brand
];

const F = "'Instrument Sans Variable','Instrument Sans',system-ui,sans-serif";
const S = "'Instrument Serif',Georgia,serif";

function Web({ t, title, c }: { t: number; title: string; c: (typeof TONES)[number] }) {
  const words = title.split(" ");
  return (
    <g>
      <rect width="1200" height="800" fill={c.bg} />
      {/* browser */}
      <g transform="translate(90 80)">
        <rect width="1020" height="720" rx="18" fill={c.soft} />
        <rect width="1020" height="46" rx="18" fill={c.mid} opacity="0.55" />
        <rect y="28" width="1020" height="18" fill={c.mid} opacity="0.55" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={28 + i * 22} cy="23" r="6.5" fill={c.ink} opacity={0.25 + i * 0.15} />
        ))}
        <rect x="380" y="13" width="260" height="20" rx="10" fill={c.soft} opacity="0.8" />
        {/* nav */}
        <text x="48" y="104" fontFamily={F} fontWeight="700" fontSize="22" fill={c.ink}>
          {words[0].toLowerCase()}.
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={560 + i * 92} y="92" width="64" height="9" rx="4.5" fill={c.ink} opacity="0.35" />
        ))}
        <rect x="900" y="80" width="80" height="34" rx="17" fill={c.ink} />
        {/* hero */}
        <text fontFamily={t % 2 ? S : F} fontWeight={t % 2 ? 400 : 600} fontSize="74" fill={c.ink} letterSpacing="-2">
          <tspan x="48" y="230">
            {words.slice(0, Math.ceil(words.length / 2)).join(" ")}
          </tspan>
          <tspan x="48" y="306">
            {words.slice(Math.ceil(words.length / 2)).join(" ") || "made simple"}
          </tspan>
        </text>
        <rect x="48" y="340" width="330" height="10" rx="5" fill={c.ink} opacity="0.3" />
        <rect x="48" y="362" width="260" height="10" rx="5" fill={c.ink} opacity="0.3" />
        <rect x="48" y="404" width="150" height="46" rx="23" fill={c.accent} />
        <rect x="212" y="404" width="130" height="46" rx="23" fill="none" stroke={c.ink} strokeOpacity="0.4" />
        {/* hero visual */}
        <g transform="translate(560 150)">
          <rect width="420" height="300" rx="14" fill={c.mid} />
          <circle cx={300 - t * 20} cy="140" r="110" fill={c.accent} opacity="0.9" />
          <rect x="30" y="200" width="200" height="70" rx="12" fill={c.soft} />
          <rect x="48" y="220" width="90" height="9" rx="4.5" fill={c.ink} opacity="0.5" />
          <rect x="48" y="240" width="140" height="9" rx="4.5" fill={c.ink} opacity="0.25" />
        </g>
        {/* cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${48 + i * 316} 500)`}>
            <rect width="296" height="190" rx="12" fill={i === 1 ? c.ink : c.bg} />
            <rect x="22" y="24" width="40" height="40" rx="10" fill={i === 1 ? c.accent : c.mid} />
            <rect x="22" y="120" width="160" height="12" rx="6" fill={i === 1 ? c.soft : c.ink} opacity="0.75" />
            <rect x="22" y="144" width="220" height="9" rx="4.5" fill={i === 1 ? c.soft : c.ink} opacity="0.3" />
          </g>
        ))}
      </g>
    </g>
  );
}

function App({ title, c }: { title: string; c: (typeof TONES)[number] }) {
  const phone = (x: number, r: number, variant: number) => (
    <g transform={`translate(${x} 90) rotate(${r} 170 330)`}>
      <rect width="340" height="680" rx="48" fill="#111" />
      <rect x="12" y="12" width="316" height="656" rx="38" fill={variant ? c.soft : c.bg} />
      <rect x="125" y="26" width="90" height="22" rx="11" fill="#111" />
      {variant === 0 ? (
        <g>
          <text x="34" y="110" fontFamily={F} fontWeight="700" fontSize="30" fill={c.ink}>
            Tonight
          </text>
          <rect x="34" y="132" width="120" height="9" rx="4.5" fill={c.ink} opacity="0.4" />
          <rect x="34" y="166" width="272" height="250" rx="22" fill={c.mid} />
          <circle cx="230" cy="250" r="70" fill={c.accent} />
          <text x="54" y="390" fontFamily={S} fontSize="40" fill={c.ink}>
            {title.split(" ")[0]}
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(34 ${440 + i * 62})`}>
              <rect width="52" height="52" rx="12" fill={i === 0 ? c.accent : c.soft} />
              <rect x="66" y="12" width="140" height="10" rx="5" fill={c.ink} opacity="0.75" />
              <rect x="66" y="32" width="96" height="8" rx="4" fill={c.ink} opacity="0.35" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="34" y="80" width="272" height="300" rx="22" fill={c.accent} />
          <text x="54" y="150" fontFamily={F} fontWeight="700" fontSize="44" fill={c.bg} letterSpacing="-1">
            Get
          </text>
          <text x="54" y="198" fontFamily={F} fontWeight="700" fontSize="44" fill={c.bg} letterSpacing="-1">
            tickets
          </text>
          <rect x="54" y="320" width="120" height="40" rx="20" fill={c.bg} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={34 + (i % 2) * 140} y={400 + Math.floor(i / 2) * 120} width="132" height="108" rx="16" fill={i === 1 ? c.mid : c.bg} opacity={i === 1 ? 1 : 0.6} />
          ))}
          <rect x="34" y="620" width="272" height="0.01" fill="none" />
        </g>
      )}
    </g>
  );
  return (
    <g>
      <rect width="1200" height="800" fill={c.bg} />
      <circle cx="600" cy="420" r="300" fill={c.soft} />
      {phone(260, -6, 0)}
      {phone(600, 5, 1)}
    </g>
  );
}

function Dash({ title, c }: { title: string; c: (typeof TONES)[number] }) {
  const bars = [0.4, 0.62, 0.48, 0.8, 0.55, 0.9, 0.7, 0.66, 0.95, 0.6, 0.78, 0.85];
  return (
    <g>
      <rect width="1200" height="800" fill={c.bg} />
      <g transform="translate(70 70)">
        <rect width="1060" height="700" rx="18" fill={c.soft} />
        <rect width="200" height="700" rx="18" fill={c.bg} opacity="0.6" />
        <text x="28" y="56" fontFamily={F} fontWeight="700" fontSize="22" fill={c.ink}>
          {title.split(" ")[0]}
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="28" y={100 + i * 44} width={i === 1 ? 144 : 110} height="28" rx="8" fill={i === 1 ? c.accent : c.ink} opacity={i === 1 ? 1 : 0.12} />
        ))}
        {/* KPIs */}
        {[150, 110, 130].map((w, i) => (
          <g key={i} transform={`translate(${232 + i * 270} 36)`}>
            <rect width="250" height="128" rx="14" fill={c.bg} opacity="0.7" />
            <rect x="22" y="24" width="90" height="9" rx="4.5" fill={c.ink} opacity="0.4" />
            <rect x="22" y="60" width={w} height="34" rx="8" fill={i === 0 ? c.accent : c.ink} opacity={i === 0 ? 1 : 0.7} />
          </g>
        ))}
        {/* chart */}
        <g transform="translate(232 190)">
          <rect width="790" height="300" rx="14" fill={c.bg} opacity="0.7" />
          {bars.map((b, i) => (
            <rect key={i} x={30 + i * 62} y={270 - b * 220} width="34" height={b * 220} rx="8" fill={i % 4 === 3 ? c.accent : c.mid} />
          ))}
          <path d="M30 200 C 200 120, 360 210, 520 110 S 720 60, 770 90" stroke={c.accent} strokeWidth="4" fill="none" />
        </g>
        {/* table */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(232 ${514 + i * 56})`}>
            <rect width="790" height="44" rx="10" fill={c.bg} opacity={i % 2 ? 0.35 : 0.7} />
            <circle cx="28" cy="22" r="11" fill={i === 0 ? c.accent : c.mid} />
            <rect x="54" y="17" width="180" height="10" rx="5" fill={c.ink} opacity="0.6" />
            <rect x="520" y="17" width="90" height="10" rx="5" fill={c.ink} opacity="0.35" />
            <rect x="690" y="12" width="74" height="20" rx="10" fill={c.accent} opacity="0.85" />
          </g>
        ))}
      </g>
    </g>
  );
}

export default function ProjectShot({ kind, tone, title }: { kind: ShotKind; tone: number; title: string }) {
  const c = TONES[tone % TONES.length];
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Placeholder visual for ${title}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {kind === "web" && <Web t={tone} title={title} c={c} />}
      {kind === "app" && <App title={title} c={c} />}
      {kind === "dash" && <Dash title={title} c={c} />}
    </svg>
  );
}
