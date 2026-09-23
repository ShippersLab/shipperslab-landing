export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: unknown): value is Locale {
  return (locales as readonly unknown[]).includes(value);
}
