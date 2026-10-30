import Link from "next/link";
import type { Post } from "@/content/blog";
import { formatPostDate, getCategoryName, postUrl } from "@/lib/blog";
import PostCover from "./PostCover";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md">
      <PostCover post={post} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-semibold text-brand-text">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="text-muted-foreground">
            {" "}
            · {getCategoryName(post.category)}
          </span>
        </p>

        <h2 className="mt-2 text-lg font-extrabold leading-snug sm:text-xl">
          <Link
            href={postUrl(post.slug)}
            className="rounded-sm outline-none after:absolute after:inset-0 group-hover:text-brand-text focus-visible:underline"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
