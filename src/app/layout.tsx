import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackToTop } from "@/components/back-to-top";
import { RouteTransition } from "@/components/route-transition";
import { siteConfig } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Vallumnar | Technology that moves business forward",
    template: "%s | Vallumnar",
  },
  description:
    "Vallumnar designs, builds and supports digital products and technology solutions for ambitious teams.",
  applicationName: "Vallumnar",
  openGraph: {
    type: "website",
    siteName: "Vallumnar",
    title: "Vallumnar | Technology that moves business forward",
    description:
      "Thoughtful software, digital products and technology services for what's next.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vallumnar | Technology that moves business forward",
    description:
      "Thoughtful software, digital products and technology services for what's next.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fbff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vallumnar",
    url: siteConfig.url,
    description:
      "Technology services and software products for teams building what comes next.",
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        <main id="main-content">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <BackToTop />
        <SiteFooter />
      </body>
    </html>
  );
}
