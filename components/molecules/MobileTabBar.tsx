"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_APP = "PRX-2026-00483";

interface MobileTabBarProps {
  unreadCount?: number;
  className?: string;
}

export function MobileTabBar({ unreadCount = 0, className }: MobileTabBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const isOnApp = pathname.startsWith("/app/");

  const tabs = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Home",
      isActive: pathname === "/dashboard",
    },
    {
      href: `/app/${PRIMARY_APP}`,
      icon: FileText,
      label: "Apps",
      isActive: isOnApp && activeTab !== "messages" && activeTab !== "documents",
    },
    {
      href: `/app/${PRIMARY_APP}?tab=messages`,
      icon: MessageSquare,
      label: "Messages",
      badge: unreadCount,
      isActive: isOnApp && activeTab === "messages",
    },
    {
      href: "/settings",
      icon: User,
      label: "Me",
      isActive: pathname === "/settings",
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className={cn(
        "min-[980px]:hidden",
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-[var(--paper)] border-t border-[var(--rule)]",
        "pb-[env(safe-area-inset-bottom,0px)]",
        className
      )}
    >
      <div role="tablist" className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              role="tab"
              aria-selected={tab.isActive}
              className={cn(
                "flex-1 flex flex-col items-center gap-[3px]",
                "min-h-[44px] pt-[8px] pb-[6px] px-[4px]",
                "font-sans text-[10px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:bg-[var(--cream)]",
                tab.isActive ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
              )}
            >
              <span className="relative">
                <Icon size={20} aria-hidden="true" />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className="absolute -top-[3px] -right-[5px] inline-flex items-center justify-center min-w-[14px] h-[14px] px-[3px] rounded-full bg-[var(--brand)] text-white font-mono text-[8px] font-medium"
                    aria-hidden="true"
                  >
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                )}
              </span>
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="sr-only">{tab.badge} unread messages</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
