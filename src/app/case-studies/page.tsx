import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Vallumnar project stories and case studies. Updates are coming soon.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageIntro eyebrow="Resources" title="Good work is better when we can share what we learned." description="A look at challenges, decisions and outcomes from the work we do together." />
      <section className="section">
        <div className="page-shell resource-empty card">
          <span className="eyebrow">Coming soon</span>
          <h2>Project stories will be shared here.</h2>
          <p>We&apos;ll publish case studies when approved details and client permissions are in place.</p>
        </div>
      </section>
    </>
  );
}
