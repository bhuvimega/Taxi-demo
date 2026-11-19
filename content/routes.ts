/**
 * ROUTE FACTS. One object per route page.
 *
 * You only write the FACTS here (distance, stops, sights). lib/routes.ts turns
 * them into the whole page (headings, paragraphs, fares, FAQs). To add a route:
 * copy one object, change the facts, save — /routes/<slug> now exists.
 *
 * NOTE: sample facts. Check distances, times and place names before publishing.
 */

export type RouteStop = { place: string; distance: string; note: string };

export type RouteFacts = {
  slug: string; // address: /routes/<slug>
  from: string; // name used in headings, e.g. "Bangalore"
  to: string;
  fromCity: string; // value put into the booking form (must match config/booking.ts cities)
  toCity: string;
  distanceKm: number; // keep equal to the engine's distance so fares match the search page
  duration: string; // short:  "6–7 hrs"
  hours: string; // spoken: "6 to 7 hours"
  highway: string; // "NH 48"
  trafficNote: string; // "depending on traffic at Hosur and Vellore"
  stops: RouteStop[];
  fromAreas: string; // pickup areas, e.g. "the airport, Whitefield and Majestic"
  toAreas: string;
  toSights: string; // sights at the destination
  fromAirport: string;
};

export const routeFacts: RouteFacts[] = [
  {
    slug: "bangalore-to-chennai",
    from: "Bangalore",
    to: "Chennai",
    fromCity: "Bengaluru",
    toCity: "Chennai",
    distanceKm: 345,
    duration: "6–7 hrs",
    hours: "6 to 7 hours",
    highway: "NH 48",
    trafficNote: "depending on traffic at Hosur and Vellore",
    stops: [
      { place: "Krishnagiri", distance: "90 km", note: "Highway restaurants for breakfast" },
      { place: "Ambur", distance: "190 km", note: "Famous for biryani, a good lunch stop" },
      { place: "Vellore", distance: "215 km", note: "Vellore Fort and fuel stations" },
      { place: "Kanchipuram", distance: "Detour", note: "Silk sarees and old temples" },
    ],
    fromAreas: "the airport, Whitefield, Electronic City and Majestic",
    toAreas: "the airport, T Nagar and OMR",
    toSights:
      "Marina Beach, Kapaleeshwara Temple, Fort St. George, the Government Museum, San Thome Basilica, Guindy National Park and Elliot's Beach",
    fromAirport: "Kempegowda Airport",
  },
  {
    slug: "bengaluru-to-mysuru",
    from: "Bengaluru",
    to: "Mysuru",
    fromCity: "Bengaluru",
    toCity: "Mysuru",
    distanceKm: 145,
    duration: "3 hrs",
    hours: "about 3 hours",
    highway: "NH 275 (the expressway)",
    trafficNote: "depending on morning traffic around Bengaluru",
    stops: [
      { place: "Ramanagara", distance: "50 km", note: "Breakfast stops and the rocky hills" },
      { place: "Channapatna", distance: "60 km", note: "The toy town, known for wooden toys" },
      { place: "Maddur", distance: "80 km", note: "Famous for crisp Maddur vada" },
      { place: "Srirangapatna", distance: "125 km", note: "Ranganathaswamy temple and Tipu Sultan's summer palace" },
    ],
    fromAreas: "the airport, Whitefield, Electronic City and Majestic",
    toAreas: "the palace area, the railway station and Vijayanagar",
    toSights: "Mysuru Palace, Chamundi Hill, Brindavan Gardens, St. Philomena's Church and Mysuru Zoo",
    fromAirport: "Kempegowda Airport",
  },
  {
    slug: "mumbai-to-pune",
    from: "Mumbai",
    to: "Pune",
    fromCity: "Mumbai",
    toCity: "Pune",
    distanceKm: 150,
    duration: "2.5–3 hrs",
    hours: "2.5 to 3 hours",
    highway: "the Mumbai–Pune Expressway",
    trafficNote: "depending on traffic near Navi Mumbai and Pune",
    stops: [
      { place: "Khalapur", distance: "60 km", note: "Food plazas and fuel stations" },
      { place: "Lonavala", distance: "85 km", note: "Famous for chikki and monsoon views" },
      { place: "Talegaon", distance: "115 km", note: "A last easy fuel stop before Pune" },
    ],
    fromAreas: "the airport, Bandra, Andheri and Navi Mumbai",
    toAreas: "the airport, Koregaon Park and Hinjewadi",
    toSights: "Shaniwar Wada, Aga Khan Palace, Sinhagad Fort, Dagdusheth Ganpati Temple and Koregaon Park",
    fromAirport: "Chhatrapati Shivaji Maharaj Airport",
  },
  {
    slug: "delhi-to-agra",
    from: "Delhi",
    to: "Agra",
    fromCity: "Delhi",
    toCity: "Agra",
    distanceKm: 230,
    duration: "3.5–4 hrs",
    hours: "3.5 to 4 hours",
    highway: "the Yamuna Expressway",
    trafficNote: "depending on traffic leaving Delhi and Noida",
    stops: [
      { place: "Noida", distance: "40 km", note: "The last big city stop and fuel" },
      { place: "Mathura", distance: "145 km", note: "Temples and the famous peda sweets" },
      { place: "Expressway service areas", distance: "Midway", note: "Clean restrooms and quick food" },
    ],
    fromAreas: "the airport, Connaught Place, Noida and Gurugram",
    toAreas: "the Taj Mahal area, Agra Cantt station and Fatehabad Road",
    toSights: "the Taj Mahal, Agra Fort, Itimad-ud-Daulah, Mehtab Bagh and Fatehpur Sikri",
    fromAirport: "Indira Gandhi International Airport",
  },
  {
    slug: "chennai-to-puducherry",
    from: "Chennai",
    to: "Puducherry",
    fromCity: "Chennai",
    toCity: "Puducherry",
    distanceKm: 155,
    duration: "3–3.5 hrs",
    hours: "3 to 3.5 hours",
    highway: "the East Coast Road (ECR)",
    trafficNote: "depending on weekend traffic on the ECR",
    stops: [
      { place: "Mahabalipuram", distance: "55 km", note: "Shore Temple and rock carvings" },
      { place: "Marakkanam", distance: "100 km", note: "Salt pans and quiet coastal views" },
      { place: "Auroville", distance: "Detour", note: "Matrimandir and peaceful forest trails" },
    ],
    fromAreas: "the airport, T Nagar, OMR and Central",
    toAreas: "White Town, the beach promenade and the railway station",
    toSights: "the Promenade Beach, Auroville, Paradise Beach, White Town and Sri Aurobindo Ashram",
    fromAirport: "Chennai Airport",
  },
];
