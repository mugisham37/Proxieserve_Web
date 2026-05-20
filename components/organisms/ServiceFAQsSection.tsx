"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { FAQItem } from "@/components/molecules/FAQItem";
import { type Service } from "@/lib/services-data";

interface ServiceFAQsSectionProps {
  service: Service;
  id?: string;
  className?: string;
}

export function ServiceFAQsSection({ service, id = "faqs", className }: ServiceFAQsSectionProps) {
  return (
    <section
      id={id}
      className={cn("bg-[var(--cream)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="service-faqs-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-[240px_1fr] gap-12 lg:gap-20 items-start">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="md:sticky md:top-28"
          >
            <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">FAQs</Eyebrow>
            <h2 id="service-faqs-heading" className="t-h2 text-[var(--ink)] mb-4">
              Common questions
            </h2>
            <Link href="/contact" className="lnk-arrow font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)]">
              Ask us anything
            </Link>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-t border-[var(--rule)]"
          >
            {service.faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
