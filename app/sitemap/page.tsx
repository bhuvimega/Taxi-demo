import type { Metadata } from "next";
import Link from "next/link";
import { sitemapGroups } from "@/components/sitemap/sitemapData";

export const metadata: Metadata = {
  title: "Sitemap | GoCabxi",
  description: "Every GoCabxi page in one place.",
};

export default function SitemapPage() {
  return (
    <div className="bg-muted">
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[992px] px-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Sitemap</h1>
          <p className="mt-3 text-base text-muted-foreground">
            All GoCabxi pages in one place.
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {sitemapGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-semibold">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="link-muted text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
