import * as React from "react";
import { cn } from "@/lib/utils";
import type { BroadcastRecord } from "@/lib/types/admin";

interface RecentBroadcastRowProps {
  record: BroadcastRecord;
}

const CHANNEL_LABELS: Record<string, { label: string; color: string }> = {
  whatsapp: { label: "WhatsApp", color: "bg-[var(--ok-soft)] text-[var(--ok)]" },
  sms: { label: "SMS", color: "bg-[var(--warn-soft)] text-[var(--warn)]" },
  email: { label: "Email", color: "bg-[var(--info-soft)] text-[var(--info)]" },
  "in-app": { label: "In-app", color: "bg-[var(--brand-soft)] text-[var(--brand-ink)]" },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export function RecentBroadcastRow({ record }: RecentBroadcastRowProps) {
  return (
    <tr className="border-b border-[var(--rule-soft)] transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]">
      {/* Audience */}
      <td className="px-[16px] py-[12px] font-sans text-[13px] text-[var(--ink)]">
        {record.audience}
      </td>

      {/* Channels */}
      <td className="px-[12px] py-[12px]">
        <div className="flex flex-wrap gap-[4px]">
          {record.channels.map((ch) => {
            const style = CHANNEL_LABELS[ch] ?? {
              label: ch,
              color: "bg-[var(--paper-2)] text-[var(--ink-muted)]",
            };
            return (
              <span
                key={ch}
                className={cn(
                  "px-[6px] py-[2px] rounded-[var(--r-sm)]",
                  "font-mono text-[10px] tracking-[0.04em]",
                  style.color
                )}
              >
                {style.label}
              </span>
            );
          })}
        </div>
      </td>

      {/* Message preview */}
      <td className="px-[12px] py-[12px] max-w-[280px]">
        <p className="font-sans text-[12px] text-[var(--ink-muted)] line-clamp-2 leading-[1.4]">
          {record.message}
        </p>
      </td>

      {/* Sent at */}
      <td className="px-[12px] py-[12px] font-mono text-[11px] text-[var(--ink-muted)] whitespace-nowrap">
        {formatDate(record.sentAt)}
      </td>

      {/* Reach */}
      <td className="px-[12px] py-[12px] pr-[16px] font-mono text-[13px] text-[var(--ink)] text-right">
        {record.reach.toLocaleString()}
      </td>
    </tr>
  );
}
