"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * The hero's signature: letters widen and gain weight as the pointer comes
 * near, using Archivo's variable width axis. On touch screens a slow wave
 * runs through the letters instead. Static when reduced motion is on.
 */
export default function StretchText({ lines, className = "" }: { lines: { text: string; className?: string }[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".stretch-ch"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Entrance: letters rise out of their line masks.
    gsap.fromTo(
      root.querySelectorAll(".hero__line-inner"),
      { yPercent: 110 },
      { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.12, delay: 0.25 }
    );

    const BASE = 72, MAX = 125, WBASE = 800, WMAX = 900;
    const state = chars.map(() => ({ w: BASE, wg: WBASE }));
    let px = -9999, py = -9999, raf = 0, t = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const frame = () => {
      t += 0.016;
      const radius = Math.max(window.innerWidth * 0.16, 160);
      chars.forEach((ch, i) => {
        let target = 0;
        if (fine) {
          const r = ch.getBoundingClientRect();
          const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
          target = Math.max(0, 1 - d / radius);
          target = target * target * (3 - 2 * target);
        } else {
          target = Math.max(0, Math.sin(t * 1.2 - i * 0.45)) ** 3;
        }
        const s = state[i];
        s.w += (BASE + (MAX - BASE) * target - s.w) * 0.14;
        s.wg += (WBASE + (WMAX - WBASE) * target - s.wg) * 0.14;
        ch.style.setProperty("--w", s.w.toFixed(1));
        ch.style.setProperty("--wg", s.wg.toFixed(0));
      });
      raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const leave = () => {
      px = py = -9999;
    };

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(root);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  const label = lines.map((l) => l.text).join(" ");
  return (
    <h1 ref={ref} className={`display ${className}`} aria-label={label}>
      {lines.map((line, li) => (
        <span className={`mask hero__line ${line.className ?? ""}`} key={li} aria-hidden>
          <span className="mask-inner hero__line-inner">
            {Array.from(line.text).map((ch, i) =>
              ch === "." ? (
                <span className="stretch-ch hero__dot" key={i}>.</span>
              ) : ch === " " ? (
                <span key={i}> </span>
              ) : (
                <span className="stretch-ch" key={i}>
                  {ch}
                </span>
              )
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}
