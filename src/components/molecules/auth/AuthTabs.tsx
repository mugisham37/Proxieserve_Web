"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AuthTabValue = "email" | "phone";

interface AuthTabsProps {
  active: AuthTabValue;
  onChange: (tab: AuthTabValue) => void;
  className?: string;
}

const TABS: { value: AuthTabValue; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export function AuthTabs({ active, onChange, className }: AuthTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Sign-in method"
      className={cn(
        "flex border-b border-[var(--rule)] mb-5",
        className
      )}
    >
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          role="tab"
          aria-selected={active === value}
          onClick={() => onChange(value)}
          className={cn(
            "relative pb-2.5 mr-5 font-sans text-[14px] font-medium leading-none",
            "transition-colors duration-[120ms] outline-none",
            "focus-visible:shadow-[var(--focus-ring)] rounded-sm",
            active === value
              ? "text-[var(--ink)]"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
          )}
        >
          {label}
          {active === value && (
            <motion.span
              layoutId="auth-tab-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ink)] rounded-full"
              transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
