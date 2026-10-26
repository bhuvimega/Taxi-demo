import { NextResponse } from "next/server";
import { validateContactMessage } from "@/lib/contact";

/**
 * Receives the contact form. The browser already validated the fields, but the
 * server checks again — never trust the browser alone.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field, bots usually do.
  // Pretend it worked so the bot doesn't learn anything.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const values = {
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    message: String(data.message ?? ""),
  };

  const errors = validateContactMessage(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: deliver the message — send an email (Resend, SendGrid, Nodemailer…)
  // or save it to your database / helpdesk. Until then it is only acknowledged.
  console.info("[contact] message received", { characters: values.message.trim().length });

  return NextResponse.json({ ok: true });
}