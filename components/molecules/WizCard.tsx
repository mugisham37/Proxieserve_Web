import * as React from "react";
import { cn } from "@/lib/utils";

interface WizCardProps {
  id?: string;
  title: string;
  fieldCount?: number;
  children: React.ReactNode;
  className?: string;
}

export function WizCard({ id, title, fieldCount, children, className }: WizCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[var(--rule-soft)]">
        <h3 className="font-serif text-[18px] font-medium text-[var(--ink)] leading-snug">{title}</h3>
        {fieldCount !== undefined && (
          <span className="font-mono text-[11px] text-[var(--ink-subtle)] shrink-0">
            {fieldCount} {fieldCount === 1 ? "field" : "fields"}
          </span>
        )}
      </div>
      <div className="px-6 py-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}
