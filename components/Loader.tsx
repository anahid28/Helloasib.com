"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * First-visit loader: the "asib" mark assembles itself out of pixel squares
 * while a counter runs to 100%, then the page slides in. Once per session.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const done = () => {
      delete root.dataset.loading;
      try {
        sessionStorage.setItem("asib-loaded", "1");
      } catch {}
      window.dispatchEvent(new Event("intro:start"));
    };
    if (root.dataset.loading !== "1") return;
    const el = ref.current, cv = cvRef.current, num = numRef.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx || !num) return done();

    window.__lenis?.stop();
    const run = async () => {
      await document.fonts?.ready;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.min(window.innerWidth * 0.7, 560), H = W * 0.45;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d")!;
      o.font = `italic 400 ${H * 0.95}px "Instrument Serif", Georgia, serif`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText("asib", W / 2, H * 0.5);
      const cell = Math.max(6, Math.round(W / 64));
      const data = o.getImageData(0, 0, W, H).data;
      const cells: { x: number; y: number; at: number }[] = [];
      for (let y = 0; y < H; y += cell) for (let x = 0; x < W; x += cell) {
        if (data[((y + (cell >> 1)) * W + x + (cell >> 1)) * 4 + 3] > 100) cells.push({ x, y, at: Math.random() });
      }
      const fg = getComputedStyle(root).getPropertyValue("--foreground").trim();
      const accent = getComputedStyle(root).getPropertyValue("--accent").trim();
      const state = { p: 0 };
      const draw = () => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        for (const c of cells) {
          if (c.at < state.p) {
            ctx.fillStyle = fg;
            ctx.fillRect(c.x, c.y, cell, cell);
          } else if (c.at < state.p + 0.12) {
            ctx.fillStyle = Math.random() < 0.3 ? accent : fg;
            ctx.globalAlpha = 0.35;
            ctx.fillRect(c.x + (Math.random() < 0.5 ? -cell : cell), c.y, cell, cell);
            ctx.globalAlpha = 1;
          }
        }
        // the real glyphs fade in at the very end for crisp edges
        if (state.p > 0.92) {
          ctx.globalAlpha = (state.p - 0.92) / 0.08;
          ctx.drawImage(off, 0, 0, W, H);
          ctx.globalAlpha = 1;
        }
        num.textContent = `[${Math.round(Math.min(state.p, 1) * 100)}%]`;
      };
      gsap
        .timeline({
          onComplete: () => {
            window.__lenis?.start();
          },
        })
        .to(state, { p: 1, duration: 1.5, ease: "power2.inOut", onUpdate: draw })
        .to({}, { duration: 0.25 })
        .to(cv, { opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" })
        .add(done, "-=0.1")
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "<")
        .set(el, { display: "none" });
    };
    run();
  }, []);

  return (
    <div ref={ref} className="loader" aria-hidden>
      <canvas ref={cvRef} />
      <span ref={numRef} className="loader__num">
        [0%]
      </span>
    </div>
  );
}
