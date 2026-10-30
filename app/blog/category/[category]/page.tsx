import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogShell from "@/components/blog/BlogShell";
import PostListing, { ListingSkeleton } from "@/components/blog/PostListing";
import { categories, type CategorySlug } from "@/content/blog";
import { categoryUrl, getCategory } from "@/lib/blog";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
};

// Pre-builds one page per category.
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: Pick<PageProps, "params">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.name} | GoCabxi Travel Blog`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  return (
    <BlogShell
      title={category.name}
      description={category.description}
      activeCategory={category.slug as CategorySlug}
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category.name },
          ]}
        />
      }
    >
      <Suspense fallback={<ListingSkeleton />}>
        <PostListing
          category={category.slug}
          basePath={categoryUrl(category.slug)}
          searchParams={searchParams}
        />
      </Suspense>
    </BlogShell>
  );
}
