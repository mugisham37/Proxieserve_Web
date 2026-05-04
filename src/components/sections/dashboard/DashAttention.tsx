import { DashSectionTitle } from "@/src/components/atoms/DashSectionTitle";
import { DashAttentionCard } from "@/src/components/molecules/DashAttentionCard";
import { DASH_ATTENTION } from "@/src/lib/data/dashboard";

export function DashAttention() {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <DashSectionTitle>Needs your eyes</DashSectionTitle>
      <div className="flex flex-col gap-2">
        {DASH_ATTENTION.map((card, i) => (
          <DashAttentionCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}
