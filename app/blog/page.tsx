import type { Metadata } from "next";
import { Suspense } from "react";
import BlogShell from "@/components/blog/BlogShell";
import PostListing, { ListingSkeleton } from "@/components/blog/PostListing";

export const metadata: Metadata = {
  title: "Travel Blog | GoCabxi",
  description:
    "Road-trip guides, route distances, travel times and tips for travelling across India by cab.",
};

type PageProps = {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
};

export default function BlogPage({ searchParams }: PageProps) {
  return (
    <BlogShell
      title="Road-trip guides and travel tips"
      description="Distances, travel times and the best routes between popular cities — plus ideas for your next drive."
    >
      {/* ?page= and ?q= are read inside Suspense (required by Next.js 16). */}
      <Suspense fallback={<ListingSkeleton />}>
        <PostListing basePath="/blog" searchParams={searchParams} />
      </Suspense>
    </BlogShell>
  );
}
