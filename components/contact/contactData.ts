import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Replace with your real support address. */
export const SUPPORT_EMAIL = "support@gocabxi.example";

export const contactItems = [
  {
    title: "Call us",
    value: siteConfig.phone.label,
    href: siteConfig.phone.href,
    icon: Phone,
  },
  {
    title: "Email",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    icon: Mail,
  },
  {
    title: "Support hours",
    value: "24×7, all days",
    icon: Clock3,
  },
  {
    title: "Coverage",
    value: "18+ Indian cities",
    icon: MapPin,
  },
] as const;