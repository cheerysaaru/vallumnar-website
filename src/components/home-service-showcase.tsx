"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { services } from "@/content/services";

export function HomeServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] ?? services[0];
  const ActiveIcon = activeService.icon;

  useEffect(() => {
    const serviceItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-home-service]"),
    );
    if (!serviceItems.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0];
        const index = visibleEntry
          ? Number((visibleEntry.target as HTMLElement).dataset.homeService)
          : Number.NaN;
        if (Number.isInteger(index) && index >= 0 && index < services.length) {
          setActiveIndex(index);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );

    serviceItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="v-service-showcase">
      <div
        className={`v-service-visual v-service-visual--${activeIndex + 1}`}
        aria-hidden="true"
      >
        <div className="v-service-visual__grid" />
        <div className="v-service-visual__orbit v-service-visual__orbit--one" />
        <div className="v-service-visual__orbit v-service-visual__orbit--two" />
        <div className="v-service-visual__icon">
          <ActiveIcon size={42} strokeWidth={1.5} />
        </div>
        <div className="v-service-visual__status">
          <CircleDot size={14} />
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
        </div>
        <p>{activeService.title}</p>
      </div>
      <div className="v-service-list">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              className={`v-service-item${activeIndex === index ? " is-active" : ""}`}
              data-home-service={index}
              data-reveal
              id={`home-${service.slug}`}
              key={service.slug}
            >
              <div className="v-service-item__number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="v-service-item__copy">
                <span className="v-service-item__icon"><Icon size={18} aria-hidden="true" /></span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link className="text-link" href={`/services#${service.slug}`}>
                  Explore service <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
