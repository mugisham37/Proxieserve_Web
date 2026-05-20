import * as React from "react";
import Link from "next/link";
import { Archive } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchivedServiceCardProps {
  serviceName: string;
  alternativeSlugs?: string[];
  className?: string;
}

export function ArchivedServiceCard({ serviceName, alternativeSlugs = [], className }: ArchivedServiceCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[var(--r-lg)] bg-[var(--warn-soft)] border border-[rgba(201,122,31,0.2)] p-6",
        className
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <Archive size={18} className="mt-0.5 shrink-0 text-[var(--warn)]" aria-hidden="true" />
        <div>
          <p className="font-sans text-[14px] font-semibold text-[var(--ink)]">Service no longer offered</p>
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-1 leading-snug">
            <strong className="font-medium text-[var(--ink)]">{serviceName}</strong> has been archived and is no longer
            available through ProxiServe.
          </p>
        </div>
      </div>

      {alternativeSlugs.length > 0 && (
        <div>
          <p className="font-sans text-[12px] text-[var(--ink-muted)] mb-2">You may be looking for:</p>
          <div className="flex flex-wrap gap-2">
            {alternativeSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="font-sans text-[12px] text-[var(--ink)] underline underline-offset-2 hover:no-underline"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/services" className="font-sans text-[13px] text-[var(--brand)] font-medium self-start">
        Browse all services →
      </Link>
    </div>
  );
}
