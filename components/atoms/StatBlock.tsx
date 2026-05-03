interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={`text-center ${className ?? ""}`}>
      <span className="block font-mono text-[clamp(28px,4vw,40px)] font-semibold text-text [font-feature-settings:'tnum']">
        {value}
      </span>
      <span className="block text-[13px] text-text-subtle mt-1">{label}</span>
    </div>
  );
}
