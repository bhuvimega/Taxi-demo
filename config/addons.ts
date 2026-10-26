/** Demo pricing rules + extras for the booking page. */

export const GST_RATE = 0.05;
export const PART_PAY_PERCENT = 25;
export const FREE_CANCELLATION_HOURS = 1;

export type Addon = {
  id: string;
  label: string;
  price: number;
  /** "flat" = one-off amount, "perKm" = price × kilometres included. */
  unit: "flat" | "perKm";
  popular?: boolean;
};

export const addons: Addon[] = [
  { id: "luggage-carrier", label: "Cab with Luggage Carrier", price: 199, unit: "flat", popular: true },
  { id: "new-car", label: "New Car Promise - Model that is 2023 or newer", price: 249, unit: "flat" },
  { id: "diesel", label: "Diesel Car Guarantee", price: 1.8, unit: "perKm" },
  { id: "language", label: "Chauffeurs who know your language", price: 199, unit: "flat" },
];

type Coupon = { label: string; percent?: number; maxOff?: number; flat?: number };


export const coupons: Record<string, Coupon> = {
  WELCOME10: { label: "10% off (max ₹300)", percent: 10, maxOff: 300 },
  FLAT100: { label: "₹100 off", flat: 100 },
};

export const countryCodes = ["+91", "+971", "+1", "+44", "+65"];

export const terms = [
  "Free cancellation is available up to 6 hours before pickup; later cancellations may be charged.",
  "Toll, parking and state entry taxes are paid directly as per actuals unless stated as included.",
  "Kilometres beyond the included limit are charged at the post-limit rate shown.",
  "Vehicle model is indicative; a similar vehicle of the same category may be provided.",
];