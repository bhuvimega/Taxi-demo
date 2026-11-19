"use client";

import Link from "next/link";
import { scrollToBooking, useTrip } from "@/components/providers/TripProvider";
import type { TripType } from "@/config/booking";

/** A link that selects a tab in the page's booking form, then scrolls up to it. */
export default function TripLink({
  trip,
  className,
  children,
}: {
  trip: TripType;
  className?: string;
  children: React.ReactNode;
}) {
  const { selectTrip } = useTrip();

  return (
    <Link
      href="#booking"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        selectTrip(trip);
        scrollToBooking();
      }}
    >
      {children}
    </Link>
  );
}
