import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InternalNoteBubbleProps {
  body: string;
  senderName: string;
  timestamp: string;
  className?: string;
}

export function InternalNoteBubble({
  body,
  senderName,
  timestamp,
  className,
}: InternalNoteBubbleProps) {
  return (
    <div
      aria-label="Internal note — only agents see this"
      className={cn(
        "rounded-[var(--r-md)] p-[14px]",
        "bg-[var(--warn-soft)] border border-[var(--warn)]/30",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-[6px] mb-[8px]">
        <AlertTriangle
          size={13}
          className="text-[var(--warn)] shrink-0"
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--warn)]">
          Internal note
        </span>
        <span className="font-mono text-[10px] text-[var(--ink-muted)] ml-auto">
          {senderName} · {timestamp}
        </span>
      </div>

      {/* Body */}
      <p className="font-sans text-[13px] text-[var(--ink)] leading-[1.5]">
        {body}
      </p>

      {/* Footer */}
      <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--warn)] mt-[8px]">
        Only agents see this
      </p>
    </div>
  );
}
