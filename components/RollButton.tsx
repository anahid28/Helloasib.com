"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Swing button (inspired by the Extrafazant contact button, rebuilt from scratch):
 * on hover the label swings out on an arc while its twin swings in, the dot
 * spins away as three mood-coloured dots orbit in one after another, and the
 * button grows slightly. A gentle magnetic pull on desktop.
 */
export default function RollButton({
  href,
  label,
  variant = "solid",
  className = "",
  external = false,
  dot = true,
}: {
  href: string;
  label: string;
  variant?: "solid" | "ghost" | "light";
  className?: string;
  external?: boolean;
  dot?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const inner = (
    <>
      <span className="sbtn__bg" aria-hidden />
      <span className="sbtn__inner">
        {dot && (
          <span className="sbtn__dots" aria-hidden>
            <span className="sbtn__dot" style={{ "--i": 0 } as React.CSSProperties} />
            <span className="sbtn__dot is-1" style={{ "--i": 1 } as React.CSSProperties} />
            <span className="sbtn__dot is-2" style={{ "--i": 2 } as React.CSSProperties} />
            <span className="sbtn__dot is-3" style={{ "--i": 3 } as React.CSSProperties} />
          </span>
        )}
        <span className="sbtn__text">
          <span className="sbtn__t is-a">{label}</span>
          <span className="sbtn__t is-b" aria-hidden>
            {label}
          </span>
        </span>
      </span>
    </>
  );

  const cls = `sbtn sbtn--${variant} ${className}`;
  if (external || href.startsWith("mailto:") || href.startsWith("http") || href === "#") {
    return (
      <a ref={ref} href={href} className={cls} data-cursor-hover>
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} data-cursor-hover>
      {inner}
    </Link>
  );
}
