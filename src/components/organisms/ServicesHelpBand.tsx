import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/shared/PillButton";

interface ServicesHelpBandProps {
  className?: string;
}

export function ServicesHelpBand({ className }: ServicesHelpBandProps) {
  return (
    <section
      className={cn("bg-[var(--cream)] border-b border-[var(--rule)] py-12 sm:py-14", className)}
      aria-label="Need help"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="t-h3 text-[var(--ink)] mb-1">Still have questions?</h2>
            <p className="font-serif italic text-[15px] text-[var(--ink-muted)] leading-relaxed">
              Our team is available via WhatsApp, phone, or email.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-3 shrink-0">
            <PillButton variant="solid" size="md" asChild arrow>
              <Link href="/contact">Contact us</Link>
            </PillButton>
            <PillButton variant="ghost" size="md" asChild>
              <Link href="/services">Browse all services</Link>
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
