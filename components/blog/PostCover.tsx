import Image from "next/image";
import { CarFront } from "lucide-react";
import { getCategoryName } from "@/lib/blog";
import type { Post } from "@/content/blog";

export default function PostCover({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  if (post.cover) {
    return (
      <div className="relative aspect-[16/9] w-full bg-muted">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex aspect-[16/9] w-full flex-col justify-center bg-gradient-to-br from-brand-dark to-brand p-5 text-white"
      role="img"
      aria-label={
        post.route ? `${post.route.from} to ${post.route.to}` : post.title
      }
    >
      {post.route ? (
        <>
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">
            Route guide
          </p>
          <p className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
            {post.route.from} <span aria-hidden="true">→</span> {post.route.to}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <li className="rounded-full bg-white/20 px-3 py-1">
              {post.route.distance}
            </li>
            <li className="rounded-full bg-white/20 px-3 py-1">
              {post.route.duration}
            </li>
          </ul>
        </>
      ) : (
        <>
          <CarFront size={34} aria-hidden="true" />
          <p className="mt-3 text-xl font-extrabold">
            {getCategoryName(post.category)}
          </p>
        </>
      )}
    </div>
  );
}
