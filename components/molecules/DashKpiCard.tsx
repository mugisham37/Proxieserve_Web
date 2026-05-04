import { DashKpiBadge } from "@/components/atoms/DashKpiBadge";
import { DashSparkline } from "@/components/molecules/DashSparkline";
import { MkIcon } from "@/components/atoms/MkIcon";
import type { KpiCard } from "@/types";

interface DashKpiCardProps {
  data: KpiCard;
  index: number;
  whyOpen: number | null;
  onWhyToggle: (i: number | null) => void;
}

export function DashKpiCard({ data, index, whyOpen, onWhyToggle }: DashKpiCardProps) {
  const isOpen = whyOpen === index;

  return (
    <div
      className="relative rounded-[var(--radius-lg)] border p-4"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[12px]" style={{ color: "var(--text-subtle)" }}>
          {data.label}
        </span>
        <button
          className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-transparent border-none cursor-pointer transition-colors"
          style={{ color: "var(--brand)", fontFamily: "inherit" }}
          onClick={() => onWhyToggle(isOpen ? null : index)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--brand-soft)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Why?
        </button>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span
          className="font-mono text-[20px] font-semibold"
          style={{
            color: "var(--text)",
            fontFeatureSettings: '"tnum"',
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
        >
          {data.value}
        </span>
        <DashKpiBadge value={data.delta} up={data.up} />
      </div>

      <DashSparkline points={data.spark} up={data.up} />

      <span className="block text-[11px] mt-1" style={{ color: "var(--text-subtle)" }}>
        {data.sub}
      </span>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-2 right-2 rounded-[var(--radius-lg)] p-3.5 z-20"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px rgba(0,0,0,.15)",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <strong className="text-[13px]">Why this number?</strong>
            <button
              onClick={() => onWhyToggle(null)}
              className="flex rounded p-0.5 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-subtle)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <MkIcon name="x" size={14} />
            </button>
          </div>
          <p className="text-[13px] font-medium mb-1.5" style={{ color: "var(--text)" }}>
            SolAI optimised budget allocation based on 7-day rolling performance.
          </p>
          <ul className="list-none p-0 m-0 mb-2">
            {[
              "Reels CTR 3.2% — 1.8× above Feed average",
              "CPA tracking 18% under target",
              "Budget shifted from underperformers automatically",
            ].map((point, i) => (
              <li
                key={i}
                className="text-[12px] py-0.5 pl-3 relative"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="absolute left-0.5 font-bold"
                  style={{ color: "var(--text-subtle)" }}
                >
                  ·
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div
            className="flex items-center gap-2 pt-1.5 border-t text-[11px]"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-medium" style={{ color: "var(--brand)" }}>
              Real-time Optimizer
            </span>
            <code
              className="font-mono text-[10px]"
              style={{ color: "var(--text-subtle)", fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              run_7f3a…e91c
            </code>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-[11px] font-medium mt-1.5"
            style={{ color: "var(--brand)" }}
          >
            Open full decision <MkIcon name="arrowRight" size={12} />
          </a>
        </div>
      )}
    </div>
  );
}
