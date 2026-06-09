"use client";

import * as React from "react";
import { Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatTile } from "@/components/atoms/admin/StatTile";
import { QueueTable } from "@/components/organisms/QueueTable";
import { KbdHintBar, QUEUE_HINTS } from "@/components/molecules/system/KbdHintBar";
import { useAgentState, useAgentDispatch } from "@/lib/agent-context";
import { getAgentStats } from "@/lib/agent-data";

function getGreeting(firstName: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${firstName}.`;
  if (hour < 17) return `Good afternoon, ${firstName}.`;
  return `Good evening, ${firstName}.`;
}

export default function AgentTodayPage() {
  const { user, cases } = useAgentState();
  const dispatch = useAgentDispatch();

  const stats = getAgentStats(cases);
  const openCount = cases.filter((c) => c.status !== "completed").length;
  const needsYouCount = cases.filter(
    (c) => c.slaState === "over" || c.priority === "high"
  ).length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // J / K keyboard queue navigation
  const { queueFocusIndex } = useAgentState();
  const focusIndexRef = React.useRef(queueFocusIndex);
  focusIndexRef.current = queueFocusIndex;

  React.useEffect(() => {
    const openCases = cases.filter((c) => c.status !== "completed");
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) return;

      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        dispatch({
          type: "SET_FOCUS_INDEX",
          payload: Math.min(focusIndexRef.current + 1, openCases.length - 1),
        });
      }
      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        dispatch({
          type: "SET_FOCUS_INDEX",
          payload: Math.max(focusIndexRef.current - 1, 0),
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cases, dispatch]);

  return (
    <>
      <div className="px-[20px] min-[980px]:px-[32px] py-[28px] max-w-[1200px]">
        {/* Greeting */}
        <div className="flex items-start justify-between gap-[16px] mb-[28px] flex-wrap">
          <div>
            <h1 className="font-serif text-[28px] min-[980px]:text-[34px] font-normal text-[var(--ink)] mb-[6px]">
              {getGreeting(user.firstName).replace(user.firstName, "")}
              <em className="italic font-normal">{user.firstName}.</em>
            </h1>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]">
              {today.toUpperCase()} · {openCount} OPEN CASES · {needsYouCount} NEED YOU TODAY
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              aria-label="Export case list"
              className={cn(
                "flex items-center gap-[6px] px-[14px] h-[36px] rounded-[var(--r-pill)]",
                "border border-[var(--rule)]",
                "font-sans text-[13px] text-[var(--ink-muted)]",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--paper)] hover:text-[var(--ink)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              )}
            >
              <Download size={14} />
              Export
            </button>
            <button
              type="button"
              aria-label="Create new case"
              className={cn(
                "flex items-center gap-[6px] px-[14px] h-[36px] rounded-[var(--r-pill)]",
                "bg-[var(--ink)] text-[var(--paper)]",
                "font-sans text-[13px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--ink-2)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              )}
            >
              <Plus size={14} />
              New case
            </button>
          </div>
        </div>

        {/* Stat tiles */}
        <section aria-label="Summary statistics" className="mb-[32px]">
          <div className="grid grid-cols-2 min-[760px]:grid-cols-4 gap-[12px]">
            <StatTile
              label="Action required"
              value={stats.actionRequired}
              delta={`${stats.overSLA} over SLA · act now`}
              deltaColor={stats.overSLA > 0 ? "brand" : "muted"}
            />
            <StatTile
              label="In progress"
              value={stats.inProgress}
              delta="↑ 2 since yesterday"
              deltaColor="muted"
            />
            <StatTile
              label="Awaiting authority"
              value={stats.awaitingAuthority}
              delta="avg 4 days waiting"
              deltaColor="muted"
            />
            <StatTile
              label="Done this week"
              value={stats.doneThisWeek}
              delta="5.2 day avg turnaround"
              deltaColor="ok"
            />
          </div>
        </section>

        {/* Needs you today */}
        {needsYouCount > 0 && (
          <section aria-label="Cases needing you today" className="mb-[32px]">
            <div className="flex items-center gap-[10px] mb-[12px]">
              <h2 className="font-serif text-[18px] font-normal text-[var(--ink)]">
                Needs you <em className="italic font-normal">today</em>
              </h2>
              <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
                {needsYouCount} cases
              </span>
            </div>
            <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] overflow-hidden">
              <QueueTable showNeeds />
            </div>
          </section>
        )}

        {/* All my cases */}
        <section aria-label="All my cases">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <h2 className="font-serif text-[18px] font-normal text-[var(--ink)]">
              All my <em className="italic font-normal">cases</em>
            </h2>
          </div>
          <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] overflow-hidden">
            <QueueTable />
          </div>
        </section>
      </div>

      {/* Keyboard hints */}
      <KbdHintBar hints={QUEUE_HINTS} />
    </>
  );
}
