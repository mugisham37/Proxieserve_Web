"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/shared/PillButton";

export function CTABand({ className }: { className?: string }) {
  return (
    <section
      className={cn("w-full py-8 sm:py-10", className)}
      aria-label="Call to action"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="notch-lg overflow-hidden"
          style={{ background: "linear-gradient(100deg, #2563EB 0%, #1E3A8A 100%)" }}
        >
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-center px-10 sm:px-14 py-14 sm:py-20">
            {/* Left */}
            <div>
              <h2
                className="font-serif text-white leading-[1.06] tracking-[-0.02em] mb-4"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                Stop waiting in queues.
              </h2>
              <p className="font-serif italic text-[rgba(255,255,255,0.8)] text-[clamp(18px,1.8vw,22px)] leading-[1.5]">
                Let Rwanda&apos;s fastest paperwork service get it done.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-3">
              <PillButton
                variant="default"
                size="lg"
                asChild
                arrow
                className="bg-white text-[var(--brand)] border-white hover:bg-[var(--brand)] hover:text-white hover:border-white"
              >
                <Link href="/signup">Get started today</Link>
              </PillButton>
              <PillButton
                variant="ghost"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-[var(--brand)]"
              >
                <Link href="/pricing">See pricing</Link>
              </PillButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
