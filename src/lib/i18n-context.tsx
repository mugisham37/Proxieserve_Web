"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { en, type MessageKey } from "@/messages/en";
import { rw } from "@/messages/rw";
import { fr } from "@/messages/fr";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = "en" | "rw" | "fr";

const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, rw, fr };

const STORAGE_KEY = "hebuza:locale";
const COOKIE_KEY = "hebuza_locale";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = getItem(STORAGE_KEY) as Locale | null;
  if (stored && stored in MESSAGES) return stored;
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser === "rw") return "rw";
  if (browser === "fr") return "fr";
  return "en";
}

function persistLocale(locale: Locale) {
  setItem(STORAGE_KEY, locale);
  // Set cookie so server-side layout can read it on next request
  document.cookie = `${COOKIE_KEY}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(
    initialLocale ?? "en"
  );

  // Detect from storage/browser once mounted (client only)
  React.useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const t = React.useCallback(
    (key: MessageKey): string => {
      return MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
    },
    [locale]
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useLocale must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useLocale().t;
}
