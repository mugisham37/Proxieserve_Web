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
    <section ref={ref} className="max-w-[1280px] mx-auto px-4 py-10 md:px-8 md:py-16">
      <SectionLabel>Seller Stories</SectionLabel>
      <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-6">
        Sellers who let SolAI run their growth.
      </h2>
      {/* mobile: 1 col | 768px+: 3 col */}
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} item={t} />
        ))}
      </div>
    </section>
  );
}
