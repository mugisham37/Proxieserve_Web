"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Banknote, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { StatusPill } from "@/components/atoms/StatusPill";
import { InfoChip } from "@/components/molecules/InfoChip";
import { ActionCard } from "@/components/molecules/ActionCard";
import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { EligibilityGate } from "@/components/molecules/EligibilityGate";
import { CATEGORY_LABELS, type Service } from "@/lib/services-data";

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

  return (
    <section
      data-hero-section
      className={cn("bg-[var(--paper)] py-14 sm:py-20 border-b border-[var(--rule)]", className)}
      aria-labelledby="service-hero-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Breadcrumb eyebrow */}
            <motion.div custom={0} variants={ENTRY_VARIANTS} initial="hidden" animate="visible">
              <Eyebrow withLine className="text-[var(--ink-muted)]">
                <Link href="/services" className="hover:text-[var(--ink)] transition-colors">
                  Services
                </Link>{" "}
                / {CATEGORY_LABELS[service.category]}
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

            {/* Lede */}
            <motion.p
              custom={2}
              variants={ENTRY_VARIANTS}
              initial="hidden"
              animate="visible"
              className="t-lede text-[var(--ink-muted)] max-w-xl"
            >
              {service.description}
            </motion.p>

            {/* Meta chips */}
            <motion.div
              custom={3}
              variants={ENTRY_VARIANTS}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <InfoChip icon={Banknote} label={`RWF ${service.fee.toLocaleString()}`} mono />
              {service.urgentFee && (
                <InfoChip icon={Zap} label={`Urgent: RWF ${service.urgentFee.toLocaleString()}`} mono />
              )}
              <InfoChip icon={Clock} label={service.eta} />
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
