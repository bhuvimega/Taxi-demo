import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/components/legal/legalContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | GoCabxi",
  description:
    "The terms governing GoCabxi bookings, fares, cancellations and conduct.",
};

export default function TermsPage() {
  return <LegalPage {...termsAndConditions} />;
}
