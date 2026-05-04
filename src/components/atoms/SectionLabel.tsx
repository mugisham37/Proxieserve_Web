interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
