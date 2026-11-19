"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getBookingsSnapshot, parseBookings, subscribeBookings } from "@/lib/bookings";

/** The bookings saved in this browser (an empty list on the server). */
export function useStoredBookings() {
  const raw = useSyncExternalStore(subscribeBookings, getBookingsSnapshot, () => null);
  return useMemo(() => parseBookings(raw), [raw]);
}

const TICK_MS = 30_000;
const subscribeClock = (onTick: () => void) => {
  const id = setInterval(onTick, TICK_MS);
  return () => clearInterval(id);
};

/** The current time, refreshed every 30 seconds. Returns 0 on the server. */
export function useNow() {
  return useSyncExternalStore(
    subscribeClock,
    () => Math.floor(Date.now() / TICK_MS) * TICK_MS,
    () => 0,
  );
}