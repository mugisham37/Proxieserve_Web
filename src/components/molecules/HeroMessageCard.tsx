import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/shared/Avatar";

interface HeroMessageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  agentInitials?: string;
  agentName?: string;
  message?: string;
  time?: string;
}

export function HeroMessageCard({
  className,
  agentInitials = "AM",
  agentName = "Mukamana A.",
  message = "Your documents have been received and are under review. We'll notify you within 2 business days.",
  time = "Just now",
  ...props
}: HeroMessageCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)]",
        "p-4 shadow-[var(--sh-subtle)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <Avatar initials={agentInitials} size="sm" color="brand" />
        <div>
          <p className="font-sans text-[12px] font-semibold text-[var(--ink)]">{agentName}</p>
          <p className="font-mono text-[10px] text-[var(--ink-subtle)]">{time}</p>
        </div>
      </div>
      <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed">{message}</p>
    </div>
  );
}
