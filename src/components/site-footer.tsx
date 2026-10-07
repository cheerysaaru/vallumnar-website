import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-top">
        <div className="footer-brand-block">
          <Brand footer />
          <p>Thoughtful technology for what&apos;s next.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">Explore</span>
            <Link href="/services">Services</Link>
            <Link href="/products">Products</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span className="footer-label">Information</span>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            {siteConfig.contactEmail ? (
              <a href={`mailto:${siteConfig.contactEmail}`}>
                Email us <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} Vallumnar</span>
        <span>Built with care for what comes next.</span>
      </div>
    </footer>
  );
}
