import type { HealthStatus } from "@/types";

const colorMap: Record<HealthStatus, string> = {
  running: "var(--success)",
  idle: "var(--info)",
  paused: "var(--text-subtle)",
};

interface DashStatusDotProps {
  variant: HealthStatus;
  pulse?: boolean;
}

export function DashStatusDot({ variant, pulse = false }: DashStatusDotProps) {
  return (
    <span className="relative inline-flex items-center justify-center w-[6px] h-[6px]">
      {pulse && variant === "running" && (
        <span
          className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-60"
          style={{ background: colorMap[variant] }}
        />
      )}
      <span
        className="relative inline-flex w-[6px] h-[6px] rounded-full"
        style={{ background: colorMap[variant] }}
      />
    </span>
  );
}
