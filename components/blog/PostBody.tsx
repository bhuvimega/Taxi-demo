import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { PostBlock } from "@/content/blog";
import { slugify } from "@/lib/blog";

/** Turns the `body` list of a post into styled article content. */
export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  // The contents list is built from every "h2" block.
  const headings = blocks.flatMap((b) => (b.type === "h2" ? [b.text] : []));

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="mt-10 scroll-mt-24 text-2xl font-extrabold tracking-tight">
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={i} className="mt-8 scroll-mt-24 text-lg font-bold">
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p key={i} className="mt-4 text-base leading-8">
                {block.text}
              </p>
            );

          case "list":
            return (
              <div key={i} className="mt-5">
                {block.title && <p className="font-semibold">{block.title}</p>}
                <ul className="mt-2 list-disc space-y-2 pl-6 text-base leading-8">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );

          case "tip":
            return (
              <aside key={i} className="mt-8 flex gap-3 rounded-xl bg-brand-light p-5 text-sm leading-6">
                <Lightbulb size={20} className="mt-0.5 shrink-0 text-brand-text" aria-hidden="true" />
                <p>
                  {block.title && <strong className="block text-brand-text">{block.title}</strong>}
                  {block.text}
                </p>
              </aside>
            );

          case "facts":
            return (
              <dl key={i} className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
                {block.items.map(({ label, value }) => (
                  <div key={label} className="bg-card p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
                    <dd className="mt-1 text-base font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            );

          case "table":
            return (
              <figure key={i} className="mt-6">
                {block.title && <figcaption className="mb-2 text-sm font-semibold">{block.title}</figcaption>}
                {/* Wide tables scroll sideways on a phone instead of breaking the page. */}
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="bg-brand-light text-brand-text">
                      <tr>
                        {block.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {block.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="px-4 py-3 align-top font-medium">
                                {cell}
                              </th>
                            ) : (
                              <td key={c} className="px-4 py-3 align-top text-muted-foreground">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );

          case "image":
            return (
              <figure key={i} className="mt-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground">{block.caption}</figcaption>
                )}
              </figure>
            );

          case "cta":
            return (
              <div key={i} className="mt-8 flex justify-center">
                <Link href={block.href} className="btn btn-accent btn-pill h-12 px-6">
                  {block.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            );

          case "toc":
            if (headings.length === 0) return null;
            return (
              <nav key={i} aria-label="Table of contents" className="mt-8 rounded-xl bg-muted p-5">
                <details open>
                  <summary className="cursor-pointer text-base font-bold focus-ring">Table of contents</summary>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
                    {headings.map((h) => (
                      <li key={h}>
                        <a href={`#${slugify(h)}`} className="text-brand-text hover:underline focus-ring">
                          {h}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              </nav>
            );
        }
      })}
    </div>
  );
}
