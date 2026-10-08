# Vallumnar Motion Spec — Scroll-Story Edition (Master Prompt v2)

**Status: Step 0 for master prompt v2 (scroll-story, sticker-and-card style). Awaiting approval. No site code has been changed in this round.**
This document replaces every earlier motion spec. The existing homepage implementation predates this prompt and will be reworked after approval.

## Evidence and confidence

- **MEASURED** = read directly from pixels of the reference recording with FFmpeg + scripted pixel analysis (bboxes, color-family maps, row/column scans, frame-to-frame difference curves).
- **ESTIMATED** = a scroll distance, easing, duration or behavior the video cannot yield (no DOM), or a proposal from the v2 prompt. ESTIMATED values are starting points to calibrate by side-by-side comparison.
- **Study method:** reference video `reference/scroll_story.mp4` (git-ignored, never committed): **1600×1200, 60 fps, 29.45 s**. Extracted **442 frames at 15 fps** (`f0000–f0441.png`) outside the repo. Motion curve from `tblend=all_mode=difference,signalstats` per-frame YAVG (1766 samples) bucketed to 0.25 s. All geometry below is in **viewport coordinates: 1433 × 797 px** (browser window client area x83–1515, y201–997 of the recording; **1 vh = 797 px**).
- **Copyright:** the reference is studied for pattern, rhythm, timing and feel only. No video, image, font, copy, brand name, logo, illustration or code from it is used in, or committed to, this repository. All artwork in the site will be original inline SVG.
- **Calibration rule:** every number below is tagged MEASURED or ESTIMATED; where prompt target and measurement disagree, the deviation table at the end decides which to build with, and the final side-by-side frame comparison (±5%) validates.

## Motion system (build target)

| Layer | Decision (per v2 prompt) |
| --- | --- |
| Smooth scroll | **Lenis**, `lerp: 0.1`, driving one GSAP ticker (single RAF shared with GSAP — no second loop). |
| Scroll animation | **GSAP + ScrollTrigger** for every scrub, pin and reveal. |
| Pinning | `pin: true` with `anticipatePin: 1`, `invalidateOnRefresh: true`; all triggers created inside `gsap.context()` / `useGSAP()` and reverted on unmount; one shared `ScrollTrigger.refresh()` after fonts/images settle. |
| Animate only | `transform`, `opacity` (+ `stroke-dashoffset` for line charts, CSS custom properties for progress widths). Never left/top/width/height/margin. |
| Durations | `fast 200ms · base 400ms · slow 700ms · grand 1200ms` |
| Easings | entrances `expo.out` · transitions `power3.inOut` · hovers/exits `power2.out` |
| Stagger | `0.08–0.12 s` (cards, tiles, chips) |
| Scrub lag | `scrub: 0.6` for reveals; hero scene uses direct scrub (`scrub: true`) for 1:1 feel |
| Reduced motion | `prefers-reduced-motion`: Lenis off, all pins become normal flow, reveals render at final state, physics/cycle replaced by static first frame. |
| Mobile (<768px) | No mega pins. Hero scene3/4 replaced by a **~60 vh** scrub. Chip pile capped at **8** chips. Intro ≤ 1.4 s. |
| Intro (first paint) | ~1.4 s: nav pill drops in, headline lines rise (stagger 0.08), buttons fade-up, card stack assembles (ESTIMATED — recording starts already assembled). |
| Hover (all interactive) | lift `-2px / 200ms power2.out` · arrow icons `+4px x` · dashboard tiles `-6px y`. |

## Global scroll timeline (from the recording)

Quiet windows are 0.25 s-bucketed frame-difference minima (MEASURED); cumulative scroll after t≈7.5 s is **ESTIMATED** by integrating phase velocities measured on tracked elements (button, sheet top, heading, word, stat rows, CTA top) — recalibrate in-build with ScrollTrigger markers.

| t (s) | Event | Scroll (vh) | Confidence |
| --- | --- | --- | --- |
| 0.00–0.15 | Hero at rest (assembled) | 0 | MEASURED |
| 0.15–1.33 | Hero scrolls, content rises 114 px; velocity ramps 0 → ~0.25 vh/s (Lenis ease-in) | 0 → 0.14 | MEASURED/EST |
| 1.0–1.6 | Front card tilt 3.2° → 0° | ~0.3–0.5 | MEASURED |
| 1.7–2.4 | Stack expands; front card top y742 → y320; scene fills 1433×797 | ~0.55 | MEASURED/EST |
| 2.4–4.97 | **Pinned scene scrub** — 4–6 parallax layers, full-bleed hold | → 1.74 (**pin ≈ 1.60–1.74 vh ≈ 160–175 vh**) | ESTIMATED (integrated) |
| 4.97–6.4 | **Sheet rises** full-bleed (top y997 → above 0), peak **477 px/s ≈ 0.60 vh/s**, travel ≈ 1.11 vh | 1.74 → 2.85 | MEASURED/EST |
| 6.4–7.5 | Content settles; heading y526 → y342 decelerating 230 → 30 px/s (`power2.out`) | → 2.87 | MEASURED |
| 7.0–11.25 | **QUIET** — analytics at rest, dashboard cycle runs | 2.87 hold | MEASURED |
| 11.25–12.5 | Fast scroll (~0.6 vh/s) | → ~3.6 | ESTIMATED |
| 12.75–14.25 | **QUIET** — interlude word at rest in view | ~3.7–3.9 | MEASURED/EST |
| 14.2–15.0 | Word slides up 149 px (accelerating, settles ~14.86), sticker pops ~14.45–14.75 | ~3.9 → 4.1 | MEASURED/EST |
| 15.0–15.8 | Word fades out (ink 10.8k → 2.4k ≈ opacity → 0.2) | ~4.1 | MEASURED |
| 15.13–17.27 | Numbered cards pass at **260 px/s ≈ 0.33 vh/s** | → ~4.8 | MEASURED/EST |
| 17.4–19.3 | Statement enters + scrubs opacity (motion peaks t≈19) | ~4.9 → 5.4 | MEASURED/EST |
| 19.5–22.2 | Stat rows pass (pitch 350 px = 0.44 vh, ~170 px/s) | ~5.4 → 6.0 | MEASURED/EST |
| 22.5–24.5 | Testimonials pass | ~6.0 → 6.6 | ESTIMATED |
| 24.75–25.0 | **QUIET** — FAQ in view (4 rows visible) | ~6.6 | MEASURED |
| 25.25–26.5 | CTA enters (top y928 → y382 at **455 px/s ≈ 0.57 vh/s**) | → ~7.3 | MEASURED/EST |
| 26.5–27.25 | **QUIET** — CTA at rest, illustration drawn | ~7.3 | MEASURED |
| 27.25–28.75 | CTA exits upward; footer enters | → ~8.1 | ESTIMATED |
| 28.5–29.45 | Footer at rest; stacked-card peek at bottom (purple 1202×331 + pink behind) | ~8.1–8.4 | MEASURED/EST |

---

## Moment-by-moment motion (the 13 moments)

### 1. Floating pill nav (MEASURED)
- Pill **533×57 at x534–1066, y232–288** — centered, 31 px from viewport top. **Geometry never changes across the whole recording** (no shrink-to-logo).
- Fill measured near-#F9F9F9 with dark text; logo black at rest, tints **purple during the scene scrub** (2.4–6.1 s) and pink-ish later — a scroll-state color swap, ~400 ms crossfade.
- Vallunar proposal: pill `surface white/85 + backdrop-blur(12px)`, radius `9999`, no border, shadow almost none; wordmark SVG swaps `ink → brand-blue` over the hero scene (400 ms). Mobile: same pill, horizontal padding 16, links collapse to a menu button.

### 2. Hero (MEASURED)
- Headline: **2 lines, y373–486**, cap-height **47 px → em ≈ 65 px ≈ 4.5 vw** (prompt target 4.6 vw ✓), line pitch 68 px (**lh ≈ 1.05**), centered, `text-wrap: balance`.
- Filled CTA **176×50 at x618–793, y527–577**; ghost CTA right of it (text row x966–1159; button box ≈ x845–1159, ESTIMATED).
- Card stack at rest (t=0): purple front card top ≈ y560, pink mid top y708 / right edge x1191, yellow back top y704 / right edge x1097 — a fanned, rotated stack of 3.
- Intro sequence (ESTIMATED, ~1.4 s): pill drop → headline lines rise (stagger 0.08, expo.out) → buttons fade-up → stack settles.

### 3. Hero → full-bleed scroll scrub (MEASURED + ESTIMATED)
- Pre-pin scroll: content −114 px over 0.15–1.33 s (velocity ramp 0 → ~200 px/s).
- Stack assembly: front card tilt **3.2° → 0°** (t≈1.0–1.6); front card top **y742 → y320** while the stack expands; by **t≈2.4 the scene fills the full 1433×797 viewport**.
- Full-bleed hold 2.4–4.97 s with 4–6 parallax layers moving at depth-scaled rates (layer speeds not resolvable from pixels → ESTIMATED 0.6×–1.3× scroll rate).
- **Pin length ≈ 160–175 vh (ESTIMATED** by velocity integration; prompt target 160–200 vh ✓). Build: `ScrollTrigger.pin` on the hero wrapper, `scrub: true`, `anticipatePin: 1`, `invalidateOnRefresh: true`; layers grouped as `<g data-depth="…">` and tweened `y` only.

### 4. Sheet rises (MEASURED)
- Full-bleed white sheet slides up over the scene **4.97 → ~6.4 s**: top edge y997 → above viewport top, travel ≈ **1.11 vh**, peak speed **477 px/s ≈ 0.60 vh/s**, then content settles until 7.5 s (heading y526 → y342, decelerating 230 → 30 px/s, `power2.out`).
- Top corner **radius ≈ 28–30 px** (prompt target 40 → see deviations; 28–32 is already a design token).
- Motion is scroll-scrubbed (moves 1:1 with page scroll after the pin releases), not a timed tween.

### 5. Analytics two-card dashboard (MEASURED + ESTIMATED timings)
- Rest window **7.0–11.25 s** (no page scroll; only in-card animation).
- Heading: 2 lines y332–434, pitch 57 px (em ≈ 50–65 px — calibrate).
- Grid (viewport coords): **left card x160–683 (524 px)** with a white inner plate inset ≈21 px; **right card x699–1439 (741 px)** solid `#F7F7F7`; **gap 15 px**; total = **1280 ✓** (≈ 5/12 + 7/12 target).
- Right card contents: segmented control **x1050–1392, y627–652 (343×26)**; **yellow tile x724–911, y622–749 (188×128)**; **pink tile x724–911, y748–893 (188×145)** stacked flush below it; pink line-chart strokes at x≥1316, y748–893; 3-segment progress bar ≈ y900–940 in the left card (ESTIMATED exact y).
- Cycle (frame-difference zones): chip physics fall/settle **7.1–8.4 s (~1.3 s)** → bar-chart growth **8.4–10.0 s** → self-drawing line chart **10.1–11.3+ s**. Measured view zones ≈ 1.5–2 s each (prompt target 4–5 s/view → deviation; the recording may only show a partial cycle). Vallunar: views every **4 s**, crossfade **400 ms `power2.out`**, chip pile re-tops with gravity-ish settle, bars grow staggered 0.08, line draws via `stroke-dashoffset` over 1.2 s, numbers tween with `tabular-nums`.

### 6. Giant single-word interlude (MEASURED)
- Word at rest **12.75–14.25 s**: solid ink bbox ≈ **737×150 px → em ≈ 155–160 px ≈ 11 vw** (prompt target 12 vw — within calibration range).
- Composition (all centered as a group on the viewport): purple icon **123×60 at x242–364** (top-left), word **x353–1090**, yellow sticker **219×78 at x1140–1358** (right of word).
- Motion: word holds (quiet), then **slides up 149 px over 14.2–15.0 s** with a slight scale-up, settling ~14.86; **sticker pops ≈14.45–14.75 s** (ESTIMATED 350 ms overshoot/`back.out(1.7)`); word **fades out 15.0–15.8 s** (ink 10.8k → 2.4k ≈ opacity → 0.2) while the numbered cards enter.
- Vallunar copy: a single word per the content file (e.g. "Integrations" pattern → our own word), never the reference's word.

### 7. Three staggered numbered cards (MEASURED)
- Enter from viewport bottom **15.13 s**, still moving at **260 px/s ≈ 0.33 vh/s** through 17.27 s.
- Left and right card tops are **identical (±4 px) at every sampled frame — no measurable time stagger**; middle card sits **74 px higher** (constant offset while scrolling). Prompt describes left-low / middle-high / right-in-between with 100 ms stagger → deviations table.
- Tile ink heights ≈ **205–210 px**; tile widths ≈ 319–340 px; three cards ≈ equal widths in a row ≈ the 1280 container (gaps ESTIMATED 16–60 px — calibrate).
- Vallunar: colors = coral / mint / sky accents (max 3 on screen ✓), big numbers `300` weight, hover `-6px` tile lift 200 ms.

### 8. Big statement paragraph (MEASURED)
- **4 lines**, block **x226–1391 (w 1153–1217)**, line pitch **85–93 px (avg 89)**, per-line ink 58–72 px → **em ≈ 70–76 px ≈ 5 vw** (prompt target 3 vw → deviation; video wins for side-by-side scoring).
- Entry + opacity scrub **17.4–18.6 s (~1.2 s ≈ 0.5–0.7 vh of scroll, ESTIMATED in vh)**: block top y711 → y414 while dark-pixel count ramps 18.7k → 58.6k — i.e. **opacity ≈ 0.15 → 1 tied to scroll** (`scrub: 0.6`).
- Inline small icons sit inside the text flow (prompt pattern) — original SVG, gently scale 0.9→1 as their line passes 60% viewport.

### 9. Stat rows (MEASURED)
- Row pitch **350 px = 0.44 vh** (hairlines at y289 and y639 @ t=22).
- Left: thumbnail block ≈ **268×245 px** (prompt target 140 → deviation, calibrate); number digit height **140 px ≈ 9.8 vw** (target 9 vw ✓), light weight; right: description column x1156–1427.
- Rows pass at ~170 px/s (slow scroll) 20.6–22.2 s.
- Count-up on enter: ≈ 0.8–1.2 s (ESTIMATED — numeric pixels measurably change across frames in tiles and stat numbers). Tilted sticker per row: −6° to −8° (ESTIMATED angle, prompt pattern).

### 10. Testimonial wall (MEASURED + ESTIMATED)
- Block **centered, x322–1278 (956 px wide)** — narrower than the 1280 container (calibrate); **3 columns ≈ 309 px, gaps ≈ 16 px**; masonry confirmed (column card tops differ: y212 / y233 / y373 at t=23.4).
- Section passes 22.5–24.5 s. **Column drift** (different scroll rates per column) cannot be isolated from a scroll recording → prompt pattern kept as ESTIMATED: columns translate at 0.94× / 1.0× / 1.06× section speed (cap ±10% so cards never collide).

### 11. FAQ accordion (MEASURED)
- At t=25: heading 2 lines y331–433 (pitch 60); **4 rows visible, row pitch 80 px**, hairline separators, question text ink 17 px → em ≈ 18–22 px; **all visible rows collapsed** in the recording (one-open-at-a-time remains the prompt target).
- Interaction (timed, ESTIMATED): height tween 400 ms `power2.out`, chevron rotate 180°, content fade 200 ms delayed 100 ms; only one row open.

### 12. Closing CTA card (MEASURED)
- Card spans the **full container: x161–1439 (1280 px)**, top corner **radius ≈ 54 px** (target 40 → deviation; propose 48).
- Rises 25.53 → 26.6 s (top y928 → y382, **455 px/s ≈ 0.57 vh/s**), at rest 26.5–27.25 s, exits upward 27.25–28 s.
- Fill measured periwinkle in the reference — **not copied**; Vallunar uses a palette token (see deviations: proposal `sky #7DB7F0` or `tint #F3F8FC` — approval decision).
- Right side: original 3D-feel SVG illustration (orbital/ring motif from our object set); reveal = 700 ms `expo.out` fade+rise once the card is 40% in view.

### 13. Footer with stacked-card peek (MEASURED)
- At t=29.4: purple card peek **x194–1395 (1202 px), from y666 to viewport bottom = 331 px visible**, with a **pink card peeking behind it** (2-card stack; yellow not present).
- Link rows: left column y374–419 and y441–486 (pitch 67); right column y374–419, y454–486, y549+ (3 rows). Text sizes flagged ESTIMATED (measured ink suggests larger-than-usual rows — calibrate; expected 16–18 px links).
- Layout per prompt: link columns left, social icons right; wordmark + legal line below; peek cards are decorative, `aria-hidden`.

---

## Timed micro-interactions (not scroll-driven)

| Interaction | Duration / easing | Confidence |
| --- | --- | --- |
| Chip pile physics (fall, collide, settle) | ~1.0–1.3 s, capped 8 chips on mobile | MEASURED window / ESTIMATED physics |
| Dashboard view cycle | target **4 s/view**, crossfade 400 ms | prompt target (measured zones ~1.5–2 s → calibrate) |
| Line chart draw | 1.2 s `stroke-dashoffset`, `power2.out` | ESTIMATED |
| Count-ups (stat numbers, tiles) | 0.8–1.2 s, `tabular-nums` | MEASURED changing / ESTIMATED duration |
| Sticker pop | 350 ms `back.out(1.7)` overshoot | ESTIMATED (pattern) |
| Accordion open/close | 400 ms `power2.out` + chevron | ESTIMATED (all rows closed in recording) |
| Nav logo color swap | 400 ms crossfade, scroll-state | MEASURED colors / ESTIMATED duration |
| Hovers | 200 ms `power2.out` (lift −2, arrow +4, tile −6) | prompt target |

## Performance and accessibility budget

- 60 fps target on mid-tier hardware; if sustained fps < 50, drop chip physics first, then scene parallax depth (keep opacity scrubs).
- Lighthouse ≥ 90 all categories; only `transform/opacity/stroke-dashoffset/CSS vars` animated; fonts `display: swap`; images lazy + explicit dimensions.
- `prefers-reduced-motion`: static final states, no pins, no Lenis, no physics.
- Every scrub has a readable static DOM state (SEO + screen readers); decorative SVG and peek cards `aria-hidden="true"`; FAQ uses `<button aria-expanded>`; carousels never auto-advance without pause on hover/focus.

## Deviations from prompt targets (decision table)

| Item | Prompt target | MEASURED in video | Build decision (proposal) |
| --- | --- | --- | --- |
| Sheet top radius | 40 px | 28–30 px | **30 px** (token 28–32) |
| CTA card radius | 40 px | ≈ 54 px | **48 px** (nearest token; calibrate) |
| Statement type size | 3 vw | ≈ 5 vw (em ≈ 74 px) | **match video**: `clamp(2.2rem, 5vw, 5rem)` |
| Interlude word size | 12 vw | ≈ 11 vw (em ≈ 158 px) | **11.5 vw** start (`clamp(4rem, 11.5vw, 11rem)`) |
| Stat thumbnail | 140 px | ≈ 268×245 | **CONFLICT — calibrate against frames in build** (start 240×220) |
| Analytics card gap | 16–20 px | 15 px | **16 px** |
| Numbered cards | 100 ms stagger; right in-between | no stagger; right = left; middle −74 px | **match video** (offsets as measured); optional 60 ms stagger if approved |
| Dashboard view duration | 4–5 s | zones ≈ 1.5–2 s | **4 s** (prompt) + verify in side-by-side |
| FAQ default | one row open | all closed at t=25 | **keep one-open target** |
| Hero pin scrub | 160–200 vh | ≈ 165–175 vh (integrated) | **170 vh** |
| Testimonial block width | container 1280 | 956 px centered | **calibrate** (start 960) |
| CTA card fill | periwinkle | periwinkle (reference) | **not copied** — proposal `sky #7DB7F0` or `tint` — **approval needed** |

## Deliverable gate

After approval: implement all components + motion system, run typecheck/lint/tests/production build, capture 1440 and 390 recordings, build side-by-side frame sheets for all 13 moments, fix >5% differences, then report. **No merge until "okay, merge to main".**
