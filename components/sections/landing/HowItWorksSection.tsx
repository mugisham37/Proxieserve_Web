"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { StepCard } from "@/components/molecules/StepCard";
import { useGSAPScrollReveal } from "@/hooks/useGSAPScrollReveal";
import { STEPS } from "@/lib/data/steps";

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAPScrollReveal(ref, { selector: ".reveal", stagger: 0.08 });

  return (
    <section ref={ref} className="max-w-[1280px] mx-auto px-8 py-16 md:px-4 md:py-10">
      <SectionLabel>How It Works</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-4">
        Five minutes in. A revenue engine out.
      </h2>
      <div className="grid grid-cols-5 gap-4 mt-8 lg:grid-cols-3 sm:grid-cols-1">
        {STEPS.map((step) => (
          <StepCard key={step.num} item={step} />
        ))}
      </div>
    </section>
  );
}
