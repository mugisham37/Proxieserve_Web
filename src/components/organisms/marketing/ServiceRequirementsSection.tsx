"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { RequirementRow } from "@/components/molecules/dashboard/RequirementRow";
import { EligibilityGate } from "@/components/molecules/wizard/EligibilityGate";
import { InPersonCallout } from "@/components/molecules/marketing/InPersonCallout";
import { type UiService } from "@/lib/service-ui-types";

interface ServiceRequirementsSectionProps {
  service: UiService;
  id?: string;
  className?: string;
}

export function ServiceRequirementsSection({ service, id = "requirements", className }: ServiceRequirementsSectionProps) {
  return (
    <section
      id={id}
      className={cn("bg-[var(--paper)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="requirements-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start"
        >
          {/* Requirements list */}
          <div>
            <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">What you&apos;ll need</Eyebrow>
            <h2 id="requirements-heading" className="t-h2 text-[var(--ink)] mb-6">Requirements</h2>

            {service.flags.inPersonRequired && (
              <InPersonCallout className="mb-6" />
            )}

            <div className="bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden">
              {service.requirements.map((req) => (
                <div key={req.label} className="px-5">
                  <RequirementRow requirement={req} />
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility aside */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-4">
            <div className="bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5">
              <p className="font-sans text-[13px] font-semibold text-[var(--ink)] mb-2">Before you apply</p>
              <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Make sure all documents are clear, legible, and not expired. Digital copies (PDF or high-res photos) are accepted for most services.
              </p>
            </div>
            {service.flags.eligibilityCheckRequired && (
              <EligibilityGate
                mode="inline"
                message="This service has eligibility requirements. Confirm you qualify before submitting documents."
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
