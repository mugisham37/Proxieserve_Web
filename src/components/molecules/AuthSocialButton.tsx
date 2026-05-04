"use client";

import { MkIcon } from "@/src/components/atoms/MkIcon";
import type { IconName } from "@/src/types";

interface AuthSocialButtonProps {
  icon: IconName;
  label: string;
  onClick?: () => void;
}

export function AuthSocialButton({ icon, label, onClick }: AuthSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-3 py-[10px] text-[13px] font-medium bg-[var(--surface)] border border-[var(--border)] rounded-[10px] text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] hover:border-[var(--text-subtle)] transition-all duration-[120ms] focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
    >
      <MkIcon name={icon} size={18} />
      {label}
    </button>
  );
}
