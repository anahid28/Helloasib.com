"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A statement that darkens word by word as it scrolls through the viewport.
 * Pieces can be plain strings (split into words) or inline nodes such as
 * image chips, which pop in at their place in the sentence.
 */
export default function WordReveal({ parts, className = "" }: { parts: React.ReactNode[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = el.querySelectorAll<HTMLElement>("[data-w]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.5 },
      });
      items.forEach((it, i) => {
        if (it.dataset.w === "chip") {
          tl.fromTo(it, { scale: 0, rotate: -12 }, { scale: 1, rotate: 0, duration: 1, ease: "back.out(2)" }, i * 0.5);
        } else {
          tl.fromTo(it, { opacity: 0.16 }, { opacity: 1, duration: 1, ease: "none" }, i * 0.5);
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {parts.map((p, pi) =>
        typeof p === "string" && /^\*.*\*$/.test(p) ? (
          <em className="reveal-em" key={pi}>
            {p.slice(1, -1).split(/(\s+)/).map((w, wi) =>
              /^\s+$/.test(w) ? w : (
                <span data-w="word" key={wi}>
                  {w}
                </span>
              )
            )}
          </em>
        ) : typeof p === "string" ? (
          p.split(/(\s+)/).map((w, wi) =>
            /^\s+$/.test(w) || w === "" ? (
              w
            ) : (
              <span data-w="word" key={`${pi}-${wi}`}>
                {w}
              </span>
            )
          )
        ) : (
          <span data-w="chip" className="chip-wrap" key={pi}>
            {p}
          </span>
        )
      )}
    </p>
  );
}
