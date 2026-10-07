import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="service-card card">
      <span className="icon-tile">
        <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link className="text-link" href={`/services#${service.slug}`}>
        Explore service <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
