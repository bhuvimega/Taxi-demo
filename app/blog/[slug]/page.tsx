import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3 } from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import AuthorBox from "@/components/blog/AuthorBox";
import BlogSidebar from "@/components/blog/BlogSidebar";
import PostBody from "@/components/blog/PostBody";
import PostCard from "@/components/blog/PostCard";
import PostCover from "@/components/blog/PostCover";
import PostFaq from "@/components/blog/PostFaq";
import {
  categoryUrl,
  formatPostDate,
  getAllPosts,
  getAuthor,
  getCategoryName,
  getPost,
  getRelatedPosts,
  postUrl,
  readingMinutes,
} from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

// Pre-builds one page per post.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | GoCabxi`,
    description: post.excerpt,
    alternates: { canonical: postUrl(post.slug) },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const categoryName = getCategoryName(post.category);
  const author = getAuthor(post);

  // Structured data so Google can show the article (and its FAQ) properly in results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Organization", name: author.name },
        publisher: { "@type": "Organization", name: "GoCabxi" },
      },
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="bg-muted">
      <div className="site-container py-8 sm:py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: categoryName, href: categoryUrl(post.category) },
            { label: "Article" },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
              <PostCover post={post} priority />

              <div className="p-6 sm:p-10">
                <Link
                  href={categoryUrl(post.category)}
                  className="chip chip-soft focus-ring"
                >
                  {categoryName}
                </Link>

                <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {post.title}
                </h1>

                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>
                    By <strong className="text-foreground">{author.name}</strong>
                  </span>
                  <span>
                    Posted on <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </span>
                  {post.updated && (
                    <span>
                      Updated on <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} aria-hidden="true" />
                    {readingMinutes(post)} min read
                  </span>
                </p>

                <div className="mt-6 border-t pt-2">
                  <PostBody blocks={post.body} />
                </div>

                {post.faqs && post.faqs.length > 0 && <PostFaq faqs={post.faqs} />}

                <AuthorBox author={author} />

                {/* Call to action */}
                <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-surface-dark p-6 text-surface-dark-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Planning this trip?</h2>
                    <p className="mt-1 text-sm text-surface-dark-foreground/70">
                      Get a guaranteed all-inclusive fare in seconds.
                    </p>
                  </div>
                  <Link href="/#booking" className="btn btn-accent btn-pill h-12 w-fit px-6">
                    Book a cab
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="mt-12">
                <h2 id="related-heading" className="text-2xl font-extrabold tracking-tight">
                  More travel guides
                </h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {related.slice(0, 2).map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <BlogSidebar />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
