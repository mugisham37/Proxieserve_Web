"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { ActionCard } from "@/components/molecules/ActionCard";
import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { EligibilityGate } from "@/components/molecules/EligibilityGate";
import { CATEGORY_LABELS, COLOUR_MAP, type Service } from "@/lib/services-data";

const ENTRY_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.07,
      ease: [0.2, 0, 0, 1] as [number, number, number, number],
    },
  }),
};

interface ServiceDetailHeroProps {
  service: Service;
  className?: string;
}

export function ServiceDetailHero({ service, className }: ServiceDetailHeroProps) {
  const statusVariant =
    service.status === "active"
      ? "ok"
      : service.status === "paused"
      ? "warn"
      : "danger";

  const statusLabel =
    service.status === "active" ? "Active" : service.status === "paused" ? "Paused" : "Unavailable";

  const stripColour = COLOUR_MAP[service.colour];

  return (
    <section
      data-hero-section
      className={cn("relative bg-[var(--paper)] py-14 sm:py-20 border-b border-[var(--rule)]", className)}
      aria-labelledby="service-hero-heading"
    >
      {/* Horizontal colour strip at top — reference: .svc-hero__strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: stripColour }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Breadcrumb */}
            <motion.div custom={0} variants={ENTRY_VARIANTS} initial="hidden" animate="visible">
              <Eyebrow withLine className="text-[var(--ink-muted)]">
                <Link href="/services" className="hover:text-[var(--ink)] transition-colors">
                  Services
                </Link>{" "}
                /{" "}
                <Link
                  href={`/services?category=${service.category}`}
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  {CATEGORY_LABELS[service.category]}
                </Link>
              </Eyebrow>
            </motion.div>

            {/* Heading + status */}
            <motion.div
              custom={1}
              variants={ENTRY_VARIANTS}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-start gap-3"
            >
              <h1 id="service-hero-heading" className="t-h1 text-[var(--ink)]">
                {service.name}
              </h1>
              <StatusPill variant={statusVariant} size="lg" label={statusLabel} className="mt-1.5" />
            </motion.div>

            {/* Description */}
            <motion.p
              custom={2}
              variants={ENTRY_VARIANTS}
              initial="hidden"
              animate="visible"
              className="t-lede text-[var(--ink-muted)] max-w-xl"
            >
              {service.description}
            </motion.p>

            {/* Info chips — stacked label/value, reference: .svc-info-chips */}
            <motion.div
              custom={3}
              variants={ENTRY_VARIANTS}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-start gap-6 pt-1"
            >
              <div className="flex flex-col gap-0.5">
                <span className="eyebrow text-[var(--ink-subtle)]">Standard fee</span>
                <span className="font-mono text-[16px] font-medium text-[var(--ink)]">
                  RWF {service.fee.toLocaleString()}
                </span>
              </div>
              {service.urgentFee && (
                <div className="flex flex-col gap-0.5">
                  <span className="eyebrow text-[var(--ink-subtle)]">Urgent fee</span>
                  <span className="font-mono text-[16px] font-medium text-[var(--ink)]">
                    RWF {service.urgentFee.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="eyebrow text-[var(--ink-subtle)]">Turnaround</span>
                <span className="font-sans text-[16px] font-medium text-[var(--ink)]">
                  {service.eta}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="eyebrow text-[var(--ink-subtle)]">Where it applies</span>
                <span className="font-sans text-[16px] font-medium text-[var(--ink)]">Nationwide</span>
              </div>
            </motion.div>

            {/* Eligibility gate (inline) */}
            {service.flags.eligibilityCheckRequired && (
              <motion.div custom={4} variants={ENTRY_VARIANTS} initial="hidden" animate="visible">
                <EligibilityGate
                  mode="inline"
                  message="Eligibility check required. Confirm you qualify before applying."
                />
              </motion.div>
            )}
          </div>

          {/* Right column — action or waitlist */}
          <motion.div
            custom={4}
            variants={ENTRY_VARIANTS}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-20"
          >
            {service.flags.waitlistActive ? (
              <WaitlistCard serviceName={service.name} />
            ) : (
              <ActionCard service={service} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
