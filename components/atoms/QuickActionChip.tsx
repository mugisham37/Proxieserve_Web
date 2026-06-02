"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface QuickActionChipProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
}

export function QuickActionChip({
  icon,
  label,
  onClick,
  asChild = false,
  className,
  disabled,
}: QuickActionChipProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-[6px]",
        "px-[14px] py-2",
        "font-sans text-[13px] font-semibold text-[var(--ink-2)]",
        "border border-[var(--rule-strong)] rounded-[999px]",
        "bg-transparent",
        "transition-colors duration-[var(--m-fast)] cursor-pointer select-none",
        "hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]",
        "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      <span className="w-[14px] h-[14px] flex items-center justify-center shrink-0" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Comp>
  );
}
