import { SectionLabel } from "@/src/components/atoms/SectionLabel";
import { ComparisonColumn } from "@/src/components/molecules/ComparisonColumn";
import { COMPARISON_WITHOUT, COMPARISON_WITH } from "@/src/lib/constants";

export function ComparisonSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 py-10 md:px-8 md:py-16">
      <SectionLabel>The Difference</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-4">
        What changes when SolAI runs your growth.
      </h2>
      {/* mobile: 1 col | 640px+: 2 col */}
      <div className="grid grid-cols-1 gap-5 mt-8 sm:grid-cols-2">
        <ComparisonColumn titleEm="Without" title="SolAI" items={COMPARISON_WITHOUT} variant="danger" />
        <ComparisonColumn titleEm="With" title="SolAI" items={COMPARISON_WITH} variant="success" />
      </div>
    </section>
  );
}
