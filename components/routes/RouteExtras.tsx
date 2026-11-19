import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { customiseOptions, otherServices, perks, whyUs } from "@/content/route-defaults";
import { siteConfig } from "@/config/site";
import type { RoutePage } from "@/lib/routes";
import TripLink from "./TripLink";

/** Fill {from} / {to} / {airport} in the shared wording. */
const fill = (text: string, page: RoutePage) =>
  text
    .replaceAll("{from}", page.facts.from)
    .replaceAll("{to}", page.facts.to)
    .replaceAll("{airport}", page.facts.fromAirport);

/** Dark section: add-ons the customer can ask for. */
export function Customise({ page }: { page: RoutePage }) {
  const { facts: r } = page;
  return (
    <section className="section bg-surface-dark text-surface-dark-foreground [&_.eyebrow]:text-brand">
      <div className="site-container">
        <SectionHeading
          eyebrow="Make it yours"
          title={`Customise your ${r.from} to ${r.to} trip`}
          description="Add what you need while booking. Prices may change slightly when you add any of these."
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customiseOptions.map(({ title, text, icon: Icon }) => (
            <li key={title} className="flex gap-4 rounded-xl bg-surface-dark-foreground/10 p-5">
              <span className="icon-tile icon-tile-brand size-10">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-surface-dark-foreground/75">{fill(text, page)}</p>
              </div>
            </li>
          ))}

          <li className="flex flex-col justify-center rounded-xl bg-brand p-5 text-on-brand">
            <h3 className="text-lg font-extrabold">Not sure what to pick?</h3>
            <p className="mt-1 text-sm">Our team can set it up for you on a call.</p>
            <a href={siteConfig.phone.href} className="mt-3 text-base font-extrabold hover:underline focus-ring">
              {siteConfig.phone.label} →
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** "The best … taxi provider" — heading left, six reasons right. */
export function WhyUs({ page }: { page: RoutePage }) {
  const { facts: r } = page;
  return (
    <section className="section">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.7fr]">
        <div>
          <p className="eyebrow">Why GoCabxi</p>
          <h2 className="section-title">
            The best {r.from} to {r.to} taxi provider
          </h2>
          <p className="section-lead">
            A booking journey built around transparency and trust, from quote to drop. Book on the website or the
            GoCabxi app for iOS and Android.
          </p>
          <TripLink trip="one-way" className="btn btn-accent btn-pill mt-6 h-11 px-6">
            Check fares <ArrowRight size={16} aria-hidden="true" />
          </TripLink>
        </div>

        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {whyUs.map(({ title, text, icon: Icon }) => (
            <li key={title} className="flex gap-3">
              <span className="icon-tile icon-tile-soft size-10">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Three big reassurance columns. */
export function Perks({ page }: { page: RoutePage }) {
  return (
    <section className="section bg-muted">
      <div className="site-container grid gap-8 md:grid-cols-3">
        {perks.map(({ title, text, icon: Icon }) => (
          <div key={title}>
            <span className="icon-tile icon-tile-brand size-14 rounded-xl">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-body">{fill(text, page)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Green section: other services from the same city. */
export function OtherServices({ page }: { page: RoutePage }) {
  const link = "mt-4 inline-flex items-center gap-1 text-sm font-bold hover:underline focus-ring";
  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading eyebrow="More from GoCabxi" title={`Other taxi services in ${page.facts.from}`} />

        <ul className="grid gap-5 md:grid-cols-3">
          {otherServices.map((s) => (
            <li key={s.title} className="flex flex-col rounded-2xl bg-card p-6 text-card-foreground">
              <span className="icon-tile icon-tile-brand">
                <s.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{fill(s.title, page)}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-body">{fill(s.text, page)}</p>
              {"trip" in s && s.trip ? (
                <TripLink trip={s.trip} className={link}>
                  {s.cta} <span aria-hidden="true">→</span>
                </TripLink>
              ) : (
                <Link href={s.href!} className={link}>
                  {s.cta} <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
