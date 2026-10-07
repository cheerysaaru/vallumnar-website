import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the Vallumnar website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Information"
        title="Terms of use"
        description="A simple draft of the terms for using the Vallumnar website."
      />
      <article className="page-shell legal-content">
        <p className="legal-draft">Draft terms — review and replace with approved legal terms before launch.</p>
        <h2>Using this website</h2>
        <p>
          This website shares general information about Vallumnar and its
          services. Website content is provided for general information and may
          change as the company&apos;s services and products develop.
        </p>
        <h2>Enquiries and applications</h2>
        <p>
          Sending a message or application does not create a client, employment
          or other contractual relationship. Do not send confidential or
          sensitive information through the website forms.
        </p>
        <h2>Before launch</h2>
        <p>
          Add Vallumnar&apos;s legal entity name, jurisdiction, governing law,
          liability terms, intellectual property terms and an approved contact
          method to this page.
        </p>
      </article>
    </>
  );
}
