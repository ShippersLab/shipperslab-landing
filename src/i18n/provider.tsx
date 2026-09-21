"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { defaultLocale, type Locale } from "@/i18n/config";
import { getMessages, type Messages } from "@/i18n/get-messages";

type I18nValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const value = useMemo<I18nValue>(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
