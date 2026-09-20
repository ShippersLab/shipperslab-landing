import type { Locale } from "@/i18n/config";

import es from "@/i18n/messages/es.json";

const messagesByLocale: Record<Locale, typeof es> = {
  es,
};

export function getMessages(locale: Locale) {
  return messagesByLocale[locale];
}
