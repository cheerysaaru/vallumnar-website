# Vallumnar Layout Spec — Scroll-Story Edition (Master Prompt v2)

**Status: Step 0 for master prompt v2 (scroll-story, sticker-and-card style). Awaiting approval. No site code has been changed in this round.**
This document replaces every earlier layout spec. The existing homepage implementation predates this prompt and will be reworked after approval.

## Evidence and confidence

- **MEASURED** = pixel-read from `reference/scroll_story.mp4` (study-only, git-ignored) with FFmpeg + scripted bbox/color-map analysis, in **viewport coordinates 1433 × 797 px** (1 vh = 797 px).
- **ESTIMATED** = prompt target, proposal, or value the video cannot yield.
- All reference artwork/copy/colors below marked "reference" are study observations only — **never used in the site**. Site art = original inline SVG; wordmark = original SVG; fonts = open-license via `next/font/google`.

---

## 1. Design tokens

### Palette (v2 prompt — authoritative for the site)

| Token | Hex | Use |
| --- | --- | --- |
| ink | `#0F172A` | headings, primary text |
| body | `#475569` | paragraphs, descriptions |
| surface | `#FFFFFF` | page, sheets, cards |
| surface-soft | `#F6F8FB` | section bands, dashboard cards |
| hairline | `#E5E9F0` | borders, FAQ rows, stat dividers |
| brand-blue | `#1D4ED8` | primary CTA, links, active states |
| brand-deep | `#0B2A4A` | dark sections, footer ink |
| brand-mid | `#2779A7` | secondary accents, charts |
| brand-tint | `#F3F8FC` | tinted panels, chip backgrounds |
| accent-sunflower | `#F2C94C` | stickers, highlights |
| accent-coral | `#FF6B4A` | counters, card 1 |
| accent-bubblegum | `#FF7AB6` | tiles, card 2 |
| accent-mint | `#3DDBA6` | success/positive deltas |
| accent-sky | `#7DB7F0` | card 3, illustration mid-tone |

- **Max 3 accent colors per screen.**
- Reference-only observations (NOT used): reference brand purple ≈ `#6216F8`, hero card pink `#F355A9`, card yellow `#FAD52E`, dashboard tile yellow `#F8D32C`, CTA periwinkle `#7182E7`, pill surface `#F9F9F9`.

### Radii (tokens 10 / 20 / 28–32 / 40 / full)

| Radius | Use | Evidence |
| --- | --- | --- |
| 10 | chips, small tags | token |
| 20 | stat thumbnails, small tiles | token / prompt |
| 28–32 | dashboard cards, modals | **sheet top radius MEASURED 28–30** |
| 40 | large cards, CTA | prompt; **CTA MEASURED ≈54 → propose 48 (calibrate)** |
| 9999 | pill nav, buttons, stickers | MEASURED pill (533×57, fully rounded) |

### Spacing scale
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 120 · 168`
- Section padding: **120–168 desktop, 72–96 mobile**.
- Container: **max 1280, 12 columns, 24 px gutters** (MEASURED reference content spans exactly 1280, margins 76.5 at 1433 vw ✓).
- Analytics grid: **5/12 + 7/12** — MEASURED 524 + 15 gap + 741 = 1280 ✓.
- Shadows: almost none; only the pill nav and floating stickers get a whisper (`0 1px 2px rgba(15,23,42,.06)`).

---

## 2. Typography

### Family selection (required step before build)
Create **`/dev/type-specimen`** comparing, via `next/font/google`: **Onest, Instrument Sans, Hanken Grotesk, Figtree** — rendered at hero/statement/stat sizes with our tokens, checked against reference frames for: single-story vs double-story `a`, `g` shape, numeral width, tight-tracking behavior. Document the winner + rationale in this file before homepage implementation. Requirements: geometric grotesque, **weight 400 for text (300 for big numbers)**, tight tracking, clean at 11 vw display sizes.

### Scale (prompt targets with MEASURED reference evidence)

| Role | Scale | MEASURED reference | Decision |
| --- | --- | --- | --- |
| Hero h1 | `clamp(2.5rem, 4.6vw, 4.5rem)` | em ≈ 65 px ≈ 4.5 vw, 2 lines, lh ≈ 1.05 ✓ | build as target |
| Interlude word | `clamp(4rem, 12vw, 11rem)` | em ≈ 158 px ≈ **11 vw** | **11.5 vw start** (calibrate) |
| Stat number | `clamp(4rem, 9vw, 9.5rem)` | digit height 140 px ≈ 9.8 vw ✓ | build as target, `300` weight |
| Statement | `clamp(1.75rem, 3vw, 3rem)` | em ≈ 74 px ≈ **5 vw**, pitch 89 px | **match video: `clamp(2.2rem, 5vw, 5rem)`** |
| Section heading | ~`clamp(2rem, 3.5vw, 3rem)` | pitch 57–60 px, em ≈ 50–65 px | build ≈ 3.5 vw, calibrate |
| Card / FAQ question | 18–22 px | FAQ ink 17 px → em ≈ 18–22 ✓ | as target |
| Body | 16–18 px / 1.6 | — | as target |
| Small / labels | 12–14 px | — | as target |

- Tracking: `-0.02em … -0.03em` on display sizes; line-height `1.02–1.08` display, `1.6` body; `text-wrap: balance` on headings; `font-variant-numeric: tabular-nums` on all animated numbers.
- Wordmark: original inline SVG (no reference letterforms).

---

## 3. Section-by-section layout (home page order)

Home page order (11 sections, per prompt):
**1 Hero → 2 Full-bleed scene (pinned scrub) → 3 Analytics dashboard → 4 Interlude word → 5 Numbered cards → 6 Statement → 7 Stat rows → 8 Testimonials → 9 FAQ → 10 Closing CTA → 11 Footer** (floating pill nav is persistent chrome).

Geometry in viewport coords (1433 vw reference; express in container-relative units when building).

### Persistent: Floating pill nav — MEASURED
- 533×57 centered, top 31 px; radius full; padding ~24 px horizontal; links row + wordmark left inside pill. Never shrinks.

### 1. Hero — MEASURED
- Headline block centered, lines at y373–486 (cap 47), max-width ~640 px per line.
- Button row centered at y527–577: primary **176×50** radius full, ghost button ≈ 314×50 (EST) right of it with 8 px gap region.
- Card stack occupies y≈560 → below fold, centered: 3 cards fanned (front purple-ish → Vallunar brand-deep/blue scene), slight rotation at rest (front 3.2° decays to 0° during entry).

### 2. Full-bleed scene — MEASURED
- Scene = exact viewport 1433×797 once expanded; 4–6 parallax layers as `<g data-depth="…">`; composition center-weighted so nav (top 88 px) and CTAs (gone by then) never occlude the focal object.
- Layers: backdrop tint, orbit lines, main Vallunar object (magnifier/chart motif), foreground chips.

### 3. Analytics dashboard — MEASURED
- Section heading centered, 2 lines (pitch 57), top ≈ y332 once settled.
- Cards row: **left 524 px (x160) + gap 15 (propose 16) + right 741 px**, radius 28–32, bg `#F7F7F7`-equivalent → Vallunar `surface-soft #F6F8FB`; left card contains a white inner plate inset ≈21 px.
- Right card inner layout: segmented control top-right **343×26** (x1050–1392, y627–652); stacked tiles at left: **yellow-equivalent 188×128 (y622–749) + pink-equivalent 188×145 (y748–893)** flush, radius 20; pink line chart right of/below tiles (strokes measured x≥1316, y748–893); left card: chips top-left, bars center, 3-segment progress bar bottom (≈ y900–940).
- Card padding ≈ 24–32 px (ESTIMATED from tile inset 25 px from card edge x699→724).

### 4. Interlude word — MEASURED
- Group centered on viewport: icon **123×60 top-left (x242–364, y330–389)**, word **737×~150 (x353–1090)**, sticker **219×78 (x1140–1358)** to the right of the word; group vertical center ≈ y470.
- Sticker: radius 16–20, sunflower, slight rotation (−4° EST), original wordmark inside.

### 5. Numbered cards — MEASURED
- Row of 3 across the container, middle card offset **−74 px** vertically, left/right aligned; tiles ink ≈ 319–340×205–210 (calibrate card widths/gaps to 1280 total: start 3×~373 + 2×~80 or equal columns with 24 gutters — **calibrate in build**).
- Each card: number label top-left (`300` weight, large), title, illustration tile (accent coral/mint/sky), radius 28–32.

### 6. Statement — MEASURED
- 4 lines centered, block width **1153–1217 px** (≈ container minus ~32 side padding), pitch 89 px, inline SVG icons between words (height ≈ 0.9em, brand-tint circle backgrounds).

### 7. Stat rows — MEASURED
- Full-container rows, **350 px pitch**, hairline separators (`hairline`).
- Per row: left thumbnail ≈ **268×245** (target 140 → CONFLICT, start 240×220, radius 20) + big number (digit height 140 px, `300`, `tabular-nums`) center-left + description right column (x1156–1427 → right-aligned block ~272 px) + tilted sticker −6° to −8°.

### 8. Testimonials — MEASURED + ESTIMATED
- Centered block **956 px wide** (calibrate vs 1280): **3 columns ≈ 309 px, gaps 16**, masonry (varying card heights), cards `surface-soft`, radius 20–28, avatar + quote + name; slow differential column drift (EST).

### 9. FAQ — MEASURED
- Heading 2 lines (pitch 60) centered; rows **80 px** tall when collapsed, hairline top/bottom, question text 18–22 px left, chevron right; content expands below with 400 ms height tween; one open at a time (target).

### 10. Closing CTA — MEASURED
- Card **full container 1280**, radius propose **48** (measured ≈54), generous padding (~64–72 EST); headline + sub left, primary button; original 3D-feel SVG illustration right (~40% width); fill = palette decision needed (proposal `accent-sky #7DB7F0`, white text — **approval item**).

### 11. Footer — MEASURED
- Link columns left (rows pitch ≈ 67, 2+ columns), social icons right; below: stacked-card peek — **front card 1202 px wide visible 331 px, purple-equivalent → Vallunar brand-deep/blue; second card (pink-equivalent → accent) offset behind, +12–16 px translate and 2° rotation (EST)**; peek cards `aria-hidden`.

---

## 4. Component inventory (to build after approval)

`FloatingNav · Button · Sticker · StackedCards · HeroScene · Sheet · DashboardCard · CycleView · ChipPile · StatTile · SegmentedControl · LineChart · BarChart · InterludeWord · NumberedCard · StatementReveal · StatRow · TestimonialWall · Accordion · CtaCard · Footer`

- All typed; content lives in typed content files (no hardcoded marketing copy in components); forms use Zod validation; icons = original inline SVG (no emoji, no stock/lucide hero art).

## 5. Illustration rules

- Inline SVG only, layered shapes + soft gradients + light grain; orbits/rings as thin strokes.
- Vallunar object set: chart card, magnifier, growth arrow, rocket-coin (original concepts, original drawing): **3–4 hero pieces, ~8–10 icon-scale, 4 stat thumbnails**.
- Layer groups carry `data-depth` for parallax; max 3 accent colors per composition; no reference artwork.

## 6. Anti-generic rules

No purple-gradient hero clichés · no emoji or stock icons · no lorem (use `CONTENT_TODO.md` placeholders) · no Inter-as-only-font · no three equal feature columns without hierarchy · no default card shadows · no copied brand/name/copy/fonts/art from the reference.

## 7. Responsive breakpoints

| Breakpoint | Rules |
| --- | --- |
| ≥1024 (desktop) | Full system above: pins, 1280 container, 2-card analytics, 3-column wall. |
| 768–1023 (tablet) | Container padding 32; analytics stacks to one column (gap 16 kept); numbered cards → horizontal scroll snap or 1-col stack; type scales down via clamp. |
| <768 (mobile) | **No mega pins**; scene3/4 → ~60 vh scrub; chips ≤ 8; testimonial wall → 1 column; stat rows → stacked (thumb 120, number 18 vw); pill nav → wordmark + menu; intro ≤ 1.4 s; section padding 72–96. |

## 8. Accessibility, SEO, performance

- Semantic landmarks per section; FAQ buttons with `aria-expanded`; reduced-motion path (see motion spec); contrast ≥ 4.5:1 (ink/surface ✓; accent chips use ink text).
- SEO: unique title/description, OG/Twitter cards, canonical, JSON-LD `Organization/WebSite`, sitemap + robots — implemented in the build phase.
- Perf: next/font only, SVG inline (small), lazy below-fold illustrations, Lighthouse ≥ 90.

## 9. Deviations & open approvals

| # | Item | Decision needed |
| --- | --- | --- |
| 1 | Statement type: video ≈5 vw vs target 3 vw | match video? (recommended) |
| 2 | CTA fill: periwinkle not in palette | `accent-sky` vs `brand-tint` |
| 3 | Stat thumbnail: video ≈268×245 vs target 140 | calibrate (start 240×220) |
| 4 | Numbered cards: video shows no stagger, middle −74 only | keep video-accurate vs add 60–100 ms stagger |
| 5 | Testimonial block 956 vs container 1280 | calibrate |
| 6 | Type family pick | confirm after `/dev/type-specimen` |

## Deliverable gate

After approval: build per these specs, typecheck/lint/tests/production build, capture 1440 + 390 recordings, side-by-side frame sheets for all 13 moments, fix >5 % differences, report. **No merge until "okay, merge to main".**
