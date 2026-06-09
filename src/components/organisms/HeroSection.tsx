"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { HeroStatusCard } from "@/components/molecules/HeroStatusCard";
import { HeroDocumentCard } from "@/components/molecules/HeroDocumentCard";
import { HeroMessageCard } from "@/components/molecules/HeroMessageCard";

const TRUST_CHIPS = [
  { label: "Government-affiliated", variant: "info" as const },
  { label: "Secure & encrypted", variant: "ok" as const },
  { label: "2–5 day turnaround", variant: "brand" as const },
];

const staggerParent = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.2, 0, 0, 1] as [number, number, number, number] } },
};

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative overflow-hidden bg-[var(--cream)]", className)}
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 items-center">

          {/* Left column */}
          <motion.div
            variants={staggerParent}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow withLine className="text-[var(--ink-muted)]">
                Rwanda&apos;s paperwork service
              </Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="t-display text-[var(--ink)]"
            >
              Hand it over.{" "}
              <span className="font-serif italic text-[var(--brand)]">We&apos;ll handle it.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="t-lede text-[var(--ink-muted)] max-w-lg">
              Government paperwork, business registrations, and official documents — sorted by local experts so you can focus on what matters.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-1">
              <PillButton variant="solid" size="lg" asChild arrow>
                <Link href="/signup">Get started</Link>
              </PillButton>
              <PillButton variant="ghost" size="lg" asChild>
                <Link href="/how-it-works">See how it works</Link>
              </PillButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-1">
              {TRUST_CHIPS.map(({ label, variant }) => (
                <StatusPill key={label} label={label} variant={variant} size="md" />
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — card stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.48, delay: 0.24 }}
            className="relative"
          >
            {/* Pink notched background */}
            <div className="notch-lg bg-[var(--brand-soft)] absolute inset-0 -m-6" aria-hidden="true" />

            <div className="relative flex flex-col gap-3 py-6">
              {/* Card 1 — main status card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.2, 0, 0, 1] }}
              >
                <HeroStatusCard className="relative z-30" />
              </motion.div>

              {/* Card 2 — document, offset right */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42, ease: [0.2, 0, 0, 1] }}
                className="ml-7"
              >
                <HeroDocumentCard className="relative z-20" />
              </motion.div>

              {/* Card 3 — message, offset left */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.54, ease: [0.2, 0, 0, 1] }}
                className="-ml-3"
              >
                <HeroMessageCard className="relative z-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
