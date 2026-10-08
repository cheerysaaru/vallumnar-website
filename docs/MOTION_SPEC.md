# Vallumnar Motion Spec

**Status: Step 0 research for the revised master prompt. Awaiting approval. No site code has been changed in this round.**
This document replaces the previous motion spec. The existing homepage implementation predates this prompt and will be reworked after approval.

## Evidence and confidence

- **MEASURED** = observed in a real browser (Playwright Chromium), read from the DOM/computed styles, or read from video stream metadata.
- **ESTIMATED** = inferred from handheld recordings, or a proposed Vallumnar design target. ESTIMATED values are proposals, not reference facts.
- Study method: pages opened at **1440 × 900** and **390 × 844**; hero recorded with Playwright video; frames extracted with FFmpeg at **1 fps** (plus targeted timestamps and FFmpeg `scene` detection / `signalstats`). Frame extraction and all study artifacts live outside the repository and are never committed.
- Copyright: the three references are studied for pattern, structure, pacing and feel only. No video, image, font, copy, code or artwork is downloaded into, embedded in, or committed to this repository.

## Sources examined

| Source | Evidence |
| --- | --- |
| `https://vana.org/` (Ref A, current site) | **MEASURED** in real browser at both viewports: DOM, computed styles, scroll trace, 22 s Playwright recording, per-second brightness/color samples, scene-change detection. |
| `https://www.awwwards.com/sites/vana` (Ref B listing) | **MEASURED:** "Visit Site" → `https://www.vana.com/`; SOTD badge 7.36/10. |
| `https://web.archive.org/web/20221019100623/https://www.vana.com/` (Ref B, 2022 site) | **MEASURED** in real browser at both viewports: sections, type, cards, pills, FAQ click, hover, header scroll trace. |
| `aniamtion looks.mp4` (Ref C, airline/travel-tech, user recording) | **MEASURED (file):** 22.27 s, 576 × 1024, 30 fps, with audio. Frames labeled 1–22 s analyzed as a contact sheet. Scroll distances and pin lengths cannot be measured from a handheld recording — Ref C timing values below are ESTIMATED. |
| `hero sectionn animation.mp4`, `layout style and format.mp4` | User recordings of Refs A/B; superseded by the real-browser measurements above. |

---

## Ref A — Vana hero (MEASURED)

### What drives the motion

- **No GSAP, ScrollTrigger, Lenis, Lottie, Three.js, WebGL, canvas or Webflow was present.** Globals probed in-page: none found; `document.querySelectorAll('canvas')` → 0; no matching script URLs.
- The hero animation is a **background `<video>`**: `hero.webm`, **duration 21.288 s**, `loop`, `muted`, autoplaying at **1×**, `object-fit: cover`, rendered **1440 × 746** (desktop) and **390 × 696** (mobile).
- Page stack: Next.js-style CSS module classes + Tailwind utilities; font **Onest** (module-scoped `@font-face`).
- Conclusion for Vallumnar: the reference achieves its calm morph with a baked video, not code. Vallumnar's brief requires a **code-built** halftone field instead — pattern borrowed, asset not.

### Animation content, cycle and colors

- The field cycles through distinct abstract states. Confirmed states in frames: **horizontal scan-line globe → denser scan-line globe → glyph/dot raster mass → soft painterly solid → scan-line hand/organic silhouette**, then back.
- **Loop length: 21.288 s** (media metadata). FFmpeg scene detection on the hero region (threshold 0.06) found change points at recording times 2.6 / 5.08 / 7.96 / 11.24 / 15.12 / 17.36 s, then a rapid sequence at 19.0–20.96 s. With content first painted at ≈2.6 s, transitions are ≈**2.2–3.9 s apart**, i.e. roughly **5–6 discernible states per loop → ≈3.5–4.3 s average dwell**, with a faster dissolve burst near the loop end.
- Transitions are **gradual blends**, not cuts (intermediate frames show mixed states).
- **Brightness** of the right-side field (FFmpeg `signalstats.YAVG` on a 720 × 700 crop, per second): oscillates **162 → 200 → 162** — about a 15 % luma swing, darkest during dense violet states, lightest during pale solid states.
- **Colors sampled from full-resolution screenshots:** page/cream background **#FCFCFA**; field light state **#B9B0ED**; field deep state **#9286EC / #8884E8**; mid blend **#BAB2F4 → #DDD8F7**. Per-second right-edge samples run **#8884E8 ↔ #CFCDEA**. Headline **#111111** (computed `rgb(17,17,17)`).
- The field occupies the full hero area but is visually weighted to the right; the left third stays near-white behind the copy.

### Headline, subtitle, header

- **Headline does not animate after load.** Samples over 2 s: `opacity: 1`, `transform: none`, constant `y`. The page renders complete at first paint (screenshot at t ≈ 1.5 s already shows the full hero). No staggered entrance measured.
- Desktop: h1 **108 px / 95.04 px line-height (0.88), weight 500, letter-spacing −5.4 px (−0.05 em)**, box 1002 × 190 at x = 146, y = 236. Subtitle **25 px / 30 px**, letter-spacing −0.375 px, 70 % black, width 865 px.
- Mobile: h1 **52 px / 45.76 px, −2.6 px**, box 364 × 92 at x = 11, **y = 440** (lower half of the 844 px viewport). Subtitle **20 px / 24 px**.
- Hero height = **90 svh − nav**: 746 px at 1440 × 900; 696 px at 390 × 844.
- Header: **64 px, `position: sticky; top: 0`**, opaque **#FCFCFA**, z-40, nav links 15–17 px, filled CTA **#4141FC**.

### Scroll behavior

- **No pinning.** Scroll trace: `scrollY` 0 → 1400 with hero top 0 → −1400 (1:1). Header remains at viewport top at every step with constant background — **no hide/show, no background change**.
- After the hero, a row of numbered feature cards ("FOR YOU 01 …") scrolls in beneath.

---

## Ref B — Vana 2022 (Awwwards era, archived) (MEASURED)

### Libraries

- **jQuery 3.5.1** and the **Webflow runtime** (`webflow.74d14d168.js`); `Webflow.require('ix2')` available. No GSAP, ScrollTrigger, Lenis, Lottie or Three.js detected.

### Motion behaviors

| Behavior | Measurement |
| --- | --- |
| Button hover | **`transition: 0.3 s all cubic-bezier(0.77, 0, 0.175, 1)`**; hover flips background **#0075FF → #FFFFFF** and text **#FFFFFF → #0075FF** (color inversion, no movement). |
| Feature card hover | **MEASURED: no lift, no shadow, no transform.** Computed `transition: 0s all ease`; real `page.hover` leaves `transform: none`, `box-shadow: none`. Arrow icons also `0s`. |
| Scroll reveal | **No reveal-on-scroll measured.** Statement heading sampled through a full top-to-bottom scroll: `opacity` constant **1**, `transform: none`, `transition: 0s ease`. Only 10 `data-w-id` nodes exist on the page. |
| Accordion | Row `.questions__box--content` collapsed **h = 98 px**, expanded **h = 186 px** (+88 px answer). After click, height settles within **≈33 ms**; row `transition: 0s all ease` → **effectively instant, no smooth height animation** on the reference. |
| Header | **`position: fixed`, transparent.** Hides by `translateY(-160 px)` while scrolling down and animates back on scroll up (a mid-animation sample caught `translateY(-32.8 px)`). |
| Section rhythm | Alternating bands: white hero → **#F5F4F4** grey bands → **#DBFF00** lime FAQ panel → grey footer. |

### Reference takeaway

Ref B contributes **pacing and component shape**, not motion craft: hover is a 300 ms color flip, the accordion snaps, and there are no scroll reveals. Vallumnar's richer reveal/accordion motion (below) is therefore an original extension, not a copy.

---

## Ref C — airline / travel-tech site (from user recording)

**ESTIMATED timings** — handheld recording, scroll speed unknown. Sequence (second labels from the labeled contact sheet):

| Time | Observed pattern |
| --- | --- |
| 1–2 s | **Dark hero**, large centered white headline, multi-color gradient glow (orange/green/red) behind it, small stat row; a wide **rounded photo card** sits below the headline. |
| 3–4 s | The rounded card **expands to nearly fullscreen** while scrolling (rounded corners still visible at full size), then **overlay text fades in on top of the photo**. |
| 5–6 s | Card releases; **light section** with a small centered rounded photo and a centered headline. |
| 7–8 s | **Light → dark flip**: cream section gives way to a dark band with small centered gold/white text. |
| 9–15 s | Dark sections: service/feature cards with **gradient tile backgrounds**, left-aligned headlines, a **row of 4 stat/feature tiles** at 14–15 s. |
| 15–16 s | **Dark → light flip** back to a cream section with centered dark text. |
| 16–20 s | Light editorial sections with large imagery and overlay text cards. |
| 21–22 s | **Bold red CTA band**, then a **dark footer** with link columns. |
| all frames | A **floating, centered bottom pill** stays on screen (white pill with a red action inside). |

**Not measurable from this recording:** pin distance, scale values, radius change, exact trigger points, transition durations. Treated as ESTIMATED proposals below.

---

## Proposed original Vallumnar motion

All values in this section are **ESTIMATED design targets requiring approval**. Palette, copy and artwork are Vallumnar's own; no reference assets are used.

### Tokens (site-wide)

- Durations: **200 / 400 / 700 / 1200 ms**. Easings: **expo-out** for entrances, **ease-in-out** for transitions. Stagger: **80–120 ms**.
- Animate only `transform`, `opacity`, plus CSS-variable color tweens for theme flips. No layout-shift animation.
- Libraries: **Lenis** smooth scroll (disabled under reduced motion) + **GSAP + ScrollTrigger**, code-split per route. Cleanup of listeners/ScrollTriggers on unmount.

### 1. Hero halftone field (original, code-built)

- Canvas 2D (chosen over WebGL as the lighter option; revisit only if profiling demands).
- Cycle **3–4 original abstract forms** (flowing wave, node network, gear/cloud/shield silhouette). Per-form dwell **6–8 s** (deliberately calmer than the reference's ≈3.5–4.3 s).
- Phase sequence per form: **scattered dots → dense dot grid → horizontal scan-lines → soft solid → dissolve to next form**; blend **1.2–1.6 s** between phases.
- Gradient base **#F3F8FC → #2779A7 → #1D4ED8**, dots in blue tones; `data-theme="dark"` variant **#0B2A4A → #1E3A8A** for the careers band.
- Pointer bend on desktop (field skews gently toward the cursor); touch = drift only.
- Text contrast over every frame: headline #0F172A over #F3F8FC ≈ **16.9:1**; white over #2779A7 ≈ **4.8:1** (AA); white over #1D4ED8 ≈ **6.3:1** (AA).

### 2. Intro sequence (~1.6 s, once)

- Background **blur/dark → sharp ≈1.2 s**; headline **masked line-by-line slide-up**, **80–120 ms stagger, expo-out**; subtitle and buttons fade-up after; **header fades in last**.

### 3. Scroll behaviors

- **Hero pin (brief):** field slowly scales (propose **1 → 1.06**) and fades (propose **1 → 0.35**) while the next section rises over it; pin distance ≈**60–80 vh** — to be tuned for scroll comfort after implementation.
- **Section reveals:** label → heading (masked lines) → paragraph → button; **opacity 0 → 1, 24 px rise**, 80–120 ms stagger.
- **Card grids:** staggered entrance; hover **lift 4–6 px** + soft shadow + arrow nudge (reference had none — original extension).
- **Counters:** count up when in view (placeholders `[X+]` only).
- **Parallax:** large illustrations ±**24–40 px**, transform only.
- **Photo-card expansion (Ref C pattern, original artwork):** rounded card (**radius 28 px**) scrolls in, **pins**, scales to full viewport while **radius → 0**, overlay text fades in. Pinned ScrollTrigger with **scrub on transform only** (scale/clip-path); propose pin length **~100 vh**. Replaced photo with an original SVG illustration or animated gradient scene.
- **Dark/light flip (Ref C pattern):** when a section crosses **viewport center**, tween `--bg` / `--text` CSS variables on the page wrapper over **~500 ms** ease-in-out.
- **Word-by-word highlight:** big intro sentence, word opacity **0.2 → 1** scrubbed with scroll; accent words get a **#F2C94C-tinted** highlight (dark text on the tint — never yellow text on light).
- **Accordion (Ref B pattern, smoother than reference):** measured-height or `grid-template-rows` animation **~400 ms ease-in-out**; "+" rotates **45° to "×"**; one panel open at a time; `aria-expanded` / `aria-controls`; fully keyboard operable.
- **Header:** transparent over hero → solid blur bar on scroll; **hides on scroll down, shows on scroll up** via `translateY` (the reference behavior, MEASURED); ~300 ms.
- **Floating bottom pill (Ref C pattern, optional):** centered pill with 2–3 links/CTA, appears after the hero, hides near the footer; **desktop and tablet only (≥768 px)**.
- **Page transitions:** short fade between routes (**~200 ms**); mobile menu = staggered full-screen overlay.

### 4. Performance, fallbacks, reduced motion

- Static gradient poster paints first (fast LCP); canvas code loads after first paint.
- `prefers-reduced-motion`: one static gradient/halftone frame; no pin, parallax, counters or intro sequence; content fully readable without JS.
- Pause the field when off-screen (IntersectionObserver) and when the tab is hidden.
- `devicePixelRatio` capped at **1.5**; fewer dots on mobile; **auto-reduce density if fps < 50**.
- Never hide content behind an animation; everything readable if JS fails.

---

## Differences from the references

- Vallumnar: original blue palette (#0B2A4A/#1E3A8A/#1D4ED8/#2779A7/#F3F8FC + accent #F2C94C) — not Vana's violet/lime/red or the airline's orange/green/red.
- Vallumnar hero is a live canvas field; Ref A ships a baked video. No reference video, image, font, copy or code is used.
- Ref B has no scroll reveals and an instant accordion; Vallumnar adds smooth reveals, a 400 ms accordion and hover lifts — original extensions of the same component shapes.
- Ref C contributes only the expansion, theme-flip and floating-pill patterns, re-built with original illustration.

## Approval gate

Research specification only. No animation code, layout code, dependencies or homepage features have been changed in this round. Wait for explicit approval before implementation.
