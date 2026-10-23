/**
 * Demo vehicle + pricing data for the search results page.
 * Replace with your API response when the backend is ready.
 */
export const cars = [
  {
    id: "hatchback",
    name: "Wagon R, Swift",
    seats: 4,
    bags: 1,
    rating: 4.6,
    ratePerKm: 11,
    discountPercent: 10,
    image: "/images/fleet-sedan.webp",
  },
  {
    id: "sedan",
    name: "Dzire, Etios",
    seats: 4,
    bags: 2,
    rating: 4.7,
    ratePerKm: 13,
    discountPercent: 10,
    image: "/images/fleet-sedan.webp",
  },
  {
    id: "suv",
    name: "Maruti Ertiga, Kia Carens",
    seats: 6,
    bags: 4,
    rating: 4.7,
    ratePerKm: 17,
    discountPercent: 10,
    image: "/images/fleet-suv.webp",
  },
  {
    id: "premium-suv",
    name: "Innova Crysta, Toyota Hycross",
    seats: 7,
    bags: 5,
    rating: 4.8,
    ratePerKm: 22,
    discountPercent: 10,
    image: "/images/fleet-premium-suv.webp",
  },
] as const;

export type Car = (typeof cars)[number];