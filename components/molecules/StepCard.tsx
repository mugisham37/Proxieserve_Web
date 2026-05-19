import * as React from "react";
import { cn } from "@/lib/utils";

interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  num: number;
  title: string;
  body: string;
}

export function StepCard({ num, title, body, className, ...props }: StepCardProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <span
        className="font-serif italic text-[56px] leading-none text-[var(--brand)] select-none"
        aria-hidden="true"
      >
        {String(num).padStart(2, "0")}
      </span>
      <div>
        <h3 className="t-h3 text-[var(--ink)] mb-2">{title}</h3>
        <p className="font-sans text-[15px] text-[var(--ink-muted)] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
