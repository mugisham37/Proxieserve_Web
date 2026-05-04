"use client";

interface ObBudgetCardProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
}

export function ObBudgetCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: ObBudgetCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[14px] text-[var(--text-muted)]">{label}</span>
        <span
          className="text-[18px] font-semibold text-[var(--text)]"
          style={{ fontFamily: "var(--font-mono)", fontFeatureSettings: '"tnum"' }}
        >
          {formatValue(value)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[6px] rounded-[9999px] outline-none cursor-pointer appearance-none"
        style={{
          background: `linear-gradient(to right, var(--brand) ${((value - min) / (max - min)) * 100}%, var(--surface-2) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />

      <div
        className="flex justify-between text-[11px] text-[var(--text-subtle)] mt-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
