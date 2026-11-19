"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, MapPin, Search, UserRound } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  DEMO_REFERENCE,
  REFERENCE_PATTERN,
  findBooking,
  normalizeReference,
  type StoredBooking,
} from "@/lib/bookings";
import { getDemoDriver, getTrackingState, trackingSteps } from "@/lib/tracking";
import { useNow, useStoredBookings } from "@/lib/use-bookings";
import { formatINR } from "@/lib/search";

export default function TrackForm() {
  const uid = useId();
  const initial = useSearchParams().get("ref") ?? ""; // /track-ride?ref=GCB-2026-12345

  const [value, setValue] = useState(initial);
  const [queried, setQueried] = useState(normalizeReference(initial)); // the reference being shown
  const [error, setError] = useState("");

  const bookings = useStoredBookings();
  const now = useNow(); // 0 until the page is running in the browser

  const booking =
    queried && now > 0 ? findBooking(bookings, queried, now) : undefined;
  const notFound = queried !== "" && now > 0 && !booking;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = normalizeReference(value);

    if (!ref) return setError("Enter your booking reference.");
    if (!REFERENCE_PATTERN.test(ref))
      return setError(
        `That doesn't look like a booking reference. It looks like ${DEMO_REFERENCE}.`,
      );

    setError("");
    setQueried(ref);
  };

  return (
    <div>
      <section className="panel p-6 text-center sm:p-8">
        <div className="icon-tile icon-tile-soft mx-auto size-14 rounded-2xl">
          <MapPin size={26} aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
          Track your booking
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your GoCabxi booking reference to see live status.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-6 flex gap-3 text-left"
        >
          <label htmlFor={`${uid}-ref`} className="sr-only">
            Booking reference
          </label>
          <input
            id={`${uid}-ref`}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            placeholder={`e.g. ${DEMO_REFERENCE}`}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${uid}-err` : undefined}
            className="h-12 min-w-0 flex-1 rounded-xl border border-input bg-card px-4 font-mono text-sm uppercase outline-none placeholder:normal-case placeholder:text-subtle focus:border-brand focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
          />
          <button
            type="submit"
            aria-label="Track booking"
            className="btn btn-solid size-12 shrink-0 rounded-xl"
          >
            <Search size={18} aria-hidden="true" />
          </button>
        </form>

        {error && (
          <p id={`${uid}-err`} role="alert" className="field-error text-left">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-center gap-8 text-sm font-semibold">
          <Link
            href={siteConfig.routes.booking}
            className="link-body inline-flex items-center gap-2"
          >
            Book a new cab
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href={siteConfig.routes.myTrips} className="link-body">
            My Trips
          </Link>
        </div>
      </section>

      {notFound && (
        <p
          role="status"
          className="panel mt-5 p-5 text-sm text-muted-foreground"
        >
          We couldn’t find{" "}
          <strong className="font-mono text-foreground">{queried}</strong> on
          this device. Bookings made in this demo are saved in the browser you
          booked from. You can also try the sample reference{" "}
          <button
            type="button"
            onClick={() => {
              setValue(DEMO_REFERENCE);
              setQueried(DEMO_REFERENCE);
            }}
            className="font-mono font-semibold text-brand-text hover:underline focus-ring"
          >
            {DEMO_REFERENCE}
          </button>
          .
        </p>
      )}

      {booking && <TrackResult booking={booking} now={now} />}
    </div>
  );
}

function TrackResult({
  booking,
  now,
}: {
  booking: StoredBooking;
  now: number;
}) {
  const { current, headline } = getTrackingState(
    new Date(booking.pickupAt).getTime(),
    now,
  );
  const showDriver = current >= 1 && current <= 3;
  const driver = getDemoDriver(booking.reference);

  const pickup = new Date(booking.pickupAt);
  const pickupText = pickup.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="mt-5 space-y-5" aria-live="polite">
      <section className="panel p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
          {headline}
        </p>
        <h2 className="mt-2 text-xl font-extrabold tracking-tight">
          {booking.routeTitle}{" "}
          <span className="text-base font-normal text-muted-foreground">
            ({booking.tripLabel})
          </span>
        </h2>

        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Detail label="Reference" value={booking.reference} mono />
          <Detail label="Car" value={`${booking.carName} (or similar)`} />
          <Detail label="Pickup" value={pickupText} />
          <Detail label="Pickup location" value={booking.pickupLocation} />
          {booking.dropLocation && (
            <Detail label="Drop location" value={booking.dropLocation} />
          )}
          <Detail label="Trip total" value={formatINR(booking.total)} />
        </dl>
      </section>

      <section className="panel p-6" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="text-lg font-bold">
          Trip progress
        </h2>

        <ol className="mt-5">
          {trackingSteps.map((step, i) => {
            const done = i < current || current === trackingSteps.length - 1;
            const active = i === current && !done;

            return (
              <li
                key={step.id}
                className="relative flex gap-4 pb-6 last:pb-0"
                aria-current={active ? "step" : undefined}
              >
                {i < trackingSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${i < current ? "bg-brand-dark" : "bg-border"}`}
                  />
                )}

                <span
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-brand-dark text-white"
                      : active
                        ? "bg-brand text-on-brand ring-4 ring-brand/30"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <Check size={16} aria-hidden="true" /> : i + 1}
                </span>

                <div className={done || active ? "" : "text-muted-foreground"}>
                  <p className="font-semibold">
                    {step.title}
                    <span className="sr-only">
                      {done
                        ? " (done)"
                        : active
                          ? " (current step)"
                          : " (upcoming)"}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {showDriver && (
        <section className="panel p-6" aria-labelledby="driver-heading">
          <h2 id="driver-heading" className="text-lg font-bold">
            Your driver
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="avatar size-12" aria-hidden="true">
              <UserRound size={22} />
            </span>
            <div className="text-sm">
              <p className="font-semibold">{driver.name}</p>
              <p className="text-muted-foreground">
                {booking.carName} ·{" "}
                <span className="font-mono">{driver.plate}</span> ·{" "}
                {driver.rating} ★
              </p>
              <p className="mt-1 text-muted-foreground">
                Start-trip code:{" "}
                <strong className="font-mono text-foreground">
                  {driver.otp}
                </strong>
              </p>
            </div>
          </div>
        </section>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Demo: the status is simulated from your pickup time and the driver
        details are sample data. Bookings are stored only in this browser.
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={`font-semibold ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}
