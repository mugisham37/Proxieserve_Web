interface ComplianceBadgeProps {
  children: React.ReactNode;
}

export function ComplianceBadge({ children }: ComplianceBadgeProps) {
  return (
    <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-surface-2 text-text-subtle border border-border uppercase tracking-[0.04em]">
      {children}
    </span>
  );
}
