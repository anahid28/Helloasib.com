import { leadership } from "@/lib/content";
import PlaceholderArt from "@/components/PlaceholderArt";

// Stacked cards: each card pins and the next one slides over it.
export default function Leadership() {
  return (
    <section className="stack" aria-labelledby="lead-title">
      <div className="stack__card stack__card--1">
        <span className="stack__crumb">
          Asib <span aria-hidden>&rarr;</span> How I lead
        </span>
        <h2 className="serif-statement" id="lead-title">
          Good work is rarely a <u>solo act</u>.
        </h2>
      </div>

      <div className="stack__card stack__card--2">
        <span className="stack__crumb">
          Asib <span aria-hidden>&rarr;</span> What I do
        </span>
        <p className="serif-statement serif-statement--md">
          I lead <u>creative minds</u>, challenge the expected, and help <u>ambitious ideas</u> find their form.
        </p>
        <p className="stack__note">Deputy Design Manager at Musemind &mdash; leading complex creative web projects and the designers behind them.</p>
      </div>

      <div className="stack__card stack__card--3">
        <span className="stack__crumb">
          Asib <span aria-hidden>&rarr;</span> What it looks like
        </span>
        <div className="callouts">
          <div className="callouts__art" aria-hidden>
            <PlaceholderArt variant="frame" seed={4} />
          </div>
          <ol className="callouts__list">
            {leadership.map((l, i) => (
              <li key={l.title}>
                <span className="callouts__n">{i + 1}</span>
                <div>
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
