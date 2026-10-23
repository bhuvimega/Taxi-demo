import {
  formatDateLong,
  formatTime,
  type Quote,
  type SearchQuery,
} from "@/lib/search";

export default function TripSummary({
  query,
  quote,
}: {
  query: SearchQuery;
  quote: Quote;
}) {
  const rows = [
    {
      label: "Car type",
      value: `${quote.car.name} (or similar) · ${quote.car.seats} seater AC`,
    },
    {
      label: "Pickup",
      value: `${formatDateLong(query.pickupDate)}, ${formatTime(query.pickupTime)}`,
    },
    ...(query.returnDate
      ? [{ label: "Return", value: formatDateLong(query.returnDate) }]
      : []),
    { label: "Kms included", value: `${quote.includedKm} kms` },
  ];

  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="trip-heading">
      <h1
        id="trip-heading"
        className="text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        {query.routeTitle}{" "}
        <span className="text-base font-normal text-muted-foreground">
          ({query.tripLabel})
        </span>
      </h1>

      <dl className="mt-3 space-y-1.5 text-sm">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-wrap gap-x-2">
            <dt className="text-muted-foreground">{label}:</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
