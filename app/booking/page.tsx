import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import CheckoutForm from "@/components/booking/CheckoutForm";
import InclusionsCard from "@/components/booking/InclusionsCard";
import TripSummary from "@/components/booking/TripSummary";
import { getQuotes, parseSearch, type RawParams } from "@/lib/search";

export const metadata: Metadata = {
  title: "Review Your Booking | GoCabxi",
  robots: { index: false },
};

type PageProps = { searchParams: Promise<RawParams> };

export default function BookingPage({ searchParams }: PageProps) {
  // searchParams is request-time data, so it is read inside <Suspense>.
  return (
    <div className="bg-muted">
      <div className="site-container py-6">
        <Suspense fallback={<BookingSkeleton />}>
          <Review searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function Review({ searchParams }: PageProps) {
  const raw = await searchParams;
  const query = parseSearch(raw);
  const carId = Array.isArray(raw.car) ? raw.car[0] : raw.car;

  // The fare is RE-CALCULATED here from the trip + car. The "fare" value in the
  // URL is ignored on purpose, so nobody can edit the link to get a cheaper price.
  const quote = query
    ? getQuotes(query).find((q) => q.car.id === carId)
    : undefined;

  if (!query || !quote) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-extrabold">
          We couldn’t find that booking
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please search again and pick a car.
        </p>
        <Link href="/#booking" className="btn btn-solid btn-pill mt-6 h-11">
          Back to booking
        </Link>
      </div>
    );
  }

  // Link back to the results: same search, without the chosen car / fare.
  const back = new URLSearchParams(
    Object.entries(raw).flatMap(([k, v]) =>
      typeof v === "string" && k !== "car" && k !== "fare" ? [[k, v]] : [],
    ),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Select Car", href: `/search?${back.toString()}` },
          { label: "Booking" },
        ]}
      />

      <div className="mt-4">
        <CheckoutForm query={query} quote={quote}>
          <TripSummary query={query} quote={quote} />
          <InclusionsCard quote={quote} tripType={query.type} />
        </CheckoutForm>
      </div>
    </>
  );
}

function BookingSkeleton() {
  return (
    <div
      className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px]"
      aria-busy="true"
    >
      <div className="space-y-5">
        <div className="h-11 animate-pulse rounded-lg bg-card" />
        <div className="h-32 animate-pulse rounded-2xl bg-card" />
        <div className="h-72 animate-pulse rounded-2xl bg-card" />
      </div>
      <div className="h-96 animate-pulse rounded-2xl bg-card" />
    </div>
  );
}
