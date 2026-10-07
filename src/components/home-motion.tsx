"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>(".v-home");
    const heroStage = home?.querySelector<HTMLElement>(".v-hero-stage");
    if (!home || !heroStage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealTargets = Array.from(home.querySelectorAll<HTMLElement>("[data-reveal]"));
    let revealObserver: IntersectionObserver | undefined;

    if (!reduceMotion.matches && "IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const target = entry.target as HTMLElement;
            delete target.dataset.pending;
            target.dataset.revealed = "true";
            revealObserver?.unobserve(target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      for (const target of revealTargets) {
        if (target.getBoundingClientRect().top <= window.innerHeight * 0.92) {
          target.dataset.revealed = "true";
        } else {
          target.dataset.pending = "true";
          revealObserver.observe(target);
        }
      }
    }

    let frameId = 0;
    const updateHeroScroll = () => {
      if (reduceMotion.matches) return;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const bounds = heroStage.getBoundingClientRect();
        const travel = Math.max(heroStage.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-bounds.top / travel, 0, 1);
        home.style.setProperty("--hero-scale", String(1 + progress * 0.06));
        home.style.setProperty("--hero-opacity", String(1 - progress * 0.36));
      });
    };

    updateHeroScroll();
    window.addEventListener("scroll", updateHeroScroll, { passive: true });
    window.addEventListener("resize", updateHeroScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      revealObserver?.disconnect();
      window.removeEventListener("scroll", updateHeroScroll);
      window.removeEventListener("resize", updateHeroScroll);
      home.style.removeProperty("--hero-scale");
      home.style.removeProperty("--hero-opacity");
    };
  }, []);

  return null;
}
