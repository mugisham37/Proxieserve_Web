"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { KbdHint } from "@/components/atoms/shared/KbdHint";
import { NotificationBell } from "@/components/atoms/shared/NotificationBell";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";

const BREADCRUMB_MAP: Record<string, string> = {
  "/admin/analytics": "Analytics",
  "/admin/services": "Services & Schema",
  "/admin/pricing": "Pricing & Agents",
  "/admin/oversight": "Oversight",
  "/admin/broadcasts": "Broadcasts & Settings",
};

export function AdminTopBar() {
  const pathname = usePathname();
  const { darkMode } = useAdminState();
  const dispatch = useAdminDispatch();
  const searchRef = React.useRef<HTMLInputElement>(null);

  const section =
    Object.entries(BREADCRUMB_MAP).find(([key]) =>
      pathname.startsWith(key)
    )?.[1] ?? "Admin";

  // "/" shortcut focuses search
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-[12px]",
        "sticky top-0 z-30",
        "h-[56px] px-[20px] min-[980px]:px-[32px]",
        "bg-[var(--cream)] border-b border-[var(--rule)]"
      )}
    >
      {/* Mobile brand */}
      <Link
        href="/admin/analytics"
        className={cn(
          "min-[980px]:hidden",
          "font-serif text-[17px] text-[var(--ink)] shrink-0"
        )}
        aria-label="ProxiServe Admin"
      >
        Proxi<em className="italic font-normal">Serve</em>
      </Link>

      {/* Desktop breadcrumb */}
      <span className="hidden min-[980px]:block font-sans text-[13px] font-medium text-[var(--ink-muted)]">
        {section}
      </span>

      {/* Search */}
      <div className="flex-1 relative max-w-[400px] min-[980px]:ml-[8px]">
        <input
          ref={searchRef}
          type="search"
          placeholder="Search services, agents, cases…"
          aria-label="Search admin panel"
          className={cn(
            "w-full h-[36px] pl-[12px] pr-[36px]",
            "bg-[var(--paper)] border border-[var(--rule)]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
            "placeholder:text-[var(--ink-subtle)]",
            "focus:outline-none focus:border-[var(--ink)]",
            "transition-colors duration-[var(--m-fast)]"
          )}
          onKeyDown={(e) => {
            if (e.key === "Escape") e.currentTarget.blur();
          }}
        />
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
          <KbdHint>/</KbdHint>
        </div>
      </div>

      <div className="flex-1" />

      {/* Admin env badge */}
      <span
        className={cn(
          "hidden min-[980px]:inline-flex items-center",
          "px-[8px] py-[3px] rounded-[var(--r-sm)]",
          "font-mono text-[10px] tracking-[0.1em] uppercase",
          "bg-[var(--brand-soft)] text-[var(--brand-ink)]"
        )}
        aria-label="Admin panel"
      >
        Admin
      </span>

      {/* Dark mode toggle (mobile) */}
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "min-[980px]:hidden",
          "flex items-center justify-center",
          "w-[36px] h-[36px] rounded-[var(--r-md)]",
          "text-[var(--ink-muted)]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--paper)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Notifications bell */}
      <NotificationBell />
    </div>
  );
}
