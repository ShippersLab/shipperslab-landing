"use client";

import { locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const LANGUAGE_LABELS: Record<(typeof locales)[number], string> = {
  es: "Español",
  en: "English",
};

export function LanguageToggle() {
  const { locale, setLocale, messages } = useI18n();

  return (
    <div
      role="radiogroup"
      aria-label={messages.nav.language}
      className="inline-flex gap-1 rounded-full border border-border p-1"
    >
      {locales.map((value) => {
        const active = value === locale;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLocale(value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
              active ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )}
          >
            {LANGUAGE_LABELS[value]}
          </button>
        );
      })}
    </div>
  );
}
