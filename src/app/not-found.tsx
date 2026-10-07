import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found page-shell">
      <span className="icon-tile"><Compass size={27} aria-hidden="true" /></span>
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page took a different turn.</h1>
      <p>The link may be outdated, or the page may have moved. Let&apos;s get you back on track.</p>
      <Link className="button" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
    </section>
  );
}
