"use client";

import { useId, useRef, useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import {
  validateContactMessage,
  type ContactMessage,
  type ContactMessageErrors,
} from "@/lib/contact";

const labelClass = "text-sm font-medium";
const inputClass =
  "mt-2 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-subtle focus:border-brand focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<ContactMessage>({
    name: "",
    email: "",
    message: "",
  });
  const [website, setWebsite] = useState(""); // honeypot — real visitors never see it
  const [errors, setErrors] = useState<ContactMessageErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const change =
    (key: keyof ContactMessage) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const focusFirstError = () =>
    requestAnimationFrame(() =>
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus(),
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validateContactMessage(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      // The server found a problem the browser missed.
      const data = (await res.json().catch(() => null)) as {
        errors?: ContactMessageErrors;
      } | null;
      if (data?.errors) {
        setErrors(data.errors);
        focusFirstError();
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section className="panel p-6 text-center sm:p-8" aria-live="polite">
        <CircleCheck
          size={44}
          className="mx-auto text-brand-text"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-bold">Message sent</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out. Our team will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "" });
            setStatus("idle");
          }}
          className="btn btn-outline btn-pill mt-6 h-11"
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="panel p-6 sm:p-7"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`} className="text-lg font-bold">
        Send us a message
      </h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={change("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={`${inputClass} h-10`}
          />
          {errors.name && (
            <p id={`${uid}-name-err`} role="alert" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={change("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            className={`${inputClass} h-10`}
          />
          {errors.email && (
            <p id={`${uid}-email-err`} role="alert" className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className={labelClass}>
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            rows={5}
            placeholder="How can we help?"
            value={values.message}
            onChange={change("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${uid}-message-err` : undefined}
            className={`${inputClass} min-h-32 resize-y py-2`}
          />
          {errors.message && (
            <p id={`${uid}-message-err`} role="alert" className="field-error">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          We couldn’t send your message. Please check the fields or try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-solid btn-pill mt-6 h-11 disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
