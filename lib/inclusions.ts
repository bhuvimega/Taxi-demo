import type { TripType } from "@/config/booking";
import { LOCAL_PACKAGE_HOURS, tripRules } from "@/config/inclusions";
import { formatINR, type Quote } from "@/lib/search";

/**
 * Builds the Inclusions / Exclusions lists for one car on one trip type.
 * Used by the search results card AND the booking page, so they always match.
 */
export function getInclusionLists(quote: Quote, tripType: TripType) {
  const rules = tripRules[tripType];
  const { bags } = quote.car;

  const values: Record<string, string> = {
    km: String(quote.includedKm),
    rate: formatINR(quote.postLimitPerKm),
    hours: String(LOCAL_PACKAGE_HOURS),
  };
  const fill = (text: string) => text.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

  return {
    included: [
      ...rules.inclusions.map(fill),
      `${bags} ${bags === 1 ? "bag" : "bags"}`,
      "AC",
    ],
    excluded: rules.exclusions.map(fill),
  };
}