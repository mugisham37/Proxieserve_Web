import { ObSwitch } from "@/src/components/atoms/ObSwitch";
import { ObStatusDot } from "@/src/components/atoms/ObStatusDot";

interface ObRailCardProps {
  label: string;
  desc: string;
  tag: string;
  active: boolean;
  detail?: string;
  onToggle: () => void;
}

export function ObRailCard({ label, desc, tag, active, detail, onToggle }: ObRailCardProps) {
  return (
    <div
      className="bg-[var(--surface)] border rounded-[14px] p-5 transition-colors duration-[120ms]"
      style={{ borderColor: active ? "rgba(91,124,255,0.3)" : "var(--border)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <strong className="block text-[15px] text-[var(--text)]">{label}</strong>
          <span
            className="block text-[10px] text-[var(--text-subtle)] uppercase tracking-[0.05em] mt-[2px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {tag}
          </span>
        </div>
        <ObSwitch checked={active} onChange={onToggle} ariaLabel={`Toggle ${label}`} />
      </div>

      <p className="text-[13px] text-[var(--text-muted)] m-0">{desc}</p>

      {active && detail && (
        <div className="flex items-center gap-[6px] text-[12px] text-[var(--success)] mt-[10px]">
          <ObStatusDot variant="success" />
          {detail}
        </div>
      )}

      {active && !detail && (
        <button
          type="button"
          className="mt-2 inline-flex items-center px-[14px] py-[6px] text-[13px] font-medium rounded-[10px] bg-[var(--brand-soft)] text-[var(--brand)] border-none cursor-pointer transition-all duration-[120ms] hover:bg-[var(--brand)] hover:text-white"
        >
          Connect {label}
        </button>
      )}
    </div>
  );
}
