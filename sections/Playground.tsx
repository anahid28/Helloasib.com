"use client";

import { useState } from "react";
import { playground, playgroundCategories } from "@/lib/content";
import PlaceholderArt from "@/components/PlaceholderArt";
import { FadeIn } from "@/components/Reveal";

// Lab notebook: graph-paper ground, a framed column, and a masonry of
// experiments tagged with small pills.
export default function Playground() {
  const [filter, setFilter] = useState<string>("All");
  const cats = ["All", ...playgroundCategories];
  const ratios = ["4 / 5", "1 / 1", "4 / 3", "3 / 4", "16 / 10", "1 / 1", "4 / 5", "4 / 3", "1 / 1", "3 / 4"];
  return (
    <section className="lab" id="playground" aria-labelledby="play-title">
      <div className="lab__frame">
        <div className="lab__head">
          <FadeIn>
            <h2 className="lab__label" id="play-title">
              <span className="sq" aria-hidden /> Playground
            </h2>
            <p className="lab__intro">Exploring what happens when design meets emerging technology.</p>
          </FadeIn>
          <div className="filters" role="group" aria-label="Filter experiments">
            {cats.map((c) => (
              <button key={c} className="pill" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="masonry">
          {playground.map((p, i) => {
            const dim = filter !== "All" && p.category !== filter;
            return (
              <li className={`mcard ${dim ? "is-dim" : ""}`} key={p.title} data-cursor={dim ? undefined : "Play"}>
                <div className="mcard__media" style={{ aspectRatio: ratios[i % ratios.length] }}>
                  <PlaceholderArt variant={p.art} seed={i + 3} />
                </div>
                <div className="mcard__tags">
                  <span>{p.title}</span>
                  <span>{p.category}</span>
                  <span className="is-ph">Placeholder</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
