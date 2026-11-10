"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MOODS } from "@/lib/themes";
import { nav, site } from "@/lib/content";
import { useMood } from "./ThemeProvider";
import RollButton from "./RollButton";
import PlaceholderArt from "./PlaceholderArt";
import type { ArtVariant } from "@/lib/content";

const previewArt: ArtVariant[] = ["glyph", "orbit", "frame", "rings", "bars"];

export default function Nav() {
  const pathname = usePathname();
  const { index, cycle } = useMood();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last + 4);
      if (y < last - 4 || y < 160) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build the open/close timeline once.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const labels = menu.querySelectorAll(".menu__label");
    const rest = menu.querySelectorAll(".menu__idx, .menu__foot");
    const t = gsap.timeline({ paused: true });
    t.set(menu, { visibility: "visible" })
      .fromTo(menu, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduced ? 0 : 0.8, ease: "expo.inOut" })
      .fromTo(labels, { yPercent: 105 }, { yPercent: 0, duration: reduced ? 0 : 0.9, ease: "expo.out", stagger: 0.06 }, reduced ? 0 : "-=0.35")
      .fromTo(rest, { opacity: 0 }, { opacity: 1, duration: reduced ? 0 : 0.5 }, "<0.2");
    tl.current = t;
    return () => {
      t.kill();
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      t.timeScale(1).play();
      const first = menuRef.current?.querySelector<HTMLElement>(".menu__link");
      window.setTimeout(() => first?.focus(), 400);
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
      t.timeScale(1.6).reverse();
    }
  }, [open]);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const nodes = [btnRef.current, ...Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"))].filter(Boolean) as HTMLElement[];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Hover preview follows the pointer.
  useEffect(() => {
    const p = previewRef.current;
    if (!p || !open) return;
    gsap.set(p, { left: window.innerWidth * 0.7, top: window.innerHeight * 0.5 });
    const xTo = gsap.quickTo(p, "left", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(p, "top", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 40);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [open]);

  useEffect(() => {
    const p = previewRef.current;
    if (!p) return;
    gsap.to(p, { opacity: hoverIdx === null ? 0 : 1, scale: hoverIdx === null ? 0.85 : 1, xPercent: 0, duration: 0.5, ease: "expo.out" });
  }, [hoverIdx]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <header className={`nav ${hidden && !open ? "is-hidden" : ""}`}>
        <div className="nav__left">
          <button
            ref={btnRef}
            className="nav__link menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-btn__icon" aria-hidden>
              <span />
              <span />
            </span>
            <span className={`roll ${open ? "is-on" : ""}`} aria-hidden>
              <span>Menu</span>
              <span>Close</span>
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
          <button
            className="nav__link mood-btn"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              cycle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label={`Change the mood. Current mood: ${MOODS[index].name}`}
          >
            <span className="ulink">Change the mood</span>
          </button>
          <span aria-live="polite" className="sr-only">
            Mood: {MOODS[index].name}
          </span>
        </div>

        <Link href="/" className="nav__name" aria-label={`${site.name}, home`}>
          <span>Asib</span>
          <span className="nav__name-serif">uz Zaman</span>
        </Link>

        <div className="nav__right">
          <RollButton href="/contact/" label="Let's connect" className="hide-xs" />
        </div>
      </header>

      <div id="site-menu" ref={menuRef} className="menu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Primary">
          <ul className="menu__list" onPointerLeave={() => setHoverIdx(null)}>
            {nav.map((item, i) => (
              <li className="menu__item" key={item.href}>
                <Link
                  href={item.href}
                  className="menu__link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={close}
                  onPointerEnter={() => setHoverIdx(i)}
                >
                  <span className="mask">
                    <span className="menu__label">{item.label}</span>
                  </span>
                  <span className="menu__idx">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <span>{site.currentRole}</span>
          <span style={{ display: "flex", gap: "1.25rem" }}>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </span>
        </div>
        <div className="menu__preview" ref={previewRef} aria-hidden>
          {hoverIdx !== null && <PlaceholderArt variant={previewArt[hoverIdx % previewArt.length]} seed={hoverIdx} />}
        </div>
      </div>
    </>
  );
}
