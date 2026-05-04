"use client";

interface ObSwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel?: string;
}

export function ObSwitch({ checked, onChange, ariaLabel }: ObSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className="w-[40px] h-[22px] rounded-[9999px] border relative cursor-pointer transition-all duration-[150ms] flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
      style={{
        background: checked ? "var(--brand)" : "var(--surface-2)",
        borderColor: checked ? "var(--brand)" : "var(--border)",
      }}
    >
      <span
        className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] left-[2px] transition-transform duration-[150ms]"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );
}
