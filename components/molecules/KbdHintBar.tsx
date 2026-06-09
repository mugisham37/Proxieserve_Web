import * as React from "react";
import { cn } from "@/lib/utils";
import { KbdHint } from "@/components/atoms/KbdHint";

interface HintItem {
  keys: string[];
  label: string;
}

interface KbdHintBarProps {
  hints: HintItem[];
  className?: string;
}

export function KbdHintBar({ hints, className }: KbdHintBarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hidden min-[980px]:flex items-center gap-[20px] flex-wrap",
        "px-[32px] py-[10px]",
        "border-t border-[var(--rule)]",
        "bg-[var(--paper)]",
        className
      )}
    >
      {hints.map((hint, i) => (
        <span
          key={i}
          className="flex items-center gap-[5px] text-[var(--ink-subtle)]"
        >
          {hint.keys.map((k, j) => (
            <KbdHint key={j}>{k}</KbdHint>
          ))}
          <span className="font-sans text-[11px]">{hint.label}</span>
        </span>
      ))}
    </div>
  );
}

// ─── Pre-built hint sets ──────────────────────────────────────────────────────

export const QUEUE_HINTS: HintItem[] = [
  { keys: ["/"], label: "search" },
  { keys: ["J"], label: "down" },
  { keys: ["K"], label: "up" },
  { keys: ["↵"], label: "open" },
  { keys: ["E"], label: "status" },
  { keys: ["A"], label: "assign to me" },
  { keys: ["?"], label: "all shortcuts" },
];

export const CASE_HINTS: HintItem[] = [
  { keys: ["E"], label: "change status" },
  { keys: ["R"], label: "reply" },
  { keys: ["N"], label: "internal note" },
  { keys: ["D"], label: "documents" },
  { keys: ["⌘", "↵"], label: "send" },
  { keys: ["[", "]"], label: "prev / next case" },
];
