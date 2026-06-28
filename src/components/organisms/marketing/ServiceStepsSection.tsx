"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { StepCard } from "@/components/molecules/marketing/StepCard";
import { type UiService } from "@/lib/service-ui-types";

interface ServiceStepsSectionProps {
  service: UiService;
  id?: string;
  className?: string;
}

export function ServiceStepsSection({ service, id = "how-it-works", className }: ServiceStepsSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id={id}
      className={cn("bg-[var(--cream)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="steps-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">The process</Eyebrow>
          <h2 id="steps-heading" className="t-h2 text-[var(--ink)]">How it works</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.48, ease: [0.2, 0, 0, 1] }}
            className="hidden md:block absolute top-[88px] left-[48px] right-[48px] h-px bg-[var(--rule)] origin-left"
            aria-hidden="true"
          />

          <div
            className={cn(
              "grid grid-cols-1 gap-6",
              service.steps.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {service.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
              >
                <StepCard num={step.num} title={step.title} body={step.body} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
