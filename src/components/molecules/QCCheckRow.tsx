import * as React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentQCCheck } from "@/lib/types/agent";

interface QCCheckRowProps {
  check: DocumentQCCheck;
}

export function QCCheckRow({ check }: QCCheckRowProps) {
  const isPassing = check.state === "pass";
  const isWarning = check.state === "warn";

  return (
    <div className="flex items-start gap-[10px] py-[8px] border-b border-[var(--rule)] last:border-0">
      <span
        aria-hidden="true"
        className={cn(
          "mt-[1px] shrink-0",
          isPassing && "text-[var(--ok)]",
          isWarning && "text-[var(--warn)]",
          check.state === "fail" && "text-[var(--danger)]"
        )}
      >
        {isPassing ? (
          <Check size={14} />
        ) : (
          <AlertTriangle size={14} />
        )}
      </span>
      <div>
        <p
          className={cn(
            "font-sans text-[13px] font-medium",
            isPassing
              ? "text-[var(--ok)]"
              : isWarning
              ? "text-[var(--warn)]"
              : "text-[var(--danger)]"
          )}
        >
          {check.label}
        </p>
        {check.sublabel && (
          <p className="font-sans text-[11px] text-[var(--ink-muted)]">
            {check.sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
