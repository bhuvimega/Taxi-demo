"use client";

import { Mail, MapPin, Plus, User } from "lucide-react";
import Field from "@/components/common/Field";
import { countryCodes } from "@/config/addons";
import type { ContactErrors, ContactValues } from "@/lib/booking";

type ContactCardProps = {
  values: ContactValues;
  errors: ContactErrors;
  onChange: (key: keyof ContactValues, value: string) => void;
  needsDrop: boolean;
  showAlt: boolean;
  showGst: boolean;
  onToggleAlt: () => void;
  onToggleGst: () => void;
};

export default function ContactCard({
  values,
  errors,
  onChange,
  needsDrop,
  showAlt,
  showGst,
  onToggleAlt,
  onToggleGst,
}: ContactCardProps) {
  const bind = (key: keyof ContactValues) => ({
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(key, e.target.value),
  });

  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="border-b pb-3 text-lg font-bold">
        Contact &amp; Pickup Details
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" icon={User} error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Full name"
            {...bind("name")}
          />
        </Field>

        <div className="grid grid-cols-[96px_1fr] gap-3">
          <Field label="Code" select>
            <select {...bind("countryCode")}>
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mobile no." error={errors.mobile}>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Mobile no."
              maxLength={15}
              {...bind("mobile")}
            />
          </Field>
        </div>

        <Field label="Email ID" icon={Mail} error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email ID"
            {...bind("email")}
          />
        </Field>

        <div className="flex flex-wrap items-end gap-3">
          <button
            type="button"
            onClick={onToggleAlt}
            aria-expanded={showAlt}
            className="chip chip-soft h-12 px-4 focus-ring"
          >
            <Plus size={14} aria-hidden="true" />
            Alternate email
          </button>
          <button
            type="button"
            onClick={onToggleGst}
            aria-expanded={showGst}
            className="chip chip-soft h-12 px-4 focus-ring"
          >
            <Plus size={14} aria-hidden="true" />
            Add GST
          </button>
        </div>

        {showAlt && (
          <Field label="Alternate email" icon={Mail} error={errors.altEmail}>
            <input
              type="email"
              placeholder="Alternate email"
              {...bind("altEmail")}
            />
          </Field>
        )}
        {showGst && (
          <Field label="GST number" error={errors.gst}>
            <input
              type="text"
              placeholder="15-character GSTIN"
              maxLength={15}
              {...bind("gst")}
            />
          </Field>
        )}

        <div className="sm:col-span-2">
          <Field label="Pickup location" icon={MapPin} error={errors.pickup}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Pickup location"
              {...bind("pickup")}
            />
          </Field>
        </div>

        {needsDrop && (
          <div className="sm:col-span-2">
            <Field
              label="Drop location"
              icon={MapPin}
              iconClassName="text-highlight"
              error={errors.drop}
            >
              <input
                type="text"
                autoComplete="off"
                placeholder="Drop location"
                {...bind("drop")}
              />
            </Field>
          </div>
        )}
      </div>
    </section>
  );
}
