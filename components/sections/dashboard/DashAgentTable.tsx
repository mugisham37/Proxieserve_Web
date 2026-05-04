import { DashSectionTitle } from "@/components/atoms/DashSectionTitle";
import { DashAgentRow } from "@/components/molecules/DashAgentRow";
import { DASH_AGENTS } from "@/lib/data/dashboard";

export function DashAgentTable() {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <DashSectionTitle>Agent Status</DashSectionTitle>
      <div>
        <div
          className="hidden sm:grid gap-3 py-2 text-[11px] font-semibold uppercase tracking-[0.04em] border-b"
          style={{
            gridTemplateColumns: "200px 1fr 80px 100px 40px",
            color: "var(--text-subtle)",
            borderColor: "var(--border)",
          }}
        >
          <span>Agent</span>
          <span>Current Task</span>
          <span>Runtime</span>
          <span>Health</span>
          <span />
        </div>
        {DASH_AGENTS.map((agent, i) => (
          <DashAgentRow
            key={i}
            agent={agent}
            isLast={i === DASH_AGENTS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
