# Vallumnar Motion Spec

**Status: research complete; awaiting approval. No feature code has been changed.**

## Evidence and confidence

- **MEASURED** means observed in a real browser or read directly from source-video metadata.
- **ESTIMATED** means inferred from the supplied handheld recordings, or a proposed Vallumnar design target. Phone-camera perspective, moire and missing frames make recording timings approximate.
- The recordings were sampled with FFmpeg at **MEASURED: 1 frame per second** for their first **MEASURED: 10 seconds**. This helps identify sequence and mood, not frame-accurate easing or opacity.
- The source recordings remain in the user's Downloads folder; they were not copied into the repository. Extracted frames are study-only and are not deliverables.

## Sources examined

| Source | Browser or file evidence |
| --- | --- |
| Current Vana landing page, `https://vana.org/` | **MEASURED:** Opened in the integrated browser at **1440 × 900 px** and **390 × 844 px**. Its hero uses `hero.mp4`; browser media properties report a **21.287933 s** duration, looping, autoplay, muted playback, and normal **1×** playback rate. No canvas was present. |
| Awwwards Vana listing, `https://www.awwwards.com/sites/vana` | **MEASURED:** The “Visit Site” link points to `https://www.vana.com/`. A cookie dialog intercepted the click, so the destination was opened directly. The current destination resolves to Vana's current site. No Wayback link was exposed on the listing page; an archived capture was opened directly at `https://web.archive.org/web/20221019100623/https://www.vana.com/`. |
| Vana archive, `https://web.archive.org/web/20221019100623/https://www.vana.com/` | **MEASURED:** Opened at both reference viewport widths. The archived page loads Webflow and jQuery; `Webflow.require('ix2')` is available. No GSAP, ScrollTrigger, Lenis, Lottie, Three.js global, canvas, or video was detected in the sampled page. This identifies the visible runtime, not every possible implementation detail. |
| `hero sectionn animation.mp4` | **MEASURED (file metadata):** **24.7667 s**, **1024 × 576 px**, **30 fps**. |
| `layout style and format.mp4` | **MEASURED (file metadata):** **12.1333 s**, **576 × 1024 px**, **30 fps**. The footage shows the Awwwards site's “highlights” cards being browsed, not a clean recording of the original Vana page. |
| `aniamtion looks.mp4` | **MEASURED (file metadata):** **22.2667 s**, **576 × 1024 px**, **30 fps**. The airline/travel-tech recording is used only for the motion patterns listed below. |

## Findings: Vana hero

### Current live page

| Observation | Evidence |
| --- | --- |
| Hero media | **MEASURED:** A muted, autoplaying, looping video with `object-fit: cover`; browser reports **21.287933 s** per media loop. No canvas was present. |
| Desktop composition | **MEASURED:** At **1440 × 900 px**, the hero section is **746 px** tall and the video box is **1430 × 746 px**. The sticky header is **64 px** tall. The heading is **108 px** with **95.04 px** line-height; the subtitle is **25 px**. |
| Mobile composition | **MEASURED:** At **390 × 844 px**, the hero section and video box are **696 px** tall; the browser content width is **380 px**. The heading is **52 px**, its box is **354 × 92 px**, and the sticky header is **64 px** tall. The navigation changes to a “Menu” button. |
| Motion samples | **MEASURED:** At media time **0 s**, the right side has a pale, soft abstract texture. At **5 s**, the texture resolves into bright horizontal scan-line-like bands. At **10 s**, a denser, grainy raster texture is visible. These are individual sampled frames, not measured transition boundaries. |
| Scroll | **MEASURED:** After scrolling **350 px** on the mobile viewport, the header remains at viewport top (**0 px**) while the hero moves upward; the hero section top is at **−286 px**. At this observed point, the hero is scrolling with the page rather than remaining pinned. |

The animated texture stays behind the copy. The visual change is broad and soft rather than a rapid sequence of interface animations. The page's cookie panel is unrelated to the proposed Vallumnar motion and is not a design pattern to copy.

### Supplied hero recording

- **ESTIMATED:** In the first **10 s** of sampled footage, the pale cream-to-violet field cycles among fine dot patterns, soft organic masses, and horizontal/raster-like forms on the right side. The text remains visually steady while the field changes.
- **ESTIMATED:** Visible states change on the order of a few seconds. A plausible reading of the sampled sequence is about **2–4 s per visible state**, but the recording is too short and too handheld to establish a loop length or exact state boundaries.
- **ESTIMATED:** Morphing appears gradual, with some frames reading as intermediate blends rather than hard cuts. Exact easing, opacity, dot count, brightness values and transition duration cannot be measured from this recording.
- The changing backdrop is a useful pattern reference; the original silhouettes, artwork, exact colors and Vana copy are not to be reproduced.

## Findings: motion elsewhere

- **MEASURED:** The archived Awwwards-era page exposes the Webflow runtime and its `ix2` module. The page inspection did not establish exact per-element durations or easing curves. Do not treat Webflow's presence as proof of a particular scroll animation.
- **ESTIMATED:** The supplied Awwwards recording moves through featured design cards as the viewer scrolls; it is evidence of editorial pacing, not a reliable source for the original page's interaction timings.
- **ESTIMATED:** The airline recording shows a rounded media area growing into a large viewport-filling panel, dark-to-light section changes, gradient-lit statistic cards, and a strongly colored pre-footer callout. The camera recording does not allow reliable pixel, easing, or duration measurement. No airline-site URL was supplied, so its animation library cannot be verified.

## Proposed original Vallumnar motion

All values in this section are **ESTIMATED (proposed design targets, not reference measurements)** and require approval before implementation.

### Hero field

- Build an original, lightweight **2D canvas** field over a white-to-light-blue gradient, concentrated over roughly **55%** of the hero's right side and fading toward the text.
- Use only abstract engineering motifs: a flowing wave, a network of nodes, a globe made from latitude-like lines, and layered forms. Do not use Vana's silhouettes, icons, footage, images, fonts, or code.
- Target a **6–9 s** dwell per motif, with a **1.2–1.6 s** blend through dots, raster lines, and a soft solid phase. These are starting targets from the revised user brief, not measured Vana timings.
- The headline and supporting copy should remain still during the ambient loop. Maintain readable contrast over every frame; the texture must never pass over or compete with the text.
- Provide a static CSS gradient immediately. Load the canvas after first paint, cap mobile device pixel ratio at **1.5**, reduce the dot count on constrained devices, and pause rendering when the canvas is off-screen or the tab is hidden.

### Entrance, reveals and hover

- Proposed first-load sequence: about **1.6 s** total; background sharpens over about **1.2 s**, headline lines reveal with **80–120 ms** stagger, then subtitle and actions fade upward, with the header last.
- Proposed motion tokens: **200, 400, 700 and 1200 ms**; `expo-out` for entrances, `ease-in-out` for transitions, and **80–120 ms** stagger between related items.
- Proposed section reveal: label, masked heading, paragraph and action in order; opacity **0 → 1** with about **24 px** upward travel.
- Proposed cards: stagger on entry; on hover, translate upward about **4–6 px**, soften the shadow and nudge the arrow. Keep keyboard focus equally visible and do not rely on hover to reveal required content.
- Prefer transform and opacity. Color transitions on section theme changes are the only proposed exception; avoid layout-affecting animation.

### Site-wide motion behaviors

- **ESTIMATED (proposed):** The header is transparent over the hero, becomes a solid blurred bar after scrolling, hides while scrolling down and returns while scrolling up.
- **ESTIMATED (proposed):** The mobile menu uses a full-screen overlay with staggered links. Route changes use a short fade; the **200 ms** token is a starting point, not an observed reference duration.
- **ESTIMATED (proposed):** Large original illustrations use restrained parallax. The expanding illustration panel grows to full width or screen as the reader scrolls, then releases naturally.
- **ESTIMATED (proposed):** Selected sections transition between deep-blue and light backgrounds; keep color changes smooth and avoid moving layout. Stat values count up only when they represent verified Vallumnar facts.
- **ESTIMATED (proposed):** Register and remove scroll triggers and event listeners with component lifecycle; do not leave animation work running after navigation or while the hero is off-screen.

### Scroll and accessibility

- The brief requests a brief hero pin, a slowly scaling/fading field, and the next section rising over the hero. The exact pin distance is intentionally not specified until the motion is approved and can be tested for scroll comfort.
- Use scroll-triggered reveals and the illustration-panel expansion only where they clarify the content. Do not require smooth scrolling for navigation or content access.
- With `prefers-reduced-motion`, remove the pin, parallax, count-up and entrance sequences; show the static gradient and one static canvas frame. Content must be visible if scripts fail.
- The brief proposes Lenis and GSAP/ScrollTrigger, but these are not yet approved dependencies. Reassess whether native scrolling plus a small, lazy-loaded animation is sufficient before adding libraries.

## Differences from the references

- Vallumnar uses the requested original blue palette, not Vana's violet or the Awwwards-era lime/red/cobalt combinations.
- Vallumnar artwork will be original abstract technology forms, not copied people, hands, keys, collage cutouts, logos, typography or silhouettes.
- The reference hero is a video today and the archived page is Webflow-based; Vallumnar's proposed canvas and scroll treatment are independent implementations.
- The airline patterns are limited to panel expansion, alternating section tone, gentle statistic glows and a colored CTA band. No airline imagery, copy or branding will be used.

## Approval gate

This is a research specification only. No animation code, layout code, dependencies, assets or homepage features have been changed. Wait for the user's explicit approval before implementation.
