"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Choreographs the hero's supporting pieces after the title starts:
// pins slide in from alternating directions, the role rules draw across,
// the portrait pops in and the subtitle rises.
export default function HeroMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el?.classList.add("is-in");
      return;
    }
    const q = gsap.utils.selector(el);
    const play = () => {
      el.classList.add("is-in");
      gsap
        .timeline({ delay: 0.35 })
        .fromTo(q(".hero__sub span"), { yPercent: 105 }, { yPercent: 0, duration: 1.4, ease: "expo.inOut" })
        .fromTo(q(".hero__glyph"), { scale: 0, rotate: 90 }, { scale: 1, rotate: 0, duration: 1, ease: "expo.inOut" }, "<0.1")
        .fromTo(q(".pin--l1 span, .pin--r2 span"), { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "expo.inOut" }, "<0.1")
        .fromTo(q(".pin--l2 span, .pin--r1 span"), { yPercent: -105 }, { yPercent: 0, duration: 1, ease: "expo.inOut" }, "<")
        .fromTo(q(".hero__me-name"), { yPercent: 100, rotate: 90 }, { yPercent: 0, rotate: 0, duration: 1, ease: "expo.inOut" }, "<")
        .fromTo(q(".sq"), { scale: 0, rotate: 90 }, { scale: 1, rotate: 0, duration: 1, ease: "expo.inOut" }, "<")
        .fromTo(q(".hero__me-img"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.inOut" }, "<0.1")
        .fromTo(q(".hero__roles li"), { "--line": "0%" }, { "--line": "100%", duration: 0.7, stagger: 0.1, ease: "expo.out" }, "<0.4")
        .fromTo(q(".hero__roles li span"), { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" }, "<")
        .fromTo(q(".hero__roles p, .hero__roles .sbtn, .hero__social li"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: "expo.out" }, "<0.2");
    };
    if (document.documentElement.dataset.loading === "1") {
      window.addEventListener("intro:start", play, { once: true });
      return () => window.removeEventListener("intro:start", play);
    }
    play();
  }, []);

  return (
    <div ref={ref} className="hero-motion">
      {children}
    </div>
  );
}
