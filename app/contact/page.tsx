import type { Metadata } from "next";
import { MaskLines } from "@/components/Reveal";
import RollButton from "@/components/RollButton";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact/" } };

export default function ContactPage() {
  return (
    <section className="phero wrap" style={{ minHeight: "70svh" }}>
      <MaskLines as="h1" immediate className="display phero__title" lines={["Let's", "connect."]} />
      <p className="lede" style={{ marginTop: "2rem" }}>
        New project, a collaboration or just a good question — write to me and I&rsquo;ll reply within a couple of working days.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
        <RollButton href={`mailto:${site.email}`} label={site.email} />
        {site.socials.map((s) => (
          <RollButton key={s.label} href={s.href} label={s.label} variant="ghost" dot={false} external />
        ))}
      </div>
    </section>
  );
}
