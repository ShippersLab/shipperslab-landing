"use client";

import { useI18n } from "@/i18n/provider";

export function SkipLink() {
  const { messages } = useI18n();

  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-paper focus:px-4 focus:py-2 focus:text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
    >
      {messages.nav.skip}
    </a>
  );
}
