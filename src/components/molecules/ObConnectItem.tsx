import { MkIcon } from "@/src/components/atoms/MkIcon";
import { ObStatusDot } from "@/src/components/atoms/ObStatusDot";
import type { IconName } from "@/src/types";

interface ObConnectItemProps {
  icon: IconName;
  label: string;
  desc: string;
  connected: boolean;
  statusText?: string;
  onToggle: () => void;
}

export function ObConnectItem({
  icon,
  label,
  desc,
  connected,
  statusText,
  onToggle,
}: ObConnectItemProps) {
  return (
    <div
      className="flex items-center gap-[14px] p-4 bg-[var(--surface)] border rounded-[14px] transition-colors duration-[120ms]"
      style={{ borderColor: connected ? "rgba(52,211,153,0.3)" : "var(--border)" }}
    >
      <div
        className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-[120ms]"
        style={{
          background: connected ? "rgba(52,211,153,0.1)" : "var(--surface-2)",
          color: connected ? "var(--success)" : "var(--text-muted)",
        }}
      >
        <MkIcon name={icon} size={22} />
      </div>

      <div className="flex-1 min-w-0">
        <strong className="block text-[14px] text-[var(--text)]">{label}</strong>
        <p className="text-[13px] text-[var(--text-muted)] mt-[2px] m-0">{desc}</p>
        {connected && statusText && (
          <div className="flex items-center gap-[6px] text-[12px] text-[var(--success)] mt-[6px]">
            <ObStatusDot variant="success" />
            {statusText}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-[6px] px-[14px] py-[6px] text-[13px] font-medium rounded-[10px] border transition-all duration-[120ms] flex-shrink-0 cursor-pointer"
        style={
          connected
            ? {
                background: "rgba(52,211,153,0.1)",
                color: "var(--success)",
                borderColor: "rgba(52,211,153,0.2)",
              }
            : {
                background: "var(--brand-soft)",
                color: "var(--brand)",
                borderColor: "transparent",
              }
        }
        onMouseEnter={(e) => {
          if (!connected) {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--brand)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }
        }}
        onMouseLeave={(e) => {
          if (!connected) {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--brand-soft)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--brand)";
          }
        }}
      >
        {connected ? (
          <>
            <MkIcon name="check" size={14} /> Connected
          </>
        ) : (
          "Connect"
        )}
      </button>
    </div>
  );
}
