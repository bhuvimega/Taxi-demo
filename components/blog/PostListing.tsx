import Link from "next/link";
import type { CategorySlug } from "@/content/blog";
import { filterPosts, paginate, parsePage } from "@/lib/blog";
import BlogPagination from "./BlogPagination";
import PostCard from "./PostCard";

type PostListingProps = {
  category?: CategorySlug;
  basePath: string;
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
};

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function PostListing({
  category,
  basePath,
  searchParams,
}: PostListingProps) {
  const sp = await searchParams;
  const q = first(sp.q)?.trim().slice(0, 80) ?? "";
  const result = paginate(
    filterPosts({ category, q }),
    parsePage(first(sp.page)),
  );

  return (
    <>
      {q && (
        <p className="mb-6 text-sm text-muted-foreground" role="status">
          {result.total} {result.total === 1 ? "result" : "results"} for{" "}
          <strong className="text-foreground">“{q}”</strong>
          {" · "}
          <Link
            href={basePath}
            className="font-semibold text-brand-text hover:underline focus-ring"
          >
            Clear search
          </Link>
        </p>
      )}

      {result.items.length === 0 ? (
        <div className="rounded-2xl bg-card p-10 text-center">
          <h2 className="text-lg font-bold">No posts found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different word, or browse all posts.
          </p>
          <Link href="/blog" className="btn btn-solid btn-pill mt-5 h-11">
            View all posts
          </Link>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {result.items.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      <BlogPagination
        basePath={basePath}
        page={result.page}
        totalPages={result.totalPages}
        q={q || undefined}
      />
    </>
  );
}

export function ListingSkeleton() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2" aria-busy="true">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="h-80 animate-pulse rounded-2xl bg-card" />
      ))}
    </ul>
  );
}
