"use client";

import { locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center font-mono text-label tracking-label uppercase">
      {locales.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setLocale(value)}
          aria-pressed={locale === value}
          className={cn(
            "rounded-sm px-2 py-1 transition-colors duration-200",
            locale === value ? "text-ink" : "text-muted hover:text-ink",
          )}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
