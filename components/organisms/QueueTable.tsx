"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CaseQueueRow } from "@/components/molecules/CaseQueueRow";
import { CaseCard } from "@/components/molecules/CaseCard";
import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";
import type { AgentCase, QueueTab } from "@/lib/types/agent";
import { useAgentState, useAgentDispatch, useFilteredCases, useCaseCounts } from "@/lib/agent-context";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const TABS: { key: QueueTab; label: string; countKey: keyof ReturnType<typeof useCaseCounts> }[] = [
  { key: "all", label: "All", countKey: "all" },
  { key: "action-required", label: "Action required", countKey: "actionRequired" },
  { key: "in-progress", label: "In progress", countKey: "inProgress" },
  { key: "awaiting-authority", label: "Awaiting authority", countKey: "awaitingAuthority" },
  { key: "completed", label: "Completed", countKey: "completed" },
];

interface QueueTableProps {
  loading?: boolean;
  showNeeds?: boolean; // true = render "Needs you today" (top 3 priority)
}

export function QueueTable({ loading, showNeeds }: QueueTableProps) {
  const { activeTab, cases, queueFocusIndex } = useAgentState();
  const dispatch = useAgentDispatch();
  const filteredCases = useFilteredCases(activeTab, cases);
  const counts = useCaseCounts(cases);

  const displayCases = showNeeds
    ? cases.filter((c) => c.slaState === "over" || c.priority === "high").slice(0, 3)
    : filteredCases;

  if (loading) {
    return (
      <div className="space-y-[2px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-[16px] px-[16px] py-[14px] border-b border-[var(--rule)]">
            <SkeletonBlock className="w-[7px] h-[7px] rounded-full mt-[5px]" />
            <SkeletonBlock className="w-[140px] h-[14px]" />
            <SkeletonBlock className="w-[120px] h-[14px]" />
            <SkeletonBlock className="w-[80px] h-[14px]" />
          </div>
        ))}
      </div>
    );
  }

  if (!showNeeds && displayCases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[64px] gap-[16px]">
        <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[var(--ok-soft)]">
          <CheckCircle size={28} className="text-[var(--ok)]" />
        </div>
        <div className="text-center">
          <p className="font-serif text-[22px] text-[var(--ink)] mb-[6px]">
            All caught <em className="italic font-normal">up.</em>
          </p>
          <p className="font-sans text-[13.5px] text-[var(--ink-muted)] max-w-[320px] leading-[1.5]">
            No cases need you right now. New assignments will appear here. Enjoy the breather — or pull from the unassigned pool.
          </p>
        </div>
        <Link
          href="/agent/unassigned"
          className={cn(
            "px-[16px] h-[36px] rounded-[var(--r-pill)]",
            "border border-[var(--rule)]",
            "font-sans text-[13px] text-[var(--ink-muted)]",
            "inline-flex items-center",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--paper)] hover:text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          Pull from unassigned (3)
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs — only shown for "All my cases" (not needs-you-today) */}
      {!showNeeds && (
        <div
          role="tablist"
          aria-label="Filter cases"
          className="flex items-center gap-[4px] flex-wrap px-[20px] min-[980px]:px-[32px] pt-[16px] pb-[12px] border-b border-[var(--rule)]"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              type="button"
              onClick={() => dispatch({ type: "SET_TAB", payload: tab.key })}
              className={cn(
                "inline-flex items-center gap-[6px]",
                "px-[12px] h-[30px] rounded-[var(--r-pill)]",
                "font-sans text-[12px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                activeTab === tab.key
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "text-[var(--ink-muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "min-w-[16px] h-[16px] px-[4px]",
                  "rounded-full font-mono text-[10px]",
                  activeTab === tab.key
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--cream)] text-[var(--ink-muted)]"
                )}
              >
                {counts[tab.countKey]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden min-[640px]:block overflow-x-auto">
        <table className="w-full" aria-label={showNeeds ? "Cases needing you today" : "All my cases"}>
          <thead>
            <tr className="border-b border-[var(--rule)]">
              <th scope="col" className="w-[32px] pl-[16px] py-[10px] text-left">
                <span className="sr-only">Priority</span>
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                Code
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                Service
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                Client
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] hidden min-[760px]:table-cell">
                Status
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] hidden min-[900px]:table-cell">
                Waiting
              </th>
              <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] hidden min-[1080px]:table-cell">
                Next action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayCases.map((c, idx) => (
              <CaseQueueRow
                key={c.code}
                case_={c}
                isFocused={!showNeeds && queueFocusIndex === idx}
                onFocus={() =>
                  dispatch({ type: "SET_FOCUS_INDEX", payload: idx })
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="min-[640px]:hidden grid grid-cols-1 gap-[8px] p-[16px]">
        {displayCases.map((c) => (
          <CaseCard key={c.code} case_={c} />
        ))}
      </div>
    </div>
  );
}
