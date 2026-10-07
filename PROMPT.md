# Vallumnar Website: Agent Prompt

Copy everything below the line into your coding agent (Claude Code, Cursor, etc.).

---

```
GIT RULES (follow first):
Create a new branch (feature/vallumnar-website) and do all work there. Never
commit or push to main. Commit small and often. When finished, stop, report
the branch name and summary, and wait for my "okay, merge to main".

==================================================
PROJECT
==================================================
Build a corporate website for Vallumnar, a technology company that provides
all kinds of IT services (software development, web and mobile apps, cloud
and DevOps, IT consulting, UI/UX design, data and AI, QA and testing,
maintenance and support, etc.) and software products.

Main goal: build the Vallumnar brand and attract hiring talent.
Secondary goal: show services and products so clients trust the company.
Audience: job seekers (developers, designers, engineers) and business clients.
Tone: professional, confident, friendly. Not salesy.

DESIGN
- Style: clean, light, corporate, blue theme. White and very light blue-gray
  backgrounds, lots of white space, subtle shadows, rounded corners with one
  consistent radius, simple line icons (Lucide).
- Colors (define as design tokens in Tailwind / CSS variables):
    primary blue:   #1D4ED8   (buttons, links, key highlights)
    primary dark:   #1E3A8A   (headings accents, footer, hover states)
    accent sky:     #0EA5E9   (small highlights, icons, gradients)
    light tint:     #EFF6FF   (section backgrounds, cards)
    text:           #0F172A (headings), #475569 (body)
    border:         #E2E8F0
  If my logo uses different blues, extract the logo's colors and use those
  instead. Check text contrast (WCAG AA) on every color pair.
- Logo: use the logo file at [path/URL]. Show it in the header and footer,
  and generate a favicon and social share image from it.
- Typography: one modern sans-serif (Inter or Plus Jakarta Sans) via
  next/font, a clear size scale, readable line length.
- Subtle motion only (fade/slide on scroll, hover states). Respect
  prefers-reduced-motion.

TECH STACK
- Next.js (latest stable, App Router) + TypeScript, Tailwind CSS, Lucide icons.
- Server Components by default; client components only where needed.
- Content kept in typed data files (/content/services.ts, /content/products.ts,
  /content/jobs.ts) so text can be edited without touching layout code.
- Contact and job-application forms: validate with Zod on client and server,
  send email via [Resend / SMTP provider], honeypot field + rate limiting for
  spam, friendly success/error messages. Read secrets only from environment
  variables; provide .env.example; never commit real keys.

PAGES AND SECTIONS
1. Home
   - Hero: strong headline about building technology that moves business
     forward, short subtext, buttons "Our services" and "Join our team".
   - Services overview (cards with icon, title, 1-2 lines).
   - Products overview (cards with name, short description, "Learn more").
   - "Why Vallumnar" values strip (3-4 points).
   - Careers teaser: "We're hiring" with a button to the Careers page.
   - Technology stack strip (tool names or logos).
   - Final call-to-action band + footer.
2. Services (/services)
   - Overview and one section per service: what we do, how we work (process
     steps), typical deliverables, technologies used.
3. Products (/products)
   - Overview grid, and a detail section or page per product: problem,
     features, who it is for, "Request a demo" button.
4. Careers (/careers)  [supports the hiring goal]
   - Why join Vallumnar, culture and benefits, open roles (from
     content/jobs.ts), and an application form (name, email, role, links,
     CV upload with size/type limits, message).
   - Empty state when there are no open roles: "Send us your CV".
5. Contact (/contact)
   - Form, email, phone, address/map placeholder, working hours.
6. Header and footer on every page: logo, nav (Home, Services, Products,
   Careers, Contact), social links, legal links (Privacy Policy, Terms),
   copyright "© Vallumnar". Header is sticky and collapses to a hamburger
   menu on mobile.
7. Custom 404 page.

CONTENT
- I have no content yet. Write professional draft copy for every section,
  using the name Vallumnar.
- Do NOT invent facts: no fake client names, awards, statistics, years in
  business, testimonials or team photos. Where real facts are needed, use
  clearly marked placeholders like [CLIENT LOGO], [X+ projects], [CITY] and
  list them all in CONTENT_TODO.md so I can replace them.
- Use simple SVG illustrations or neutral placeholders, not copyrighted images.

SEO AND QUALITY
- Metadata API per page (title, description, canonical, Open Graph, Twitter
  card), sitemap.xml, robots.txt, JSON-LD (Organization, JobPosting for
  roles), semantic HTML, one h1 per page, alt text on all images.
- next/image for images, next/font for fonts, lazy loading, no layout shift.
  Target Lighthouse 90+ for Performance, Accessibility, Best Practices and
  SEO on mobile.
- Fully responsive at 320, 375, 768, 1024 and 1440px with no horizontal
  scroll and touch targets at least 44px. Keyboard accessible, visible
  :focus-visible styles, no tap-highlight flashes.
- Security: security headers (CSP, X-Content-Type-Options, Referrer-Policy),
  input validation, no secrets in the client bundle.
- Analytics: a privacy-friendly option (Plausible or similar) behind an env
  variable. Add a cookie notice only if cookies are used.

DEPLOYMENT
- Build for deployment on [Vercel / Cloudflare / my server]. Add a README with
  setup, env variables, how to edit content, and how to deploy. Never deploy
  or push to main yourself.

TESTING
- Run typecheck, lint and a production build. Add basic tests for form
  validation and the API routes. Check all pages at the widths above and run
  Lighthouse. Fix every error and warning.

FINISH
- Give a summary: pages built, files changed, placeholders to replace
  (CONTENT_TODO.md), env variables needed, and Lighthouse scores. Do not
  merge. Wait for my "okay, merge to main".
```

## Still to fill in before running
- Logo file path (`[path/URL]`)
- Hosting choice (`[Vercel / Cloudflare / my server]`)
- Email provider for the forms (`[Resend / SMTP provider]`)
- Real contact details (email, phone, address)
