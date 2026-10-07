import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Learn how Vallumnar handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Information"
        title="Privacy policy"
        description="A plain-language draft about information submitted through this website."
      />
      <article className="page-shell legal-content">
        <p className="legal-draft">Draft policy — review and update this page with your legal adviser before launch.</p>
        <h2>Information you choose to share</h2>
        <p>
          If you use the contact or careers form, we receive the information you
          provide, such as your name, email address, message, links and (if
          attached) CV. The site uses that information to respond to your enquiry
          or consider your application.
        </p>
        <h2>How information is handled</h2>
        <p>
          Form submissions are sent to Vallumnar using the configured email
          delivery provider. Do not include sensitive personal information that
          is not needed for your enquiry or application. We do not intentionally
          use advertising cookies or analytics in this draft.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          Set a retention period and contact process before launch. You may ask
          about information you have submitted using{" "}
          {siteConfig.contactEmail ? (
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          ) : (
            "[CONTACT EMAIL]"
          )}
          .
        </p>
        <h2>Updates</h2>
        <p>This page should be updated whenever Vallumnar&apos;s data practices change.</p>
      </article>
    </>
  );
}
