import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsRowProps {
  label: string;
  description?: string;
  value?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SettingsRow({
  label,
  description,
  value,
  action,
  className,
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        "px-[28px] py-[16px] border-b border-[var(--rule)] last:border-b-0",
        "grid items-center gap-x-[16px] gap-y-[4px]",
        "grid-cols-1 sm:grid-cols-[220px_1fr_auto]",
        className
      )}
    >
      <div>
        <p className="font-sans text-[13px] font-medium text-[var(--ink)] leading-tight">
          {label}
        </p>
        {description && (
          <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-[2px] leading-tight">
            {description}
          </p>
        )}
      </div>
      {value !== undefined && (
        <p className="font-sans text-[13px] text-[var(--ink-muted)]">{value}</p>
      )}
      {action && <div className="sm:justify-self-end">{action}</div>}
    </div>
  );
}
