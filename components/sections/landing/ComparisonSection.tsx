import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ComparisonColumn } from "@/components/molecules/ComparisonColumn";
import { COMPARISON_WITHOUT, COMPARISON_WITH } from "@/lib/constants";

export function ComparisonSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-16 md:px-4 md:py-10">
      <SectionLabel>The Difference</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-4">
        What changes when SolAI runs your growth.
      </h2>
      <div className="grid grid-cols-2 gap-5 mt-8 sm:grid-cols-1">
        <ComparisonColumn
          titleEm="Without"
          title="SolAI"
          items={COMPARISON_WITHOUT}
          variant="danger"
        />
        <ComparisonColumn
          titleEm="With"
          title="SolAI"
          items={COMPARISON_WITH}
          variant="success"
        />
      </div>
    </section>
  );
}
