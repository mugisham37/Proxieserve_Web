"use client";

import * as React from "react";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Tag } from "@/components/atoms/Tag";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import Link from "next/link";

const CATEGORIES = ["All", "Tax", "Identity", "Business", "Welfare", "Permits"] as const;
type Category = (typeof CATEGORIES)[number];

const ALL_SERVICES = [
  { service: "TIN Registration", category: "Tax", fee: "RWF 15,000", urgent: "RWF 25,000", eta: "1–2 days" },
  { service: "Annual Tax Return (RDB)", category: "Tax", fee: "RWF 20,000", urgent: "RWF 35,000", eta: "2–3 days" },
  { service: "National ID Renewal", category: "Identity", fee: "RWF 8,000", urgent: "RWF 14,000", eta: "2–3 days" },
  { service: "Passport Application", category: "Identity", fee: "RWF 35,000", urgent: "RWF 60,000", eta: "5–7 days" },
  { service: "Birth Certificate Copy", category: "Identity", fee: "RWF 6,000", urgent: "RWF 10,000", eta: "1–2 days" },
  { service: "Company Registration (RDB)", category: "Business", fee: "RWF 45,000", urgent: "RWF 75,000", eta: "3–5 days" },
  { service: "Business Name Search", category: "Business", fee: "RWF 8,000", urgent: "RWF 12,000", eta: "1 day" },
  { service: "Annual Return Filing", category: "Business", fee: "RWF 25,000", urgent: "RWF 40,000", eta: "2–3 days" },
  { service: "RSSB Enrollment", category: "Welfare", fee: "RWF 12,000", urgent: "RWF 20,000", eta: "2–4 days" },
  { service: "RSSB Monthly Declaration", category: "Welfare", fee: "RWF 10,000", urgent: "RWF 16,000", eta: "1–2 days" },
  { service: "Business Operating Permit", category: "Permits", fee: "RWF 30,000", urgent: "RWF 50,000", eta: "5–7 days" },
  { service: "Construction Permit Liaison", category: "Permits", fee: "RWF 60,000", urgent: "RWF 100,000", eta: "7–14 days" },
  { service: "Notarial Deed", category: "Business", fee: "RWF 25,000", urgent: "RWF 40,000", eta: "3–4 days" },
  { service: "Document Legalisation", category: "Identity", fee: "RWF 18,000", urgent: "RWF 30,000", eta: "2–3 days" },
];

const NAV_ITEMS = [
  { id: "pricing-table", label: "All services" },
  { id: "payment-info", label: "Payment" },
  { id: "urgent-info", label: "Urgent" },
];

export default function PricingPage() {
  const [active, setActive] = React.useState<Category>("All");

  const filtered = active === "All" ? ALL_SERVICES : ALL_SERVICES.filter((s) => s.category === active);

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Pricing</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-4">No surprises. Ever.</h1>
        <p className="t-lede text-[var(--ink-muted)] max-w-lg mb-12">
          All fees shown include our service charge. Government filing fees are included where applicable.
        </p>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-[999px] font-sans text-[13px] font-medium transition-colors duration-[120ms] border ${
                active === cat
                  ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink-muted)] border-[var(--rule-strong)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <section id="pricing-table" className="scroll-mt-20 border border-[var(--rule)] rounded-[var(--r-xl)] overflow-hidden mb-16">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-[var(--cream-2)] border-b border-[var(--rule)]">
            {["Service", "Category", "Standard Fee", "Urgent Fee", "Est. Time"].map((h) => (
              <span key={h} className="eyebrow text-[var(--ink-muted)]">{h}</span>
            ))}
          </div>
          {filtered.map((row) => (
            <div key={row.service} className="border-b border-[var(--rule)] last:border-0 px-5 py-4 hover:bg-[var(--cream-2)] transition-colors">
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                <span className="font-serif text-[16px] text-[var(--ink)]">{row.service}</span>
                <Tag variant="default">{row.category}</Tag>
                <span className="font-mono text-[14px] text-[var(--ink)]">{row.fee}</span>
                <span className="font-mono text-[13px] text-[var(--warn)]">{row.urgent}</span>
                <span className="font-mono text-[12px] text-[var(--ink-muted)]">{row.eta}</span>
              </div>
              {/* Mobile */}
              <div className="md:hidden flex flex-col gap-2">
                <p className="font-serif text-[16px] text-[var(--ink)]">{row.service}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Tag>{row.category}</Tag>
                  <span className="font-mono text-[14px] font-semibold text-[var(--ink)]">{row.fee}</span>
                  <span className="font-mono text-[12px] text-[var(--warn)]">Urgent: {row.urgent}</span>
                  <span className="font-mono text-[11px] text-[var(--ink-muted)]">{row.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Payment info */}
        <section id="payment-info" className="scroll-mt-20 grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)] p-8">
            <h2 className="t-h3 text-[var(--ink)] mb-3">Payment methods</h2>
            <ul className="flex flex-col gap-2">
              {["MTN Mobile Money", "Airtel Money", "Visa / Mastercard", "Bank transfer (BK, Equity)"].map((m) => (
                <li key={m} className="flex items-center gap-2 font-sans text-[14px] text-[var(--ink-muted)]">
                  <span className="text-[var(--ok)]">✓</span> {m}
                </li>
              ))}
            </ul>
          </div>
          <div id="urgent-info" className="scroll-mt-20 bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-xl)] p-8">
            <h2 className="t-h3 text-[var(--ink)] mb-3">Urgent processing</h2>
            <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed mb-3">
              Urgent fees apply when you need processing within 24–48 hours. Availability is subject to government office capacity and is not always guaranteed.
            </p>
            <Link href="/contact" className="font-sans text-[13px] font-medium text-[var(--brand)] hover:underline">
              Contact us to confirm availability →
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
