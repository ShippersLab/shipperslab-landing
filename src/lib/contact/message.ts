export type ContactMessage = {
  name: string;
  company: string;
  contactMethod: string;
  message: string;
};

const MAX_SHORT_FIELD = 200;
const MAX_MESSAGE = 5000;

function readField(source: Record<string, unknown>, key: string, max: number) {
  const value = source[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseContactMessage(payload: unknown): ContactMessage | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;
  const parsed: ContactMessage = {
    name: readField(source, "name", MAX_SHORT_FIELD),
    company: readField(source, "company", MAX_SHORT_FIELD),
    contactMethod: readField(source, "contactMethod", MAX_SHORT_FIELD),
    message: readField(source, "message", MAX_MESSAGE),
  };

  if (!parsed.name || !parsed.contactMethod || !parsed.message) {
    return null;
  }

  return parsed;
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
