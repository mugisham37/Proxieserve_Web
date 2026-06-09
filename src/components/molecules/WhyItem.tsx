import * as React from "react";
import { cn } from "@/lib/utils";

interface WhyItemProps extends React.HTMLAttributes<HTMLDivElement> {
  num: string;
  title: string;
  body: string;
}

export function WhyItem({ num, title, body, className, ...props }: WhyItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 bg-[var(--cream)] px-7 py-10 min-h-[200px]",
        className
      )}
      {...props}
    >
      <span className="font-mono text-[12px] font-medium text-[var(--ink-muted)] uppercase tracking-widest">
        {num}
      </span>
      <h3 className="t-h3 text-[var(--ink)]">{title}</h3>
      <p className="font-sans text-[15px] text-[var(--ink-muted)] leading-relaxed">{body}</p>
    </div>
  );
}
