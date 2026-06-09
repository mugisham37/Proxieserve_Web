import * as React from "react";
import { cn } from "@/lib/utils";
import { type StaffRole } from "@/components/molecules/auth/RoleToggle";

interface StaffChipProps {
  role: StaffRole;
  className?: string;
}

export function StaffChip({ role, className }: StaffChipProps) {
  const isAdmin = role === "admin";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[var(--r-pill)]",
        "font-mono text-[11px] font-medium leading-none",
        isAdmin
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
        className
      )}
    >
      {isAdmin ? "Admin" : "Agent"}
    </span>
  );
}
