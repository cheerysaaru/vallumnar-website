"use client";

import { useEffect, useRef } from "react";

const stateDwell = 7500;
const stateMorph = 1400;
const motifCount = 4;
const nodePoints = [
  [0.61, 0.27],
  [0.77, 0.34],
  [0.68, 0.52],
  [0.88, 0.55],
  [0.75, 0.73],
  [0.94, 0.29],
];

type Motif = "wave" | "network" | "globe" | "layers";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function distanceToSegment(
  x: number,
  y: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  const projection =
    lengthSquared === 0
      ? 0
      : clamp(((x - ax) * dx + (y - ay) * dy) / lengthSquared, 0, 1);
  return Math.hypot(x - (ax + projection * dx), y - (ay + projection * dy));
}

function motifField(motif: Motif, x: number, y: number, time: number) {
  if (motif === "wave") {
    const center =
      0.49 +
      Math.sin(x * 5.2 + time * 0.00012) * 0.11 +
      Math.sin(x * 10.5 - time * 0.00008) * 0.035;
    return clamp(1 - Math.abs(y - center) * 4.4, 0, 1);
  }

  if (motif === "network") {
    let strength = 0;
    for (let index = 0; index < nodePoints.length; index += 1) {
      const [nx, ny] = nodePoints[index];
      const radius = Math.hypot(x - nx, y - ny);
      strength = Math.max(strength, clamp(1 - radius * 12, 0, 1));

      const next = nodePoints[index + 1];
      if (next && index % 2 === 0) {
        strength = Math.max(
          strength,
          clamp(1 - distanceToSegment(x, y, nx, ny, next[0], next[1]) * 19, 0, 1) *
            0.7,
        );
      }
    }
    return strength;
  }

  if (motif === "globe") {
    const dx = (x - 0.78) / 0.23;
    const dy = (y - 0.5) / 0.42;
    const radius = Math.hypot(dx, dy);
    if (radius > 1) return clamp(1 - (radius - 1) * 2.5, 0, 0.18);

    const longitude = Math.atan2(dy, dx);
    const latitude = Math.asin(clamp(dy, -1, 1));
    const meridians = Math.abs(Math.sin(longitude * 8));
    const parallels = Math.abs(Math.sin(latitude * 11));
    return Math.max(1 - meridians * 1.8, 1 - parallels * 1.8) * (1 - radius * 0.2);
  }

  let strength = 0;
  for (let index = 0; index < 5; index += 1) {
    const band = 0.24 + index * 0.14 + Math.sin(x * 5 + index) * 0.035;
    strength = Math.max(strength, clamp(1 - Math.abs(y - band) * 17, 0, 1));
  }
  return strength;
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
  pointer: { x: number; y: number } | null,
  reducedMotion: boolean,
  densityScale: number,
) {
  context.clearRect(0, 0, width, height);
  const step = Math.max(17, width / 92) * densityScale;
  const loop = motifCount * (stateDwell + stateMorph);
  const time = reducedMotion ? 0 : elapsed % loop;
  const segment = Math.floor(time / (stateDwell + stateMorph));
  const phase = time % (stateDwell + stateMorph);
  const current = (segment % motifCount) as number;
  const next = ((current + 1) % motifCount) as number;
  const motifs: Motif[] = ["wave", "network", "globe", "layers"];
  const transition = phase > stateDwell ? smoothstep((phase - stateDwell) / stateMorph) : 0;
  const scanlineBlend = transition * (1 - transition) * 4;
  const pointerRadius = Math.max(width, height) * 0.17;

  for (let y = step * 0.4; y <= height; y += step) {
    for (let x = width * 0.39; x <= width; x += step) {
      const nx = x / width;
      const ny = y / height;
      const from = motifField(motifs[current], nx, ny, elapsed);
      const to = motifField(motifs[next], nx, ny, elapsed);
      let intensity = from + (to - from) * transition;
      const fade = smoothstep((nx - 0.32) / 0.42);
      const drift = 0.035 * Math.sin(elapsed * 0.00016 + nx * 9 + ny * 4);
      const pointerInfluence = pointer
        ? Math.exp(
            -(
              (x - pointer.x) ** 2 +
              (y - pointer.y) ** 2
            ) /
              (2 * pointerRadius ** 2),
          ) * 0.16
        : 0;
      intensity = clamp(intensity + drift + pointerInfluence, 0, 1);
      if (intensity < 0.07) continue;

      const scan = 0.76 + 0.24 * Math.abs(Math.sin(y / step));
      const radius = 0.65 + intensity * 2.25 + scanlineBlend * 0.45 + pointerInfluence;
      context.globalAlpha = clamp(fade * (0.12 + intensity * 0.54) * scan, 0, 0.7);
      context.fillStyle = intensity > 0.72 ? "#0B2A4A" : "#2779A7";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  if (transition > 0.08 && transition < 0.92) {
    context.globalAlpha = 0.06 * scanlineBlend;
    context.strokeStyle = "#1D4ED8";
    context.lineWidth = 0.7;
    for (let y = height * 0.08; y < height; y += 8) {
      context.beginPath();
      context.moveTo(width * 0.52, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }
  context.globalAlpha = 1;
}

export function HeroField() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!wrapper || !canvas) return;
    if (!context) {
      console.error("The hero canvas is unavailable; retaining its static CSS background.");
      return;
    }
    const interactionTarget = wrapper.closest<HTMLElement>(".v-hero") ?? wrapper;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerPreference = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reducedMotion = motionPreference.matches;
    let visible = false;
    let frameId = 0;
    let running = false;
    let densityScale = 1;
    let frameCount = 0;
    let performanceStart = performance.now();
    let pointer: { x: number; y: number } | null = null;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawField(context, bounds.width, bounds.height, 0, null, true, densityScale);
      if (reducedMotion) {
        return;
      } else {
        schedule();
      }
    };

    const render = (now: number) => {
      running = false;
      if (document.hidden || !visible || reducedMotion) return;
      const bounds = wrapper.getBoundingClientRect();
      drawField(context, bounds.width, bounds.height, now - startedAt, pointer, false, densityScale);
      frameCount += 1;
      if (now - performanceStart >= 1200) {
        const framesPerSecond = (frameCount * 1000) / (now - performanceStart);
        if (framesPerSecond < 50) densityScale = Math.min(1.8, densityScale + 0.2);
        frameCount = 0;
        performanceStart = now;
      }
      schedule();
    };

    function schedule() {
      if (!running && visible && !document.hidden && !reducedMotion) {
        running = true;
        frameId = window.requestAnimationFrame(render);
      }
    }

    const updatePointer = (event: PointerEvent) => {
      if (!pointerPreference.matches || event.pointerType === "touch") return;
      const bounds = wrapper.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      schedule();
    };

    const clearPointer = () => {
      pointer = null;
      schedule();
    };

    const updateMotionPreference = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        if (frameId) window.cancelAnimationFrame(frameId);
        running = false;
        const bounds = wrapper.getBoundingClientRect();
        drawField(context, bounds.width, bounds.height, 0, null, true, densityScale);
      } else {
        schedule();
      }
    };

    const updateVisibility = () => {
      if (document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        running = false;
      } else {
        schedule();
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        if (frameId) window.cancelAnimationFrame(frameId);
        running = false;
      }
    });
    intersectionObserver.observe(wrapper);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    interactionTarget.addEventListener("pointermove", updatePointer, { passive: true });
    interactionTarget.addEventListener("pointerleave", clearPointer, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener("change", updateMotionPreference);
    resize();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      interactionTarget.removeEventListener("pointermove", updatePointer);
      interactionTarget.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="v-hero-field" aria-hidden="true">
      <canvas ref={canvasRef} className="v-hero-field__canvas" />
    </div>
  );
}
