interface AuthPanelStepProps {
  num: string;
  title: string;
  desc: string;
}

export function AuthPanelStep({ num, title, desc }: AuthPanelStepProps) {
  return (
    <div className="flex gap-3">
      <span className="font-mono text-[12px] text-[var(--text-subtle)] flex-shrink-0 mt-[2px]">
        {num}
      </span>
      <div>
        <strong className="block text-[14px] text-[var(--text)] mb-[2px]">{title}</strong>
        <p className="text-[13px] text-[var(--text-muted)] m-0">{desc}</p>
      </div>
    </div>
  );
}
