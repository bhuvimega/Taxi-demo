import CategoryNav from "./CategoryNav";
import BlogSidebar from "./BlogSidebar";
import type { CategorySlug } from "@/content/blog";

type BlogShellProps = {
  title: string;
  description: string;
  activeCategory?: CategorySlug;
  breadcrumb?: React.ReactNode;
  children: React.ReactNode;
};

export default function BlogShell({
  title,
  description,
  activeCategory,
  breadcrumb,
  children,
}: BlogShellProps) {
  return (
    <div className="bg-muted">
      <header className="border-b py-10 sm:py-14">
        <div className="site-container">
          {breadcrumb}
          <p className="eyebrow mt-4">Travel blog</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[640px] text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <CategoryNav active={activeCategory} />
        </div>
      </header>

      <div className="site-container grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">{children}</div>
        <BlogSidebar />
      </div>
    </div>
  );
}
