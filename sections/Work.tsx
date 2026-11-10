import Link from "next/link";
import { projects } from "@/lib/content";
import ProjectShot from "@/components/ProjectShot";
import { ClipMedia, FadeIn } from "@/components/Reveal";
import RollButton from "@/components/RollButton";

// Scattered collage: every project gets its own size and spot on the grid,
// with a quiet caption underneath. Positions repeat every five projects.
export default function Work({ limit, showHead = true }: { limit?: number; showHead?: boolean }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        {showHead && (
          <div className="work__head">
            <FadeIn>
              <h2 className="statement" id="work-title">
                <span className="indent">Proof</span> over <span className="serif-i">promises.</span>
              </h2>
            </FadeIn>
            <FadeIn className="micro-cols">
              <p>A few things I&rsquo;ve helped bring to life.</p>
              <p>
                Websites, products
                <br />
                and visual systems.
              </p>
            </FadeIn>
          </div>
        )}

        <ul className="collage">
          {list.map((p, i) => {
            const href = `/work/${p.slug}/`;
            return (
              <li className={`cl cl--${(i % 5) + 1}`} key={p.slug}>
                <Link href={href} className="cl__link" data-cursor="View">
                  <ClipMedia className="cl__media" style={{ aspectRatio: p.shot.kind === "app" ? "4 / 4.4" : "3 / 2.05" }}>
                    <div className="cl__art" data-parallax>
                      <ProjectShot kind={p.shot.kind} tone={p.shot.tone} title={p.title} />
                    </div>
                    <span className="cl__num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </ClipMedia>
                  <p className="cl__cap">
                    <strong>{p.title}</strong> &ndash; {p.type}
                    <span>
                      {p.industry}, {p.year}
                      {p.placeholder ? " (placeholder)" : ""}
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {limit && (
          <div className="work__all">
            <RollButton href="/work/" label="See all work" variant="ghost" />
          </div>
        )}
      </div>
    </section>
  );
}
