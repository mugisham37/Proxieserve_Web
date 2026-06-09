"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { QuoteCard } from "@/components/molecules/QuoteCard";

const TESTIMONIALS = [
  {
    quote: "I registered my company in 4 days without taking a single day off work. ProxiServe handled everything while I ran my business.",
    authorName: "Jean-Paul Nzeyimana",
    authorInitials: "JN",
    authorMeta: "Kigali, Rwanda",
    service: "Company Registration",
  },
  {
    quote: "The TIN process usually takes weeks. They did it in 2 days and kept me informed the whole time. Absolutely worth it.",
    authorName: "Aline Mukamana",
    authorInitials: "AM",
    authorMeta: "Musanze, Rwanda",
    service: "TIN Registration",
  },
  {
    quote: "Renewing my ID while living abroad seemed impossible. ProxiServe made it straightforward and stress-free.",
    authorName: "Eric Habimana",
    authorInitials: "EH",
    authorMeta: "Kampala, Uganda",
    service: "National ID Renewal",
  },
];

export function TestimonialsSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-[var(--paper)] py-16 sm:py-20", className)}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">What clients say</Eyebrow>
          <h2 id="testimonials-heading" className="t-h2 text-[var(--ink)]">Real results, real people</h2>
        </motion.div>

        {/* Desktop: 3-col grid. Mobile: snap scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory md:overflow-visible">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.authorName}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className="snap-start min-w-[280px] md:min-w-0"
            >
              <QuoteCard {...t} className="h-full relative overflow-hidden" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
