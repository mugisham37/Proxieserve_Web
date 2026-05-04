"use client";

import { MkIcon } from "@/src/components/atoms/MkIcon";
import type { TwoFAMethod, IconName } from "@/src/types";

const METHOD_CONFIG: Record<TwoFAMethod, { icon: IconName; title: string; desc: string }> = {
  app: {
    icon: "smartphone",
    title: "Authenticator app",
    desc: "Google Authenticator, Authy, 1Password, etc.",
  },
  sms: {
    icon: "mail",
    title: "SMS",
    desc: "We'll text a code to your phone number.",
  },
};

interface TwoFAOptionCardProps {
  method: TwoFAMethod;
  selected: boolean;
  onClick: () => void;
}

export function TwoFAOptionCard({ method, selected, onClick }: TwoFAOptionCardProps) {
  const { icon, title, desc } = METHOD_CONFIG[method];

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className="flex items-center gap-[14px] p-4 w-full text-left border-[1.5px] rounded-[14px] cursor-pointer transition-all duration-[120ms] focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
      style={{
        background: selected ? "var(--brand-soft)" : "var(--surface)",
        borderColor: selected ? "var(--brand)" : "var(--border)",
      }}
    >
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-[120ms]"
        style={{
          background: selected ? "rgba(91,124,255,.15)" : "var(--surface-2)",
          color: selected ? "var(--brand)" : "var(--text-muted)",
        }}
      >
        <MkIcon name={icon} size={24} />
      </div>
      <div className="flex-1">
        <strong className="block text-[14px] text-[var(--text)]">{title}</strong>
        <p className="text-[12px] text-[var(--text-muted)] mt-[2px] m-0">{desc}</p>
      </div>
      <div
        className="w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors duration-[120ms]"
        style={{ borderColor: selected ? "var(--brand)" : "var(--border)" }}
      >
        {selected && (
          <div className="w-2 h-2 rounded-full bg-[var(--brand)]" />
        )}
      </div>
    </button>
  );
}
