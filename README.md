# Vallumnar

A responsive corporate website for Vallumnar, built with Next.js App Router,
TypeScript, Tailwind CSS and Lucide icons.

## Requirements

- Node.js 20.9 or newer
- npm
- A Resend account/API key to deliver forms and a Resend audience for newsletter signups

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set the email variables described below. Set `NEXT_PUBLIC_SITE_URL` to the
   local site URL (`http://localhost:3000`) while developing.
3. Install dependencies with `npm install`.
4. Start the dev server with `npm run dev`.
5. Visit `http://localhost:3000`.

The forms return a clear unavailable message until valid email credentials and
recipient addresses are configured.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes for launch | Canonical origin used by metadata, sitemap and robots |
| `RESEND_API_KEY` | Yes for form delivery | Resend API credential; server-side only |
| `EMAIL_FROM` | Yes for form delivery | Verified sender address, e.g. `Vallumnar <website@example.com>` |
| `CONTACT_EMAIL` | Yes for contact form | Contact enquiry recipient |
| `APPLICATION_EMAIL` | Yes for careers form | Job application recipient |
| `RESEND_AUDIENCE_ID` | Yes for newsletter signups | Resend audience that stores opted-in contacts |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public contact email shown on the site |
| `NEXT_PUBLIC_PHONE` | Optional | Public phone number |
| `NEXT_PUBLIC_ADDRESS` | Optional | Public postal address |

Never prefix private credentials with `NEXT_PUBLIC_`. Never commit `.env.local`.

The APIs limit each client address to five requests per 15 minutes per Node.js
process and use a hidden honeypot field. Newsletter signup requires explicit
consent and stores the address in the configured Resend audience. This
lightweight limiter is suitable for a single Node process; before deploying to
a serverless or multi-instance environment, replace it with a shared rate-limit
store and ensure the hosting proxy overwrites forwarded-IP headers.

## Editing content

- Services: `src/content/services.ts`
- Products: `src/content/products.ts`
- Open roles: `src/content/jobs.ts`
- Public company details and social links: `src/content/site.ts` and `.env.local`
- Design tokens and responsive styles: `src/app/globals.css`

Product names, product descriptions and company statistics are visible as
bracketed placeholders. Job openings remain empty until Vallumnar confirms real
roles. The website uses a temporary text-and-symbol wordmark; replace it with
the approved brand assets before launch. See [CONTENT_TODO.md](./CONTENT_TODO.md)
for all remaining content and launch decisions.

## Deployment

The project uses the standard Next.js Node.js runtime and can be deployed to a
compatible Node.js host. Set the production environment variables, use
`npm run build` to create the production build and `npm run start` to serve it.
Confirm the final hosting provider and domain before launch. Do not deploy until
the draft legal pages and content placeholders have been reviewed.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

The project includes a generated favicon and Open Graph image as temporary
brand treatments. Replace or regenerate them once the approved logo is supplied.
