import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Technology services",
  description:
    "Explore Vallumnar's software development, cloud, design, data, QA and technology consulting services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="The right expertise for your next step."
        description="From a first product idea to the systems that support your business, we bring practical thinking and careful delivery to the work."
      />
      <section className="service-details section">
        <div className="page-shell">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article className={`service-detail${index % 2 ? " service-detail-reverse" : ""}`} id={service.slug} key={service.slug}>
                <div className="service-detail-heading">
                  <span className="service-detail-number">0{index + 1}</span>
                  <span className="icon-tile"><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
                <div className="service-detail-content">
                  <div className="service-content-block">
                    <h3>How we work</h3>
                    <ol className="process-list">
                      {service.process.map((step) => <li key={step}>{step}<ArrowRight size={15} aria-hidden="true" /></li>)}
                    </ol>
                  </div>
                  <div className="service-content-block">
                    <h3>Typical deliverables</h3>
                    <ul className="deliverable-list">
                      {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                  </div>
                  <div className="service-content-block">
                    <h3>Technologies & practices</h3>
                    <div className="tag-list">
                      {service.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="closing-section">
        <div className="page-shell closing-inner">
          <span className="eyebrow">A good place to begin</span>
          <h2>Tell us what you&apos;re trying to make possible.</h2>
          <p>We&apos;ll listen, ask the right questions and help you work out what comes next.</p>
          <a className="button closing-button" href="/contact">Talk with our team <ArrowRight size={16} /></a>
        </div>
      </section>
    </>
  );
}
