"use client";

import { useRef } from "react";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { useGSAPScrollReveal } from "@/hooks/useGSAPScrollReveal";
import { FEATURES } from "@/lib/data/features";

export function FeaturesGridSection() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAPScrollReveal(ref, { selector: ".reveal", stagger: 0.07 });

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto px-8 py-12 md:px-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
        {FEATURES.map((feat) => (
          <FeatureCard key={feat.title} item={feat} />
        ))}
      </div>
    </div>
  );
}
