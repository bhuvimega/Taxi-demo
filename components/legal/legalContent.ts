import { FREE_CANCELLATION_HOURS } from "@/config/addons";

export const LEGAL_LAST_UPDATED = "June 2026";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs. */
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  intro:
    "This Privacy Policy explains how GoCabxi collects, uses and protects your information when you use our cab-booking services.",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect details you provide when booking — such as your name, mobile number, pickup and drop locations, travel dates and payment status — to fulfil your ride.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "Your information is used to calculate fares, confirm bookings, assign drivers via our vendor network, provide support and send booking-related notifications.",
      ],
    },
    {
      heading: "Sharing",
      paragraphs: [
        "We share only the minimum trip details required with the assigned vendor and driver to complete your journey. We do not sell your personal data.",
      ],
    },
    {
      heading: "Data security",
      paragraphs: [
        "We apply reasonable technical and organisational measures to safeguard your information. This is a Phase-1 demo and should not be used with real personal or payment data.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "For any privacy questions, reach us through the contact details on our Contact page.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  title: "Terms & Conditions",
  intro:
    "By using GoCabxi you agree to these terms governing bookings, fares, cancellations and conduct.",
  sections: [
    {
      heading: "Bookings & fares",
      paragraphs: [
        "All fares are platform-calculated and shown transparently before payment. The fare is locked at confirmation based on the details you provide.",
      ],
    },
    {
      heading: "Vendor-led fulfilment",
      paragraphs: [
        "Rides are fulfilled by third-party vendors and drivers assigned through our dispatch. GoCabxi coordinates the booking experience and support.",
      ],
    },
    {
      heading: "User responsibilities",
      paragraphs: [
        "You agree to provide accurate trip details and to treat drivers and vehicles with respect. Illegal or unsafe conduct may lead to cancellation.",
      ],
    },
    {
      heading: "Demo notice",
      paragraphs: [
        "This is a Phase-1 demonstration. Payments, OTP and dispatch are simulated and no real transactions occur.",
      ],
    },
  ],
};

export const cancellationPolicy: LegalDoc = {
  title: "Cancellation & Refund Policy",
  intro: "We aim to keep cancellations fair and predictable so you can plan with confidence.",
  sections: [
    {
      heading: "Free cancellation window",
      paragraphs: [
        // Uses the same number as the booking page, so the two never disagree.
        `You can cancel free of charge up to ${FREE_CANCELLATION_HOURS} hours before your scheduled pickup and receive a full refund of any amount paid.`,
      ],
    },
    {
      heading: "After the free window",
      paragraphs: [
        "Cancellations made after the free window, or no-shows, may not be eligible for a refund as the driver may already be en route.",
      ],
    },
    {
      heading: "Refund timelines",
      paragraphs: [
        "Eligible refunds are processed back to your original payment method. In this demo, refunds are simulated instantly on the booking.",
      ],
    },
    {
      heading: "How to cancel",
      paragraphs: [
        "Open your booking under My Trips and use the cancel option to see your applicable refund before confirming.",
      ],
    },
  ],
};