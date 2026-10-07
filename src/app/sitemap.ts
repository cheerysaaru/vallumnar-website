import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

const pages = [
  "",
  "/services",
  "/products",
  "/about",
  "/careers",
  "/contact",
  "/blog",
  "/case-studies",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
