import { authors, categories, posts, type CategorySlug, type Post } from "@/content/blog";

export const PAGE_SIZE = 6;

/** Newest first. */
const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getAllPosts = () => sorted;
export const getPost = (slug: string) => sorted.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getCategoryName = (slug: CategorySlug) => getCategory(slug)?.name ?? slug;

/** "Why travel by car?" → "why-travel-by-car" (used for the #links in the contents list). */
export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const getAuthor = (post: Post) => authors[post.author ?? "team"];

export const postUrl = (slug: string) => `/blog/${slug}`;
export const categoryUrl = (slug: string) => `/blog/category/${slug}`;

export const getCategoriesWithCounts = () =>
  categories.map((c) => ({ ...c, count: sorted.filter((p) => p.category === c.slug).length }));

/** Filter by category and/or a search word (looks in title, excerpt and category). */
export function filterPosts({ category, q }: { category?: CategorySlug; q?: string }) {
  const term = q?.trim().toLowerCase();
  return sorted.filter((p) => {
    if (category && p.category !== category) return false;
    if (!term) return true;
    return `${p.title} ${p.excerpt} ${getCategoryName(p.category)}`.toLowerCase().includes(term);
  });
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    totalPages,
    total: items.length,
  };
}

export const parsePage = (value?: string) => {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export function getRelatedPosts(post: Post, count = 3) {
  const same = sorted.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = sorted.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, count);
}

export function readingMinutes(post: Post) {
  const text = post.body
    .map((b) => {
      switch (b.type) {
        case "list":
          return `${b.title ?? ""} ${b.items.join(" ")}`;
        case "facts":
          return b.items.map((i) => `${i.label} ${i.value}`).join(" ");
        case "table":
          return `${b.title ?? ""} ${b.headers.join(" ")} ${b.rows.flat().join(" ")}`;
        case "image":
          return b.caption ?? "";
        case "cta":
        case "toc":
          return "";
        default:
          return b.text;
      }
    })
    .concat((post.faqs ?? []).map((f) => `${f.q} ${f.a}`))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/** "2026-09-07" → "September 7, 2026" (no time-zone surprises). */
export function formatPostDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
