import { Check, X } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { included, notIncluded, tripTypes } from "@/content/route-defaults";
import type { RoutePage } from "@/lib/routes";
import TripLink from "./TripLink";

/** "One-way, round-trip or group travel" — three cards. */
export function TripTypes({ page }: { page: RoutePage }) {
  return (
    <section className="section pt-0">
      <div className="site-container">
        <SectionHeading eyebrow="Choose your trip" title="One-way, round-trip or group travel" description={page.tripIntro} />

        <ul className="grid gap-5 md:grid-cols-3">
          {tripTypes.map(({ title, text, cta, trip, icon: Icon }) => (
            <li key={title} className="panel flex flex-col p-6">
              <span className="icon-tile icon-tile-brand">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-body">{text}</p>
              <TripLink trip={trip} className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-text hover:underline focus-ring">
                {cta} <span aria-hidden="true">→</span>
              </TripLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Popular places on the way" — heading left, list right. */
export function RouteStops({ page }: { page: RoutePage }) {
  return (
    <section className="section bg-muted">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">On the way</p>
            <h2 className="section-title">{page.stopsTitle}</h2>
            <p className="section-lead">{page.stopsIntro}</p>
          </div>

          <ul className="panel divide-y px-6">
            {page.facts.stops.map((s) => (
              <li key={s.place} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[1.2fr_0.6fr_2fr]">
                <span className="font-bold">{s.place}</span>
                <span className="text-xs font-semibold text-brand-text sm:order-none">{s.distance}</span>
                <span className="col-span-2 text-sm text-muted-foreground sm:col-span-1">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-sm leading-6 text-body">{page.sightsLine}</p>
      </div>
    </section>
  );
}

/** "Book a … cab with GoCabxi" text + the included / not included panels. */
export function BookInfo({ page }: { page: RoutePage }) {
  return (
    <section className="section">
      <div className="site-container grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title">{page.bookTitle}</h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-body">
            {page.bookParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <section className="panel p-6" aria-labelledby="inc-h">
            <h3 id="inc-h" className="text-lg font-bold">Included in your fare</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {included.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={16} className="shrink-0 text-brand-text" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-6" aria-labelledby="exc-h">
            <h3 id="exc-h" className="text-lg font-bold">Not included</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              {notIncluded.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <X size={16} className="shrink-0 text-muted-foreground" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
