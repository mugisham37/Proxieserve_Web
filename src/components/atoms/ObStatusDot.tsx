interface ObStatusDotProps {
  variant: "success" | "idle";
}

export function ObStatusDot({ variant }: ObStatusDotProps) {
  return (
    <span
      className="w-[6px] h-[6px] rounded-full flex-shrink-0 inline-block"
      style={{
        background: variant === "success" ? "var(--success)" : "var(--text-subtle)",
      }}
    />
  );
}
