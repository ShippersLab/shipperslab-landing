"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, LanguageIcon } from "@/components/ui/icons";
import { locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

const LANGUAGE_LABELS: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function LanguageDropdown() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const otherLocales = locales.filter((value) => value !== locale);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-2.5 text-sm text-ink transition-colors duration-200 ease-out hover:bg-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <LanguageIcon size={16} className="text-muted" />
        {LANGUAGE_LABELS[locale]}
        <ChevronDownIcon
          size={14}
          className={cn(
            "text-muted transition-transform duration-200 ease-out",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ transformOrigin: "top left" }}
            className="absolute top-full left-0 z-30 mt-2 flex w-36 flex-col gap-1 rounded-full border border-border bg-paper p-1"
          >
            {otherLocales.map((value) => (
              <button
                key={value}
                type="button"
                role="option"
                onClick={() => {
                  setLocale(value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-start rounded-full px-3.5 py-2.5 text-sm text-ink transition-colors duration-200 ease-out hover:bg-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {LANGUAGE_LABELS[value]}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
