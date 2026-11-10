import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import ProjectShot from "@/components/ProjectShot";
import { MaskLines, FadeIn, ClipMedia } from "@/components/Reveal";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/work/${p.slug}/` } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      {/* 1. Project hero */}
      <header className="phero wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/work/">Work</Link>
          <span aria-hidden>/</span>
          <span>{p.title}</span>
        </nav>
        <MaskLines as="h1" immediate className="display phero__title" lines={p.title.split(" ")} />
        <dl className="meta" style={{ marginTop: "2.5rem", maxWidth: "32rem" }}>
          <dt>Industry</dt>
          <dd>{p.industry}</dd>
          <dt>Type</dt>
          <dd>{p.type}</dd>
          <dt>Year</dt>
          <dd>{p.year}</dd>
        </dl>
        {p.placeholder && <span className="ph-tag">Placeholder case study — edit lib/content.ts</span>}
      </header>

      <div className="wrap">
        <ClipMedia className="case-media">
          <div data-parallax style={{ position: "absolute", inset: "-8% 0" }}>
            <ProjectShot kind={p.shot.kind} tone={p.shot.tone} title={p.title} />
          </div>
        </ClipMedia>

        {/* 2. Overview */}
        <section className="case-grid">
          <h2>Overview</h2>
          <FadeIn>
            <p>{p.summary}</p>
          </FadeIn>
        </section>

        {/* 3. Role & scope */}
        <section className="case-grid" style={{ paddingTop: 0 }}>
          <h2>Role &amp; scope</h2>
          <div className="case-cols">
            <div>
              <span className="small">Role</span>
              <ul>{p.role.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
            <div>
              <span className="small">Scope</span>
              <ul>{p.scope.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* 4. Creative direction */}
        <section className="case-grid" style={{ paddingTop: 0 }}>
          <h2>Creative direction</h2>
          <FadeIn>
            <p>{p.direction}</p>
          </FadeIn>
        </section>

        {/* 5. Design showcase */}
        <section className="showcase" aria-label="Design showcase">
          {(["s1", "s2", "s3"] as const).map((k, n) => (
            <ClipMedia className={k} key={k}>
              <div data-parallax style={{ position: "absolute", inset: "-8% 0" }}>
                <ProjectShot kind={(["app", "web", "dash"] as const)[n]} tone={(p.shot.tone + n) % 5} title={p.title} />
              </div>
            </ClipMedia>
          ))}
        </section>

        {/* 6. Key decisions */}
        <section className="case-grid">
          <h2>Key design decisions</h2>
          <ol className="decisions">
            {p.decisions.map((d) => (
              <li key={d.title}>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. Final experience */}
        <ClipMedia className="case-media">
          <div data-parallax style={{ position: "absolute", inset: "-8% 0" }}>
            <ProjectShot kind={p.shot.kind === "web" ? "app" : "web"} tone={p.shot.tone} title={p.title} />
          </div>
        </ClipMedia>

        {/* 8. Next project */}
        <Link href={`/work/${next.slug}/`} className="next-proj" style={{ marginTop: "clamp(4rem, 8vw, 8rem)" }} data-cursor="Next">
          <span className="small">Next project</span>
          <span className="display next-proj__title" style={{ display: "block" }}>
            {next.title}
          </span>
        </Link>
      </div>
    </article>
  );
}
