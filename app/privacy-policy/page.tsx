import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/components/legal/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | GoCabxi",
  description:
    "How GoCabxi collects, uses and protects your information when you use our cab-booking services.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyPolicy} />;
}
