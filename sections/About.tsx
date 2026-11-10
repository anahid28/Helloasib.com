import { FadeIn } from "@/components/Reveal";
import RollButton from "@/components/RollButton";
import { site } from "@/lib/content";

export default function About({ full = false }: { full?: boolean }) {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="wrap">
        <FadeIn>
          <h2 className="statement" id="about-title">
            <span className="indent">Eight years in.</span> Still curious.
          </h2>
        </FadeIn>

        <div className="about__grid">
          <FadeIn className="about__portrait">
            <div className="about__img">
              <img src={site.portrait} alt="Asib Uz Zaman" width={400} height={500} loading="lazy" />
            </div>
            <span className="signature" aria-hidden>
              Asib
            </span>
          </FadeIn>

          <div className="about__copy">
            <FadeIn>
              <p className="about__lead">100+ client projects. 20+ industries. And plenty left to explore.</p>
              <p>
                I&rsquo;m a Senior UI/UX Designer, Creative Visual Designer and AI Design Engineer &mdash; currently Deputy Design Manager at
                Musemind, where I lead creative website projects and the people who make them.
              </p>
              {full && (
                <>
                  <p>
                    My work sits where visual craft meets product thinking. I like briefs that sound slightly impossible, teams that argue
                    well, and details nobody asked for but everybody notices.
                  </p>
                  <p>
                    Lately that means pairing design with AI and code &mdash; building tools, workflows and prototypes that let ideas move
                    faster than a slide deck.
                  </p>
                </>
              )}
            </FadeIn>

            <FadeIn>
              <ul className="xp" aria-label="Experience">
                <li>
                  <strong>Deputy Design Manager</strong>
                  <span>Musemind</span>
                  <span>Now</span>
                </li>
                <li>
                  <strong>Earlier roles</strong>
                  <span>Add in sections/About.tsx</span>
                  <span>Placeholder</span>
                </li>
                <li>
                  <strong>Based in</strong>
                  <span>{site.location}</span>
                  <span>Worldwide clients</span>
                </li>
              </ul>
              {!full && <RollButton href="/about/" label="More about me" />}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
