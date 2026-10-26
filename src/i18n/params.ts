import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";

export type LangParams = { params: Promise<{ lang: string }> };

export async function resolveLocale(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return lang;
}
