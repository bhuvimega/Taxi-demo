/**
 * The blog's DATA MODEL: categories, authors and the shape of a post.
 * The posts themselves live one-per-file in content/posts/ and are
 * registered in content/posts/index.ts.
 */
import { allPosts } from "./posts";

export const categories = [
  { slug: "travel-guide", name: "Travel Guide", description: "Route guides, distances and travel times between popular cities." },
  { slug: "hill-stations", name: "Hill Stations", description: "Road trips to cool, green hill destinations." },
  { slug: "offbeat", name: "Offbeat", description: "Detours and lesser-known stops worth the drive." },
  { slug: "adventure", name: "Adventure", description: "Long drives, monsoon trips and road-trip planning." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

/** Who wrote a post. Add people here, then use the key in a post's `author`. */
export const authors = {
  team: {
    name: "GoCabxi Travel Team",
    role: "Travel desk",
    bio: "Our travel desk writes route guides and road-trip tips drawn from thousands of intercity journeys, so you can plan with confidence.",
  },
} as const;

export type AuthorKey = keyof typeof authors;

/** The building blocks an article body is made of. */
export type PostBlock =
  | { type: "h2"; text: string } // main section — appears in the table of contents
  | { type: "h3"; text: string } // sub-heading inside a section
  | { type: "p"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "tip"; title?: string; text: string }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "table"; title?: string; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "cta"; label: string; href: string } // a "Book a cab" button
  | { type: "toc" }; // table of contents, built automatically from the h2 blocks

export type Post = {
  slug: string; // becomes the address: /blog/<slug>
  title: string;
  excerpt: string; // shown on cards and in search results
  date: string; // YYYY-MM-DD (published)
  updated?: string; // YYYY-MM-DD (optional "Updated on")
  category: CategorySlug;
  author?: AuthorKey; // defaults to "team"
  /** A photo. Leave out to get an automatic green route banner instead. */
  cover?: { src: string; alt: string };
  /** Used for the automatic route banner (when there is no cover photo). */
  route?: { from: string; to: string; distance: string; duration: string };
  body: PostBlock[];
  /** Optional FAQ shown under the article (also helps Google). */
  faqs?: { q: string; a: string }[];
};

export const posts: Post[] = allPosts;
