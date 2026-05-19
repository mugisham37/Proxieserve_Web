"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "rw", label: "RW" },
  { code: "fr", label: "FR" },
] as const;

type LangCode = (typeof LANGS)[number]["code"];

interface LangSwitcherProps {
  active?: LangCode;
  onChange?: (lang: LangCode) => void;
  className?: string;
}

export function LangSwitcher({ active = "en", onChange, className }: LangSwitcherProps) {
  function handleSelect(lang: LangCode) {
    document.documentElement.lang = lang;
    onChange?.(lang);
  }

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
          onClick={() => handleSelect(code)}
          aria-pressed={active === code}
          className={cn(
            "px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider",
            "transition-colors duration-[120ms]",
            "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
            active === code
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
