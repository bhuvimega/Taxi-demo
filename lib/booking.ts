import { GST_RATE, PART_PAY_PERCENT, addons, coupons, type Addon } from "@/config/addons";

export type PaymentOption = "zero" | "part" | "full";

export type ContactValues = {
  name: string;
  countryCode: string;
  mobile: string;
  email: string;
  altEmail: string;
  gst: string;
  pickup: string;
  drop: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

/* ---------------------------- pricing ---------------------------- */

export const addonCost = (addon: Addon, includedKm: number) =>
  Math.round(addon.unit === "perKm" ? addon.price * includedKm : addon.price);

export function computeTotals(opts: {
  fare: number;
  includedKm: number;
  selectedAddonIds: string[];
  discount: number;
}) {
  const addonLines = addons
    .filter((a) => opts.selectedAddonIds.includes(a.id))
    .map((a) => ({ id: a.id, label: a.label, amount: addonCost(a, opts.includedKm) }));

  const addonsTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);
  const subtotal = Math.max(0, opts.fare + addonsTotal - opts.discount);
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  return { addonLines, addonsTotal, subtotal, gst, total, partPay: Math.round((total * PART_PAY_PERCENT) / 100) };
}

export type Totals = ReturnType<typeof computeTotals>;

/** What the customer pays right now for each payment option. */
export const payNow = (option: PaymentOption, t: Totals) =>
  option === "zero" ? 0 : option === "part" ? t.partPay : t.total;

export function applyCoupon(code: string, fare: number) {
  const coupon = coupons[code.trim().toUpperCase()];
  if (!coupon) return null;

  const raw = coupon.flat ?? Math.round((fare * (coupon.percent ?? 0)) / 100);
  const discount = Math.min(raw, coupon.maxOff ?? raw, fare);
  return { code: code.trim().toUpperCase(), discount, label: coupon.label };
}

/* ---------------------------- validation ---------------------------- */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export function validateContact(
  v: ContactValues,
  opts: { needsDrop: boolean; showAlt: boolean; showGst: boolean },
): ContactErrors {
  const e: ContactErrors = {};
  const mobile = v.mobile.replace(/\s/g, "");

  if (v.name.trim().length < 2) e.name = "Enter your full name";

  if (!mobile) e.mobile = "Enter your mobile number";
  else if (v.countryCode === "+91" ? !/^[6-9]\d{9}$/.test(mobile) : !/^\d{7,15}$/.test(mobile))
    e.mobile = "Enter a valid mobile number";

  if (!v.email.trim()) e.email = "Enter your email";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email";

  if (opts.showAlt && v.altEmail.trim() && !EMAIL.test(v.altEmail.trim()))
    e.altEmail = "Enter a valid email";

  if (opts.showGst && v.gst.trim() && !GSTIN.test(v.gst.trim().toUpperCase()))
    e.gst = "Enter a valid 15-character GSTIN";

  if (!v.pickup.trim()) e.pickup = "Enter pickup location";
  if (opts.needsDrop && !v.drop.trim()) e.drop = "Enter drop location";

  return e;
}