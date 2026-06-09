import * as React from "react";
import Link from "next/link";
import { PillButton } from "@/components/atoms/PillButton";

export default function TrackerNotFound() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center py-14">
      <div className="container">
        <div className="w-full max-w-[540px] mx-auto bg-[var(--danger-soft)] border border-[var(--danger)] rounded-[var(--r-xl)] px-10 py-12 max-[600px]:px-6 max-[600px]:py-8">
          {/* Icon */}
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--danger)] text-white text-[20px] mb-6" aria-hidden="true">
            ✕
          </span>

          <h1 className="font-serif font-normal text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-0.01em] text-[var(--danger)] m-0 mb-4">
            Application not found.
          </h1>
          <p className="font-sans text-[15px] text-[var(--ink-2)] leading-[1.6] m-0 mb-8">
            We couldn&apos;t find any application with that tracking code. Please double-check it — codes look like{" "}
            <span className="font-mono tracking-[0.06em]">PRX-2026-00483</span>.
          </p>

          <div className="flex flex-wrap gap-3">
            <PillButton variant="solid" size="sm" asChild>
              <Link href="/track">Try again →</Link>
            </PillButton>
            <PillButton variant="ghost" size="sm" asChild>
              <Link href="/track?recover=1">Lost your code?</Link>
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
