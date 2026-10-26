export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const openGraphLocales: Record<Locale, string> = {
  es: "es_AR",
  en: "en_US",
};

export const languageTags: Record<Locale, string> = {
  es: "es-AR",
  en: "en-US",
};

export function isLocale(value: unknown): value is Locale {
  return (locales as readonly unknown[]).includes(value);
}
