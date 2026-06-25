import * as React from "react";
import { cn } from "@/lib/utils";
import { WhyItem } from "@/components/molecules/marketing/WhyItem";

const WHY_ITEMS = [
  {
    num: "01",
    title: "Local expertise",
    body: "Our agents know Rwanda's government systems inside out — the forms, the queues, the shortcuts.",
  },
  {
    num: "02",
    title: "Real-time tracking",
    body: "Every step of your application is logged and visible. No more chasing offices or guessing timelines.",
  },
  {
    num: "03",
    title: "Secure document handling",
    body: "End-to-end encrypted uploads, GDPR-compliant storage, and strict internal access controls.",
  },
  {
    num: "04",
    title: "Flat, transparent fees",
    body: "No surprises. See the full cost before you commit. We don't add markup on government fees.",
  },
];

export function WhySection({ className }: { className?: string }) {
  return (
    <section
      className={cn("w-full py-0", className)}
      aria-labelledby="why-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-6 pb-4">
        <h2 id="why-heading" className="sr-only">Why Hebuza</h2>
      </div>
      {/* Full bleed: no container padding */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[var(--rule)]"
        style={{ background: `var(--rule)` }}
      >
        {WHY_ITEMS.map((item) => (
          <WhyItem key={item.num} {...item} />
        ))}
      </div>
    </section>
  );
}
