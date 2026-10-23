import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/search";

type BookingSuccessProps = {
  reference: string;
  route: string;
  carName: string;
  paidNow: number;
  total: number;
};

/** Shown after "Proceed". Demo only — no payment is taken. */
export default function BookingSuccess({
  reference,
  route,
  carName,
  paidNow,
  total,
}: BookingSuccessProps) {
  return (
    <section
      className="panel mx-auto max-w-xl p-8 text-center"
      aria-live="polite"
    >
      <CircleCheck
        size={48}
        className="mx-auto text-brand-text"
        aria-hidden="true"
      />
      <h1 className="mt-4 text-2xl font-extrabold">Booking request received</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Booking reference{" "}
        <strong className="text-foreground">{reference}</strong>
      </p>

      <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-muted p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Trip</dt>
          <dd className="font-semibold">{route}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Car</dt>
          <dd className="font-semibold">{carName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Paid now</dt>
          <dd className="font-semibold">{formatINR(paidNow)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Trip total</dt>
          <dd className="font-semibold">{formatINR(total)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        Demo: no payment was taken and no booking was created.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={siteConfig.routes.trackRide}
          className="btn btn-outline btn-pill h-11"
        >
          Track ride
        </Link>
        <Link href="/" className="btn btn-solid btn-pill h-11">
          Back to home
        </Link>
      </div>
    </section>
  );
}
