"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Layers, Tag, Shield, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { adaptAlertItem } from "@/lib/admin-adapters";
import { useAdminAnalytics } from "@/hooks/useAnalytics";

const TABS = [
  {
    href: "/admin/analytics",
    icon: <BarChart2 size={22} />,
    label: "Analytics",
    matchFn: (p: string) => p === "/admin/analytics" || p === "/admin",
  },
  {
    href: "/admin/services",
    icon: <Layers size={22} />,
    label: "Services",
    matchFn: (p: string) => p.startsWith("/admin/services"),
  },
  {
    href: "/admin/pricing",
    icon: <Tag size={22} />,
    label: "Pricing",
    matchFn: (p: string) => p.startsWith("/admin/pricing"),
  },
  {
    href: "/admin/oversight",
    icon: <Shield size={22} />,
    label: "Oversight",
    matchFn: (p: string) => p.startsWith("/admin/oversight"),
  },
  {
    href: "/admin/broadcasts",
    icon: <Megaphone size={22} />,
    label: "Broadcasts",
    matchFn: (p: string) => p.startsWith("/admin/broadcasts"),
  },
];

export function AdminMobileTabBar() {
  const pathname = usePathname();
  const { data: analyticsData } = useAdminAnalytics();
  const alerts = React.useMemo(
    () => (analyticsData?.alerts ?? []).map(adaptAlertItem),
    [analyticsData?.alerts]
  );
  const urgentCount = alerts.filter((a) => a.severity === "danger").length;

  return (
    <nav
      aria-label="Mobile admin navigation"
      className={cn(
        "min-[980px]:hidden",
        "fixed bottom-0 left-0 right-0 z-40",
        "flex items-center",
        "h-[56px] pb-[env(safe-area-inset-bottom)]",
        "bg-[var(--paper)] border-t border-[var(--rule)]"
      )}
    >
      {TABS.map((tab) => {
        const isActive = tab.matchFn(pathname);
        const badge =
          tab.href === "/admin/oversight" && urgentCount > 0
            ? urgentCount
            : undefined;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            aria-label={badge ? `${tab.label} — ${badge} urgent` : tab.label}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-[2px]",
              "relative h-full font-sans text-[10px]",
              "transition-colors duration-[var(--m-fast)]",
              isActive ? "text-[var(--brand)]" : "text-[var(--ink-muted)]"
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
              {badge !== undefined && badge > 0 && (
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
                  {badge > 9 ? "9+" : badge}
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
