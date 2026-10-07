# Vallumnar Layout Spec

**Status: research complete; awaiting approval. No feature code has been changed.**

## Evidence and confidence

- **MEASURED** values below come from the integrated browser or source-video metadata.
- **ESTIMATED** values are proposed layout targets, including values in the user's revised brief. Handheld recordings support mood and sequence, not precise geometry.
- Browser layout measurements account for the browser's scrollbar and the Wayback toolbar; those interface widths are not intended design widths.
- The supplied recordings were used in place and were not copied into the repository. `/docs/references/` is ignored for future local-only material.

## What was inspected

- Current Vana page: `https://vana.org/`, including hero and scroll behavior at **1440 × 900 px** and **390 × 844 px**.
- Awwwards entry: `https://www.awwwards.com/sites/vana`; its “Visit Site” destination is `https://www.vana.com/`. A cookie dialog blocked the click, so the destination was navigated to directly.
- Archived Awwwards-era site: `https://web.archive.org/web/20221019100623/https://www.vana.com/`. No Wayback link was visible on the Awwwards listing; the archived capture was opened directly.
- The user-supplied `layout style and format.mp4` shows the Awwwards “See the highlights of this website” card gallery. Its recorded card grid is not treated as the original Vana page layout. The archived site itself was used to study that layout.
- The airline recording was used only for its rounded expanding media panel, alternating dark/light sections, glow-backed statistic cards and pre-footer CTA.

## Browser measurements

| Page and viewport | Measured geometry and behavior |
| --- | --- |
| Current Vana, desktop **1440 × 900 px** | **MEASURED:** Document content width **1430 px**; first hero section **746 px** tall. Sticky header **64 px**. Heading box begins at **x = 141 px, y = 236 px**, is **1002 × 190 px**, and uses **108 px** type with **95.04 px** line-height. Subtitle type is **25 px**. |
| Current Vana, mobile **390 × 844 px** | **MEASURED:** Document content width **380 px**; document height **3523 px**. Hero is **696 px** tall; heading begins at **x = 11 px, y = 440 px**, is **354 × 92 px**, and uses **52 px** type. Header remains sticky at **64 px** and the nav presents a “Menu” button. |
| Current Vana, scroll | **MEASURED:** At **350 px** page scroll on mobile, the header stays at **0 px** from the viewport top and the hero's top is **−286 px**. The hero scrolls upward at the sampled position rather than pinning. |
| Archived Vana, desktop **1440 × 900 px** | **MEASURED:** Browser document width **1425 px**, height **7675 px**. The Wayback toolbar occupies **67 px** above the archived page. Archived hero section begins at **y = 67 px** and is **1546 px** tall. The hero heading is centered, set at **88 px**; later section headings measured **49.6–60 px**, and the large text loop uses **67.2 px** type. |
| Archived Vana, mobile **390 × 844 px** | **MEASURED:** Browser document width **375 px**, height **9680 px**. The Wayback toolbar occupies **59 px**; archived hero section begins at **y = 59 px** and is **785 px** tall. The two-line hero heading is **48 px**. Top navigation links are hidden at this width. |

## Archived Vana page rhythm

The following structure is **MEASURED** from the archived page's rendered sections; descriptions are summarized rather than copied.

| Section | Desktop position | Rendered pattern |
| --- | --- | --- |
| Hero | **y = 67 px; 1546 px tall** | Centered, large two-line heading, supporting copy, waitlist action and large colorful illustration below/around the copy. |
| Intro / data context | **y = 1613 px; 938 px tall** | Light-gray band, large left-aligned heading and a three-column set of explanatory cards. |
| How it works | **y = 2551 px; 2010 px tall** | Repeated two-column content rows; text and large circular/collage illustrations alternate sides. |
| Data examples | **y = 4561 px; 375 px tall** | Short transition band and oversized animated/rolling text treatment. |
| Build / product area | **y = 4937 px; 717 px tall** | Centered section heading with broad visual and product information. |
| FAQ | **y = 5654 px; 1072 px tall** | Bright lime panel with a centered title and stacked accordion rows. |
| Footer | **y = 6726 px; 246 px tall** | Large wordmark treatment, links and supporting footer content. |

Additional layout observations:

- **MEASURED:** The archived desktop “How it works” rows use a repeated two-column arrangement. Text blocks measured **422 px** wide at **x = 178 px** and **x = 810 px** as the content alternates sides.
- **MEASURED:** On mobile, the archived hero heading is **48 px**; the introductory section heading is **27 px**; the “How it works” heading is **32 px**; and its step headings are **24 px**. The large rolling text uses **38 px** type at this viewport.
- **ESTIMATED:** The archived feature cards read as cream/light cards with rounded corners and gentle separation from their section background. The handheld Awwwards gallery recording is not precise enough to assert a radius or gap measurement.
- **MEASURED:** The archived page has a very long hero/intro transition and generous vertical section bands; it does not use a compact, dashboard-like grid.
- **MEASURED:** The archived page loads Webflow, jQuery and the Webflow `ix2` runtime. These tools are evidence about the inspected page only, not dependencies recommended for Vallumnar.
- **ESTIMATED:** In the supplied recording, each Awwwards feature card has an inset cream preview with a rounded edge against a dark navy gallery background. That recording captures the Awwwards gallery, not the original site's grid.

## Current Vana layout and responsive behavior

- **MEASURED:** The current site is visually distinct from its archived Awwwards-era design. Its desktop hero places large left-aligned copy over a full-width animated field; the mobile hero keeps the same video treatment and uses a compact menu.
- **MEASURED:** The current sticky header stays at the viewport top while the hero scrolls away. The archived desktop design uses a separate Wayback toolbar, so archived header behavior is not conflated with the current page's header.
- **ESTIMATED:** The user's hero recording communicates a quiet, light composition with copy held steady while texture changes on the opposite side. The exact source-device viewport and perspective make its pixel proportions unreliable.

## Proposed original Vallumnar homepage

Everything in this section is **ESTIMATED (proposed design target, not a reference measurement)** and is pending approval. The revised user brief provides the section order and several target dimensions; additional spacing and radius ranges below are starting points for review.

### Global frame

- Use a centered **12-column** content grid with a maximum width of about **1280 px** on wide screens.
- Proposed section spacing: **96–144 px** on desktop, **64–88 px** on tablet, and **48–72 px** on mobile.
- Proposed shared card radius: about **24 px**, with restrained shadows and thin borders. Keep one radius system rather than mixing unrelated shapes.
- **ESTIMATED (user-specified palette; not sampled from the references):** deep blue `#0B2A4A` to `#1E3A8A`, primary `#1D4ED8`, mid blue `#2779A7`, light tint `#F3F8FC`, white, ink `#0F172A`, body `#475569`, and one warm accent `#F2C94C`.
- Check each final foreground/background pair against WCAG AA before implementation. Do not use the warm accent for small text unless the selected pairing passes contrast; do not use the references' purple, lime or red palette.
- Use Plus Jakarta Sans or Inter through `next/font`. The proposed display scale can reach about **7 rem** on desktop, then clamp fluidly. Do not force the same desktop line breaks onto mobile.
- The header contains the Vallumnar mark, Services, Products, Careers, About, Contact and a “Contact us” action; mobile uses a “Menu” control. The footer groups Explore, Read and Find us links with legal links, newsletter and a contact note.
- Proposed layout targets come from the brief: responsive checks at **320, 375, 768, 1024, 1440 and 1920 px**; no horizontal overflow or inaccessible off-canvas content at those widths.

### Home page, in the requested order

| Order | Proposed section and arrangement |
| --- | --- |
| **ESTIMATED: 1** | **Hero:** Full-bleed, light blue/white canvas field on the right; left-aligned original headline, short subtitle, two actions and a scroll cue. The content is Vallumnar-specific; draft copy remains a placeholder until approved. |
| **ESTIMATED: 2** | **Four audience cards:** Four numbered cards across on desktop, a **2 × 2** grid on tablet and a vertical stack on mobile. Each has a short label, one statement and a directional link. |
| **ESTIMATED: 3** | **Large intro statement:** One prominent sentence with selected words accented, revealed progressively as it enters view. |
| **ESTIMATED: 4** | **How we work:** Text block on one side and a large original circular illustration on the other; stack naturally on mobile. |
| **ESTIMATED: 5** | **Services showcase:** One illustrated panel per service. A horizontal/sticky sequence may be considered at large widths; mobile should use a vertical, readable sequence rather than requiring horizontal scrolling. |
| **ESTIMATED: 6** | **Products:** Cards with original line illustrations and brief, accurate descriptions. |
| **ESTIMATED: 7** | **Expanding illustration panel:** A single original SVG illustration expands into the stats area on scroll, then releases without trapping the reader. |
| **ESTIMATED: 8** | **Stats band:** Gradient-glow cards with count-up only for verified figures; use `[X+]` placeholders until Vallumnar supplies real data. |
| **ESTIMATED: 9** | **FAQ:** Tinted panel with an accessible accordion. The brief proposes **5–6** questions; mark any draft answers that need company confirmation. |
| **ESTIMATED: 10** | **Careers banner:** Full-width deep-blue section with an original, restrained animated motif and an obvious careers action. |
| **ESTIMATED: 11** | **Insights:** Three blog cards with date/title/excerpt placeholders and a link to the blog; do not present fabricated articles as published content. |
| **ESTIMATED: 12** | **Footer:** Oversized Vallumnar wordmark, short tagline, newsletter signup, grouped links, legal links and a contact note. |

### Responsive and interaction layout

- **ESTIMATED (brief target):** Audience cards transition from four columns to **2 × 2** and then to a single column at tablet/mobile widths.
- **ESTIMATED:** Keep text and actions in DOM reading order even when desktop rows alternate. At mobile widths, stack content and artwork without overlays that obscure the copy.
- **ESTIMATED:** The media expansion should use a single containing panel and remain clipped only while it animates; at reduced motion, render its final static layout.
- **ESTIMATED:** Limit the hero art and large illustrations to their own grid areas. Do not allow decorative art to force page width beyond the viewport.
- **ESTIMATED:** Keep tap targets at least **44 × 44 px**, provide visible keyboard focus, and ensure accordion state is communicated with `aria-expanded`.

## Originality and content boundaries

- Use Vallumnar blues, the requested warm accent, and original SVG/canvas artwork. Do not reproduce Vana's wordmark, copy, color combinations, illustrations, silhouettes or imagery.
- Do not use airline photography, logos, copy, visual assets or source code. The reference contributes only the listed pacing and layout patterns.
- Do not invent client logos, project counts, testimonials, awards, team photos, company history, dates or published insights. Keep unresolved facts visibly marked for `CONTENT_TODO.md` during implementation.

## Approval gate

This document records research and a proposed layout only. No homepage, route, component, style, asset or dependency has been changed. Wait for the user's explicit approval before implementing the layout.
