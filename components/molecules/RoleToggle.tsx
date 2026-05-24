"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type StaffRole = "agent" | "admin";

interface RoleToggleProps {
  value: StaffRole;
  onChange: (role: StaffRole) => void;
  className?: string;
}

const ROLES: { value: StaffRole; label: string }[] = [
  { value: "agent", label: "Agent" },
  { value: "admin", label: "Admin" },
];

export function RoleToggle({ value, onChange, className }: RoleToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Staff role"
      className={cn(
        "flex rounded-[var(--r-md)] border border-[var(--rule-strong)] overflow-hidden",
        className
      )}
    >
      {ROLES.map((role) => (
        <button
          key={role.value}
          role="radio"
          aria-checked={value === role.value}
          type="button"
          onClick={() => onChange(role.value)}
          className={cn(
            "relative flex-1 h-10 font-sans text-[13px] font-medium",
            "transition-colors duration-[120ms] outline-none",
            "focus-visible:shadow-[var(--focus-ring)]",
            value === role.value
              ? "text-[var(--paper)] z-10"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)] bg-[var(--paper)]"
          )}
        >
          {value === role.value && (
            <motion.span
              layoutId="role-bg"
              className="absolute inset-0 bg-[var(--ink)]"
              transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
            />
          )}
          <span className="relative z-10">{role.label}</span>
        </button>
      ))}
    </div>
  );
}
