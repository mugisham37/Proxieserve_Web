interface RecoveryCodeProps {
  index: number;
  code: string;
}

export function RecoveryCode({ index, code }: RecoveryCodeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-[6px]">
      <span className="text-[11px] text-[var(--text-subtle)] font-medium w-4 flex-shrink-0">
        {index + 1}
      </span>
      <code className="font-mono text-[13px] text-[var(--text)] font-medium tracking-[0.03em]">
        {code}
      </code>
    </div>
  );
}
