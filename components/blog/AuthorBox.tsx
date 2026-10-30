import type { authors } from "@/content/blog";

type Author = (typeof authors)[keyof typeof authors];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** "About the author" box at the end of an article. */
export default function AuthorBox({ author }: { author: Author }) {
  return (
    <section aria-label="About the author" className="mt-10 flex gap-4 rounded-xl bg-muted p-5">
      <span className="avatar size-12 text-base" aria-hidden="true">
        {initials(author.name)}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">About the author</p>
        <p className="mt-1 font-bold">{author.name}</p>
        <p className="text-xs text-muted-foreground">{author.role}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{author.bio}</p>
      </div>
    </section>
  );
}
