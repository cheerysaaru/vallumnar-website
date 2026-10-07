# Content to confirm before launch

- Replace the generated text-and-symbol wordmark in `src/components/brand.tsx`
  with Vallumnar's approved logo. Regenerate `src/app/icon.svg` and the social
  image after receiving the final logo files.
- Set `NEXT_PUBLIC_SITE_URL` in `.env` to the canonical production domain.
- Confirm the hosting provider and production domain.
- Set the public contact email, phone number and postal address in `.env`.
- Replace the `[CITY, COUNTRY]` footer placeholder with Vallumnar's confirmed location.
- Verify the contact and careers inboxes and configure `RESEND_API_KEY`,
  `EMAIL_FROM`, `CONTACT_EMAIL` and `APPLICATION_EMAIL`.
- Create a Resend audience, configure `RESEND_AUDIENCE_ID`, and confirm the
  newsletter consent wording and privacy treatment before enabling signups.
- Replace `[PRODUCT NAME]`, `[PRODUCT DESCRIPTION]`, `[FEATURE 1]`,
  `[FEATURE 2]`, `[FEATURE 3]`, `[Describe the problem this product solves.]`
  and `[Describe who this product is for.]` with verified product details in
  `src/content/products.ts`.
- Replace each `[X+]` in `src/content/stats.ts` with verified statistics or
  remove that stat if it should not be published.
- Add confirmed openings, location, employment type, posting date and role
  details to `src/content/jobs.ts`. The careers page intentionally shows an
  empty state until roles are confirmed.
- Replace `[LEADERSHIP PROFILES]` with approved names, roles and biographies
  only after the leadership team confirms the details and imagery.
- Replace the About-page story draft with the founding story, location and
  milestones once confirmed.
- Confirm the technology names, service scope, working hours, culture and
  benefits described in this draft with the Vallumnar team.
- Add approved social profile URLs in `src/content/site.ts`.
- Have qualified counsel review and replace the draft Privacy Policy and Terms
  of Use, including jurisdiction, entity details, retention practices and
  contact process.
- Decide whether to add privacy-friendly analytics. Analytics are not enabled
  in this draft, so no cookie notice is shown.
