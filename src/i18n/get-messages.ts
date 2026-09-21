import type { Locale } from "@/i18n/config";

import en from "@/i18n/messages/en.json";
import es from "@/i18n/messages/es.json";

export type Messages = typeof es;

const messagesByLocale: Record<Locale, Messages> = {
  es,
  en,
};

export function getMessages(locale: Locale) {
  return messagesByLocale[locale];
}
