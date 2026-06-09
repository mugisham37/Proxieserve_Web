"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  FolderOpen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SideNavLink } from "@/components/molecules/system/SideNavLink";
import { UserChip } from "@/components/molecules/shared/UserChip";
import { ThemeToggle } from "@/components/atoms/shared/ThemeToggle";
import { TOTAL_APP_COUNT } from "@/lib/dashboard-data";
import type { DashboardUser } from "@/lib/types/dashboard";

// The first/most urgent application code — used for deep links
const PRIMARY_APP = "PRX-2026-00483";

interface SideNavProps {
  user: DashboardUser;
  unreadCount?: number;
  actionCount?: number;
  onSignOut?: () => void;
  className?: string;
}

export function SideNav({
  user,
  unreadCount = 0,
  actionCount = 0,
  onSignOut,
  className,
}: SideNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const isOnApp = pathname.startsWith("/app/");

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "hidden min-[980px]:flex flex-col",
        "w-[240px] shrink-0 sticky top-0 h-screen",
        "bg-[var(--paper)] border-r border-[var(--rule)]",
        "px-[16px] py-[24px]",
        className
      )}
    >
      {/* Brand chip — ● Proxi<em>Serve</em> */}
      <Link
        href="/dashboard"
        className={cn(
          "inline-flex items-center gap-[8px]",
          "px-[12px] py-[6px] mb-[28px]",
          "rounded-[var(--r-pill)] border border-[var(--rule)]",
          "font-serif text-[19px] text-[var(--ink)]",
          "w-fit transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
        aria-label="ProxiServe — go to dashboard"
      >
        <span
          className="w-[8px] h-[8px] rounded-full bg-[var(--brand)] shrink-0"
          aria-hidden="true"
        />
        Proxi<em className="italic font-normal">Serve</em>
      </Link>

      {/* Main nav group */}
      <div className="flex flex-col gap-[2px] mb-[24px]">
        <h6 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] px-[10px] mb-[4px]">
          Main
        </h6>
        <SideNavLink
          href="/dashboard"
          icon={<LayoutDashboard size={16} />}
          label="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <SideNavLink
          href={`/app/${PRIMARY_APP}`}
          icon={<FileText size={16} />}
          label="Applications"
          badge={TOTAL_APP_COUNT}
          isActive={isOnApp && activeTab !== "messages" && activeTab !== "documents"}
        />
        <SideNavLink
          href={`/app/${PRIMARY_APP}?tab=messages`}
          icon={<MessageSquare size={16} />}
          label="Messages"
          badge={unreadCount}
          isActive={isOnApp && activeTab === "messages"}
          id="onboard-messages"
        />
        <SideNavLink
          href={`/app/${PRIMARY_APP}?tab=documents`}
          icon={<FolderOpen size={16} />}
          label="Documents"
          isActive={isOnApp && activeTab === "documents"}
        />
      </div>

      {/* Separator */}
      <div className="border-t border-[var(--rule)] mb-[24px]" />

      {/* Account group */}
      <div className="flex flex-col gap-[2px] mb-[24px]">
        <h6 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] px-[10px] mb-[4px]">
          Account
        </h6>
        <SideNavLink
          href="/settings"
          icon={<Settings size={16} />}
          label="Settings"
          isActive={pathname === "/settings"}
        />
        <SideNavLink
          href="/contact"
          icon={<HelpCircle size={16} />}
          label="Help"
          isActive={false}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <ThemeToggle variant="row" />

      {/* Sign out */}
      {onSignOut && (
        <button
          type="button"
          onClick={onSignOut}
          className={cn(
            "flex items-center gap-[8px] px-[10px] py-[8px] mb-[12px]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink-muted)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          ← Sign out
        </button>
      )}

      {/* User chip */}
      <UserChip
        initials={user.initials}
        fullName={user.fullName}
        role={user.role}
        city={user.city}
      />
    </nav>
  );
}
