"use client";

import { useState } from "react";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import type { FeatureItem } from "@/src/types";

interface FeatureCardProps {
  item: FeatureItem;
}

export function FeatureCard({ item }: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="reveal bg-surface border border-border rounded-[14px] p-7">
      <div className="w-11 h-11 rounded-[10px] bg-brand-soft text-brand flex items-center justify-center mb-4">
        <MkIcon name={item.icon} size={22} />
      </div>
      <h3 className="text-[17px] font-semibold text-text mb-2">{item.title}</h3>
      <p className="text-[14px] text-text-muted leading-[1.7]">{item.desc}</p>

      {expanded && (
        <p className="text-[13px] text-text-subtle leading-[1.7] mt-2 pt-2 border-t border-border">
          {item.detail}
        </p>
      )}

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 flex items-center gap-1 text-[13px] font-medium text-brand bg-transparent border-none cursor-pointer p-0 hover:underline transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Learn more"}
        <MkIcon
          name="chevronDown"
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
