import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routeFacts } from "@/content/routes";
import { buildRoutePage, getRouteFacts, routeUrl } from "@/lib/routes";
import { FareCards, FareTable } from "@/components/routes/FareSection";
import { BookInfo, RouteStops, TripTypes } from "@/components/routes/RouteInfo";
import { Customise, OtherServices, Perks, WhyUs } from "@/components/routes/RouteExtras";
import { Destinations, RouteCta, RouteFaq } from "@/components/routes/RouteFaq";
import RouteHero from "@/components/routes/RouteHero";
import RouteStats from "@/components/routes/RouteStats";

type PageProps = { params: Promise<{ slug: string }> };

// Pre-builds one page per route in content/routes.ts.
export function generateStaticParams() {
  return routeFacts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const facts = getRouteFacts((await params).slug);
  if (!facts) return {};
  const page = buildRoutePage(facts);
  return {
    title: `${page.seoTitle} | GoCabxi`,
    description: page.seoDescription,
    alternates: { canonical: routeUrl(facts.slug) },
  };
}

export default async function RoutePage({ params }: PageProps) {
  const facts = getRouteFacts((await params).slug);
  if (!facts) notFound();

  const page = buildRoutePage(facts);

  // Structured data for Google: breadcrumb trail + the FAQ.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Routes", item: "/routes" },
          { "@type": "ListItem", position: 3, name: `${facts.from} to ${facts.to}`, item: routeUrl(facts.slug) },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <RouteHero page={page} />
      <RouteStats page={page} />
      <FareCards page={page} />
      <FareTable page={page} />
      <TripTypes page={page} />
      <RouteStops page={page} />
      <BookInfo page={page} />
      <Customise page={page} />
      <WhyUs page={page} />
      <Perks page={page} />
      <OtherServices page={page} />
      <RouteFaq page={page} />
      <Destinations page={page} />
      <RouteCta page={page} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
