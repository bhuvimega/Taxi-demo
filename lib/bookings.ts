export type StoredBooking = {
  reference: string; // GCB-2026-12345
  createdAt: number; // ms timestamp
  routeTitle: string;
  tripLabel: string;
  carName: string;
  pickupAt: string; // "2026-12-22T07:00" (local time)
  pickupLocation: string;
  dropLocation: string;
  total: number;
  paidNow: number;
};

const KEY = "gocabxi:bookings";
const EVENT = "gocabxi:bookings-changed";
const MAX_SAVED = 20;

/** A sample reference anyone can try on the Track page. */
export const DEMO_REFERENCE = "GCB-2026-12345";
export const REFERENCE_PATTERN = /^GCB-\d{4}-\d{5}$/;

export const normalizeReference = (value: string) => value.replace(/\s+/g, "").toUpperCase();

/** "GCB-2026-04817". Browser-only (call it from a click handler). */
export function newReference() {
  const year = new Date().getFullYear();
  const digits = String(crypto.getRandomValues(new Uint32Array(1))[0] % 100000).padStart(5, "0");
  return `GCB-${year}-${digits}`;
}

/** Throws away anything in storage that doesn't look like a booking. */
function isBooking(x: unknown): x is StoredBooking {
  if (typeof x !== "object" || x === null) return false;
  const b = x as Record<string, unknown>;
  return (
    typeof b.reference === "string" &&
    typeof b.createdAt === "number" &&
    typeof b.routeTitle === "string" &&
    typeof b.tripLabel === "string" &&
    typeof b.carName === "string" &&
    typeof b.pickupAt === "string" &&
    typeof b.pickupLocation === "string" &&
    typeof b.dropLocation === "string" &&
    typeof b.total === "number" &&
    typeof b.paidNow === "number"
  );
}

export function parseBookings(raw: string | null): StoredBooking[] {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(data) ? data.filter(isBooking) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking) {
  try {
    const rest = parseBookings(localStorage.getItem(KEY)).filter((b) => b.reference !== booking.reference);
    localStorage.setItem(KEY, JSON.stringify([booking, ...rest].slice(0, MAX_SAVED)));
    window.dispatchEvent(new Event(EVENT)); // tells open pages to refresh
  } catch {
    // Storage can be blocked (private mode). The booking still works, it just can't be tracked later.
  }
}

/** Used by useSyncExternalStore in lib/use-bookings.ts */
export function subscribeBookings(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function getBookingsSnapshot(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

/** ms timestamp → "2026-12-22T07:00" in the visitor's time zone. */
export function toLocalISO(ms: number) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** The sample booking: always picks up 90 minutes from "now". */
export function demoBooking(now: number): StoredBooking {
  return {
    reference: DEMO_REFERENCE,
    createdAt: now - 60 * 60_000,
    routeTitle: "Chennai → Coimbatore",
    tripLabel: "One way",
    carName: "Dzire, Etios",
    pickupAt: toLocalISO(now + 90 * 60_000),
    pickupLocation: "Chennai",
    dropLocation: "Coimbatore",
    total: 7742,
    paidNow: 1936,
  };
}

export function findBooking(bookings: StoredBooking[], reference: string, now: number) {
  if (reference === DEMO_REFERENCE) return demoBooking(now);
  return bookings.find((b) => b.reference === reference);
}