import type { Metadata } from "next";
import { HeartHandshake, Lightbulb, ShieldCheck, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About Vallumnar",
  description:
    "Learn about Vallumnar's people-first approach to software, technology and digital product development.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: HeartHandshake, title: "People first", text: "Build technology around the people who create it and use it." },
  { icon: Lightbulb, title: "Stay curious", text: "Ask better questions, keep learning and welcome new perspectives." },
  { icon: ShieldCheck, title: "Earn trust", text: "Be thoughtful about quality, responsibility and security." },
  { icon: UsersRound, title: "Work openly", text: "Share context, collaborate generously and make progress together." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Vallumnar"
        title="Good technology starts with understanding."
        description="We bring people, design and engineering together to make technology useful, considered and ready for what comes next."
      />
      <section className="section about-story">
        <div className="page-shell about-story-layout">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="section-heading">A clear start, with room to grow.</h2>
          </div>
          <div className="about-story-copy">
            <p>
              Vallumnar is a technology company created to help teams make
              progress on meaningful digital work. Our approach brings
              engineering, product thinking and design into the same
              conversation.
            </p>
            <p>
              We are still writing our story. What matters from the start is how
              we work: listen closely, think clearly and build with care.
            </p>
            <div className="about-placeholder">
              <strong>Story detail to come</strong>
              <span>Replace this draft with Vallumnar&apos;s confirmed founding story, location and milestones.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-values">
        <div className="page-shell">
          <div className="section-intro">
            <span className="eyebrow">What guides us</span>
            <h2 className="section-heading">Principles behind every partnership.</h2>
          </div>
          <div className="value-cards">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="value-card card" key={title}>
                <span className="icon-tile"><Icon size={23} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section leadership-section">
        <div className="page-shell leadership-placeholder">
          <span className="eyebrow">Our people</span>
          <h2 className="section-heading">Meet the people behind Vallumnar.</h2>
          <p className="section-copy">
            Leadership profiles will be added when names, roles and approved
            biographies are confirmed. No unverified people or portraits are used.
          </p>
          <span className="placeholder-badge">[LEADERSHIP PROFILES]</span>
        </div>
      </section>
      <section className="closing-section">
        <div className="page-shell closing-inner">
          <span className="eyebrow">Build with us</span>
          <h2>Curious about the work or the people?</h2>
          <p>We&apos;d be glad to hear from you.</p>
          <a className="button closing-button" href="/contact">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}
