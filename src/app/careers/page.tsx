import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, Lightbulb, Sparkles, UsersRound } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";
import { PageIntro } from "@/components/page-intro";
import { jobs } from "@/content/jobs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers at Vallumnar. Bring your curiosity and help create thoughtful technology that moves people and businesses forward.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  {
    icon: HeartHandshake,
    title: "Work that matters",
    description: "Bring care and clear thinking to challenges with real people behind them.",
  },
  {
    icon: Lightbulb,
    title: "Room to learn",
    description: "Stay curious, share what you know and keep growing your craft.",
  },
  {
    icon: UsersRound,
    title: "Better together",
    description: "Make good work through respect, open communication and shared ownership.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful by design",
    description: "Make space for quality, accessibility and the details that make a difference.",
  },
];

export default function CareersPage() {
  const jobPostingJsonLd = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.datePosted,
    employmentType: job.type,
    hiringOrganization: { "@type": "Organization", name: "Vallumnar", sameAs: siteConfig.url },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location },
    },
    identifier: { "@type": "PropertyValue", name: "Vallumnar", value: job.id },
  }));

  return (
    <>
      {jobPostingJsonLd.map((job, index) => (
        <script
          key={jobs[index].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(job).replace(/</g, "\\u003c") }}
        />
      ))}
      <PageIntro
        eyebrow="Careers"
        title="Do thoughtful work with thoughtful people."
        description="We believe better technology comes from curious people who listen well, care about the craft and make room for different perspectives."
      />
      <section className="section culture-section">
        <div className="page-shell">
          <div className="culture-intro">
            <span className="eyebrow">A place to do your best work</span>
            <h2 className="section-heading">Bring your perspective. Keep growing your craft.</h2>
            <p className="section-copy">
              We&apos;re building a team that values clear communication, thoughtful
              collaboration and learning through the work. We&apos;ll share more
              about our ways of working as the team grows.
            </p>
          </div>
          <div className="culture-grid">
            {reasons.map(({ icon: Icon, title, description }) => (
              <article className="culture-card card" key={title}>
                <span className="icon-tile"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section openings-section">
        <div className="page-shell openings-layout">
          <div className="openings-copy">
            <span className="eyebrow">Open roles</span>
            <h2 className="section-heading">
              {jobs.length ? "Find your next opportunity." : "No open roles right now."}
            </h2>
            <p className="section-copy">
              {jobs.length
                ? "Explore the roles below and tell us how you could contribute."
                : "We don't have any confirmed openings to share today, but we're always glad to hear from people who care about good work."}
            </p>
            {jobs.length ? (
              <div className="job-list">
                {jobs.map((job) => (
                  <article className="job-card card" key={job.id}>
                    <div><h3>{job.title}</h3><p>{job.location} · {job.type}</p></div>
                    <a className="text-link" href={`#application-${job.id}`}>Apply <ArrowUpRight size={15} /></a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="open-roles-note">
                <span className="status-dot" aria-hidden="true" />
                You can still introduce yourself below.
              </div>
            )}
          </div>
          <div className="application-panel" id="application">
            <span className="eyebrow">Start a conversation</span>
            <h2>Send us your CV.</h2>
            <p>Share a little about yourself and the kind of work you&apos;d like to do.</p>
            <ApplicationForm roles={jobs.map((job) => job.title)} />
          </div>
        </div>
      </section>
    </>
  );
}
