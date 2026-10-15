/** Single source of truth for brand info, routes and primary navigation. */
export const siteConfig = {
  name: "GoCabxi",
  phone: { label: "+91 1800-462-2294", href: "tel:+9118004622294" },
  routes: {
    home: "/",
    myTrips: "#",
    trackRide: "#",
  },
} as const;

export const navItems = [
  { label: "One-Way", href: "/#" },
  { label: "Round-Trip", href: "/#" },
  { label: "Airport", href: "/#" },
  { label: "Rentals", href: "/#" },
] as const;
