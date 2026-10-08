# Vallumnar Layout Spec

**Status: Step 0 research for the revised master prompt. Awaiting approval. No site code has been changed in this round.**
This document replaces the previous layout spec. The existing homepage implementation predates this prompt and will be reworked after approval.

## Evidence and confidence

- **MEASURED** = read from a real browser (Playwright) at **1440 × 900** and **390 × 844**, or from video stream metadata.
- **ESTIMATED** = inferred from the handheld Ref C recording, or a proposed Vallumnar design target.
- Study artifacts (recordings, frames, screenshots) live outside the repository and are never committed.
- Copyright: pattern, structure, pacing and feel only — no reference asset, copy, font or code is used in the site.

## Sources examined

- `https://vana.org/` — Ref A, current site (real browser, both viewports, video + frame analysis).
- `https://www.awwwards.com/sites/vana` — Ref B listing (Visit Site → `https://www.vana.com/`).
- `https://web.archive.org/web/20221019100623/https://www.vana.com/` — Ref B, 2022 site (real browser, both viewports, full DOM survey).
- `aniamtion looks.mp4` — Ref C recording (22.27 s, 576 × 1024, 30 fps); labeled contact sheet analyzed; geometry ESTIMATED.

---

## Ref A layout (MEASURED)

### Geometry

| Item | Desktop 1440 × 900 | Mobile 390 × 844 |
| --- | --- | --- |
| Header | 64 px, sticky, opaque **#FCFCFA**, z-40 | 64 px, "Menu" control, sticky |
| Hero height | **746 px** = 90 svh − nav | **696 px**; hero starts at y = 64 under header |
| Headline | 1002 × 190 at x = 146, y = 236; **108 px / 95.04 px, w500, −5.4 px tracking, #111111** | 364 × 92 at x = 11, **y = 440**; **52 px / 45.76 px, −2.6 px** |
| Subtitle | 865 px wide; **25 px / 30 px**, −0.375 px, 70 % black | **20 px / 24 px** |
| Nav links | 15–17 px; filled CTA **#4141FC** (129 × 32) | Collapsed to "Menu" |
| Page background | **#FCFCFA** cream throughout | same |
| Field | Full-bleed video behind copy; left third near-white | Full-bleed |

### Composition pattern

- Left-aligned copy block over a right-weighted animated field; generous empty space; no cards inside the hero.
- Below the hero: a row of numbered cards ("FOR YOU 01 / FOR BUILDERS 02 / FOR THE MOVERS 03") — a numbered-card row directly under the fold.
- No pinned sections; the header never moves or restyles.

---

## Ref B layout — Vana 2022 archived (MEASURED)

### Page rhythm, desktop 1440 (document height 7623 px)

| Section | y / height | Background |
| --- | --- | --- |
| Hero | 0 / **1562 px** | **#FFFFFF** |
| Intro ("so much more than bytes") | 1562 / **938 px** | **#F5F4F4** |
| How it works | 2500 / **2010 px** | **#F5F4F4** (pt 48, pb 112) |
| Rolling text band | 4510 / 375 px | transparent |
| Build with Vana | 4885 / 717 px | transparent |
| FAQ | 5603 / **1072 px** | lime panel inside grey band |
| Transition band | 6674 / 246 px | **#F5F4F4** |
| Footer | 6920 / **703 px** | **#F5F4F4** (pt 32, pb 20.8) |

Section vertical padding measured **pt 48 px / pb 112 px** — shorter than it looks because content blocks are tall.

### Container and grid

- Content container **1248 px** (nav container 1280 px) inside 1440 → side gutters ≈96 px.
- "How it works": **CSS grid, 2 columns, gap 48 px row / 16 px column**, 1248 px wide, 7 children.
- Three-card row: flex `box__parent`, 1264 px wide, **3 cards ≈400 px each** (card padding `60px 0 36px`).
- Step boxes: white, **radius 16 px**, 616 × 489, padding `159px 104px 159px 89.6px`; circular variants radius 480 px.
- **No shadows anywhere**: cards separate from the #F5F4F4 band by white fill alone.

### Type scale, desktop

| Role | Size / line-height / tracking / weight |
| --- | --- |
| Hero h1 | **88 / 88 px, −3.2 px, 700** |
| Statement h2 | **49.6 / 51.2 px, −1.92 px, 700** |
| Section h2 | **60 / 60 px, −1.92 px, 700** |
| h3 | **36.8 / 33.12 px, −1.12 px, 700** |
| Body p | **20 / 30 px, w500, #4B515A** (secondary 16 / 24) |
| Links | 18 / 28.8 px |

### Type scale, mobile 390 (document height 9554 px)

h1 **48 / 48 px, −1.6 px**; statement h2 **27.2 / 32 px**; section h2 **32 / 32 px**; h3 **24 / 21.6 px**; body **16 / 24 px**. Mobile cards 362 px wide (≈14 px gutters), padding `32px 24px 33.6px`.

### Components

- **Tag pills:** height **26 px**, radius **16 px**, padding **1.6 px 14.4 px**, font **14.4 px**, background **#DBFF00** lime ("01. Store", "02. Explore", "03. Play").
- **FAQ:** lime panel **1248 × 1072 px, radius 16 px** (`#DBFF00`) inside the grey band; inner content column **715 px**; heading block 414 px. Rows white, ≈**98 px collapsed → 186 px expanded**, radius 16 px. Mobile FAQ panel: section itself lime, 1025 px tall.
- **Buttons:** radius ≈8–16 px; hover = color inversion, **0.3 s cubic-bezier(0.77, 0, 0.175, 1)**.
- **Footer:** link columns + newsletter; **giant wordmark is an image 1181 px wide** cropped at the bottom edge (y = 7339 of 7623).
- **Header:** fixed, transparent, hides on scroll down (`translateY(-160 px)`).

---

## Ref C layout (from labeled contact sheet; geometry ESTIMATED)

- **Dark hero:** centered headline, small stat row beneath, multi-color gradient glow behind the text.
- **Expanding card:** rounded card below the headline grows to ~full viewport during scroll (corner radius visibly persists while large), then overlay copy fades in over the image.
- **Alternating bands:** light/dark/ light/dark as sections cross the viewport — at least 4 flips in 22 s of scrolling (flip points ≈7–8 s, 15–16 s, 20–21 s in the recording; actual triggers are scroll-position based).
- **Stat/feature tiles:** a row of **4 gradient tiles** (big numbers/labels) on dark.
- **Red CTA band** immediately above a **dark footer** with 3–4 link columns.
- **Floating bottom pill:** centered, white, persistent, containing a red action button; sits above content at all times.
- Exact pixel values (radius, scale, pin length) are not measurable from the recording → proposals in MOTION_SPEC.

---

## Proposed original Vallumnar layout

Everything in this section is **ESTIMATED design target** and awaits approval.

### Global frame

- 12-column grid, max width **1280 px** (content 1152–1280), side gutters ≥32 px.
- Section vertical padding: **96–160 px desktop, 64–96 px mobile**.
- Card radius **20–28 px** (single radius system); restrained shadows or borderless fill; thin borders only where needed.
- Palette: deep blue **#0B2A4A → #1E3A8A**, primary **#1D4ED8**, mid blue **#2779A7**, light tint **#F3F8FC**, white, ink **#0F172A**, body **#475569**, one warm accent **#F2C94C**.
- Contrast pairs to keep AA (computed): #0F172A on #FFFFFF ≈ 17:1; #475569 on #FFFFFF ≈ 7.5:1 and on #F3F8FC ≈ 7.2:1; #FFFFFF on #1D4ED8 ≈ 6.3:1; #FFFFFF on #2779A7 ≈ 4.8:1; #0F172A on #F2C94C ≈ 11.4:1. **#F2C94C on white ≈ 1.6:1 — never as text on light backgrounds.**
- Type: **Plus Jakarta Sans or Inter** via `next/font`; display up to **~7 rem** clamped; tight tracking on display; generous body line-height; readable measure (~60–70 ch).
- Header: logo, Services, Products, Careers, About, Contact + "Contact us" button; "Menu" on mobile.
- Footer groups: Explore / Read / Find us + legal + newsletter + contact note + giant cropped wordmark.

### Home page sections (order per brief)

| # | Section | Layout |
| --- | --- | --- |
| 1 | **Hero** | Full-bleed canvas field (right-weighted), left copy: headline (5–8 words), 2-line subtitle, "Our services" + "Join our team", scroll cue. |
| 2 | **Audience cards ×4** | 4 across desktop → 2 × 2 tablet → stack mobile; number "01–04", label, statement, arrow link. |
| 3 | **Intro statement** | Huge centered sentence, accent words highlighted, word-by-word scroll reveal. |
| 4 | **Photo-card expansion** | Rounded 28 px card pins and scales to fullscreen, radius → 0, overlay headline ("A global team, one standard of quality."); followed by a dark→light section flip. |
| 5 | **Feature cards ×3** | Small "UI-like" SVG illustrations (toggle, line graph, grid) + title + two lines; 3 across. |
| 6 | **Services showcase** | Sticky-scroll panels; illustration swaps per service (cloud, AI/data, web+mobile, UX, QA, consulting, support); vertical stack on mobile. |
| 7 | **How we work** | SplitFeature: text card + circular illustration, 3–4 steps with tag pills; reversible; stacks on mobile. |
| 8 | **Products** | Cards with original line illustrations, title, short text, link. |
| 9 | **Stats band** | Count-up numbers on gradient tiles, placeholders `[X+]`. |
| 10 | **Careers PromoBand** | Full-width deep blue/primary band, decorative checker/dot corners, big text, "Join our team". |
| 11 | **FAQ accordion** | Light-blue or yellow-tinted panel (Vallumnar translation of the lime reference), white rounded rows, "+/×" icon, 5–6 placeholder questions. |
| 12 | **Insights** | 3 blog cards (date, title, excerpt, "Read the post") + "Read the blog"; placeholders marked. |
| 13 | **Footer** | Tagline, newsletter, link columns, legal, contact note, **giant cropped "Vallumnar" wordmark** with subtle reveal. |

### Component inventory (typed, reusable)

`Header`, `Button` (primary/secondary/ghost + arrow, focus ring), `Tag`, `AudienceCard`, `StatementBlock`, `FeatureCard`, `SplitFeature`, `ServiceShowcase`, `ProductCard`, `StatCard`, `PromoBand`, `Accordion`, `BlogCard`, `NewsletterForm` (Zod + honeypot), `Footer`, `SectionWrapper` (light/dark theme flips), motion primitives `Reveal`, `SplitText`, `Counter`, `Parallax`, `Pinned`.

### Responsive checkpoints

320 / 375 / 768 / 1024 / 1440 / 1920 px; no horizontal scroll; tap targets ≥44 px; audience cards 4 → 2×2 → 1; showcase sticky behavior desktop-only; floating pill ≥768 px; artwork never widens the document.

### Illustration and content rules

- Original inline SVG only: 2–3 px outlines, flat fills + one soft gradient, rounded shapes, checker/dot accents, circular frames for split features; motifs per service (cloud, AI nodes, screens, wireframe, checklist, handshake/graph, headset).
- No stock images, no copied artwork, no invented facts — placeholders stay marked in `CONTENT_TODO.md`.

## Approval gate

Research and proposed layout only. No route, component, style, asset or dependency has been changed in this round. Wait for explicit approval before implementation.
