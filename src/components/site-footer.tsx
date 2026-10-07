import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { products } from "@/content/products";

const footerColumns = [
  {
    label: "Services",
    links: services.map((service) => ({ label: service.title, href: `/services#${service.slug}` })),
  },
  {
    label: "Products",
    links: products.map((product) => ({ label: product.name, href: `/products/${product.slug}` })),
  },
  {
    label: "About",
    links: [{ label: "Our story", href: "/about" }],
  },
  {
    label: "Careers",
    links: [{ label: "Open roles", href: "/careers" }],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog · Coming soon", href: "/blog" },
      { label: "Case studies · Coming soon", href: "/case-studies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="newsletter-strip" aria-labelledby="newsletter-heading">
        <div className="page-shell newsletter-inner">
          <div>
            <span className="newsletter-kicker">A thoughtful note, now and then</span>
            <h2 id="newsletter-heading">Good ideas deserve a place in your inbox.</h2>
            <p>Occasional updates from Vallumnar. No noise, and you can unsubscribe any time.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
      <div className="page-shell footer-top">
        <div className="footer-brand-block">
          <Brand footer />
          <p>Technology for what comes next.</p>
          <div className="footer-company-details">
            {siteConfig.address ? <span>{siteConfig.address}</span> : <span>[CITY, COUNTRY]</span>}
            {siteConfig.contactEmail ? (
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            ) : (
              <span>[CONTACT EMAIL]</span>
            )}
            {siteConfig.phone ? <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>{siteConfig.phone}</a> : null}
          </div>
          {siteConfig.socialLinks.length ? (
            <div className="footer-socials" aria-label="Social media">
              {siteConfig.socialLinks.map((social) => (
                <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}<ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="footer-links">
          {footerColumns.map((column) => (
            <div key={column.label}>
              <span className="footer-label">{column.label}</span>
              {column.links.map((link) => (
                <Link href={link.href} key={link.href}>{link.label}</Link>
              ))}
            </div>
          ))}
          <div>
            <span className="footer-label">Contact</span>
            <Link href="/contact">Contact us</Link>
            {siteConfig.contactEmail ? (
              <a href={`mailto:${siteConfig.contactEmail}`}>
                Email Vallumnar <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="page-shell footer-wordmark" aria-hidden="true">
        Vallumnar
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} Vallumnar</span>
        <div className="footer-legal">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of use</Link>
        </div>
        <span>Built with care for what comes next.</span>
      </div>
    </footer>
  );
}
