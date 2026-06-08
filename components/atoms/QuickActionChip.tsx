import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuickActionChipProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function QuickActionChip({
  icon,
  label,
  href,
  onClick,
  disabled,
  className,
}: QuickActionChipProps) {
  const base = cn(
    "inline-flex items-center gap-[8px] px-[16px] py-[9px]",
    "rounded-[var(--r-pill)] border border-[var(--rule)]",
    "bg-[var(--paper)] text-[var(--ink)]",
    "font-sans text-[13px] font-medium",
    "transition-colors duration-[var(--m-fast)]",
    "hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]",
    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={base}>
        <span aria-hidden="true" className="w-[16px] h-[16px] shrink-0 flex items-center justify-center">
          {icon}
        </span>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={base}
    >
      <span aria-hidden="true" className="w-[16px] h-[16px] shrink-0 flex items-center justify-center">
        {icon}
      </span>
      {label}
    </button>
  );
}
