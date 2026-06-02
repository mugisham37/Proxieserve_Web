"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashBadge } from "@/components/atoms/DashBadge";

interface Tab {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashTabBarProps {
  unreadMessages: number;
}

function TabIcon({ children }: { children: React.ReactNode }) {
  return <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">{children}</span>;
}

export function DashTabBar({ unreadMessages }: DashTabBarProps) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <TabIcon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 8L10 2l7 6v9H13v-4H7v4H3V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </TabIcon>
      ),
    },
    {
      label: "Apps",
      href: "/dashboard/applications",
      icon: (
        <TabIcon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h9M3 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </TabIcon>
      ),
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      badge: unreadMessages,
      icon: (
        <TabIcon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3 3 3-3h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </TabIcon>
      ),
    },
    {
      label: "Me",
      href: "/dashboard/settings",
      icon: (
        <TabIcon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </TabIcon>
      ),
    },
  ];

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-[60] flex bg-[var(--paper)] border-t border-[var(--rule)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            aria-label={tab.badge ? `${tab.label}, ${tab.badge} unread` : tab.label}
            className={cn(
              "flex-1 flex flex-col items-center gap-[3px] py-2 relative",
              "font-sans text-[11px] font-semibold",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
              active ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
            )}
          >
            {tab.badge != null && tab.badge > 0 && (
              <span className="absolute top-1 right-1/4 translate-x-[8px]">
                <DashBadge count={tab.badge} variant="brand" />
              </span>
            )}
            {tab.icon}
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
