"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// A small accent dot. Grows over interactive elements and shows a word
// over elements that carry data-cursor="Label".
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const xTo = gsap.quickTo(el, "x", { duration: reduced ? 0 : 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: reduced ? 0 : 0.35, ease: "power3.out" });
    el.classList.add("is-hidden");

    const move = (e: PointerEvent) => {
      el.classList.remove("is-hidden");
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const hover = t.closest("a, button, [data-cursor-hover]");
      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        el.classList.add("is-label");
        el.classList.remove("is-hover");
      } else {
        el.classList.remove("is-label");
        el.classList.toggle("is-hover", !!hover);
      }
    };
    const leave = () => el.classList.add("is-hidden");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <span className="cursor__label">{label}</span>
    </div>
  );
}
