import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas and perspectives from Vallumnar. Updates are coming soon.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageIntro eyebrow="Resources" title="Notes on technology and the work behind it." description="Practical ideas, useful perspectives and things we're learning along the way." />
      <section className="section">
        <div className="page-shell resource-empty card">
          <span className="eyebrow">Coming soon</span>
          <h2>Our first articles are taking shape.</h2>
          <p>There are no published articles yet. We&apos;ll share this space when we have something useful to say.</p>
        </div>
      </section>
    </>
  );
}
