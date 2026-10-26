"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";

type I18nValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

type I18nProviderProps = I18nValue & { children: ReactNode };

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  return <I18nContext value={{ locale, messages }}>{children}</I18nContext>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
