import { DashStatusDot } from "@/components/atoms/DashStatusDot";
import type { AgentRow } from "@/types";

interface DashAgentRowProps {
  agent: AgentRow;
  isLast?: boolean;
}

const healthLabel: Record<AgentRow["health"], string> = {
  running: "Running",
  idle: "Idle",
  paused: "Paused",
};

export function DashAgentRow({ agent, isLast }: DashAgentRowProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[160px_1fr_60px_80px_36px] lg:grid-cols-[200px_1fr_80px_100px_40px] items-center gap-1 sm:gap-3 py-2.5 text-[13px]"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2 font-medium" style={{ color: "var(--text)" }}>
        <span
          className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[14px] flex-shrink-0"
          style={{
            background: agent.color + "18",
            border: `1px solid ${agent.color}44`,
          }}
        >
          {agent.emoji}
        </span>
        <span className="truncate">{agent.name}</span>
      </div>

      <span
        className="truncate text-[13px] pl-9 sm:pl-0"
        style={{ color: "var(--text-muted)" }}
      >
        {agent.task}
      </span>

      <code
        className="text-[12px] pl-9 sm:pl-0 hidden sm:block"
        style={{
          color: "var(--text-subtle)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
        }}
      >
        {agent.runtime}
      </code>

      <span className="hidden sm:flex items-center gap-1.5 text-[12px]" style={{ color: "var(--text-muted)" }}>
        <DashStatusDot variant={agent.health} pulse={agent.health === "running"} />
        {healthLabel[agent.health]}
      </span>

      <button
        className="text-[11px] font-medium bg-transparent border-none cursor-pointer px-1.5 py-0.5 rounded self-start sm:self-center"
        style={{ color: "var(--brand)", fontFamily: "inherit" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-soft)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Why?
      </button>
    </div>
  );
}
