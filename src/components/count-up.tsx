"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
};

const numericPattern = /^([^\d]*)([\d,]+)(.*)$/;

export function CountUp({ value }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const element = elementRef.current;
    const match = numericPattern.exec(value);
    if (!element || !match) return;

    const target = Number(match[2].replaceAll(",", ""));
    if (!Number.isFinite(target)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frameId = 0;
    const formatter = new Intl.NumberFormat("en");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 700;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = Math.round(target * eased);
          setDisplayValue(`${match[1]}${formatter.format(current)}${match[3]}`);
          if (progress < 1) frameId = window.requestAnimationFrame(animate);
        };
        frameId = window.requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <span ref={elementRef}>{displayValue}</span>;
}
