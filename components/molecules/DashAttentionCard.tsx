import { MkIcon } from "@/components/atoms/MkIcon";
import type { AttentionCard } from "@/types";

interface DashAttentionCardProps {
  card: AttentionCard;
}

export function DashAttentionCard({ card }: DashAttentionCardProps) {
  return (
    <div
      className="flex gap-2.5 p-3 rounded-[var(--radius-md)]"
      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
    >
      <div
        className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: "var(--surface-2)", color: card.color }}
      >
        <MkIcon name={card.icon} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <strong className="block text-[13px] mb-0.5" style={{ color: "var(--text)" }}>
          {card.title}
        </strong>
        <p className="text-[12px] m-0 mb-2" style={{ color: "var(--text-muted)" }}>
          {card.desc}
        </p>
        <button
          className="flex items-center gap-1 text-[12px] font-medium bg-transparent border-none cursor-pointer p-0"
          style={{ color: "var(--brand)", fontFamily: "inherit" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
        >
          {card.action} <MkIcon name="arrowRight" size={12} />
        </button>
      </div>
    </div>
  );
}
