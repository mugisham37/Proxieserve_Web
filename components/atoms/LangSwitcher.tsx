"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLocale, type Locale } from "@/lib/i18n-context";

const LANGS: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "rw", label: "RW" },
  { code: "fr", label: "FR" },
];

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn(
        "inline-flex items-center rounded-[999px] border border-[var(--rule)] overflow-hidden",
        className
      )}
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={`Switch to ${label}`}
          className={cn(
            "px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider",
            "transition-colors duration-[120ms]",
            "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
            locale === code
              ? "bg-[var(--ink)] text-[var(--paper)]"
              : "bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
