"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Clock3 } from "lucide-react";
import { FREE_CANCELLATION_HOURS, PART_PAY_PERCENT } from "@/config/addons";
import { payNow, type PaymentOption, type Totals } from "@/lib/booking";
import { formatINR } from "@/lib/search";

type PaymentSidebarProps = {
  className?: string;
  totals: Totals;
  fare: number;
  discount: number;
  payment: PaymentOption;
  onPaymentChange: (option: PaymentOption) => void;
  coupon: { code: string; label: string } | null;
  couponMessage: { ok: boolean; text: string } | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
};

export default function PaymentSidebar({
  className = "",
  totals,
  fare,
  discount,
  payment,
  onPaymentChange,
  coupon,
  couponMessage,
  onApplyCoupon,
  onRemoveCoupon,
}: PaymentSidebarProps) {
  const [code, setCode] = useState("");

  const options = [
    {
      id: "zero",
      title: "Book at zero",
      hint: `Pay ${formatINR(totals.total)} later`,
    },
    {
      id: "part",
      title: "Part Pay",
      hint: `Pay ${PART_PAY_PERCENT}% now and rest to the driver`,
    },
    { id: "full", title: "Full Pay", hint: "Full amount" },
  ] as const;

  return (
    <aside className={`space-y-4 ${className}`} aria-label="Payment">
      <p className="flex items-center gap-3 rounded-lg bg-highlight/15 px-4 py-3 text-sm">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight text-on-brand">
          <Clock3 size={15} aria-hidden="true" />
        </span>
        <span>
          Free cancellation till <strong>{FREE_CANCELLATION_HOURS} hrs</strong>{" "}
          of departure
        </span>
      </p>

      <div className="panel p-5">
        <h2 id="payment-heading" className="text-xl font-extrabold">
          Payment Options
        </h2>

        <div
          role="radiogroup"
          aria-labelledby="payment-heading"
          className="mt-4 space-y-3"
        >
          {options.map((opt) => (
            <label key={opt.id} className="option-card">
              <input
                type="radio"
                name="payment"
                value={opt.id}
                checked={payment === opt.id}
                onChange={() => onPaymentChange(opt.id)}
                className="size-5 shrink-0 accent-brand-dark"
              />
              <span className="flex-1">
                <span className="block font-semibold">{opt.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {opt.hint}
                </span>
              </span>
              <span className="text-lg font-extrabold">
                {formatINR(payNow(opt.id, totals))}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-5 border-t pt-5">
          <h3 className="font-semibold">Coupon &amp; Offers</h3>

          {coupon ? (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-brand-light px-4 py-3 text-sm">
              <span>
                <strong className="text-brand-text">{coupon.code}</strong>{" "}
                applied · {coupon.label}
              </span>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="link-body text-xs font-semibold"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="mt-3 flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="ENTER A COUPON"
                aria-label="Coupon code"
                className="h-12 min-w-0 flex-1 rounded-xl border border-input bg-card px-3 text-xs font-semibold uppercase outline-none placeholder:text-subtle focus:border-brand"
              />
              <button
                type="button"
                onClick={() => onApplyCoupon(code)}
                className="btn btn-solid h-12 rounded-xl px-5 text-sm"
              >
                APPLY
              </button>
            </div>
          )}

          {couponMessage && (
            <p
              role="status"
              className={`mt-2 text-xs ${couponMessage.ok ? "text-brand-text" : "text-destructive"}`}
            >
              {couponMessage.text}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-accent btn-cta mt-5 uppercase">
          Proceed
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {payment === "zero"
            ? "Nothing to pay now"
            : `Pay ${formatINR(payNow(payment, totals))} now`}
        </p>

        <details className="group mt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-brand-text underline underline-offset-2 focus-ring [&::-webkit-details-marker]:hidden">
            View Fare Break up
            <ChevronDown
              size={16}
              className="transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Base fare" value={formatINR(fare)} />
            {totals.addonLines.map((line) => (
              <Row
                key={line.id}
                label={line.label}
                value={formatINR(line.amount)}
              />
            ))}
            {discount > 0 && (
              <Row
                label="Coupon discount"
                value={`− ${formatINR(discount)}`}
                accent
              />
            )}
            <Row label="GST (5%)" value={formatINR(totals.gst)} />
            <div className="flex justify-between border-t pt-2 text-base font-extrabold">
              <dt>Total</dt>
              <dd>{formatINR(totals.total)}</dd>
            </div>
          </dl>
        </details>
      </div>
    </aside>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 ${accent ? "text-brand-text" : ""}`}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="shrink-0 font-medium">{value}</dd>
    </div>
  );
}
