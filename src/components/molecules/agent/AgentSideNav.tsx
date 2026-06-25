"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  FolderOpen,
  MessageSquare,
  Inbox,
  BarChart2,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SideNavLink } from "@/components/molecules/system/SideNavLink";
import { UserChip } from "@/components/molecules/shared/UserChip";
import { AvailabilityDot } from "@/components/atoms/agent/AvailabilityDot";
import { useAgentState, useAgentDispatch, useToggleAvailability } from "@/lib/agent-context";
import { adaptAgentCaseSummary, getInitials } from "@/lib/agent-adapters";
import { useAgentCases, useUnassignedCases } from "@/hooks/useAgentCases";
import { useSession } from "@/hooks/useSession";

export function AgentSideNav() {
  const pathname = usePathname();
  const { availability, darkMode } = useAgentState();
  const dispatch = useAgentDispatch();
  const toggleAvailability = useToggleAvailability();
  const { session } = useSession();
  const { data } = useAgentCases();
  const { data: unassignedData } = useUnassignedCases();

  const cases = React.useMemo(
    () => (data?.cases ?? []).map(adaptAgentCaseSummary),
    [data?.cases]
  );
  const caseCount = cases.filter((c) => c.status !== "completed").length;
  const actionCount = cases.filter((c) => c.status === "action-required").length;
  const unassignedCount = unassignedData?.count ?? 0;
  const userName = session?.name ?? "Agent";

  return (
    <nav
      aria-label="Agent navigation"
      className={cn(
        "hidden min-[980px]:flex flex-col",
        "w-[232px] shrink-0 sticky top-0 h-screen",
        "bg-[var(--paper)] border-r border-[var(--rule)]",
        "px-[16px] py-[24px]"
      )}
    >
      {/* Brand chip */}
      <Link
        href="/agent"
        className={cn(
          "inline-flex items-center gap-[8px]",
          "px-[12px] py-[6px] mb-[10px]",
          "rounded-[var(--r-pill)] border border-[var(--rule)]",
          "font-serif text-[19px] text-[var(--ink)]",
          "w-fit transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
        aria-label="Hebuza Agent — go to today's queue"
      >
        <span
          className="w-[8px] h-[8px] rounded-full bg-[var(--brand)] shrink-0"
          aria-hidden="true"
        />
        Proxi<em className="italic font-normal">Serve</em>
      </Link>

      {/* Role label */}
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-subtle)] px-[12px] mb-[24px]">
        Agent
      </span>

      {/* Work group */}
      <div className="flex flex-col gap-[2px] mb-[24px]">
        <h6 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] px-[10px] mb-[4px]">
          Work
        </h6>
        <SideNavLink
          href="/agent"
          icon={<CalendarDays size={16} />}
          label="Today"
          isActive={pathname === "/agent"}
        />
        <SideNavLink
          href="/agent"
          icon={<FolderOpen size={16} />}
          label="My cases"
          badge={caseCount}
          isActive={false}
          id="onboard-case-queue"
        />
        <SideNavLink
          href="/agent"
          icon={<MessageSquare size={16} />}
          label="Messages"
          badge={actionCount > 0 ? actionCount : undefined}
          isActive={false}
        />
        <SideNavLink
          href="/agent/unassigned"
          icon={<Inbox size={16} />}
          label="Unassigned"
          badge={unassignedCount}
          isActive={pathname === "/agent/unassigned"}
        />
      </div>

      {/* Me group */}
      <div className="flex flex-col gap-[2px] mb-[24px]">
        <h6 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] px-[10px] mb-[4px]">
          Me
        </h6>
        <SideNavLink
          href="/agent/performance"
          icon={<BarChart2 size={16} />}
          label="Performance"
          isActive={pathname === "/agent/performance"}
        />
        <SideNavLink
          href="/agent/performance#settings"
          icon={<Settings size={16} />}
          label="Settings"
          isActive={false}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "flex items-center gap-[8px] px-[10px] py-[8px]",
          "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink-muted)]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        <span>{darkMode ? "Light mode" : "Dark mode"}</span>
      </button>

      {/* Availability toggle */}
      <button
        type="button"
        onClick={toggleAvailability}
        aria-label={`Status: ${availability === "available" ? "Available" : "Away"} — click to toggle`}
        className={cn(
          "flex items-center gap-[8px] px-[10px] py-[8px] mb-[12px]",
          "rounded-[var(--r-md)] font-sans text-[13px]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          availability === "available"
            ? "text-[var(--ok)]"
            : "text-[var(--warn)]"
        )}
      >
        <AvailabilityDot status={availability} />
        <span className="font-medium">
          {availability === "available" ? "Available" : "Away"}
        </span>
      </button>

      {/* User chip */}
      <UserChip
        initials={getInitials(userName)}
        fullName={userName}
        role="agent"
        city=""
      />
    </nav>
  );
}
