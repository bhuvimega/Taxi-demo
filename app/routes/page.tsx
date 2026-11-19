import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routeFacts } from "@/content/routes";
import { buildRoutePage, routeUrl } from "@/lib/routes";
import { formatINR } from "@/lib/search";

export const metadata: Metadata = {
  title: "Popular Cab Routes | GoCabxi",
  description: "One-way cab fares, distances and travel times for popular intercity routes across India.",
};

export default function RoutesIndexPage() {
  return (
    <div className="bg-muted">
      <section className="py-12 sm:py-16">
        <div className="site-container">
          <p className="eyebrow">Routes</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Popular cab routes</h1>
          <p className="mt-3 max-w-[620px] text-base text-muted-foreground">
            Pick a route to see the distance, travel time, fares by car type and places to stop on the way.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routeFacts.map((r) => {
              const page = buildRoutePage(r);
              return (
                <li key={r.slug}>
                  <Link href={routeUrl(r.slug)} className="panel group block h-full p-6 transition-shadow hover:shadow-md focus-ring">
                    <h2 className="text-lg font-extrabold group-hover:text-brand-text">
                      {r.from} to {r.to}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {r.distanceKm} km · {r.duration}
                    </p>
                    <p className="mt-4 text-sm">
                      From <strong className="text-lg font-extrabold">{formatINR(page.startingFrom)}</strong>
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
                      View fares <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
