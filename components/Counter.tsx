"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Counts up once when it enters the viewport. Renders the final value on the server. */
export default function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { v: 0 };
    el.textContent = "0";
    const tw = gsap.to(obj, {
      v: value,
      duration: 1.8,
      ease: "expo.out",
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      el.textContent = String(value);
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}
