"use client";

import { MkIcon } from "@/components/atoms/MkIcon";

interface AuthConsentRowProps {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  id?: string;
}

export function AuthConsentRow({
  checked,
  onCheckedChange,
  children,
  required,
  error,
  id,
}: AuthConsentRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-2 cursor-pointer text-[13px] text-[var(--text-muted)]">
        <button
          type="button"
          role="checkbox"
          id={id}
          aria-checked={checked}
          onClick={() => onCheckedChange(!checked)}
          className="w-[18px] h-[18px] rounded-[4px] border-[1.5px] flex items-center justify-center flex-shrink-0 mt-[1px] transition-all duration-[120ms]"
          style={{
            background: checked ? "var(--brand)" : "var(--bg)",
            borderColor: checked ? "var(--brand)" : error ? "var(--danger)" : "var(--border)",
            color: checked ? "#fff" : "transparent",
          }}
        >
          {checked && <MkIcon name="check" size={11} />}
        </button>
        <span>
          {children}
          {required !== undefined && (
            <em
              className="not-italic text-[11px] font-medium ml-1"
              style={{ color: required ? "var(--danger)" : "var(--text-subtle)" }}
            >
              {required ? "Required" : "Optional"}
            </em>
          )}
        </span>
      </label>
      {error && (
        <p role="alert" className="text-[12px] text-[var(--danger)] pl-6">
          {error}
        </p>
      )}
    </div>
  );
}
