import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/StatusPill";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import type { AdminAgent } from "@/lib/types/admin";
interface AgentPerfRowProps {
  agent: AdminAgent;
  className?: string;
}

const statusMap: Record<
  AdminAgent["status"],
  { label: string; variant: "ok" | "warn" | "danger" }
> = {
  active: { label: "Active", variant: "ok" },
  away: { label: "Away", variant: "warn" },
  offline: { label: "Offline", variant: "danger" },
};

export function AgentPerfRow({ agent, className }: AgentPerfRowProps) {
  const loadPct = Math.round((agent.load / agent.capacity) * 100);

  return (
    <tr
      className={cn(
        "border-b border-[var(--rule-soft)]",
        "transition-colors duration-[var(--m-fast)]",
        "hover:bg-[var(--paper-2)]",
        className
      )}
    >
      {/* Agent */}
      <td className="px-[16px] py-[12px]">
        <div className="flex items-center gap-[10px]">
          <div
            aria-hidden="true"
            className={cn(
              "w-[32px] h-[32px] shrink-0 rounded-full",
              "flex items-center justify-center",
              "bg-[var(--ink)] text-[var(--paper)]",
              "font-mono text-[11px] font-medium"
            )}
          >
            {agent.initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">
              {agent.fullName}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)] truncate">
              {agent.role}
            </span>
          </div>
        </div>
      </td>

      {/* Active */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {agent.activeCases}
      </td>

      {/* Completed */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {agent.completedTotal}
      </td>

      {/* Turnaround */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {agent.avgTurnaround}
      </td>

      {/* SLA% */}
      <td className="px-[12px] py-[12px]">
        <div className="flex items-center gap-[8px] justify-end">
          <span
            className={cn(
              "font-mono text-[13px]",
              agent.slaPercent >= 90
                ? "text-[var(--ok)]"
                : agent.slaPercent >= 80
                ? "text-[var(--warn)]"
                : "text-[var(--danger)]"
            )}
          >
            {agent.slaPercent}%
          </span>
        </div>
      </td>

      {/* Load */}
      <td className="px-[12px] py-[12px] min-w-[100px]">
        <div className="flex items-center gap-[8px]">
          <ProgressBar
            value={loadPct}
            className="flex-1"
          />
          <span
            className={cn(
              "font-mono text-[10px] shrink-0",
              loadPct >= 90
                ? "text-[var(--danger)]"
                : loadPct >= 70
                ? "text-[var(--warn)]"
                : "text-[var(--ok)]"
            )}
          >
            {agent.load}/{agent.capacity}
          </span>
        </div>
      </td>

      {/* Rating */}
      <td className="px-[12px] py-[12px]">
        <div className="flex items-center gap-[4px] justify-end">
          <Star
            size={12}
            className="fill-[var(--warn)] text-[var(--warn)] shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono text-[13px] text-[var(--ink)]">
            {agent.rating.toFixed(1)}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-[12px] py-[12px] pr-[16px]">
        <StatusPill
          label={statusMap[agent.status].label}
          variant={statusMap[agent.status].variant}
        />
      </td>
    </tr>
  );
}
