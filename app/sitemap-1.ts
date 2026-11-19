import type { MetadataRoute } from "next";
import { categories } from "@/content/blog";
import { categoryUrl, getAllPosts, postUrl } from "@/lib/blog";

/**
 * The machine-readable sitemap Google reads at /sitemap.xml.
 * (The page people read is app/sitemap/page.tsx at /sitemap.)
 * Set NEXT_PUBLIC_SITE_URL to your real domain, e.g. https://www.gocabxi.com
 */
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/contact", "/blog", "/track-ride", "/sitemap", "/privacy-policy", "/terms", "/cancellation-policy"].map(
    (path) => ({ url: `${base}${path}` }),
  );

  const blogCategories = categories.map((c) => ({ url: `${base}${categoryUrl(c.slug)}` }));
  const blogPosts = getAllPosts().map((p) => ({
    url: `${base}${postUrl(p.slug)}`,
    lastModified: new Date(p.updated ?? p.date),
  }));

  return [...pages, ...blogCategories, ...blogPosts];
}