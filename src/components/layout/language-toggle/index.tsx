"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageIcon } from "@/components/ui/icons";
import { locales, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";

const LANGUAGE_LABELS: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function LanguageToggle() {
  const { locale, messages } = useI18n();
  const pathname = usePathname();
  const next = locales.find((value) => value !== locale) ?? locale;

  return (
    <Link
      href={localizePath(pathname, next)}
      hrefLang={next}
      lang={next}
      prefetch={false}
      scroll={false}
      aria-label={`${messages.nav.language}: ${LANGUAGE_LABELS[next]}`}
      className="flex items-center gap-2 rounded-md border border-muted/35 bg-paper px-3.5 py-2 text-sm text-ink transition-colors duration-200 ease-out hover:bg-border/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <LanguageIcon size={16} className="text-muted" />
      {LANGUAGE_LABELS[next]}
    </Link>
  );
}
