import { MaskLines, FadeIn } from "@/components/Reveal";
import RollButton from "@/components/RollButton";
import LocalTime from "@/components/LocalTime";
import { nav, site } from "@/lib/content";

export default function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot" id="contact" aria-labelledby="contact-title">
      {/* CTA */}
      <div className="cta wrap">
        <span className="cta__glyph" aria-hidden>
          ✳
        </span>
        <MaskLines
          as="h2"
          className="cta__title"
          lines={[<span key="a" className="cta__sans">Have something</span>, <span key="b" className="cta__serif">unusual in mind?</span>]}
        />
        <FadeIn>
          <p className="cta__sub">Good. Those are my favorite conversations.</p>
          <div className="cta__actions">
            <RollButton href={`mailto:${site.email}`} label="Let's make it happen" variant="light" />
          </div>
          <a className="cta__mail ulink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </FadeIn>
      </div>

      {/* Footer */}
      <div className="wrap footer">
        <div className="footer__brand">
          <span className="footer__name">
            Asib <span className="serif-i">uz Zaman</span>
          </span>
          <p>Senior UI/UX Designer, Creative Visual Designer &amp; AI Design Engineer.</p>
        </div>
        <nav className="footer__col" aria-label="Footer">
          <h3>Navigation</h3>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a className="ulink" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a className="ulink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>Dhaka, Bangladesh</li>
            <li>
              Local time <LocalTime />
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h3>Social</h3>
          <ul className="footer__pills">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer__legal">
        <span>
          © {year} {site.name}
        </span>
        <span>{site.currentRole}</span>
        <a href="#top" className="ulink">
          Back to top
        </a>
      </div>
    </footer>
  );
}
