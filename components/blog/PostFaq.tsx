import { ChevronDown } from "lucide-react";

type Faq = { q: string; a: string };

/** Question-and-answer accordion under an article (uses the same classes as the home FAQ). */
export default function PostFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section aria-labelledby="post-faq" className="mt-12">
      <h2 id="post-faq" className="text-2xl font-extrabold tracking-tight">
        Frequently asked questions
      </h2>

      <div className="mt-4 border-t">
        {faqs.map(({ q, a }) => (
          <details key={q} className="faq-item">
            <summary className="faq-summary">
              {q}
              <ChevronDown size={16} className="faq-chevron" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
