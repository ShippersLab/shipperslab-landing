"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getMessages, type Messages } from "@/i18n/get-messages";

const LOCALE_STORAGE_KEY = "shipperslab-locale";

type I18nValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (isLocale(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  const value = useMemo<I18nValue>(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const id = requestAnimationFrame(() => {
      void import("@/lib/gsap").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    });

    return () => cancelAnimationFrame(id);
  }, [locale]);

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
