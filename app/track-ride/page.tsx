import type { Metadata } from "next";
import { Suspense } from "react";
import TrackForm from "@/components/track/TrackForm";

export const metadata: Metadata = {
  title: "Track your booking | GoCabxi",
  description:
    "Enter your GoCabxi booking reference to see live status of your ride.",
};

export default function TrackRidePage() {
  return (
    <div className="bg-muted">
      <section className="py-12 sm:py-20">
        <div className="mx-auto w-full max-w-[560px] px-4">
          {/* TrackForm reads ?ref= from the address, so it must sit inside <Suspense>. */}
          <Suspense
            fallback={
              <div
                className="h-80 animate-pulse rounded-2xl bg-card"
                aria-busy="true"
              />
            }
          >
            <TrackForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
