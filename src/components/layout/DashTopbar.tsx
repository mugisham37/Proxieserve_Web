"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MkIcon } from "@/components/atoms/MkIcon";
import { NavBadge } from "@/components/atoms/NavBadge";
import { useDashboardUI } from "@/hooks/useDashboardUI";
import { DASH_NAV_ITEMS } from "@/lib/data/dashboard";

export function DashTopbar() {
  const { setMobileMenuOpen, setNotifOpen } = useDashboardUI();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentNav = DASH_NAV_ITEMS.find((item) => pathname === item.href);
  const title = currentNav?.label ?? "Dashboard";

  const btnBase =
    "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-100 cursor-pointer";
  const btnStyle = {
    background: "none",
    border: "1px solid transparent",
    color: "var(--text-muted)",
  };

  return (
    <header
      className="h-[56px] flex items-center gap-4 px-6 sticky top-0 z-50 flex-shrink-0"
      style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
    >
      {/* Mobile menu */}
      <button
        className={`${btnBase} flex md:hidden`}
        style={btnStyle}
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
          (e.currentTarget as HTMLElement).style.color = "var(--text)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "none";
          (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
        }}
      >
        <MkIcon name="menu" size={20} />
      </button>

      <h1 className="text-[16px] font-semibold flex-1">{title}</h1>

      <div className="flex items-center gap-1">
        {/* Search */}
        <button
          className={btnBase}
          style={btnStyle}
          aria-label="Search"
          title="⌘K"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <MkIcon name="search" size={18} />
        </button>

        {/* Theme toggle */}
        {mounted ? (
          <button
            className={btnBase}
            style={btnStyle}
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            <MkIcon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}

        {/* Notifications */}
        <button
          className={`${btnBase} relative`}
          style={btnStyle}
          aria-label="Notifications"
          onClick={() => setNotifOpen(true)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <MkIcon name="bell" size={18} />
          <NavBadge count={3} />
        </button>
      </div>
    </header>
  );
}
