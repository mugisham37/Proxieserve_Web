"use client";

import { useRef } from "react";
import { AfricaCard } from "@/components/molecules/AfricaCard";
import { useGSAPScrollReveal } from "@/hooks/useGSAPScrollReveal";
import { AFRICA_CARDS } from "@/lib/data/africa";

export function AfricaGridSection() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAPScrollReveal(ref, { selector: ".reveal", stagger: 0.08 });

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto px-8 py-12 md:px-4">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
        {AFRICA_CARDS.map((card) => (
          <AfricaCard key={card.title} item={card} />
        ))}
      </div>
    </div>
  );
}
