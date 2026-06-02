import * as React from "react";

interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-center py-[14px] border-t border-[var(--rule)] first:border-t-0">
      <div className="min-w-0">
        <p className="font-sans text-[13px] font-semibold text-[var(--ink)] m-0 leading-snug">
          {label}
        </p>
        {description && (
          <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-[2px] m-0 leading-snug">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {children}
      </div>
    </div>
  );
}
