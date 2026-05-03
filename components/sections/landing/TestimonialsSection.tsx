"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { useGSAPScrollReveal } from "@/hooks/useGSAPScrollReveal";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAPScrollReveal(ref, { selector: ".reveal", stagger: 0.1 });

  return (
    <section ref={ref} className="max-w-[1280px] mx-auto px-8 py-16 md:px-4 md:py-10">
      <SectionLabel>What sellers say</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-6">
        Real results, real sellers
      </h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} item={t} />
        ))}
      </div>
    </section>
  );
}
