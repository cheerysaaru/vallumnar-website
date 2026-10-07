import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { HeroField } from "@/components/hero-field";
import { HomeFaq } from "@/components/home-faq";
import { HomeMotion } from "@/components/home-motion";
import { HomeServiceShowcase } from "@/components/home-service-showcase";
import { homeAudiences } from "@/content/home";
import { insights } from "@/content/insights";
import { products } from "@/content/products";
import { stats } from "@/content/stats";

export function HomeSections() {
  return (
    <div className="v-home">
      <HomeMotion />
      <div className="v-hero-stage">
        <section className="v-hero" aria-labelledby="home-hero-heading">
          <HeroField />
          <div className="v-hero-wash" aria-hidden="true" />
          <div className="page-shell v-hero-content">
            <span className="eyebrow v-hero-eyebrow">
              A technology partner for what&apos;s next
            </span>
            <h1 className="v-hero-title" id="home-hero-heading">
              <span className="v-hero-line-mask">
                <span className="v-hero-title-line">Engineering that</span>
              </span>
              <span className="v-hero-line-mask">
                <span className="v-hero-title-line">moves business forward.</span>
              </span>
            </h1>
            <p className="v-hero-description">
              We bring people, design and engineering together to make useful
              technology — from a first idea to the systems teams rely on.
            </p>
            <div className="v-hero-actions">
              <Link className="button" href="/services">
                Our services <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/careers">
                Join our team <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <a className="v-scroll-cue" href="#audiences">
              <span>Scroll to explore</span>
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>

      <section className="v-audience" id="audiences" aria-label="Explore Vallumnar">
        <div className="page-shell v-audience-grid">
          {homeAudiences.map((audience, index) => (
            <Link
              className="v-audience-card"
              data-reveal
              data-delay={index % 4}
              href={audience.href}
              key={audience.number}
            >
              <span className="v-audience-topline">
                <span>{audience.number}</span>
                <span>{audience.label}</span>
              </span>
              <span className="v-audience-statement">{audience.statement}</span>
              <span className="v-audience-link">
                {audience.linkLabel}
                <MoveUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="v-statement" aria-labelledby="home-statement-heading">
        <div className="page-shell v-statement-inner" data-reveal>
          <span className="eyebrow">A clear direction, made real</span>
          <h2 id="home-statement-heading">
            Good technology turns complexity into{" "}
            <span>meaningful progress.</span>
          </h2>
          <p>
            We keep the people, purpose and practical details in view — so teams
            can move from possibility to something they can use.
          </p>
        </div>
      </section>

      <section className="v-work section" id="about">
        <div className="page-shell v-work-grid">
          <div className="v-work-copy" data-reveal>
            <span className="eyebrow">How we work</span>
            <h2 className="section-heading">
              Thoughtful decisions. Steady progress.
            </h2>
            <p className="section-copy">
              We start by understanding the problem, bring the right skills
              around it, then build and learn in clear steps.
            </p>
            <ol className="v-work-steps">
              <li><span>01</span>Listen and understand</li>
              <li><span>02</span>Shape a practical direction</li>
              <li><span>03</span>Build, test and improve</li>
            </ol>
            <Link className="text-link" href="/about">
              About Vallumnar <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="v-work-art" aria-hidden="true">
            <div className="v-work-art__rings" />
            <svg viewBox="0 0 480 480" fill="none">
              <path
                d="M83 267c21-82 72-129 151-142 61-10 117 11 161 58M90 310c43 71 99 107 167 108 58 1 105-22 144-68M129 135c32 54 43 107 30 160-11 45-39 83-85 115m258-276c-36 52-46 106-32 163 10 42 35 80 76 113"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M78 240h324M240 78v324M126 126l228 228m0-228L126 354"
                stroke="currentColor"
                strokeOpacity=".38"
              />
              <circle cx="240" cy="240" r="112" stroke="currentColor" strokeWidth="2" />
              <circle cx="240" cy="240" r="61" fill="#fff" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="240" cy="128" r="7" fill="#F2C94C" />
              <circle cx="352" cy="240" r="7" fill="#1D4ED8" />
              <circle cx="166" cy="314" r="7" fill="#2779A7" />
              <circle cx="240" cy="240" r="12" fill="#0B2A4A" />
            </svg>
            <span className="v-work-art__label">Listen · shape · build</span>
          </div>
        </div>
      </section>

      <section className="v-services section" id="services">
        <div className="page-shell">
          <div className="v-section-heading" data-reveal>
            <span className="eyebrow">What we do</span>
            <h2 className="section-heading">
              The capabilities to take your idea further.
            </h2>
            <p className="section-copy">
              Bring us a challenge, a product idea or a system to improve. We
              can help find a clear way forward.
            </p>
          </div>
          <HomeServiceShowcase />
          <Link className="v-section-link" href="/services">
            Explore all services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v-products section" id="products">
        <div className="page-shell">
          <div className="v-section-heading" data-reveal>
            <span className="eyebrow">Products</span>
            <h2 className="section-heading">
              Useful products, shaped around real needs.
            </h2>
            <p className="section-copy">
              We build software products with care for the details that make
              everyday work clearer.
            </p>
          </div>
          <div className="v-product-grid">
            {products.map((product, index) => (
              <article className="v-product-card" data-reveal key={product.slug}>
                <div className={`v-product-art v-product-art--${index + 1}`} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="v-product-card__body">
                  <span className="v-product-label">Vallumnar product</span>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <Link className="text-link" href={`/products/${product.slug}`}>
                    Learn more <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link className="v-section-link" href="/products">
            Explore products <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v-expansion" aria-label="Technology, thoughtfully connected">
        <div className="v-expansion-panel" data-reveal>
          <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
            <path d="M0 360h180l110-110h185l112 112h205l111-111h230l100-100h207" />
            <path d="M0 180h125l90 90h185l95-95h200l105 105h170l110-110h235l100 100h225" />
            <path d="M175 520V360l-92-92V98m490 422V362l112-112V83m354 437V361l-88-89V99" />
            <circle cx="290" cy="250" r="9" />
            <circle cx="592" cy="362" r="9" />
            <circle cx="913" cy="251" r="9" />
            <circle cx="1198" cy="151" r="9" />
          </svg>
          <div className="v-expansion-copy" data-reveal>
            <span className="eyebrow">Connected by design</span>
            <p>Good systems give good ideas room to grow.</p>
          </div>
        </div>
      </section>

      <section className="v-stats section" aria-labelledby="home-stats-heading">
        <div className="page-shell">
          <div className="v-stats-intro" data-reveal>
            <span className="eyebrow">Vallumnar in numbers</span>
            <h2 className="section-heading" id="home-stats-heading">
              A foundation for meaningful work.
            </h2>
            <p className="section-copy">
              Verified company figures will be added when Vallumnar confirms
              them.
            </p>
          </div>
          <div className="v-stat-grid">
            {stats.map((stat, index) => (
              <article
                className="v-stat-card"
                data-reveal
                data-delay={index}
                key={stat.label}
              >
                <span className="v-stat-index">{String(index + 1).padStart(2, "0")}</span>
                <strong><CountUp value={stat.value} /></strong>
                <span className="v-stat-label">{stat.label}</span>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v-faq-section section" id="faq">
        <div className="page-shell v-faq-layout">
          <div className="v-faq-intro" data-reveal>
            <span className="eyebrow">Good questions</span>
            <h2 className="section-heading">A little more about working with us.</h2>
            <p className="section-copy">
              A few useful starting points. For anything more specific, we are
              happy to hear from you.
            </p>
            <Link className="text-link" href="/contact">
              Ask us a question <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <HomeFaq />
        </div>
      </section>

      <section className="v-careers" id="careers">
        <div className="v-careers-art" aria-hidden="true">
          <svg viewBox="0 0 760 360" fill="none">
            <path d="M50 270h145l75-75h90l76 76h105l78-78h92" />
            <path d="M220 350V195l75-76h100l66 66v95m88 120V271l75-75h80" />
            <circle cx="195" cy="270" r="8" />
            <circle cx="360" cy="195" r="8" />
            <circle cx="530" cy="271" r="8" />
          </svg>
        </div>
        <div className="page-shell v-careers-inner" data-reveal>
          <span className="eyebrow">Careers at Vallumnar</span>
          <h2>Build your career with us.</h2>
          <p>
            Bring your curiosity, share your perspective and help create
            technology with care.
          </p>
          <Link className="button v-careers-button" href="/careers">
            Explore careers <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v-insights section" id="insights">
        <div className="page-shell">
          <div className="v-insights-heading" data-reveal>
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="section-heading">Notes on building what&apos;s next.</h2>
            </div>
            <Link className="text-link" href="/blog">
              Read the blog <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="v-insight-grid">
            {insights.map((insight, index) => (
              <article className="v-insight-card" data-reveal data-delay={index} key={index}>
                <span className="v-insight-date">{insight.date}</span>
                <span className="v-insight-art" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="v-insight-label">Draft insight</span>
                <h3>{insight.title}</h3>
                <p>{insight.excerpt}</p>
                <Link href="/blog">
                  Read the post <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
