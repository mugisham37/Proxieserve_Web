interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = "or continue with" }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[var(--border)]" />
      <span className="text-[12px] text-[var(--text-subtle)]">{text}</span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}
