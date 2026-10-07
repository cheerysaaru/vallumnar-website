import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { ServiceCard } from "@/components/service-card";

const values = [
  {
    title: "People before process",
    body: "We start by understanding the people, context and constraints behind the work.",
  },
  {
    title: "Clear thinking, careful craft",
    body: "Good technology should feel considered, dependable and straightforward to use.",
  },
  {
    title: "Built to move forward",
    body: "We make room to learn, adapt and keep improving long after the first release.",
  },
];

const technologies = ["TypeScript", "React", "Next.js", "Node.js", "Python", "AWS", "Figma", "PostgreSQL"];

export function HomeSections() {
  return (
    <>
      <section className="hero">
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Technology, thoughtfully delivered</span>
            <h1>Build what&apos;s next. <span>Move forward with confidence.</span></h1>
            <p>
              We bring people, design and engineering together to create digital
              products and technology that move your business forward.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/services">
                Our services <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/careers">
                Join our team <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-note">
              <span className="status-dot" aria-hidden="true" />
              An independent technology partner for ambitious teams
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-glow" />
            <div className="hero-center">
              <div className="hero-center-mark">
                <Braces size={40} strokeWidth={1.6} />
              </div>
              <span>Good ideas, made real.</span>
            </div>
            <div className="float-card float-card-code">
              <Code2 size={19} />
              <span>Thoughtful engineering</span>
              <Check size={16} />
            </div>
            <div className="float-card float-card-cloud">
              <Cloud size={19} />
              <span>Designed to scale</span>
            </div>
            <div className="float-card float-card-data">
              <Database size={18} />
            </div>
            <div className="hero-spark hero-spark-one"><Sparkles size={18} /></div>
            <div className="hero-spark hero-spark-two"><Layers3 size={17} /></div>
          </div>
        </div>
        <div className="hero-bottom-rule page-shell">
          <span>Ideas to impact</span><span>Design with intent</span><span>Engineering with care</span>
        </div>
      </section>

      <section className="section section-services">
        <div className="page-shell">
          <div className="section-topline">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="section-heading">Technology that fits the work you need to do.</h2>
            </div>
            <Link className="text-link" href="/services">
              All services <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="service-grid">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section products-preview">
        <div className="page-shell product-preview-grid">
          <div>
            <span className="eyebrow">Our products</span>
            <h2 className="section-heading">Useful tools, shaped around real needs.</h2>
            <p className="section-copy">
              We build software products with the same care we bring to every
              partnership: thoughtful design, dependable engineering and room to grow.
            </p>
            <Link className="text-link" href="/products">
              Explore products <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          {products.length ? (
            <div className="product-preview-cards">
              {products.slice(0, 2).map((product) => (
                <Link className="product-preview-card card" href={`/products/${product.slug}`} key={product.slug}>
                  <span className="icon-tile"><Layers3 size={22} /></span>
                  <span className="product-preview-name">{product.name}</span>
                  <span className="product-preview-summary">{product.summary}</span>
                  <ArrowUpRight className="product-arrow" size={18} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="product-empty-card card">
              <div className="product-empty-illustration">
                <div className="product-empty-back" />
                <div className="product-empty-front"><Layers3 size={31} /></div>
                <span className="product-empty-spark">✳</span>
              </div>
              <span className="product-empty-title">More to come</span>
              <p>We&apos;re shaping this part of our story. Check back for product updates.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section values-section">
        <div className="page-shell values-layout">
          <div className="values-intro">
            <span className="eyebrow">Why Vallumnar</span>
            <h2 className="section-heading">Good work starts with a good partnership.</h2>
            <p className="section-copy">
              The best outcomes come from curiosity, shared understanding and
              teams who care about the details.
            </p>
          </div>
          <div className="values-list">
            {values.map((value, index) => (
              <article className="value-item" key={value.title}>
                <span className="value-number">0{index + 1}</span>
                <div><h3>{value.title}</h3><p>{value.body}</p></div>
                <ChevronRight size={19} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section career-strip">
        <div className="page-shell career-strip-inner">
          <div className="career-strip-icon"><Sparkles size={25} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">Careers at Vallumnar</span>
            <h2>Bring your curiosity. Build something meaningful.</h2>
            <p>We welcome thoughtful people who care about how technology can help.</p>
          </div>
          <Link className="button button-secondary" href="/careers">
            Meet us <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="technology-strip">
        <div className="page-shell technology-inner">
          <span className="technology-label">Tools we work with</span>
          <div className="technology-list">
            {technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-shell closing-inner">
          <span className="eyebrow">Have a challenge in mind?</span>
          <h2>Let&apos;s make the next step a clear one.</h2>
          <p>Tell us what you&apos;re working on. We&apos;ll help you find a thoughtful way forward.</p>
          <Link className="button closing-button" href="/contact">
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
