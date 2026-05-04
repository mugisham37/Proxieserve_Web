"use client";

import { useRef } from "react";
import { SectionLabel } from "@/src/components/atoms/SectionLabel";
import { StepCard } from "@/src/components/molecules/StepCard";
import { useGSAPScrollReveal } from "@/src/hooks/useGSAPScrollReveal";
import { STEPS } from "@/src/lib/data/steps";

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAPScrollReveal(ref, { selector: ".reveal", stagger: 0.08 });

  return (
    <section ref={ref} className="max-w-[1280px] mx-auto px-4 py-10 md:px-8 md:py-16">
      <SectionLabel>How It Works</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-4">
        Five minutes in. A revenue engine out.
      </h2>
      {/* mobile: 1 col | 640px+: 3 col | 1024px+: 5 col */}
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3 lg:grid-cols-5">
        {STEPS.map((step) => (
          <StepCard key={step.num} item={step} />
        ))}
      </div>
    </section>
  );
}
