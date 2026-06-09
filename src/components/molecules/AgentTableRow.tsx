import * as React from "react";
import { Check, AlertTriangle, UserMinus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/Tag";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { StatusPill } from "@/components/atoms/StatusPill";
import type { AdminAgent } from "@/lib/types/admin";

interface AgentTableRowProps {
  agent: AdminAgent;
  onRemove: () => void;
}

export function AgentTableRow({ agent, onRemove }: AgentTableRowProps) {
  const loadPct = Math.round((agent.load / agent.capacity) * 100);
  const statusMap = {
    active: { label: "Active", variant: "ok" as const },
    away: { label: "Away", variant: "warn" as const },
    offline: { label: "Offline", variant: "danger" as const },
  };
  const pill = statusMap[agent.status];

  return (
    <tr className="border-b border-[var(--rule-soft)] transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]">
      {/* Name */}
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
            <StatusPill label={pill.label} variant={pill.variant} size="md" />
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-[12px] py-[12px] font-mono text-[12px] text-[var(--ink-muted)] max-w-[180px]">
        <span className="truncate block">{agent.email}</span>
      </td>

      {/* Skills */}
      <td className="px-[12px] py-[12px]">
        <div className="flex flex-wrap gap-[4px] max-w-[200px]">
          {agent.skills.slice(0, 3).map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
          {agent.skills.length > 3 && (
            <Tag>+{agent.skills.length - 3}</Tag>
          )}
        </div>
      </td>

      {/* Load */}
      <td className="px-[12px] py-[12px] min-w-[120px]">
        <div className="flex items-center gap-[8px]">
          <ProgressBar
            value={loadPct}
            color={loadPct >= 90 ? "brand" : loadPct >= 70 ? "ink" : "ok"}
            className="flex-1"
          />
          <span
            className={cn(
              "font-mono text-[11px] shrink-0",
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

      {/* 2FA */}
      <td className="px-[12px] py-[12px] text-center">
        {agent.twoFa ? (
          <Check
            size={15}
            className="mx-auto text-[var(--ok)]"
            aria-label="2FA enabled"
          />
        ) : (
          <AlertTriangle
            size={15}
            className="mx-auto text-[var(--warn)]"
            aria-label="2FA not enabled"
          />
        )}
      </td>

      {/* Role */}
      <td className="px-[12px] py-[12px]">
        <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)]">
          {agent.role}
        </span>
      </td>

      {/* Remove */}
      <td className="px-[12px] py-[12px] pr-[16px]">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove agent ${agent.fullName}`}
          className={cn(
            "w-[28px] h-[28px] rounded-[var(--r-sm)]",
            "flex items-center justify-center",
            "text-[var(--ink-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]",
            "transition-colors duration-[var(--m-fast)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <UserMinus size={14} />
        </button>
      </td>
    </tr>
  );
}
