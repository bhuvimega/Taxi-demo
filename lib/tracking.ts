export const trackingSteps = [
  { id: "confirmed", title: "Booking confirmed", text: "We have received your booking." },
  { id: "assigned", title: "Driver assigned", text: "Your driver and cab details are ready." },
  { id: "onway", title: "Driver on the way", text: "Your driver is heading to the pickup point." },
  { id: "trip", title: "Trip in progress", text: "Sit back and enjoy the ride." },
  { id: "done", title: "Trip completed", text: "Thanks for riding with GoCabxi." },
] as const;

const MIN = 60_000;

/** 5400000 → "1 hr 30 min" */
export function formatDuration(ms: number) {
  const totalMin = Math.max(0, Math.round(ms / MIN));
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;

  if (days > 0) return `${days} day${days > 1 ? "s" : ""}${hours ? ` ${hours} hr` : ""}`;
  if (hours > 0) return `${hours} hr${mins ? ` ${mins} min` : ""}`;
  return `${mins} min`;
}

export function getTrackingState(pickupMs: number, now: number) {
  const untilPickup = pickupMs - now;

  let current = 0; // index into trackingSteps
  if (untilPickup <= 120 * MIN) current = 1; // driver assigned 2 hrs before
  if (untilPickup <= 45 * MIN) current = 2; // on the way 45 min before
  if (untilPickup <= 0) current = 3; // trip started
  if (untilPickup <= -180 * MIN) current = 4; // demo: trips last 3 hrs

  const headline =
    current === 0 || current === 1
      ? `Pickup in ${formatDuration(untilPickup)}`
      : current === 2
        ? untilPickup > 5 * MIN
          ? `Driver arrives in about ${formatDuration(untilPickup)}`
          : "Your driver is arriving now"
        : current === 3
          ? "Your trip is in progress"
          : "This trip is complete";

  return { current, headline };
}

const DRIVERS = ["Ramesh K.", "Suresh P.", "Anand R.", "Karthik S.", "Vijay M.", "Prakash T."];

/** Made-up driver details, always the same for the same reference. DEMO ONLY. */
export function getDemoDriver(reference: string) {
  let h = 0;
  for (const ch of reference) h = (h * 31 + ch.charCodeAt(0)) >>> 0;

  const letters = "ABCDEFGHJKLMNPRSTUVWXYZ";
  const plate = `TN ${String(10 + (h % 80)).padStart(2, "0")} ${letters[h % letters.length]}${letters[(h >> 5) % letters.length]} ${String(1000 + (h % 9000))}`;

  return {
    name: DRIVERS[h % DRIVERS.length],
    plate,
    rating: (4.6 + (h % 4) / 10).toFixed(1),
    otp: String(1000 + ((h >> 3) % 9000)),
  };
}