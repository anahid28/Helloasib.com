"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Oversized magnetic contact button: a circle that squares off and fills from the entry point. */
export default function BigCta({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setPos = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointerenter", setPos);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return () => el.removeEventListener("pointerenter", setPos);
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.22);
      yTo(dy * 0.22);
      rTo(dx * 0.03);
    };
    const leave = (e: PointerEvent) => {
      setPos(e);
      gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", setPos);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className="big-cta" data-cursor-hover>
      <span className="big-cta__fill" aria-hidden />
      <span className="big-cta__inner">
        <svg className="big-cta__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span>{label}</span>
      </span>
    </a>
  );
}
