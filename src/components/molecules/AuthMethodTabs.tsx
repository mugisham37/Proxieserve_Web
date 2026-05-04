"use client";

import type { AuthMethod } from "@/src/types";

const TABS: { id: AuthMethod; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "passkey", label: "Passkey" },
  { id: "magic", label: "Magic link" },
];

interface AuthMethodTabsProps {
  value: AuthMethod;
  onChange: (v: AuthMethod) => void;
}

export function AuthMethodTabs({ value, onChange }: AuthMethodTabsProps) {
  return (
    <div
      role="tablist"
      className="flex gap-[2px] bg-[var(--surface-2)] border border-[var(--border)] rounded-[10px] p-[3px] mb-6"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className="flex-1 py-2 px-3 text-[13px] font-medium rounded-[8px] cursor-pointer transition-all duration-[120ms] focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-[1px]"
          style={{
            background: value === tab.id ? "var(--brand)" : "transparent",
            color: value === tab.id ? "#fff" : "var(--text-muted)",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
