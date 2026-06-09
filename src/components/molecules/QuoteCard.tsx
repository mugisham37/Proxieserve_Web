import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/shared/Avatar";

interface QuoteCardProps extends React.HTMLAttributes<HTMLElement> {
  quote: string;
  authorName: string;
  authorInitials: string;
  authorMeta?: string;
  service?: string;
}

export function QuoteCard({
  quote,
  authorName,
  authorInitials,
  authorMeta,
  service,
  className,
  ...props
}: QuoteCardProps) {
  return (
    <figure
      className={cn(
        "notch bg-[var(--ink-2)] text-[var(--paper)] p-8 flex flex-col gap-6",
        className
      )}
      {...props}
    >
      {/* Inner notch border effect */}
      <div className="notch absolute inset-[1px] border border-[rgba(242,235,215,0.12)] pointer-events-none" />

      <blockquote className="font-serif text-[18px] leading-[1.6] italic relative">
        <span className="text-[var(--brand)] text-[32px] leading-none font-serif not-italic absolute -top-2 -left-1" aria-hidden="true">"</span>
        <p className="pl-4">{quote}</p>
        <span className="text-[var(--brand)] text-[32px] leading-none font-serif not-italic" aria-hidden="true">"</span>
      </blockquote>

      <figcaption className="flex items-center gap-3 mt-auto">
        <Avatar initials={authorInitials} size="md" color="brand" />
        <div>
          <p className="font-sans text-[14px] font-semibold text-[var(--paper)]">{authorName}</p>
          {authorMeta && (
            <p className="font-mono text-[11px] text-[rgba(242,235,215,0.6)]">{authorMeta}</p>
          )}
          {service && (
            <p className="font-mono text-[11px] text-[var(--brand)] mt-0.5">{service}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
