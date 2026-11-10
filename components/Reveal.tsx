"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Masked headline: each line slides up from behind its own mask. */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const inner = el.querySelectorAll(".mask-inner");
    const ctx = gsap.context(() => {
      gsap.set(inner, { yPercent: 110, rotate: 9, transformOrigin: "left center" });
      gsap.to(inner, {
        yPercent: 0,
        rotate: 0,
        duration: 1.4,
        ease: "expo.inOut",
        stagger: 0.1,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [immediate, delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((l, i) => (
        <span className="mask" key={i}>
          <span className="mask-inner">{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Fades/lifts its children once when they enter the viewport. */
export function FadeIn({ children, className = "", y = 24 }: { children: React.ReactNode; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, { opacity: 0, y, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    }, el);
    return () => ctx.revert();
  }, [y]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Image block that unmasks from the bottom and drifts on scroll. */
export function ClipMedia({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const art = el.querySelector("[data-parallax]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(18% 8% 0% 8%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.6 } }
      );
      if (art)
        gsap.fromTo(art, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
