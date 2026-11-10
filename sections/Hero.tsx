import GlitchTitle from "@/components/GlitchTitle";
import HeroMotion from "@/components/HeroMotion";
import RollButton from "@/components/RollButton";
import LocalTime from "@/components/LocalTime";
import { site } from "@/lib/content";

// Spec-sheet hero: the title sits centred, small facts are pinned to the
// edges, a portrait and a rule-lined role block anchor the bottom.
export default function Hero() {
  return (
    <HeroMotion>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__pins" aria-hidden>
          <span className="pin pin--l1"><span>8+ yrs</span></span>
          <span className="pin pin--l2"><span>100+ projects</span></span>
          <span className="pin pin--r1"><span>20+ industries</span></span>
          <span className="pin pin--r2"><span>Dhaka <LocalTime /></span></span>
        </div>

        <div className="hero__center">
          <span className="hero__glyph" aria-hidden>
            ✳
          </span>
          <GlitchTitle id="hero-title" className="hero__type" lines={["Not here to make", "ordinary."]} />
          <p className="hero__sub">
            <span>Designer, creative thinker &amp; builder of digital things worth remembering</span>
          </p>
        </div>

        <div className="hero__bottom">
          <div className="hero__me">
            <span className="sq-label">
              <span className="sq" aria-hidden />
              <span className="hero__me-name">I&rsquo;m Asib</span>
            </span>
            <div className="hero__me-img" data-cursor="Hi!">
              <img src={site.portrait} alt="Portrait of Asib Uz Zaman" width={400} height={500} fetchPriority="high" />
            </div>
            <ul className="hero__social">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__roles">
            <ul aria-label="Roles">
              {site.roles.map((r) => (
                <li key={r}>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p>{site.currentRole}. Leading creative website projects and the people who make them.</p>
            <RollButton href="/#work" label="Explore my work" />
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
