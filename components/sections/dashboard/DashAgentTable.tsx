import { DashSectionTitle } from "@/components/atoms/DashSectionTitle";
import { DashAgentRow } from "@/components/molecules/DashAgentRow";
import { DASH_AGENTS } from "@/lib/data/dashboard";

export function DashAgentTable() {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <DashSectionTitle>Agent Status</DashSectionTitle>
      <div>
        <div
          className="hidden sm:grid sm:grid-cols-[160px_1fr_60px_80px_36px] lg:grid-cols-[200px_1fr_80px_100px_40px] gap-3 py-2 text-[11px] font-semibold uppercase tracking-[0.04em] border-b"
          style={{ color: "var(--text-subtle)", borderColor: "var(--border)" }}
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
