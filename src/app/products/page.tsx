import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Our products",
  description:
    "Discover software products from Vallumnar, thoughtfully designed to solve practical challenges.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our products"
        title="Tools designed to make work a little better."
        description="We create software products with a focus on useful details, simple experiences and dependable foundations."
      />
      <section className="section products-page-section">
        <div className="page-shell">
          {products.length ? (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card card" key={product.slug}>
                  <span className="icon-tile"><Layers3 size={24} /></span>
                  <h2>{product.name}</h2>
                  <p>{product.summary}</p>
                  <Link className="text-link" href={`/products/${product.slug}`}>
                    Learn more <ArrowUpRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="products-empty card">
              <span className="icon-tile"><Layers3 size={25} /></span>
              <h2>Our product stories are taking shape.</h2>
              <p>
                We&apos;re working on what comes next. In the meantime, our team
                can help you explore a custom software idea or product challenge.
              </p>
              <Link className="button" href="/contact">Talk to us <ArrowUpRight size={16} /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
