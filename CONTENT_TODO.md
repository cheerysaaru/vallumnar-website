# Content to confirm before launch

- Replace the generated text-and-symbol wordmark in `src/components/brand.tsx`
  with Vallumnar's approved logo. Regenerate `src/app/icon.svg` and the social
  image after receiving the final logo files.
- Set `NEXT_PUBLIC_SITE_URL` in `.env` to the canonical production domain.
- Confirm the hosting provider and production domain.
- Set the public contact email, phone number and postal address in `.env`.
- Verify the contact and careers inboxes and configure `RESEND_API_KEY`,
  `EMAIL_FROM`, `CONTACT_EMAIL` and `APPLICATION_EMAIL`.
- Add verified product names, descriptions, audiences, features and availability
  to `src/content/products.ts`. The products list is intentionally empty until
  real product details are supplied.
- Add confirmed openings, location, employment type, posting date and role
  details to `src/content/jobs.ts`. The careers page intentionally shows an
  empty state until roles are confirmed.
- Confirm the technology names, service scope, working hours, culture and
  benefits described in this draft with the Vallumnar team.
- Add approved social profile URLs in `src/content/site.ts`.
- Have qualified counsel review and replace the draft Privacy Policy and Terms
  of Use, including jurisdiction, entity details, retention practices and
  contact process.
- Decide whether to add privacy-friendly analytics. Analytics are not enabled
  in this draft, so no cookie notice is shown.
