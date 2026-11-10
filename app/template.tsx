"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Re-mounts on every route change: a curtain in the accent colour lifts away.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !sessionStorage.getItem("nav-started")) {
      try { sessionStorage.setItem("nav-started", "1"); } catch {}
      return;
    }
    gsap.fromTo(el, { display: "block", yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.05, onComplete: () => { el.style.display = "none"; } });
  }, []);
  return (
    <>
      <div ref={ref} className="curtain" aria-hidden />
      {children}
    </>
  );
}
