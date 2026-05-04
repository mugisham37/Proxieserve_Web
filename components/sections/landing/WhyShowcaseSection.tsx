import { SectionLabel } from "@/components/atoms/SectionLabel";
import { WhyDemoCard } from "@/components/molecules/WhyDemoCard";

export function WhyShowcaseSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 py-10 border-t border-b border-border md:px-8 md:py-16">
        <SectionLabel>Explainable AI</SectionLabel>
        <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-3">
          Every number has a <em>&ldquo;Why?&rdquo;</em>
        </h2>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[640px] leading-[1.7] mb-6">
          SolAI doesn&apos;t just act — it explains. Every budget shift, creative
          pick, audience change, and chat reply is logged with the reasoning
          behind it.
        </p>
        <div className="flex justify-center">
          <WhyDemoCard />
        </div>
      </div>
    </section>
  );
}
