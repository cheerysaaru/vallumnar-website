import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { products } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageIntro eyebrow="Our products" title={product.name} description={product.summary} />
      <section className="section">
        <div className="page-shell product-detail-layout">
          <div>
            <span className="eyebrow">The challenge</span>
            <h2 className="section-heading">{product.problem}</h2>
            <p className="section-copy">{product.audience}</p>
          </div>
          <div className="product-features card">
            <h2>What it helps you do</h2>
            {product.features.map((feature) => (
              <p key={feature}><Check size={17} aria-hidden="true" />{feature}</p>
            ))}
            <a className="button" href="/contact?subject=Product%20demo">
              Request a demo <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
