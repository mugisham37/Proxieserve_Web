interface DashKpiBadgeProps {
  value: string;
  up: boolean;
}

export function DashKpiBadge({ value, up }: DashKpiBadgeProps) {
  return (
    <span
      className="font-mono text-[12px] font-medium"
      style={{ color: up ? "var(--success)" : "var(--danger)" }}
    >
      {value}
    </span>
  );
}
