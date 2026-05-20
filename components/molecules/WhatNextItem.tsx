import * as React from "react";
import { cn } from "@/lib/utils";

interface WhatNextItemProps {
  num: number;
  title: string;
  body: string;
  className?: string;
}

export function WhatNextItem({ num, title, body, className }: WhatNextItemProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      <span
        className="font-mono text-[11px] text-[var(--ink-subtle)] shrink-0 mt-1 tabular-nums"
        aria-hidden="true"
      >
        {String(num).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-1">
        <h4 className="font-serif text-[15px] font-medium italic text-[var(--ink)]">{title}</h4>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
