import { expertise } from "@/lib/content";
import { FadeIn } from "@/components/Reveal";

// Simple services index: one line per discipline.
export default function Expertise() {
  return (
    <section className="services" aria-labelledby="exp-title">
      <div className="wrap">
        <div className="services__head">
          <FadeIn>
            <h2 className="statement statement--sm" id="exp-title">
              Different hats. <span className="serif-i">One creative brain.</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="services__sub">From early ideas to the final interaction.</p>
          </FadeIn>
        </div>

        <ol className="svc">
          {expertise.map((x, i) => (
            <li className="svc__row" key={x.title}>
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="svc__title">{x.title}</h3>
              <p className="svc__body">{x.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
