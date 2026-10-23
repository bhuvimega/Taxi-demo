import type { TripType } from "@/config/booking";

export const LOCAL_PACKAGE_HOURS = 8;

export const tripRules: Record<TripType, { inclusions: string[]; exclusions: string[] }> = {
  "one-way": {
    inclusions: [
      "Base fare and fuel charges",
      "Driver allowance",
      "GST (5%)",
      "State tax & toll",
    ],
    exclusions: [
      "Beyond package km charged at {rate}/km after {km} km",
      "Multiple pickups/drops",
    ],
  },

  "round-trip": {
    inclusions: [
      "Base fare and fuel charges",
      "Driver allowance for the whole trip",
      "Driver night-halt charges",
      "GST (5%)",
      "State tax & toll",
    ],
    exclusions: [
      "Beyond {km} km charged at {rate}/km",
      "Minimum 250 km per day is billed",
      "Multiple pickups/drops",
    ],
  },

  airport: {
    inclusions: [
      "Base fare and fuel charges",
      "Driver allowance",
      "GST (5%)",
      "State tax & toll",
      "45 minutes free waiting at the airport",
    ],
    exclusions: [
      "Waiting beyond 45 minutes is charged extra",
      "Beyond {km} km charged at {rate}/km",
      "Multiple pickups/drops",
    ],
  },

  local: {
    inclusions: [
      "{hours} hrs / {km} km package",
      "Fuel charges",
      "Driver allowance",
      "GST (5%)",
    ],
    exclusions: [
      "Extra km beyond {km} km charged at {rate}/km",
      "Extra hours beyond {hours} hrs charged per hour",
      "Toll, parking and state entry taxes",
    ],
  },
};