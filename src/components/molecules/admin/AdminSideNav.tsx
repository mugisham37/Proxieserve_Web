"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Layers,
  Tag,
  Shield,
  Megaphone,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SideNavLink } from "@/components/molecules/system/SideNavLink";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";
import { adaptAlertItem } from "@/lib/admin-adapters";
import { getInitials } from "@/lib/agent-adapters";
import { useAdminAnalytics } from "@/hooks/useAnalytics";
import { useSession } from "@/hooks/useSession";

const NAV_ITEMS = [
  {
    href: "/admin/analytics",
    icon: <BarChart2 size={16} />,
    label: "Analytics",
    matchFn: (p: string) => p === "/admin/analytics" || p === "/admin",
    id: "onboard-analytics",
  },
  {
    href: "/admin/services",
    icon: <Layers size={16} />,
    label: "Services & Schema",
    matchFn: (p: string) => p.startsWith("/admin/services"),
    id: "onboard-services-nav",
  },
  {
    href: "/admin/pricing",
    icon: <Tag size={16} />,
    label: "Pricing & Agents",
    matchFn: (p: string) => p.startsWith("/admin/pricing"),
  },
  {
    href: "/admin/oversight",
    icon: <Shield size={16} />,
    label: "Oversight",
    matchFn: (p: string) => p.startsWith("/admin/oversight"),
    id: "onboard-oversight",
  },
  {
    href: "/admin/broadcasts",
    icon: <Megaphone size={16} />,
    label: "Broadcasts & Settings",
    matchFn: (p: string) => p.startsWith("/admin/broadcasts"),
  },
];

export function AdminSideNav() {
  const pathname = usePathname();
  const { darkMode } = useAdminState();
  const dispatch = useAdminDispatch();
  const { session } = useSession();
  const { data: analyticsData } = useAdminAnalytics();

  const alerts = React.useMemo(
    () => (analyticsData?.alerts ?? []).map(adaptAlertItem),
    [analyticsData?.alerts]
  );
  const urgentCount = alerts.filter((a) => a.severity === "danger").length;
  const userName = session?.name ?? "Admin";

  return (
    <nav
      aria-label="Admin navigation"
      className={cn(
        "hidden min-[980px]:flex flex-col",
        "w-[232px] shrink-0 sticky top-0 h-screen",
        "bg-[var(--paper)] border-r border-[var(--rule)]",
        "px-[16px] py-[24px]"
      )}
    >
      {/* Brand chip */}
      <Link
        href="/admin/analytics"
        className={cn(
          "inline-flex items-center gap-[8px]",
          "px-[12px] py-[6px] mb-[6px]",
          "rounded-[var(--r-pill)] border border-[var(--rule)]",
          "font-serif text-[19px] text-[var(--ink)]",
          "w-fit transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
        aria-label="ProxiServe Admin — go to analytics"
      >
        <span
          className="w-[8px] h-[8px] rounded-full bg-[var(--brand)] shrink-0"
          aria-hidden="true"
        />
        Proxi<em className="italic font-normal">Serve</em>
      </Link>

      {/* Role label */}
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--brand)] px-[12px] mb-[24px]">
        Admin
      </span>

      {/* Navigation */}
      <div className="flex flex-col gap-[2px] mb-[24px]">
        {NAV_ITEMS.map((item) => {
          const isActive = item.matchFn(pathname);
          return (
            <SideNavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              id={item.id}
              badge={
                item.href === "/admin/oversight" && urgentCount > 0
                  ? urgentCount
                  : undefined
              }
            />
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Dark mode toggle */}
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "flex items-center gap-[8px] px-[10px] py-[8px] mb-[12px]",
          "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink-muted)]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        <span>{darkMode ? "Light mode" : "Dark mode"}</span>
      </button>

      {/* User chip */}
      <div
        className={cn(
          "flex items-center gap-[10px] px-[10px] py-[8px]",
          "rounded-[var(--r-md)] border border-[var(--rule)]"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "w-[32px] h-[32px] rounded-full shrink-0",
            "flex items-center justify-center",
            "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
            "font-mono text-[12px] font-medium"
          )}
        >
          {getInitials(userName)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">
            {userName}
          </span>
          <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--brand)]">
            MANAGER
          </span>
        </div>
      </div>
    </nav>
  );
}
