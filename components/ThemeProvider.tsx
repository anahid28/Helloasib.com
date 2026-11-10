"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MOODS, STORAGE_KEY } from "@/lib/themes";

type Ctx = { index: number; cycle: (origin?: { x: number; y: number }) => void };
const MoodContext = createContext<Ctx>({ index: 0, cycle: () => {} });
export const useMood = () => useContext(MoodContext);

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts at 0 on the server; synced with the attribute the boot script set.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    const i = MOODS.findIndex((m) => m.id === current);
    if (i > 0) {
      setIndex(i);
      document.documentElement.style.setProperty("--rot", `${i * -72}deg`);
    }
  }, []);

  const apply = (i: number) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", MOODS[i].id);
    root.style.setProperty("--rot", `${i * -72}deg`);
    try {
      localStorage.setItem(STORAGE_KEY, MOODS[i].id);
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", MOODS[i].background);
  };

  const cycle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next = (index + 1) % MOODS.length;
      const root = document.documentElement;
      const x = origin?.x ?? window.innerWidth - 80;
      const y = origin?.y ?? 40;

      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      if (prefersReduced()) {
        apply(next);
        setIndex(next);
        return;
      }

      if (doc.startViewTransition) {
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const t = doc.startViewTransition(() => {
          apply(next);
          setIndex(next);
        });
        t.ready
          .then(() => {
            root.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
              { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
            );
          })
          .catch(() => {});
      } else {
        root.classList.add("mood-fallback");
        apply(next);
        setIndex(next);
        window.setTimeout(() => root.classList.remove("mood-fallback"), 800);
      }
    },
    [index]
  );

  return <MoodContext.Provider value={{ index, cycle }}>{children}</MoodContext.Provider>;
}
