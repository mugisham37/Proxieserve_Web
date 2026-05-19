"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { PricingRow } from "@/components/molecules/PricingRow";

const PRICING_ROWS = [
  { service: "Company Registration", category: "Business", fee: "RWF 45,000", eta: "3–5 days", href: "/pricing#company" },
  { service: "National ID Renewal", category: "Identity", fee: "RWF 8,000", eta: "2–3 days", href: "/pricing#nid" },
  { service: "TIN Registration", category: "Tax", fee: "RWF 15,000", eta: "1–2 days", href: "/pricing#tin" },
  { service: "Business Operating Permit", category: "Permits", fee: "RWF 30,000", eta: "5–7 days", href: "/pricing#permit" },
  { service: "RSSB Enrollment", category: "Welfare", fee: "RWF 12,000", eta: "2–4 days", href: "/pricing#rssb" },
];

export function PricingSnapshot({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-[var(--cream)] py-16 sm:py-20", className)}
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
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 id="pricing-heading" className="t-h2 text-[var(--ink)]">Transparent pricing</h2>
            <Link href="/pricing" className="lnk-arrow font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] hidden sm:inline-flex">
              View full pricing
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-[var(--rule)] rounded-[var(--r-xl)] overflow-hidden"
        >
          <PricingRow
            isHeader
            service=""
            category=""
            fee=""
            eta=""
          />
          {PRICING_ROWS.map((row) => (
            <PricingRow key={row.service} {...row} />
          ))}
        </motion.div>

        <div className="flex justify-end mt-4 sm:hidden">
          <Link href="/pricing" className="lnk-arrow font-sans text-[13px] text-[var(--ink-muted)]">
            View full pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
