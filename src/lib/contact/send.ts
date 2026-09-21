import { Resend } from "resend";

import type { ContactMessage } from "@/lib/contact/message";
import { site } from "@/lib/site";

const DEFAULT_FROM = `ShippersLab <${site.emails.contact}>`;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderHtml(message: ContactMessage) {
  const rows = [
    ["Nombre", message.name],
    ["Empresa", message.company || "-"],
    ["Contacto", message.contactMethod],
  ]
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return `${rows}<p style="white-space:pre-wrap">${escapeHtml(message.message)}</p>`;
}

function renderText(message: ContactMessage) {
  return [
    `Nombre: ${message.name}`,
    `Empresa: ${message.company || "-"}`,
    `Contacto: ${message.contactMethod}`,
    "",
    message.message,
  ].join("\n");
}

export async function sendContactMessage(message: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const subject = `Consulta desde shipperslab.tech: ${message.company || message.name}`;
  const replyTo = message.contactMethod.includes("@") ? message.contactMethod : undefined;

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
    to: site.emails.contact,
    replyTo,
    subject,
    text: renderText(message),
    html: renderHtml(message),
  });

  if (error) {
    throw new Error(error.message);
  }
}
