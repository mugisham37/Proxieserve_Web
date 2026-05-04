interface NavBadgeProps {
  count: number;
}

export function NavBadge({ count }: NavBadgeProps) {
  if (count === 0) return null;
  return (
    <span className="absolute top-[4px] right-[4px] w-[16px] h-[16px] rounded-full bg-[var(--danger)] text-white text-[10px] font-semibold flex items-center justify-center leading-none">
      {count > 9 ? "9+" : count}
    </span>
  );
}
