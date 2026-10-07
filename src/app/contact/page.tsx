import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vallumnar to discuss a technology challenge, product idea or potential partnership.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let's talk about what you're building."
        description="Tell us a little about your idea, your team or the challenge in front of you. We’ll get back to you as soon as we can."
      />
      <section className="section contact-section">
        <div className="page-shell contact-layout">
          <div className="contact-details">
            <span className="eyebrow">Get in touch</span>
            <h2 className="section-heading">A good conversation can make the next step clearer.</h2>
            <p className="section-copy">
              Share a few details and we&apos;ll connect you with the right person.
            </p>
            <div className="contact-facts">
              {siteConfig.contactEmail ? (
                <a href={`mailto:${siteConfig.contactEmail}`}>
                  <span><Mail size={19} aria-hidden="true" /></span>
                  <span><small>Email</small>{siteConfig.contactEmail}</span>
                </a>
              ) : null}
              {siteConfig.phone ? (
                <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
                  <span><Phone size={19} aria-hidden="true" /></span>
                  <span><small>Phone</small>{siteConfig.phone}</span>
                </a>
              ) : null}
              {siteConfig.address ? (
                <div>
                  <span><MapPin size={19} aria-hidden="true" /></span>
                  <span><small>Address</small>{siteConfig.address}</span>
                </div>
              ) : null}
              <div>
                <span><Clock3 size={19} aria-hidden="true" /></span>
                <span><small>Working hours</small>We&apos;ll reply during our working hours.</span>
              </div>
            </div>
            <div className="map-placeholder" aria-label="Map location not provided">
              <div className="map-grid" aria-hidden="true" />
              <span className="map-pin"><MapPin size={19} aria-hidden="true" /></span>
              <span className="map-caption">Our location will be shared here.</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
