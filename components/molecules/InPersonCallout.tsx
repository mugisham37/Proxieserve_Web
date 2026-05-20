import * as React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface InPersonCalloutProps {
  message?: string;
  locationsHref?: string;
  className?: string;
}

export function InPersonCallout({
  message = "This step requires an in-person visit to complete.",
  locationsHref = "/contact",
  className,
}: InPersonCalloutProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[var(--r-md)] bg-[var(--warn-soft)] border border-[rgba(201,122,31,0.2)] px-4 py-3",
        className
      )}
      role="note"
    >
      <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--warn)]" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[13px] text-[var(--ink)] leading-snug">{message}</p>
        <Link
          href={locationsHref}
          className="font-sans text-[12px] text-[var(--warn)] font-medium underline underline-offset-2 hover:no-underline self-start"
        >
          See our office locations →
        </Link>
      </div>
    </div>
  );
}
