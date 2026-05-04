interface AuthPanelStatProps {
  value: string;
  label: string;
}

export function AuthPanelStat({ value, label }: AuthPanelStatProps) {
  return (
    <div className="text-center p-3 bg-[var(--bg)] border border-[var(--border)] rounded-[10px]">
      <span className="block font-mono text-[20px] font-semibold text-[var(--text)]"
        style={{ fontFeatureSettings: '"tnum"' }}>
        {value}
      </span>
      <span className="text-[11px] text-[var(--text-subtle)] block mt-[2px]">{label}</span>
    </div>
  );
}
