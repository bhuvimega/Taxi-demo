import { Clock3, IndianRupee, MapPin } from "lucide-react";
import { trustFeatures } from "@/components/home/trustFeaturesData";
import { formatINR } from "@/lib/search";
import type { RoutePage } from "@/lib/routes";

export default function RouteStats({ page }: { page: RoutePage }) {
  const { facts: r } = page;

  const stats = [
    { label: "Distance", value: `${r.distanceKm} km`, icon: MapPin },
    { label: "Travel time", value: r.duration, icon: Clock3 },
  ];

  return (
    <section className="relative z-10 -mt-16">
      <div className="site-container">
        <dl className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-lg">
              <span className="icon-tile icon-tile-brand size-14 rounded-xl">
                <Icon size={24} aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight">{value}</dd>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 rounded-2xl bg-highlight p-5 text-on-brand shadow-lg">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-on-brand text-highlight">
              <IndianRupee size={24} aria-hidden="true" />
            </span>
            <div>
              <dt className="text-sm">Starting from</dt>
              <dd className="text-3xl font-extrabold tracking-tight">{formatINR(page.startingFrom)}</dd>
            </div>
          </div>
        </dl>

        <ul className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustFeatures.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="icon-tile icon-tile-soft size-10">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
