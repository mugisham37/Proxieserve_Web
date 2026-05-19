import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";

interface MissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  quote: string;
  body: string;
}

export function MissionCard({ eyebrow = "Our Mission", quote, body, className, ...props }: MissionCardProps) {
  return (
    <div
      className={cn(
        "notch-lg bg-[var(--ink-2)] text-[var(--paper)] p-10 flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Eyebrow className="text-[var(--brand)]">{eyebrow}</Eyebrow>
      <blockquote className="font-serif italic text-[clamp(22px,2.5vw,32px)] leading-[1.4] text-[var(--paper)]">
        "{quote}"
      </blockquote>
      <p className="font-sans text-[15px] text-[rgba(242,235,215,0.7)] leading-relaxed">{body}</p>
    </div>
  );
}
