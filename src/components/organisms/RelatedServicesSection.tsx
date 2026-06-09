"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { CatalogueCard } from "@/components/molecules/CatalogueCard";
import { getRelatedServices, type Service } from "@/lib/services-data";

interface RelatedServicesSectionProps {
  service: Service;
  id?: string;
  className?: string;
}

export function RelatedServicesSection({ service, id = "related", className }: RelatedServicesSectionProps) {
  const related = getRelatedServices(service.slug);
  if (related.length === 0) return null;

  return (
    <section
      id={id}
      className={cn("bg-[var(--paper)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="related-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">You might also need</Eyebrow>
          <h2 id="related-heading" className="t-h2 text-[var(--ink)]">Related services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((rel, i) => (
            <motion.div
              key={rel.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
            >
              <CatalogueCard service={rel} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
