export const locales = ["es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
