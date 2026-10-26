import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { site } from "@/lib/site";

export const ORGANIZATION_ID = `${site.url}/#organization`;

export function websiteId(lang: Locale) {
  return `${localizedUrl("/", lang)}/#website`;
}

export function homeLabel(lang: Locale) {
  return getMessages(lang).blog.home;
}

export function casosLabel(lang: Locale) {
  return getMessages(lang).nav.casos;
}
