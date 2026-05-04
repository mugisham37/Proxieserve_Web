"use client";

import { useState } from "react";
import { DashSectionTitle } from "@/src/components/atoms/DashSectionTitle";
import { DashTimelineItem } from "@/src/components/molecules/DashTimelineItem";
import { DASH_TIMELINE } from "@/src/lib/data/dashboard";

export function DashTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <DashSectionTitle>What SolAI did for you today</DashSectionTitle>
      <div>
        {DASH_TIMELINE.map((event, i) => (
          <DashTimelineItem
            key={i}
            event={event}
            isLast={i === DASH_TIMELINE.length - 1}
            whyOpen={openIndex === i}
            onWhyToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
