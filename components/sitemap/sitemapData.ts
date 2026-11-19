import { footerGroups } from "@/config/footer";
import { siteConfig } from "@/config/site";

/** Footer groups are reused, so a link added to the footer shows up here too. */
const fromFooter = (title: string) => footerGroups.find((g) => g.title === title)?.links ?? [];

export const sitemapGroups = [
  { title: "Cab Services", links: fromFooter("Cab Services") },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "My Trips", href: siteConfig.routes.myTrips },
      { label: "Track Ride", href: siteConfig.routes.trackRide },
    ],
  },
  { title: "Legal", links: fromFooter("Legal") },
  { title: "Popular Cities", links: fromFooter("Popular Cities") },
  // Add more columns here, e.g. { title: "Popular Routes", links: fromFooter("Popular Routes") },
];