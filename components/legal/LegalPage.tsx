import Link from "next/link";
import { LEGAL_LAST_UPDATED, type LegalDoc } from "./legalContent";

/**
 * One layout for every legal page (Privacy, Terms, Cancellation …).
 * Pass a document from legalContent.ts — the design stays identical.
 */
export default function LegalPage({ title, intro, sections }: LegalDoc) {
  return (
    <div className="bg-muted">
      <header className="border-b py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[736px] px-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {intro}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[736px] px-4 py-12 sm:py-16">
        <article className="space-y-8">
          {sections.map(({ heading, paragraphs, bullets }) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold">{heading}</h2>

              {paragraphs.map((text) => (
                <p
                  key={text}
                  className="mt-2 text-base leading-7 text-muted-foreground"
                >
                  {text}
                </p>
              ))}

              {bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-7 text-muted-foreground">
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <p className="mt-10 border-t pt-5 text-sm text-muted-foreground">
          Questions? Visit our{" "}
          <Link
            href="/contact"
            className="rounded-sm font-semibold text-brand-text hover:underline focus-ring"
          >
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
