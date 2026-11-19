import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";
import { FREE_CANCELLATION_HOURS } from "@/config/addons";
import { getSiblingRoutes, routeUrl, type RoutePage } from "@/lib/routes";

/** FAQ: heading left, bordered accordion right (first answer open). */
export function RouteFaq({ page }: { page: RoutePage }) {
  const { facts: r } = page;
  return (
    <section className="section">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.9fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            FAQs for {r.from} to {r.to} cabs
          </h2>
          <p className="section-lead">Quick answers about distance, fare and booking.</p>
        </div>

        <div className="space-y-3">
          {page.faqs.map(({ q, a }, i) => (
            <details key={q} open={i === 0} className="group rounded-xl border bg-card px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-ring [&::-webkit-details-marker]:hidden">
                {q}
                <Plus size={18} className="shrink-0 text-brand-text group-open:hidden" aria-hidden="true" />
                <X size={18} className="hidden shrink-0 text-brand-text group-open:block" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pills linking to other route pages from the same city. */
export function Destinations({ page }: { page: RoutePage }) {
  const siblings = getSiblingRoutes(page.facts);
  const pill = "inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:bg-brand-light focus-ring";

  return (
    <section className="pb-12">
      <div className="site-container">
        <h2 className="text-2xl font-extrabold tracking-tight">Popular destinations from {page.facts.from}</h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link href={routeUrl(s.slug)} className={pill}>
                {s.from} to {s.to} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/routes" className={pill}>
              All routes <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Dark closing call to action. */
export function RouteCta({ page }: { page: RoutePage }) {
  const { facts: r } = page;
  return (
    <section className="pb-16 sm:pb-20">
      <div className="site-container">
        <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl bg-surface-dark p-8 text-surface-dark-foreground sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <span aria-hidden="true" className="absolute -bottom-24 -right-16 -z-10 size-72 rounded-full bg-brand/25" />
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Ready for the {r.to} drive?</h2>
            <p className="mt-2 text-sm text-surface-dark-foreground/75 sm:text-base">
              Lock a guaranteed, all-inclusive fare in seconds. Free cancellation up to {FREE_CANCELLATION_HOURS} hours before pickup.
            </p>
          </div>
          <Link href="#booking" className="btn btn-accent btn-pill h-12 shrink-0 px-6">
            Book {r.from} to {r.to} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
