"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashBadge } from "@/components/atoms/DashBadge";
import type { DashboardStats } from "@/lib/dashboard-data";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashSideNavProps {
  stats: DashboardStats;
  unreadMessages: number;
  userName: string;
  userInitials: string;
  userRole: string;
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashSideNav({ stats, unreadMessages, userName, userInitials, userRole }: DashSideNavProps) {
  const pathname = usePathname();

  const primaryNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <NavIcon d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5Z" />,
    },
    {
      label: "Applications",
      href: "/dashboard/applications",
      icon: <NavIcon d="M2 3h12v2H2V3Zm0 4h8v2H2V7Zm0 4h10v2H2v-2Z" />,
      badge: stats.active,
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: <NavIcon d="M14 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />,
      badge: unreadMessages,
    },
    {
      label: "Documents",
      href: "/dashboard/documents",
      icon: <NavIcon d="M9 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 2Zm0 0v4h4" />,
    },
  ];

  const accountNav: NavItem[] = [
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <NavIcon d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5.66-1.06a1 1 0 0 0 .24-1.04l-.78-1.88a1 1 0 0 0-.96-.62l-1.04.07a5.6 5.6 0 0 0-.73-.73l.07-1.04a1 1 0 0 0-.62-.96L7.96 1.2a1 1 0 0 0-1.04.24L6.1 2.4A5.6 5.6 0 0 0 5.07 3.1l-1.04-.07a1 1 0 0 0-.96.62L2.3 5.53a1 1 0 0 0 .24 1.04l.74.7A5.3 5.3 0 0 0 3.25 8c0 .24.01.49.04.73l-.73.7a1 1 0 0 0-.24 1.04l.78 1.88c.18.44.61.71 1.06.62l.9-.07c.24.27.49.5.77.72l-.07.9a1 1 0 0 0 .62.96l1.88.78a1 1 0 0 0 1.04-.24l.7-.74c.24.03.49.04.73.04s.49-.01.73-.04l.7.74a1 1 0 0 0 1.04.24l1.88-.78a1 1 0 0 0 .62-.96l-.07-.9c.28-.22.53-.45.77-.72l.9.07a1 1 0 0 0 1.06-.62l.78-1.88Z" />,
    },
    {
      label: "Help",
      href: "/contact",
      icon: <NavIcon d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 9v-1m0-5a1 1 0 0 1 .94 1.35A1.5 1.5 0 0 0 8 8.5V9" />,
    },
  ];

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  function NavLink({ item }: { item: NavItem }) {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "grid grid-cols-[16px_1fr_auto] gap-3 items-center",
          "px-3 py-[10px] rounded-[var(--r-md)]",
          "font-sans text-[13.5px] font-medium",
          "transition-colors duration-[var(--m-fast)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
          active
            ? "bg-[var(--ink)] text-[var(--paper)]"
            : "text-[var(--ink-2)] hover:bg-[var(--cream-2)]"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.badge != null && item.badge > 0 && (
          <DashBadge
            count={item.badge}
            variant={active ? "ok" : "brand"}
          />
        )}
      </Link>
    );
  }

  return (
    <nav
      aria-label="Dashboard navigation"
      className="hidden lg:flex flex-col gap-6 w-[240px] shrink-0 h-screen sticky top-0 px-4 py-6 bg-[var(--cream)] border-r border-[var(--rule)] overflow-y-auto"
    >
      {/* Brand chip */}
      <Link
        href="/dashboard"
        className={cn(
          "inline-flex items-center gap-[10px]",
          "font-serif font-medium text-[19px] text-[var(--ink)]",
          "px-[14px] py-[6px] border border-[var(--ink)] rounded-[999px]",
          "self-start",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--ink)] hover:text-[var(--paper)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
        )}
      >
        <span className="w-2 h-2 rounded-full bg-[var(--brand)] shrink-0" aria-hidden="true" />
        <span>Proxi<em className="italic">.</em>Serve</span>
      </Link>

      {/* Primary nav */}
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] px-3 mb-1">
          My account
        </p>
        {primaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Account nav */}
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] px-3 mb-1">
          Account
        </p>
        {accountNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User chip */}
      <Link
        href="/dashboard/settings"
        className={cn(
          "flex items-center gap-3 px-3 py-[10px] rounded-[var(--r-md)]",
          "hover:bg-[var(--cream-2)] transition-colors duration-[var(--m-fast)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
        )}
        aria-label="Go to settings"
      >
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--brand)] text-white font-serif text-[14px] font-medium shrink-0">
          {userInitials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[13.5px] font-semibold text-[var(--ink)] truncate leading-tight">{userName}</p>
          <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.06em] capitalize">{userRole}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-[var(--ink-subtle)] shrink-0">
          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
