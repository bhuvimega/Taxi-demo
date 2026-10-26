/** Shared by the contact form (browser) AND the /api/contact route (server). */

export type ContactMessage = { name: string; email: string; message: string };
export type ContactMessageErrors = Partial<Record<keyof ContactMessage, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactMessage(v: ContactMessage): ContactMessageErrors {
  const e: ContactMessageErrors = {};
  const name = v.name.trim();
  const message = v.message.trim();

  if (name.length < 2) e.name = "Please enter your name";
  else if (name.length > 100) e.name = "Name is too long";

  if (!v.email.trim()) e.email = "Please enter your email";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > 150) e.email = "Please enter a valid email";

  if (message.length < 10) e.message = "Please write at least 10 characters";
  else if (message.length > 2000) e.message = "Message is too long (2000 characters max)";

  return e;
}