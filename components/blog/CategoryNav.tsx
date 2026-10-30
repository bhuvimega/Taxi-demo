import Link from "next/link";
import { categories, type CategorySlug } from "@/content/blog";
import { categoryUrl } from "@/lib/blog";

export default function CategoryNav({ active }: { active?: CategorySlug }) {
  const base =
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-ring";
  const on = "bg-brand-dark text-white";
  const off = "bg-card text-body hover:bg-brand-light";

  return (
    <nav aria-label="Blog categories" className="mt-6 flex flex-wrap gap-2">
      <Link
        href="/blog"
        aria-current={!active ? "page" : undefined}
        className={`${base} ${!active ? on : off}`}
      >
        All posts
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={categoryUrl(c.slug)}
          aria-current={active === c.slug ? "page" : undefined}
          className={`${base} ${active === c.slug ? on : off}`}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
