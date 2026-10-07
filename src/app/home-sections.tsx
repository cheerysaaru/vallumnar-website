import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Compass,
  Layers3,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { HomeServiceSwitcher } from "@/components/home-service-switcher";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { stats } from "@/content/stats";

const values = [
  {
    icon: Layers3,
    title: "One thoughtful partner",
    body: "Design, engineering and technology guidance, working together around your needs.",
  },
  {
    icon: Check,
    title: "Quality in the details",
    body: "We build with care for reliability, accessibility and the people using it.",
  },
  {
    icon: ShieldCheck,
    title: "Security by design",
    body: "We consider trust and security from the first conversations, not as an afterthought.",
  },
  {
    icon: UsersRound,
    title: "People make the difference",
    body: "Listen well, work openly and make space for every perspective.",
  },
];

export function HomeSections() {
  return (
    <>
      <section className="hero hero-enterprise">
        <div className="hero-circuit" aria-hidden="true">
          <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" stroke="white" strokeOpacity=".055" />
                <circle cx="0" cy="0" r="1.5" fill="#7dd3fc" fillOpacity=".55" />
              </pattern>
              <radialGradient id="hero-fade">
                <stop stopColor="#1d4ed8" stopOpacity=".35" />
                <stop offset="1" stopColor="#1e3a8a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path fill="url(#hero-grid)" d="M0 0h1200v900H0z" />
            <ellipse cx="890" cy="430" rx="470" ry="430" fill="url(#hero-fade)" />
            <g stroke="#7dd3fc" strokeOpacity=".28" strokeWidth="1.4">
              <path d="M596 118h120l80 80h122m-322 0h90l68 68v94m165-162v82l76 76h98M615 524h112l64-64h156m-214 152v-72l72-72h95m-212 180h167l88-88v-72h101" />
              <path d="M822 115v94l-64 64v78m255-2v86l-74 74h-88m-208-246h74l66 66v72" strokeOpacity=".18" />
            </g>
            <g fill="#7dd3fc">
              <circle cx="920" cy="198" r="5" /><circle cx="816" cy="360" r="5" />
              <circle cx="947" cy="278" r="5" /><circle cx="792" cy="460" r="5" />
              <circle cx="947" cy="622" r="5" /><circle cx="705" cy="524" r="5" />
              <circle cx="1007" cy="524" r="5" /><circle cx="749" cy="476" r="5" />
              <circle cx="718" cy="118" r="4" /><circle cx="779" cy="612" r="4" />
            </g>
            <g fill="#bfdbfe" fillOpacity=".9">
              <circle cx="920" cy="198" r="1.5" /><circle cx="816" cy="360" r="1.5" />
              <circle cx="947" cy="278" r="1.5" /><circle cx="792" cy="460" r="1.5" />
              <circle cx="947" cy="622" r="1.5" /><circle cx="705" cy="524" r="1.5" />
            </g>
          </svg>
        </div>
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A technology partner for what&apos;s next</span>
            <h1>Engineering the <span>future of business</span> technology.</h1>
            <p>
              From custom software to cloud, data and design, we build technology
              that helps teams move forward with confidence.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/services">
                Our services <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/careers">
                Join our team <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-orbit hero-visual-orbit-one" />
            <div className="hero-visual-orbit hero-visual-orbit-two" />
            <div className="hero-visual-center">
              <div className="hero-mark">
                <svg viewBox="0 0 90 90" fill="none">
                  <path d="M17 44h19l11-15h20M36 44l12 17h20M47 29v31m20-31 10 12v19l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="17" cy="44" r="4" fill="#7dd3fc" />
                  <circle cx="67" cy="29" r="4" fill="#7dd3fc" />
                  <circle cx="68" cy="61" r="4" fill="#7dd3fc" />
                  <circle cx="47" cy="44" r="4" fill="white" />
                </svg>
              </div>
              <span>Ideas into impact</span>
            </div>
            <div className="hero-node hero-node-one"><CircleDot size={18} /></div>
            <div className="hero-node hero-node-two"><Compass size={18} /></div>
            <div className="hero-node hero-node-three"><Sparkles size={18} /></div>
          </div>
          <a className="hero-scroll-cue" href="#about">
            <span>Scroll to discover</span><ArrowDown size={17} aria-hidden="true" />
          </a>
          <div className="hero-stats" aria-label="Vallumnar at a glance">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section intro-section" id="about">
        <div className="page-shell intro-layout">
          <div className="intro-copy">
            <span className="eyebrow">About Vallumnar</span>
            <h2 className="section-heading">Thoughtful technology. Built around people.</h2>
            <p>
              We bring design, engineering and technology together to help
              businesses turn complex challenges into clear next steps.
            </p>
            <p>
              From an early idea to a system that needs a steady hand, we pair
              practical thinking with care for the people on the other side of the screen.
            </p>
            <Link className="text-link" href="/about">
              Read about Vallumnar <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="intro-illustration" aria-hidden="true">
            <div className="intro-illustration-grid" />
            <div className="intro-illustration-line intro-line-one" />
            <div className="intro-illustration-line intro-line-two" />
            <div className="intro-illustration-line intro-line-three" />
            <span className="intro-node intro-node-one" />
            <span className="intro-node intro-node-two" />
            <span className="intro-node intro-node-three" />
            <div className="intro-center-mark">
              <svg viewBox="0 0 90 90" fill="none">
                <path d="m15 29 30 46 32-49" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="77" cy="24" r="5" fill="#0ea5e9" />
              </svg>
              <span>People + technology</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-switcher-section">
        <div className="page-shell">
          <div className="section-intro">
            <span className="eyebrow">Our services</span>
            <h2 className="section-heading">The capability to take your idea further.</h2>
            <p className="section-copy">
              Bring us a challenge, a big idea or a system to improve. We&apos;ll
              help find a clear way forward.
            </p>
          </div>
          <HomeServiceSwitcher />
          <Link className="section-bottom-link text-link" href="/services">
            Explore all services <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section products-preview">
        <div className="page-shell product-preview-grid">
          <div className="product-section-copy">
            <span className="eyebrow">Our products</span>
            <h2 className="section-heading">Software products, shaped around real needs.</h2>
            <p className="section-copy">
              Explore tools and digital products developed by Vallumnar.
            </p>
            <Link className="text-link" href="/products">
              Explore products <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-preview-cards">
            {products.slice(0, 2).map((product) => (
              <Link className="product-preview-card card" href={`/products/${product.slug}`} key={product.slug}>
                <span className="icon-tile"><Layers3 size={22} aria-hidden="true" /></span>
                <span className="product-preview-name">{product.name}</span>
                <span className="product-preview-summary">{product.summary}</span>
                <span className="text-link">Learn more <ArrowUpRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="page-shell stats-band-inner">
          <div className="stats-band-intro">
            <span className="eyebrow">Vallumnar in numbers</span>
            <h2>Built for work that moves business forward.</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-description">{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="page-shell">
          <div className="section-intro">
            <span className="eyebrow">Why Vallumnar</span>
            <h2 className="section-heading">Good work, grounded in good principles.</h2>
            <p className="section-copy">
              Strong partnerships come from clear thinking, careful craft and trust.
            </p>
          </div>
          <div className="value-cards">
            {values.map(({ icon: Icon, title, body }) => (
              <article className="value-card card" key={title}>
                <span className="icon-tile"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-banner">
        <div className="careers-banner-art" aria-hidden="true">
          <svg viewBox="0 0 900 400" preserveAspectRatio="xMidYMid slice" fill="none">
            <g stroke="#bfdbfe" strokeOpacity=".25">
              <path d="M430 10v112l82 82h125v92l-78 78H430m207-252 82-82h80m-365 174h-90l-78 78H165m426 82 70-70h90" strokeWidth="2" />
              <path d="M524 20h70l88 88v90m-333 39v-94l80-80h62m106 243v-82l80-80h94" />
            </g>
            <g fill="#7dd3fc">
              <circle cx="637" cy="204" r="5" /><circle cx="719" cy="122" r="5" />
              <circle cx="430" cy="122" r="5" /><circle cx="165" cy="296" r="5" />
              <circle cx="559" cy="374" r="5" /><circle cx="779" cy="374" r="5" />
            </g>
          </svg>
        </div>
        <div className="page-shell careers-banner-inner">
          <span className="eyebrow">Careers at Vallumnar</span>
          <h2>Build your career with Vallumnar.</h2>
          <p>Bring your curiosity, share your perspective and help build technology with purpose.</p>
          <Link className="button careers-banner-button" href="/careers">
            See open roles <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-shell closing-inner">
          <span className="eyebrow">Start a conversation</span>
          <h2>Have a project in mind?</h2>
          <p>Let&apos;s talk about the work ahead and make the next step a clear one.</p>
          <Link className="button closing-button" href="/contact">
            Contact us <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="technology-strip" aria-label="Technology tools">
        <div className="page-shell technology-inner">
          <span className="technology-label">Tools we work with</span>
          <div className="technology-list">
            {services.slice(0, 8).map((service) => <span key={service.slug}>{service.title}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
