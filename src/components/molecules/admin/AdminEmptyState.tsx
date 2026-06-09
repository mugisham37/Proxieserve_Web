import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminEmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function AdminEmptyState({
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[12px]",
        "py-[56px] px-[24px] text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Illustration placeholder */}
      <div
        aria-hidden="true"
        className={cn(
          "w-[48px] h-[48px] rounded-[var(--r-xl)]",
          "border-2 border-dashed border-[var(--rule)]",
          "flex items-center justify-center",
          "text-[var(--ink-subtle)] font-mono text-[20px]"
        )}
      >
        ∅
      </div>

      <div className="flex flex-col gap-[4px] max-w-[320px]">
        <p className="font-serif text-[18px] text-[var(--ink)]">{title}</p>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-[1.5]">
          {description}
        </p>
      </div>

      {action && (
        <>
          {action.href ? (
            <Link
              href={action.href}
              className={cn(
                "mt-[4px] px-[16px] py-[8px] rounded-[var(--r-md)]",
                "font-sans text-[13px] font-medium",
                "bg-[var(--ink)] text-[var(--paper)]",
                "border border-[var(--ink)]",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--paper)] hover:text-[var(--ink)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              )}
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "mt-[4px] px-[16px] py-[8px] rounded-[var(--r-md)]",
                "font-sans text-[13px] font-medium",
                "bg-[var(--ink)] text-[var(--paper)]",
                "border border-[var(--ink)]",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--paper)] hover:text-[var(--ink)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                "cursor-pointer"
              )}
            >
              {action.label}
            </button>
          )}
        </>
      )}
    </div>
  );
}
