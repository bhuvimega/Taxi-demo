import { Check, ChevronDown, X } from "lucide-react";
import { terms } from "@/config/addons";
import { getInclusionLists } from "@/lib/inclusions";
import type { TripType } from "@/config/booking";
import type { Quote } from "@/lib/search";

export default function InclusionsCard({
  quote,
  tripType,
}: {
  quote: Quote;
  tripType: TripType;
}) {
  const { included, excluded } = getInclusionLists(quote, tripType);

  return (
    <section className="panel overflow-hidden" aria-labelledby="inc-heading">
      <div className="border-b px-5 py-4 sm:px-6">
        <h2 id="inc-heading" className="text-lg font-bold">
          Inclusions / Exclusions
        </h2>
      </div>

      <div className="grid gap-6 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-text">
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            Inclusions
          </p>
          <ul className="space-y-2.5 text-sm">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-brand-text"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
            <span
              className="size-2 rounded-full bg-destructive"
              aria-hidden="true"
            />
            Exclusions
          </p>
          <ul className="space-y-2.5 text-sm">
            {excluded.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <X
                  size={16}
                  className="mt-0.5 shrink-0 text-destructive"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="group border-t">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
          Read Terms and Conditions
          <ChevronDown
            size={16}
            className="transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <ul className="list-disc space-y-1.5 px-9 pb-5 text-xs leading-5 text-muted-foreground sm:px-10">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
