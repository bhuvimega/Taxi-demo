import { FREE_CANCELLATION_HOURS } from "@/config/addons";
import { routeFacts, type RouteFacts } from "@/content/routes";
import { formatINR, getQuotes, type SearchQuery } from "@/lib/search";

/* ------------------------------------------------------------------ */
/* Demo numbers (replace with real data later)                          */
/* ------------------------------------------------------------------ */

/** Added to the one-way fare for a pickup from an airport. */
export const AIRPORT_PICKUP_EXTRA = 400;

/** The Tempo Traveller isn't in config/cars.ts (it isn't offered on /search yet), so it lives here. */
const TEMPO = {
  label: "Tempo Traveller",
  models: "Force Traveller",
  capacity: "12 to 17 passengers",
  seatsText: "12+ seats · Group luggage · AC",
  ratePerKm: 33,
};

const GST = 0.05;
const CAB_LABELS: Record<string, string> = { sedan: "Sedan", suv: "SUV", "premium-suv": "Premium SUV" };

/* ------------------------------------------------------------------ */
/* Fares: computed by the SAME engine as /search and /booking          */
/* ------------------------------------------------------------------ */

export type RouteCab = {
  id: string;
  label: string;
  models: string;
  capacity: string;
  seatsText: string;
  oneWay: number; // all-inclusive (fare + GST)
  roundTripPerKm: number;
  airportPickup: number;
  icon: "sedan" | "suv" | "bus";
};

function oneWayQuery(km: number): SearchQuery {
  return {
    type: "one-way",
    title: "",
    routeTitle: "",
    tripLabel: "One way",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    distanceKm: km,
    days: 1,
  };
}

export function getRouteCabs(km: number): RouteCab[] {
  const quotes = getQuotes(oneWayQuery(km));

  const fromEngine = Object.keys(CAB_LABELS).map((id): RouteCab => {
    const q = quotes.find((x) => x.car.id === id)!;
    const oneWay = q.fare + q.taxes;
    return {
      id,
      label: CAB_LABELS[id],
      models: q.car.name,
      capacity: `${q.car.seats} passengers`,
      seatsText: `${q.car.seats} seats · ${q.car.bags} bags · AC`,
      oneWay,
      roundTripPerKm: q.car.ratePerKm,
      airportPickup: oneWay + AIRPORT_PICKUP_EXTRA,
      icon: id === "sedan" ? "sedan" : "suv",
    };
  });

  const tempoFare = Math.max(km, 130) * TEMPO.ratePerKm;
  const tempoOneWay = tempoFare + Math.round(tempoFare * GST);

  return [
    ...fromEngine,
    {
      id: "tempo",
      label: TEMPO.label,
      models: TEMPO.models,
      capacity: TEMPO.capacity,
      seatsText: TEMPO.seatsText,
      oneWay: tempoOneWay,
      roundTripPerKm: TEMPO.ratePerKm,
      airportPickup: tempoOneWay + AIRPORT_PICKUP_EXTRA,
      icon: "bus",
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Facts → full page (the text templates)                               */
/* ------------------------------------------------------------------ */

export const getRouteFacts = (slug: string) => routeFacts.find((r) => r.slug === slug);
export const routeUrl = (slug: string) => `/routes/${slug}`;

/** Other routes that start or end in the same city (for the "Popular destinations" pills). */
export function getSiblingRoutes(r: RouteFacts) {
  return routeFacts.filter(
    (x) => x.slug !== r.slug && (x.fromCity === r.fromCity || x.toCity === r.toCity || x.fromCity === r.toCity),
  );
}

export function buildRoutePage(r: RouteFacts) {
  const cabs = getRouteCabs(r.distanceKm);
  const [sedan, suv, premium] = cabs;
  const startingFrom = Math.min(...cabs.map((c) => c.oneWay));

  const faqs = [
    {
      q: `What is the distance from ${r.from} to ${r.to} by road?`,
      a: `The road distance is about ${r.distanceKm} km and the drive usually takes ${r.hours}.`,
    },
    {
      q: `What is the taxi fare from ${r.from} to ${r.to}?`,
      a: `One-way fares start at ${formatINR(sedan.oneWay)} for a sedan, ${formatINR(suv.oneWay)} for an SUV and ${formatINR(premium.oneWay)} for a Premium SUV, all-inclusive. The exact fare is shown before you book.`,
    },
    {
      q: "Are tolls included in the fare?",
      a: "Yes. Toll and state tax are already included in your fare, so there is nothing extra to pay on the road.",
    },
    {
      q: "Do I have to pay the full charge for a one-way trip?",
      a: "No. With a one-way cab you pay only for the distance you travel, with no charge for the driver's empty return.",
    },
    {
      q: `Can I book a pickup from ${r.fromCity} airport?`,
      a: `Yes. Pickup is available from ${r.fromAirport} as well as from any address in ${r.from}. Choose the Airport Transfer tab to book.`,
    },
    {
      q: "What is the cancellation policy?",
      a: `You can cancel free of charge up to ${FREE_CANCELLATION_HOURS} hours before pickup. See the cancellation policy page for details.`,
    },
    {
      q: `What are the best things to do in ${r.to}?`,
      a: `Popular sights in ${r.to} include ${r.toSights}.`,
    },
    {
      q: "Can I book a bigger vehicle for a group?",
      a: "Yes. For eight or more people, book a Tempo Traveller. For smaller groups, an SUV or Premium SUV has more room for luggage.",
    },
  ];

  return {
    facts: r,
    cabs,
    startingFrom,
    seoTitle: `${r.from} to ${r.to} Cab: One-Way Taxi from ${formatINR(startingFrom)}`,
    seoDescription: `Book a ${r.from} to ${r.to} cab. ${r.distanceKm} km, ${r.hours}. All-inclusive one-way fares from ${formatINR(startingFrom)} with fuel, toll and driver allowance included.`,
    heroSubtitle:
      "One all-inclusive fare with fuel, tolls and driver allowance included, and a verified driver at your door.",
    fareIntro:
      "Pick the cab that fits your group and luggage. Prices are fixed at booking, with no surge and no hidden charges.",
    tableIntro:
      "Every fare below is for one-way travel and includes fuel, tolls, driver allowance and GST. Round-trip and airport pickup rates are listed alongside.",
    tripIntro: `Doorstep pickup from your home, hotel or office, and a drop anywhere in ${r.to}.`,
    stopsTitle: `Popular places on the way to ${r.to}`,
    stopsIntro: `Short breaks along ${r.highway} make the ${r.distanceKm} km drive easier. Ask your driver to stop at any of these.`,
    sightsLine: `In ${r.to}, popular sights include ${r.toSights}.`,
    bookTitle: `Book a ${r.from} to ${r.to} cab with GoCabxi`,
    bookParagraphs: [
      `Travel between ${r.fromCity} and ${r.toCity} in a clean AC sedan or SUV with a verified driver. Your fare is calculated up front and includes driver allowance, fuel and tolls.`,
      `The road trip covers about ${r.distanceKm} km on ${r.highway} and usually takes ${r.hours}, ${r.trafficNote}. Choose one-way to pay for a single side, or round-trip if you want the same cab back.`,
      `Pickups are available across ${r.fromCity}, including ${r.fromAreas}. Drops are available across ${r.toCity}, including ${r.toAreas}.`,
      "Book on the website or the GoCabxi app, and track your driver live from the moment he is assigned.",
    ],
    faqs,
  };
}

export type RoutePage = ReturnType<typeof buildRoutePage>;
