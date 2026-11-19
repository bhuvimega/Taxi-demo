import { Bus, Car, CarFront } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { formatINR } from "@/lib/search";
import type { RouteCab, RoutePage } from "@/lib/routes";

const icons = { sedan: Car, suv: CarFront, bus: Bus } as const;

/** Green section: one card per cab type. */
export function FareCards({ page }: { page: RoutePage }) {
  const { facts: r } = page;

  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading eyebrow="Our fares" title={`${r.from} to ${r.to} taxi fare by car type`} description={page.fareIntro} />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {page.cabs.map((cab: RouteCab) => {
            const Icon = icons[cab.icon];
            return (
              <li key={cab.id} className="flex flex-col overflow-hidden rounded-2xl bg-card text-card-foreground">
                <div className="flex h-28 items-center justify-center bg-brand-light text-on-brand">
                  <Icon size={64} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold">{cab.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cab.models}</p>
                  <p className="mt-2 text-xs font-medium">{cab.seatsText}</p>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-3xl font-extrabold tracking-tight">{formatINR(cab.oneWay)}</p>
                    <p className="text-xs text-muted-foreground">One-way, all-inclusive</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-on-brand/80">
          Fares are estimates for a standard one-way trip. The exact fare is confirmed when you book.
        </p>
      </div>
    </section>
  );
}

/** White section: the same numbers as a comparison table. */
export function FareTable({ page }: { page: RoutePage }) {
  const { facts: r } = page;

  return (
    <section className="section">
      <div className="site-container">
        <SectionHeading eyebrow="Compare cabs" title={`${r.from} to ${r.to} taxi fare table`} description={page.tableIntro} />

        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">
              Taxi fares from {r.from} to {r.to} by cab type
            </caption>
            <thead className="bg-surface-dark text-surface-dark-foreground">
              <tr>
                {["Cab type", "Popular models", "Capacity", "One-way from", "Round-trip per km", "Airport pickup from"].map((h) => (
                  <th key={h} scope="col" className="px-5 py-4 text-xs font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page.cabs.map((cab, i) => (
                <tr key={cab.id} className={i % 2 === 1 ? "bg-muted" : "bg-card"}>
                  <th scope="row" className="px-5 py-4 font-bold">{cab.label}</th>
                  <td className="px-5 py-4 text-muted-foreground">{cab.models}</td>
                  <td className="px-5 py-4 text-muted-foreground">{cab.capacity}</td>
                  <td className="px-5 py-4 font-bold">{formatINR(cab.oneWay)}</td>
                  <td className="px-5 py-4 text-muted-foreground">{formatINR(cab.roundTripPerKm)}/km</td>
                  <td className="px-5 py-4 text-muted-foreground">{formatINR(cab.airportPickup)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
