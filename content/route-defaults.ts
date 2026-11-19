import {
  BadgeCheck,
  Briefcase,
  Clock3,
  Droplet,
  FileText,
  Globe,
  Headset,
  House,
  IndianRupee,
  PauseCircle,
  Plane,
  Repeat,
  ShieldCheck,
  Sparkles,
  Luggage,
  Users,
  ArrowRight,
} from "lucide-react";
import type { TripType } from "@/config/booking";

/**
 * Wording that is the SAME on every route page.
 * (Wording that changes per route lives in content/routes.ts + lib/routes.ts.)
 * {to} and {from} are replaced with the route's city names.
 */

export const tripTypes = [
  {
    title: "One-way taxi",
    text: "Just need a drop? Pay only for the distance you travel, with no charge for the driver's empty return. Ideal for solo travellers, families and business trips.",
    cta: "Get one-way fare",
    trip: "one-way" as TripType,
    icon: ArrowRight,
  },
  {
    title: "Round-trip taxi",
    text: "Return the same day or after a few days with the same cab and driver. Explore the city at your own pace and head back when you are ready.",
    cta: "Get round-trip fare",
    trip: "round-trip" as TripType,
    icon: Repeat,
  },
  {
    title: "Group travel",
    text: "Eight or more people? Book a Tempo Traveller with space for everyone and their luggage, so the whole group rides together.",
    cta: "Get group fare",
    trip: "one-way" as TripType,
    icon: Users,
  },
];

export const included = ["Fuel charges", "Driver allowance", "Toll and state tax", "GST", "Parking at pickup point"];
export const notIncluded = [
  "Night driving charge after 10 PM, if applicable",
  "Extra stops beyond the route",
  "Airport entry or parking fees",
];

export const customiseOptions = [
  { title: "Pause and go", text: "Spend a few hours in {from} before you leave. The cab waits and you start when you are ready.", icon: PauseCircle },
  { title: "Diesel car", text: "Ask for a diesel cab on a round-trip to save on fuel stops and range.", icon: Droplet },
  { title: "Luggage carrier", text: "Travelling with extra bags? Add a roof carrier so the cabin stays comfortable.", icon: Luggage },
  { title: "Driver language", text: "Choose a driver who speaks Hindi, English or the language you are most comfortable in.", icon: Globe },
  { title: "Newer car model", text: "Request a recent-model cab for extra comfort on the long drive.", icon: Sparkles },
];

export const whyUs = [
  { title: "Punctual pickup and drop", text: "On-time arrivals with live dispatch tracking.", icon: Clock3 },
  { title: "Transparent billing", text: "Itemised fares locked at booking, no hidden costs.", icon: IndianRupee },
  { title: "24×7 customer support", text: "Help for changes, queries and on-trip needs.", icon: Headset },
  { title: "Flexible bookings", text: "One-way or round-trip, whichever suits you.", icon: Repeat },
  { title: "Experienced, verified drivers", text: "Courteous and familiar with intercity routes.", icon: ShieldCheck },
  { title: "Clean, well-kept cabs", text: "Sanitised and regularly serviced vehicles.", icon: BadgeCheck },
];

export const perks = [
  { title: "Toll and taxes included", text: "Tolls, state tax and GST are already in your fare, so there is nothing extra to pay on the road.", icon: FileText },
  { title: "Doorstep pickup", text: "Your driver arrives at your home, hotel or office and drops you anywhere in {to}.", icon: House },
  { title: "One-way fares", text: "Pay only for the distance you travel. No round-trip charge or return fare is added to your bill.", icon: ArrowRight },
];

export const otherServices = [
  {
    title: "Local hourly rentals",
    text: "Keep a cab and driver for 4 hours, 8 hours or 12 hours within the city for errands, meetings or sightseeing.",
    cta: "Book local cab",
    trip: "local" as TripType,
    icon: Clock3,
  },
  {
    title: "Corporate travel",
    text: "Business travellers can book one-way or round-trip rides at clear, budget-friendly rates for the team.",
    cta: "Talk to our team",
    href: "/contact",
    icon: Briefcase,
  },
  {
    title: "{from} airport to {to}",
    text: "Skip the hunt for local rides. Book a chauffeur-driven cab straight from {airport} to {to}.",
    cta: "Book airport taxi",
    trip: "airport" as TripType,
    icon: Plane,
  },
];

