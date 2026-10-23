"use client";

import { Sparkles } from "lucide-react";
import { addons } from "@/config/addons";
import { addonCost } from "@/lib/booking";
import { formatINR } from "@/lib/search";

type AddonsCardProps = {
  selected: string[];
  includedKm: number;
  onToggle: (id: string) => void;
};

export default function AddonsCard({
  selected,
  includedKm,
  onToggle,
}: AddonsCardProps) {
  return (
    <section className="panel overflow-hidden" aria-labelledby="addons-heading">
      <div className="border-b px-5 py-4 sm:px-6">
        <h2
          id="addons-heading"
          className="flex items-center gap-2 text-xl font-extrabold text-brand-text"
        >
          <Sparkles size={20} aria-hidden="true" />
          Personalize Your Journey
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enhance your travel experience with our premium add-ons
        </p>
      </div>

      <ul className="space-y-3 p-4 sm:p-5">
        {addons.map((addon) => (
          <li key={addon.id}>
            <label className="option-card">
              <input
                type="checkbox"
                checked={selected.includes(addon.id)}
                onChange={() => onToggle(addon.id)}
                className="size-5 shrink-0 accent-brand-dark"
              />
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold sm:text-base">
                {addon.label}
                {addon.popular && (
                  <span className="chip chip-highlight">Most Popular</span>
                )}
              </span>
              <span className="shrink-0 text-right text-sm font-bold sm:text-base">
                {addon.unit === "perKm" ? (
                  <>
                    {formatINR(addon.price)}/km
                    <span className="block text-xs font-normal text-muted-foreground">
                      ≈ {formatINR(addonCost(addon, includedKm))}
                    </span>
                  </>
                ) : (
                  formatINR(addon.price)
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
