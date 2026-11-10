import type { ArtVariant } from "@/lib/content";

// Stand-in visuals for projects and experiments. They keep their own fixed
// palettes on purpose: real project imagery should never be recoloured by
// the mood system, so placeholders behave the same way.
const P = {
  orbit: ["#0E3B43", "#F2C14E", "#F78154", "#E9F1EF"],
  grid: ["#1D1E2C", "#E8E1D5", "#C9A227", "#6B7A8F"],
  glyph: ["#FF5D3A", "#1B1B1B", "#FFE8D6", "#7B2CBF"],
  bars: ["#0F1A2B", "#3DDC97", "#E6F0FF", "#4F7CFF"],
  frame: ["#EDE6DB", "#22311F", "#C2542D", "#9AB59A"],
  rings: ["#120F25", "#B9A7FF", "#FF7AB6", "#F4F1FF"],
};

export default function PlaceholderArt({
  variant,
  label,
  seed = 0,
  className = "",
}: {
  variant: ArtVariant;
  label?: string;
  seed?: number;
  className?: string;
}) {
  const c = P[variant];
  const s = (n: number) => ((Math.sin((seed + 1) * 9301 + n * 49297) + 1) / 2);

  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `Placeholder visual for ${label}` : "Placeholder visual"}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="800" height="600" fill={c[0]} />
      {variant === "orbit" && (
        <g>
          <circle cx={520} cy={300} r={210} fill={c[1]} />
          <circle cx={520 - 120 * s(1)} cy={300} r={120} fill={c[2]} style={{ mixBlendMode: "multiply" }} />
          <ellipse cx={400} cy={300} rx={360} ry={90} fill="none" stroke={c[3]} strokeWidth={2} transform="rotate(-18 400 300)" />
          <circle cx={130} cy={420} r={22} fill={c[3]} />
        </g>
      )}
      {variant === "grid" && (
        <g>
          {Array.from({ length: 6 }).map((_, i) =>
            Array.from({ length: 4 }).map((__, j) => (
              <rect
                key={`${i}-${j}`}
                x={60 + i * 118}
                y={60 + j * 124}
                width={96}
                height={100}
                rx={(i + j + seed) % 3 === 0 ? 50 : 4}
                fill={(i * 3 + j + seed) % 5 === 0 ? c[2] : (i + j) % 2 ? c[1] : c[3]}
                opacity={(i + j) % 2 ? 1 : 0.55}
              />
            ))
          )}
        </g>
      )}
      {variant === "glyph" && (
        <g>
          <text x={-20} y={560} fontFamily="'Archivo Variable', Archivo, sans-serif" fontWeight={900} fontSize={640} fill={c[2]} style={{ fontVariationSettings: '"wdth" 62' }}>
            A
          </text>
          <circle cx={600} cy={180} r={110} fill={c[1]} />
          <rect x={480} y={360} width={260} height={24} fill={c[3]} />
          <rect x={480} y={400} width={180} height={24} fill={c[3]} />
        </g>
      )}
      {variant === "bars" && (
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const h = 80 + s(i) * 380;
            return <rect key={i} x={60 + i * 58} y={540 - h} width={40} height={h} rx={20} fill={i % 4 === 1 ? c[1] : i % 4 === 3 ? c[3] : c[2]} />;
          })}
          <path d="M60 200 C 220 80, 420 320, 740 120" stroke={c[2]} strokeWidth={3} fill="none" />
        </g>
      )}
      {variant === "frame" && (
        <g>
          <rect x={120} y={70} width={560} height={460} rx={18} fill={c[1]} />
          <rect x={150} y={110} width={500} height={220} rx={8} fill={c[3]} />
          <circle cx={560} cy={220} r={70} fill={c[2]} />
          <rect x={150} y={360} width={300} height={28} rx={4} fill={c[0]} />
          <rect x={150} y={404} width={220} height={28} rx={4} fill={c[0]} opacity={0.6} />
          <rect x={150} y={460} width={140} height={44} rx={22} fill={c[2]} />
        </g>
      )}
      {variant === "rings" && (
        <g fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={400 + (seed % 3) * 30} cy={300} r={30 + i * 34} stroke={i % 3 === 0 ? c[2] : c[1]} strokeWidth={i % 3 === 0 ? 6 : 1.5} opacity={1 - i * 0.07} />
          ))}
          <circle cx={400} cy={300} r={18} fill={c[3]} />
        </g>
      )}
    </svg>
  );
}
