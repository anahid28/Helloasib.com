"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Hero title in the spirit of clarissemichard.com, rebuilt without WebGL:
 * lines swing up into place on load, then pixel blocks break out of the
 * letters whenever the page scrolls fast or the pointer moves across them.
 */
export default function GlitchTitle({ lines, className = "", id }: { lines: string[]; className?: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>(".gl-line-inner");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(inner, { clearProps: "all", yPercent: 0, rotate: 0 });
      return;
    }
    const play = () =>
      gsap.fromTo(
        inner,
        { y: 0, yPercent: 105, rotate: 14 },
        { y: 0, yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.1, ease: "expo.inOut", transformOrigin: "left center" }
      );
    if (document.documentElement.dataset.loading === "1") {
      window.addEventListener("intro:start", play, { once: true });
      return () => window.removeEventListener("intro:start", play);
    }
    const tw = play();
    return () => {
      tw.kill();
    };
  }, []);

  // Pixel glitch
  useEffect(() => {
    const el = ref.current;
    const cv = canvasRef.current;
    if (!el || !cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, cell = 8;
    let points: [number, number][] = [];
    type Block = { x: number; y: number; s: number; born: number; life: number; hole: boolean; dx: number };
    let blocks: Block[] = [];
    const lineEls = Array.from(el.querySelectorAll<HTMLElement>(".gl-line-inner"));

    const sample = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      cell = Math.max(5, Math.round(fs * 0.065));
      // Draw the text into an offscreen canvas to find where the ink is.
      const off = document.createElement("canvas");
      off.width = Math.ceil(W);
      off.height = Math.ceil(H);
      const o = off.getContext("2d");
      if (!o) return;
      o.fillStyle = "#000";
      lineEls.forEach((ln) => {
        const lr = ln.getBoundingClientRect();
        const cs = getComputedStyle(ln);
        o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        o.textBaseline = "alphabetic";
        o.textAlign = "left";
        const m = o.measureText(ln.textContent || "");
        const x = lr.left - r.left + (lr.width - m.width) / 2;
        const y = lr.top - r.top + lr.height * 0.86;
        o.fillText(ln.textContent || "", x, y);
      });
      const data = o.getImageData(0, 0, off.width, off.height).data;
      points = [];
      for (let y = 0; y < off.height; y += cell) {
        for (let x = 0; x < off.width; x += cell) {
          if (data[(y * off.width + x) * 4 + 3] > 128) points.push([x, y]);
        }
      }
    };

    let lastY = window.scrollY, energy = 0, px = -1, py = -1, raf = 0, visible = true;
    const spawn = (n: number, near?: [number, number]) => {
      if (!points.length) return;
      const now = performance.now();
      for (let i = 0; i < n; i++) {
        let p = points[(Math.random() * points.length) | 0];
        if (near) {
          for (let k = 0; k < 12; k++) {
            const q = points[(Math.random() * points.length) | 0];
            if (Math.hypot(q[0] - near[0], q[1] - near[1]) < cell * 9) {
              p = q;
              break;
            }
          }
        }
        const hole = Math.random() < 0.55;
        blocks.push({
          x: Math.floor(p[0] / cell) * cell,
          y: Math.floor(p[1] / cell) * cell,
          s: cell * (Math.random() < 0.25 ? 2 : 1),
          born: now,
          life: 180 + Math.random() * 320,
          hole,
          dx: hole ? 0 : (Math.random() < 0.5 ? -1 : 1) * cell * (1 + ((Math.random() * 3) | 0)),
        });
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const y = window.scrollY;
      energy = energy * 0.85 + Math.abs(y - lastY) * 0.15;
      lastY = y;
      if (energy > 1.5) spawn(Math.min(18, Math.round(energy / 2)));
      // line jitter tied to scroll energy
      const j = Math.min(energy, 40);
      lineEls.forEach((ln, i) => {
        ln.parentElement!.style.transform = j > 3 ? `translateX(${(i % 2 ? -1 : 1) * j * 0.12}px)` : "";
      });

      const cs = getComputedStyle(document.documentElement);
      const fg = cs.getPropertyValue("--foreground").trim();
      const bg = cs.getPropertyValue("--background").trim();
      const accent = cs.getPropertyValue("--accent").trim();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const now = performance.now();
      blocks = blocks.filter((b) => now - b.born < b.life);
      for (const b of blocks) {
        ctx.fillStyle = b.hole ? bg : Math.random() < 0.08 ? accent : fg;
        ctx.fillRect(b.x + b.dx, b.y, b.s, b.s);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      const d = px < 0 ? 0 : Math.hypot(x - px, y - py);
      px = x;
      py = y;
      if (d > 2) spawn(Math.min(8, Math.ceil(d / 6)), [x, y]);
    };

    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(el);
    const ro = new ResizeObserver(() => sample());
    ro.observe(el);
    document.fonts?.ready.then(sample);
    sample();
    raf = requestAnimationFrame(frame);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", () => (px = py = -1));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <h1 ref={ref} id={id} className={`gl-title ${className}`} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span className="gl-line" key={i} aria-hidden>
          <span className="gl-line-inner">{l}</span>
        </span>
      ))}
      <canvas ref={canvasRef} className="gl-canvas" aria-hidden />
    </h1>
  );
}
