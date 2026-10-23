"use client";

import { useRef, useState } from "react";
import {
  applyCoupon,
  computeTotals,
  payNow,
  validateContact,
  type ContactErrors,
  type ContactValues,
  type PaymentOption,
} from "@/lib/booking";
import type { Quote, SearchQuery } from "@/lib/search";
import AddonsCard from "./AddonsCard";
import BookingSuccess from "./BookingSuccess";
import ContactCard from "./ContactCard";
import PaymentSidebar from "./PaymentSidebar";

type CheckoutFormProps = {
  query: SearchQuery;
  quote: Quote;
  /** Server-rendered cards that sit above the form (trip summary, inclusions). */
  children: React.ReactNode;
};

export default function CheckoutForm({
  query,
  quote,
  children,
}: CheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const needsDrop = query.type !== "local";

  const [contact, setContact] = useState<ContactValues>({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    altEmail: "",
    gst: "",
    pickup: query.pickupLocation,
    drop: query.dropLocation,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [showAlt, setShowAlt] = useState(false);
  const [showGst, setShowGst] = useState(false);

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [payment, setPayment] = useState<PaymentOption>("part");

  const [coupon, setCoupon] = useState<{
    code: string;
    discount: number;
    label: string;
  } | null>(null);
  const [couponMessage, setCouponMessage] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);

  const [confirmation, setConfirmation] = useState<{
    reference: string;
    paidNow: number;
    total: number;
  } | null>(null);

  const totals = computeTotals({
    fare: quote.fare,
    includedKm: quote.includedKm,
    selectedAddonIds: selectedAddons,
    discount: coupon?.discount ?? 0,
  });

  const onContactChange = (key: keyof ContactValues, value: string) => {
    setContact((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleApplyCoupon = (code: string) => {
    if (!code.trim()) {
      setCouponMessage({ ok: false, text: "Enter a coupon code" });
      return;
    }
    const result = applyCoupon(code, quote.fare);
    if (!result) {
      setCouponMessage({ ok: false, text: "This coupon isn't valid" });
      return;
    }
    setCoupon(result);
    setCouponMessage({ ok: true, text: `You saved ₹${result.discount}` });
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponMessage(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validateContact(contact, { needsDrop, showAlt, showGst });
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Jump to the first problem so it is never off-screen.
      requestAnimationFrame(() => {
        const bad = formRef.current?.querySelector<HTMLElement>(
          "[data-invalid] input, [data-invalid] select",
        );
        bad?.scrollIntoView({ block: "center", behavior: "smooth" });
        bad?.focus({ preventScroll: true });
      });
      return;
    }

    setConfirmation({
      reference: `GCX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      paidNow: payNow(payment, totals),
      total: totals.total,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (confirmation) {
    return (
      <BookingSuccess
        reference={confirmation.reference}
        route={query.routeTitle}
        carName={quote.car.name}
        paidNow={confirmation.paidNow}
        total={confirmation.total}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_400px]"
    >
      <div className="min-w-0 space-y-5">
        <p className="rounded-lg bg-brand-dark px-5 py-3 text-sm font-semibold text-white">
          Review Your Booking
        </p>

        {children}

        <ContactCard
          values={contact}
          errors={errors}
          onChange={onContactChange}
          needsDrop={needsDrop}
          showAlt={showAlt}
          showGst={showGst}
          onToggleAlt={() => setShowAlt((v) => !v)}
          onToggleGst={() => setShowGst((v) => !v)}
        />

        <AddonsCard
          selected={selectedAddons}
          includedKm={quote.includedKm}
          onToggle={toggleAddon}
        />
      </div>

      <PaymentSidebar
        className="lg:sticky lg:top-24"
        totals={totals}
        fare={quote.fare}
        discount={coupon?.discount ?? 0}
        payment={payment}
        onPaymentChange={setPayment}
        coupon={coupon}
        couponMessage={couponMessage}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </form>
  );
}
