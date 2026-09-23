import { isRecord, readString } from "@/lib/payload";

export type ContactMessage = {
  name: string;
  company: string;
  contactMethod: string;
  message: string;
};

const MAX_SHORT_FIELD = 200;
const MAX_MESSAGE = 5000;

export function parseContactMessage(payload: unknown): ContactMessage | null {
  if (!isRecord(payload)) {
    return null;
  }

  const parsed: ContactMessage = {
    name: readString(payload, "name", MAX_SHORT_FIELD),
    company: readString(payload, "company", MAX_SHORT_FIELD),
    contactMethod: readString(payload, "contactMethod", MAX_SHORT_FIELD),
    message: readString(payload, "message", MAX_MESSAGE),
  };

  if (!parsed.name || !parsed.contactMethod || !parsed.message) {
    return null;
  }

  return parsed;
}

export function isEmailContact(value: string) {
  return value.includes("@");
}

export function buildWhatsAppUrl(number: string | undefined, text: string) {
  if (!number) {
    return null;
  }

  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export type WhatsAppMessageCopy = {
  whatsappMessage: string;
  whatsappGreeting: string;
  whatsappGreetingWithCompany: string;
};

export function buildWhatsAppMessage(form: ContactMessage, copy: WhatsAppMessageCopy) {
  const name = form.name.trim();
  const company = form.company.trim();
  const message = form.message.trim();

  if (!name) {
    return copy.whatsappMessage;
  }

  const greeting = company
    ? copy.whatsappGreetingWithCompany.replace("{name}", name).replace("{company}", company)
    : copy.whatsappGreeting.replace("{name}", name);

  return message ? `${greeting} ${message}` : greeting;
}
