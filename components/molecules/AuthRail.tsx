import * as React from "react";
import { PrivacySeal } from "@/components/atoms/PrivacySeal";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/utils";

interface AuthRailProps {
  className?: string;
}

export function AuthRail({ className }: AuthRailProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col justify-between",
        "w-[360px] xl:w-[400px] shrink-0",
        "bg-[var(--cream-2)] px-10 py-14",
        "border-r border-[var(--rule)]",
        className
      )}
    >
      {/* Top content */}
      <div className="flex flex-col gap-10">
        <Eyebrow withLine className="text-[var(--ink-muted)]">
          Trusted by 12,000+ Rwandans
        </Eyebrow>

        <figure className="flex flex-col gap-6">
          <blockquote>
            <p className="font-serif italic text-[clamp(18px,2vw,22px)] text-[var(--ink)] leading-[1.45]">
              &ldquo;I registered my company in 3 days without leaving my office. The team
              handled everything — I just received my certificate.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <Avatar size="md" color="brand" initials="AN" />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[13px] font-semibold text-[var(--ink)]">
                Amina Nkurunziza
              </span>
              <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                Company Registration · Kigali
              </span>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Bottom seal */}
      <PrivacySeal />
    </aside>
  );
}
