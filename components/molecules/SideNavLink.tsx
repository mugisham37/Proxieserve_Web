"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SideNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive?: boolean;
  className?: string;
}

export function SideNavLink({
  href,
  icon,
  label,
  badge,
  isActive,
  className,
}: SideNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-[10px] px-[10px] py-[8px] rounded-[var(--r-md)]",
        "font-sans text-[14px] font-medium",
        "transition-colors duration-[var(--m-fast)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        isActive
          ? "bg-[var(--ink)] text-[var(--paper)] border-l-2 border-[var(--brand)]"
          : "text-[var(--ink-muted)] hover:bg-[var(--cream)] hover:text-[var(--ink)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "w-[20px] h-[20px] shrink-0 flex items-center justify-center",
          isActive ? "text-[var(--paper)]" : "text-[var(--ink-muted)]"
        )}
      >
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          aria-label={`${badge} unread`}
          className={cn(
            "inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px]",
            "rounded-full font-mono text-[10px] font-medium",
            isActive
              ? "bg-[var(--brand)] text-white"
              : "bg-[var(--brand-soft)] text-[var(--brand-ink)]"
          )}
        >
          {badge > 99 ? "99+" : badge}
          <span className="sr-only"> unread</span>
        </span>
      )}
    </Link>
  );
}
