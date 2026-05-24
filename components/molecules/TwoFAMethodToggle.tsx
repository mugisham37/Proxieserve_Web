"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { KeyRound, Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type TwoFAMethod = "totp" | "sms" | "backup";

interface TwoFAMethodToggleProps {
  value: TwoFAMethod;
  onChange: (method: TwoFAMethod) => void;
  className?: string;
}

const METHODS: { value: TwoFAMethod; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number }> }[] = [
  { value: "totp", label: "Authenticator", Icon: KeyRound },
  { value: "sms", label: "SMS", Icon: Mail },
  { value: "backup", label: "Backup code", Icon: ShieldCheck },
];

export function TwoFAMethodToggle({ value, onChange, className }: TwoFAMethodToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Two-factor method"
      className={cn(
        "flex rounded-[var(--r-md)] border border-[var(--rule-strong)] overflow-hidden",
        className
      )}
    >
      {METHODS.map(({ value: v, label, Icon }) => (
        <button
          key={v}
          role="radio"
          aria-checked={value === v}
          type="button"
          onClick={() => onChange(v)}
          title={label}
          className={cn(
            "relative flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 px-2",
            "font-sans text-[11px] font-medium transition-colors duration-[120ms]",
            "outline-none focus-visible:shadow-[var(--focus-ring)]",
            value === v
              ? "text-[var(--paper)] z-10"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)] bg-[var(--paper)]"
          )}
        >
          {value === v && (
            <motion.span
              layoutId="method-bg"
              className="absolute inset-0 bg-[var(--ink)]"
              transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
            />
          )}
          <span className="relative z-10">
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <span className="relative z-10 hidden sm:block">{label}</span>
        </button>
      ))}
    </div>
  );
}
