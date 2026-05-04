interface RailBadgeProps {
  children: React.ReactNode;
}

export function RailBadge({ children }: RailBadgeProps) {
  return (
    <span className="text-[12px] font-medium px-2.5 py-1 rounded-sm bg-surface-2 text-text-muted border border-border">
      {children}
    </span>
  );
}
