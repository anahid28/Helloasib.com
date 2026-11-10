import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/content";
import { MaskLines } from "@/components/Reveal";
import Work from "@/sections/Work";

export const metadata: Metadata = { title: "Selected Work", alternates: { canonical: "/work/" } };

export default function WorkPage() {
  return (
    <>
      <section className="phero wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>Selected Work</span>
        </nav>
        <MaskLines as="h1" immediate className="display phero__title" lines={["Proof over", "promises."]} />
        <ul className="wlist" style={{ marginTop: "clamp(3rem, 6vw, 6rem)" }}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}/`}>
                <span className="small">{String(i + 1).padStart(2, "0")}</span>
                <span className="display wlist__title">{p.title}</span>
                <span className="wlist__meta">
                  {p.industry}
                  <br />
                  {p.type}, {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Work showHead={false} />
    </>
  );
}
