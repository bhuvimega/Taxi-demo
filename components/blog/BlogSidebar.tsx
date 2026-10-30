import Link from "next/link";
import { Search } from "lucide-react";
import {
  getAllPosts,
  getCategoriesWithCounts,
  categoryUrl,
  postUrl,
} from "@/lib/blog";

function SideHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b-2 border-brand pb-2 text-base font-extrabold">
      {children}
    </h2>
  );
}

export default function BlogSidebar() {
  const recent = getAllPosts().slice(0, 5);

  return (
    <aside aria-label="Blog sidebar" className="space-y-8">
      <section>
        <SideHeading>Search for travel content</SideHeading>
        {/* A plain GET form: submitting it opens /blog?q=… */}
        <form
          action="/blog"
          method="get"
          role="search"
          className="mt-4 flex gap-2"
        >
          <label htmlFor="blog-search" className="sr-only">
            Search the blog
          </label>
          <input
            id="blog-search"
            type="search"
            name="q"
            placeholder="Search …"
            className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-card px-3 text-sm outline-none placeholder:text-subtle focus:border-brand"
          />
          <button
            type="submit"
            className="btn btn-accent h-11 rounded-lg px-4 text-sm"
          >
            <Search size={16} aria-hidden="true" />
            Search
          </button>
        </form>
      </section>

      <section>
        <SideHeading>About GoCabxi</SideHeading>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          GoCabxi is a modern intercity and local cab-booking platform built for
          honest pricing and dependable rides across India. Outstation, airport
          and hourly — with the fare shown upfront.
        </p>
        <Link
          href="/about"
          className="mt-3 inline-block text-sm font-semibold text-brand-text hover:underline focus-ring"
        >
          Read more about us
        </Link>
      </section>

      <section>
        <SideHeading>Recent travel posts</SideHeading>
        <ul className="mt-4 space-y-3">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                href={postUrl(post.slug)}
                className="text-sm leading-6 text-muted-foreground hover:text-brand-text focus-ring"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SideHeading>Categories</SideHeading>
        <ul className="mt-4 space-y-2">
          {getCategoriesWithCounts().map((c) => (
            <li
              key={c.slug}
              className="flex items-center justify-between text-sm"
            >
              <Link
                href={categoryUrl(c.slug)}
                className="text-muted-foreground hover:text-brand-text focus-ring"
              >
                {c.name}
              </Link>
              <span className="rounded-full bg-card px-2 py-0.5 text-xs font-semibold text-body">
                {c.count}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
