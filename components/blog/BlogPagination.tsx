import Link from "next/link";

type BlogPaginationProps = {
  /** "/blog" or "/blog/category/hill-stations". */
  basePath: string;
  page: number;
  totalPages: number;
  /** Keeps the search word when moving between pages. */
  q?: string;
};

function pageHref(basePath: string, page: number, q?: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** 1 2 … 9 10 — always shows first, last and the pages around the current one. */
function pageList(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const wanted = new Set([
    1,
    2,
    total - 1,
    total,
    current - 1,
    current,
    current + 1,
  ]);
  const pages = [...wanted]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  pages.forEach((n, i) => {
    if (i > 0 && n - pages[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

export default function BlogPagination({
  basePath,
  page,
  totalPages,
  q,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const box =
    "flex size-11 items-center justify-center rounded-lg text-sm font-bold transition-colors focus-ring";

  return (
    <nav
      aria-label="Blog pages"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={pageHref(basePath, page - 1, q)}
          rel="prev"
          className={`${box} w-auto bg-card px-4 text-brand-text hover:bg-brand-light`}
        >
          Previous
        </Link>
      )}

      {pageList(page, totalPages).map((item, i) =>
        item === "gap" ? (
          <span
            key={`gap-${i}`}
            aria-hidden="true"
            className={`${box} text-muted-foreground`}
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={pageHref(basePath, item, q)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={`${box} ${item === page ? "bg-brand-dark text-white" : "bg-card text-brand-text hover:bg-brand-light"}`}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages && (
        <Link
          href={pageHref(basePath, page + 1, q)}
          rel="next"
          className={`${box} w-auto bg-card px-4 text-brand-text hover:bg-brand-light`}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
