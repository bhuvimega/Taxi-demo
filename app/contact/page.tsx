import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import PageIntro from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "Contact Us | GoCabxi",
  description:
    "Questions about a booking, fares or cancellations? Reach the GoCabxi 24×7 support team.",
};

export default function ContactPage() {
  return (
    <div className="bg-muted">
      <PageIntro
        eyebrow="Contact"
        title="We're here to help"
        description="Questions about a booking, fares or cancellations? Reach our 24×7 support team."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[992px] px-4">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
