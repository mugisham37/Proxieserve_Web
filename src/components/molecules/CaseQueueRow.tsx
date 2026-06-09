"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PriorityDot } from "@/components/atoms/agent/PriorityDot";
import { SLABadge } from "@/components/atoms/agent/SLABadge";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import type { AgentCase } from "@/lib/types/agent";

const STATUS_VARIANT: Record<string, "brand" | "ok" | "warn" | "danger" | "info"> = {
  "action-required": "danger",
  "received": "info",
  "under-review": "info",
  "in-progress": "brand",
  "submitted-to-authority": "warn",
  "awaiting-response": "warn",
  "completed": "ok",
  "rejected": "danger",
};

const STATUS_LABEL: Record<string, string> = {
  "action-required": "Action required",
  "received": "Received",
  "under-review": "Under review",
  "in-progress": "In progress",
  "submitted-to-authority": "Submitted",
  "awaiting-response": "Awaiting",
  "completed": "Completed",
  "rejected": "Rejected",
};

interface CaseQueueRowProps {
  case_: AgentCase;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function CaseQueueRow({ case_: c, isFocused, onFocus }: CaseQueueRowProps) {
  const router = useRouter();
  const rowRef = React.useRef<HTMLTableRowElement>(null);

  React.useEffect(() => {
    if (isFocused) {
      rowRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isFocused]);

  const navigate = () => router.push(`/agent/case/${c.code}`);

  return (
    <tr
      ref={rowRef}
      tabIndex={0}
      aria-label={`Case ${c.code} — ${c.serviceName} for ${c.clientName}`}
      data-focused={isFocused || undefined}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate();
        }
        onFocus?.();
      }}
      onFocus={onFocus}
      className={cn(
        "cursor-pointer",
        "border-b border-[var(--rule)]",
        "transition-colors duration-[var(--m-fast)]",
        "focus-visible:outline-none",
        isFocused
          ? "bg-[var(--brand-soft)] shadow-[inset_3px_0_0_var(--brand)]"
          : "hover:bg-[var(--paper)]"
      )}
    >
      {/* Priority */}
      <td className="w-[32px] pl-[16px] py-[12px]">
        <PriorityDot priority={c.priority} />
      </td>

      {/* Code */}
      <td className="py-[12px] pr-[16px]">
        <span className="font-mono text-[12px] text-[var(--ink)] tracking-tight whitespace-nowrap">
          {c.code}
        </span>
      </td>

      {/* Service */}
      <td className="py-[12px] pr-[16px]">
        <span className="font-serif text-[14px] text-[var(--ink)]">
          {c.serviceNameBase}{" "}
          <em className="italic font-normal">{c.serviceNameItalic}</em>
        </span>
      </td>

      {/* Client */}
      <td className="py-[12px] pr-[16px]">
        <div className="flex items-center gap-[8px]">
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex items-center justify-center",
              "w-[28px] h-[28px] rounded-full shrink-0",
              "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
              "font-sans text-[11px] font-semibold"
            )}
          >
            {c.clientInitials}
          </span>
          <span className="font-sans text-[13px] text-[var(--ink)] truncate max-w-[120px]">
            {c.clientName}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="py-[12px] pr-[16px] hidden min-[760px]:table-cell">
        <StatusPill
          label={STATUS_LABEL[c.status] ?? c.status}
          variant={STATUS_VARIANT[c.status] ?? "info"}
        />
      </td>

      {/* Age / SLA */}
      <td className="py-[12px] pr-[16px] hidden min-[900px]:table-cell">
        {c.slaState !== "ok" ? (
          <SLABadge state={c.slaState} label={c.ageDisplay} />
        ) : (
          <span className="font-mono text-[12px] text-[var(--ink-subtle)]">
            {c.ageDisplay}
          </span>
        )}
      </td>

      {/* Next action */}
      <td className="py-[12px] pr-[16px] hidden min-[1080px]:table-cell">
        <span className="font-sans text-[13px] text-[var(--ink-muted)] truncate max-w-[220px] block">
          {c.nextAction}
        </span>
      </td>
    </tr>
  );
}
