import Link from "next/link";
import BookingForm from "@/components/home/BookingForm";
import type { RoutePage } from "@/lib/routes";

/** Dark intro: breadcrumb, headline, route line and the booking form (pre-filled). */
export default function RouteHero({ page }: { page: RoutePage }) {
  const { facts: r } = page;

  return (
    <section className="relative overflow-hidden bg-surface-dark pb-28 pt-8 text-surface-dark-foreground sm:pt-10">
      {/* soft glows */}
      <span aria-hidden="true" className="absolute -right-24 -top-24 size-96 rounded-full bg-highlight/10 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-32 -left-24 size-96 rounded-full bg-brand/15 blur-3xl" />

      <div className="site-container relative">
        <nav aria-label="Breadcrumb" className="flex justify-center">
          <ol className="flex items-center gap-2 text-xs text-surface-dark-foreground/70">
            <li><Link href="/" className="hover:text-white focus-ring rounded-sm">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/routes" className="hover:text-white focus-ring rounded-sm">Routes</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">{r.from} to {r.to}</li>
          </ol>
        </nav>

        <h1 className="mx-auto mt-6 max-w-[820px] text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {r.from} to {r.to} Cab,
          <br />
          <span className="text-highlight">booked in seconds.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[620px] text-center text-base leading-7 text-surface-dark-foreground/80">
          {page.heroSubtitle}
        </p>

        {/* Bengaluru ●- - - [345 km · 6–7 hrs] - - -● Chennai */}
        <div className="mx-auto mt-8 flex max-w-[640px] items-center gap-3 text-sm font-semibold text-white" aria-label={`${r.fromCity} to ${r.toCity}, ${r.distanceKm} km`}>
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-full bg-brand ring-4 ring-brand/30" aria-hidden="true" />
            {r.fromCity}
          </span>
          <span className="relative flex-1" aria-hidden="true">
            <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/40" />
            <span className="relative mx-auto block w-fit rounded-full bg-highlight px-3 py-1 text-xs font-bold text-on-brand">
              {r.distanceKm} km · {r.duration}
            </span>
          </span>
          <span className="flex items-center gap-2">
            {r.toCity}
            <span className="size-4 rounded-full bg-white ring-4 ring-white/30" aria-hidden="true" />
          </span>
        </div>

        <div className="mx-auto max-w-[1040px] text-foreground">
          <BookingForm defaults={{ from: r.fromCity, to: r.toCity }} />
        </div>
      </div>
    </section>
  );
}
