"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { PricingTierCard } from "@/components/molecules/PricingTierCard";
import { type Service } from "@/lib/services-data";

interface ServicePricingSectionProps {
  service: Service;
  id?: string;
  className?: string;
}

export function ServicePricingSection({ service, id = "pricing", className }: ServicePricingSectionProps) {
  return (
    <section
      id={id}
      className={cn("bg-[var(--paper)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">Pricing</Eyebrow>
          <h2 id="pricing-heading" className="t-h2 text-[var(--ink)]">Choose your speed</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {service.pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
            >
              <PricingTierCard
                tier={tier}
                highlighted={tier.label === "Express"}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        <p className="font-sans text-[12px] text-[var(--ink-subtle)] mt-6">
          All prices are in Rwandan Francs (RWF). We accept MTN Mobile Money, Airtel Money, bank transfers, and major cards. Payment is collected after your application is accepted.
        </p>
      </div>
    </section>
  );
}
