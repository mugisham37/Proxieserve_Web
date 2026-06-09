"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FolderOpen, MessageSquare, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgentState } from "@/lib/agent-context";

interface TabItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  matchFn?: (pathname: string) => boolean;
}

export function AgentMobileTabBar() {
  const pathname = usePathname();
  const { cases } = useAgentState();
  const actionCount = cases.filter((c) => c.status === "action-required").length;

  const tabs: TabItem[] = [
    {
      href: "/agent",
      icon: <CalendarDays size={22} />,
      label: "Today",
      matchFn: (p) => p === "/agent",
    },
    {
      href: "/agent",
      icon: <FolderOpen size={22} />,
      label: "Cases",
      matchFn: (p) => p.startsWith("/agent/case"),
    },
    {
      href: "/agent",
      icon: <MessageSquare size={22} />,
      label: "Messages",
      badge: actionCount > 0 ? actionCount : undefined,
    },
    {
      href: "/agent/performance",
      icon: <BarChart2 size={22} />,
      label: "Stats",
      matchFn: (p) => p === "/agent/performance",
    },
  ];

  return (
    <nav
      aria-label="Mobile agent navigation"
      className={cn(
        "min-[980px]:hidden",
        "fixed bottom-0 left-0 right-0 z-40",
        "flex items-center",
        "h-[56px] pb-[env(safe-area-inset-bottom)]",
        "bg-[var(--paper)] border-t border-[var(--rule)]"
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.matchFn
          ? tab.matchFn(pathname)
          : pathname === tab.href;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            aria-label={
              tab.badge
                ? `${tab.label} — ${tab.badge} unread`
                : tab.label
            }
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-[2px]",
              "relative h-full",
              "font-sans text-[10px]",
              "transition-colors duration-[var(--m-fast)]",
              isActive
                ? "text-[var(--brand)]"
                : "text-[var(--ink-muted)]"
            )}
          >
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[32px] h-[2px] bg-[var(--brand)] rounded-b-full"
              />
            )}
            <span className="relative">
              {tab.icon}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-[4px] -right-[4px]",
                    "min-w-[14px] h-[14px] px-[3px]",
                    "rounded-full font-mono text-[9px] font-bold",
                    "bg-[var(--danger)] text-white",
                    "flex items-center justify-center"
                  )}
                >
                  {tab.badge > 9 ? "9+" : tab.badge}
                </span>
              )}
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
