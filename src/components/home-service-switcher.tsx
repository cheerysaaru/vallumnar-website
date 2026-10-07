"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/content/services";

export function HomeServiceSwitcher() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabId = useId();
  const service = services[selectedIndex];
  const Icon = service.icon;

  return (
    <div className="service-switcher">
      <div className="service-tabs" role="tablist" aria-label="Vallumnar services">
        {services.map((item, index) => {
          const ServiceIcon = item.icon;
          const selected = index === selectedIndex;
          return (
            <button
              aria-controls={`${tabId}-panel`}
              aria-selected={selected}
              className={`service-tab${selected ? " is-selected" : ""}`}
              id={`${tabId}-tab-${index}`}
              key={item.slug}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
              onKeyDown={(event) => {
                const nextIndex =
                  event.key === "ArrowRight"
                    ? (index + 1) % services.length
                    : event.key === "ArrowLeft"
                      ? (index - 1 + services.length) % services.length
                      : -1;
                if (nextIndex >= 0) {
                  event.preventDefault();
                  setSelectedIndex(nextIndex);
                  document.getElementById(`${tabId}-tab-${nextIndex}`)?.focus();
                }
              }}
            >
              <ServiceIcon size={17} strokeWidth={1.8} aria-hidden="true" />
              {item.title}
            </button>
          );
        })}
      </div>
      <article
        aria-labelledby={`${tabId}-tab-${selectedIndex}`}
        className="service-panel"
        id={`${tabId}-panel`}
        role="tabpanel"
        tabIndex={0}
      >
        <div className="service-panel-visual" aria-hidden="true">
          <div className="service-panel-orbit service-panel-orbit-one" />
          <div className="service-panel-orbit service-panel-orbit-two" />
          <div className="service-panel-icon"><Icon size={42} strokeWidth={1.5} /></div>
        </div>
        <div className="service-panel-copy">
          <span className="eyebrow">01 / {String(selectedIndex + 1).padStart(2, "0")}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <ul>
            {service.deliverables.slice(0, 4).map((item) => (
              <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <Link className="text-link" href={`/services#${service.slug}`}>
            Discover this service <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
