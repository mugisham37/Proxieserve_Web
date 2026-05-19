import * as React from "react";
import { cn } from "@/lib/utils";

interface ContactMethodProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  content: React.ReactNode;
}

export function ContactMethod({ label, content, className, ...props }: ContactMethodProps) {
  return (
    <div className={cn("grid grid-cols-[140px_1fr] gap-4 items-start py-4 border-b border-[var(--rule)] last:border-0", className)} {...props}>
      <p className="t-h4 text-[var(--ink-muted)]">{label}</p>
      <div className="font-sans text-[15px] text-[var(--ink)] leading-relaxed">{content}</div>
    </div>
  );
}
