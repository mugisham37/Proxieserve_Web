import * as React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacySealProps {
  className?: string;
}

export function PrivacySeal({ className }: PrivacySealProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-[var(--ink-muted)]",
        className
      )}
    >
      <Lock size={13} strokeWidth={2} className="shrink-0 text-[var(--ink-subtle)]" />
      <span className="font-sans text-[12px] leading-tight">
        256-bit encrypted · RSSB compliant
      </span>
    </div>
  );
}
