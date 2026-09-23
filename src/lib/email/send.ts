import { Resend } from "resend";

import { site } from "@/lib/site";

const DEFAULT_FROM = `ShippersLab <${site.emails.contact}>`;

type Email = {
  to?: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(email: Email) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
    ...email,
    to: email.to ?? site.emails.contact,
  });

  if (error) {
    throw new Error(error.message);
  }
}
