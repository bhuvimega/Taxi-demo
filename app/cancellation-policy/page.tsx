import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { cancellationPolicy } from "@/components/legal/legalContent";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | GoCabxi",
  description:
    "Free cancellation window, refund timelines and how to cancel a GoCabxi booking.",
};

export default function CancellationPolicyPage() {
  return <LegalPage {...cancellationPolicy} />;
}
