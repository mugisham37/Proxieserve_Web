import { AfricaGridSection } from "@/src/components/sections/africa/AfricaGridSection";
import { StatBlock } from "@/src/components/atoms/StatBlock";
import { CTASection } from "@/src/components/sections/landing/CTASection";
import { AFRICA_STATS } from "@/src/lib/data/africa";

export default function AfricaPage() {
  return (
    <div>
      {/* Page header */}
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 border-b border-border md:px-4 md:pt-10">
        <p className="font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3">
          For Africa
        </p>
        <h1 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-3">
          Built <em>from</em> Africa, <em>for</em> Africa.
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[600px] leading-[1.7]">
          SolAI is headquartered in Kigali, Rwanda. We understand the
          infrastructure, the payment rails, the languages, and the opportunity.
        </p>
      </div>

      {/* Stats row */}
      <div className="bg-surface">
        <div className="max-w-[1280px] mx-auto px-8 py-12 border-b border-border md:px-4">
          <div className="flex justify-center gap-12 flex-wrap">
            {AFRICA_STATS.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>

      <AfricaGridSection />
      <CTASection />
    </div>
  );
}
