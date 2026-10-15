import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Field from "@/components/common/Field";

export default function HeroBooking() {
  return (
    <section className="relative isolate min-h-[560px] sm:min-h-[580px]">
      <Image
        src="/images/hero-travel.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-overlay/65" />

      <div className="site-container pb-16 pt-16 sm:pt-[72px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-1.5px] text-white sm:text-5xl lg:text-[60px]">
            Intercity Cabs,
            <br />
            <span className="text-highlight">booked in seconds.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-sm font-medium leading-6 text-white/90 sm:text-base">
            Get a guaranteed all-inclusive fare, pick your car, and ride with a
            verified driver. Outstation, airport and hourly — one clean flow.
          </p>
        </div>

        <div className="mt-10 rounded-[22px] bg-card p-5 shadow-xl sm:p-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Field label="Trip" select>
              <select defaultValue="airport">
                <option value="airport">Drop to Airport</option>
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
                <option value="rental">Hourly Rental</option>
              </select>
            </Field>

            <Field label="Pickup address" icon={MapPin}>
              <input type="text" placeholder="Enter pickup location" />
            </Field>

            <Field label="Drop airport" select>
              <select defaultValue="">
                <option value="" disabled>
                  Select airport
                </option>
                <option value="chennai">Chennai Airport</option>
                <option value="bengaluru">Bengaluru Airport</option>
                <option value="mumbai">Mumbai Airport</option>
                <option value="delhi">Delhi Airport</option>
              </select>
            </Field>

            <Field label="Pick up date" icon={CalendarDays}>
              <input type="date" />
            </Field>

            <Field label="Pick up time" icon={Clock3}>
              <input type="time" />
            </Field>
          </div>

          <button type="button" disabled className="btn btn-solid btn-cta mt-6">
            Search Cabs
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
            Transparent platform-calculated fare · Free cancellation up to 6 hrs
            before pickup
          </p>
        </div>
      </div>
    </section>
  );
}
