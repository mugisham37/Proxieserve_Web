interface LangChipProps {
  children: React.ReactNode;
}

export function LangChip({ children }: LangChipProps) {
  return (
    <span className="text-[12px] font-medium px-2.5 py-1 rounded-sm bg-brand-soft text-brand">
      {children}
    </span>
  );
}
