import WordReveal from "@/components/WordReveal";
import Counter from "@/components/Counter";
import PlaceholderArt from "@/components/PlaceholderArt";
import { FadeIn } from "@/components/Reveal";

const Chip = ({ v, seed }: { v: "orbit" | "grid" | "rings" | "glyph" | "bars" | "frame"; seed: number }) => (
  <span className="ichip" aria-hidden>
    <PlaceholderArt variant={v} seed={seed} />
  </span>
);

export default function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-label">
      <div className="wrap">
        <div className="intro__label" id="intro-label">
          <span>More than pixels.</span>
          <span>More than pretty.</span>
        </div>

        <WordReveal
          className="intro__statement"
          parts={[
            "I connect ideas",
            <Chip v="glyph" seed={1} key="a" />,
            "people",
            <Chip v="orbit" seed={2} key="b" />,
            "and technology",
            <Chip v="rings" seed={3} key="c" />,
            "to shape experiences that",
            "*actually mean something.*",
          ]}
        />

        <dl className="numbers">
          {[
            { v: 8, l: "Years designing", n: "Screens, brands and systems" },
            { v: 100, l: "Client projects", n: "For teams around the world" },
            { v: 20, l: "Industries", n: "Healthcare to real estate to events" },
          ].map((s) => (
            <FadeIn className="num" key={s.l}>
              <dd>
                <Counter value={s.v} />
                <span className="num__plus">+</span>
              </dd>
              <dt>
                <strong>{s.l}</strong>
                <span>{s.n}</span>
              </dt>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
