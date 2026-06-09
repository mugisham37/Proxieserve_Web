"use client";

import * as React from "react";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { FAQItem } from "@/components/molecules/marketing/FAQItem";
import { SiteFooter } from "@/components/organisms/SiteFooter";

const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      { q: "Do I need to visit any government office?", a: "No. ProxiServe handles all in-person visits on your behalf. You only need to upload documents and provide information online or via WhatsApp." },
      { q: "How do I choose the right service?", a: "Browse our service catalogue or use the intake form and describe what you need. Our team reviews every request and will advise if there's a more suitable option." },
      { q: "Can I use ProxiServe from outside Rwanda?", a: "Yes. Many of our clients are diaspora members managing affairs in Rwanda remotely. We can handle everything without you being physically present." },
    ],
  },
  {
    id: "security",
    label: "Security & privacy",
    items: [
      { q: "How do you keep my documents safe?", a: "All documents are encrypted in transit and at rest using AES-256. We comply with Rwanda's data protection law and GDPR. Documents are deleted after 24 months." },
      { q: "Who can access my documents?", a: "Only the assigned agent and their direct supervisor can access your documents. We never share documents with third parties without explicit consent." },
      { q: "What happens to my data if I delete my account?", a: "All personal data is deleted within 30 days. Document originals are destroyed. Compliance records required by law may be retained in anonymised form." },
    ],
  },
  {
    id: "payments",
    label: "Payments & fees",
    items: [
      { q: "What payment methods do you accept?", a: "MTN Mobile Money, Airtel Money, bank transfers (BK, Equity), and major debit/credit cards. Payment is collected after your application is accepted." },
      { q: "Are there any hidden fees?", a: "No. The quote you see is the total you pay. Government filing fees are included. If anything changes, we notify you before proceeding." },
      { q: "What is your refund policy?", a: "If we are unable to complete your service for any reason within our control, we refund in full. If your application is rejected due to ineligibility, a 50% refund applies for work done." },
    ],
  },
  {
    id: "timelines",
    label: "Timelines",
    items: [
      { q: "How are turnaround times calculated?", a: "From when we receive all required documents from you. Government processing times vary and are outside our control, but our estimates are based on recent actual times." },
      { q: "What if there is a government delay?", a: "We notify you immediately and provide a revised estimate. We do not charge extra for delays caused by government offices." },
      { q: "Do you offer urgent processing?", a: "Yes. Urgent fees are shown on the pricing page. Availability is subject to government office capacity and must be confirmed before payment." },
    ],
  },
  {
    id: "tracking",
    label: "Tracking & updates",
    items: [
      { q: "How do I track my application?", a: "Enter your PRX code (e.g., PRX-2026-00483) on the tracking page. Status updates are also sent via SMS and email." },
      { q: "How long does my tracking code remain active?", a: "24 months from the date of application. After that, the record is archived but can be accessed upon request." },
      { q: "What if I lose my tracking code?", a: "Contact us with the name and phone number used to register. We'll locate your application and resend the code." },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = React.useState("");
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const filtered = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      ({ q, a }) =>
        !search ||
        q.toLowerCase().includes(search.toLowerCase()) ||
        a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">FAQ</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-4">Frequently asked questions</h1>

        {/* Search */}
        <div className="relative max-w-md mb-12">
          <input
            type="search"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[var(--r-xl)] border border-[var(--rule-strong)] bg-[var(--paper)] text-[var(--ink)] font-sans text-[15px] px-4 py-3 pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" aria-hidden="true">
            ↵
          </span>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <p className="font-sans text-[15px] text-[var(--ink-muted)]">No results for &quot;{search}&quot;. Try different keywords.</p>
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">
            {/* TOC sidebar */}
            <aside className="hidden lg:block sticky top-20">
              <nav aria-label="FAQ categories">
                <ul className="flex flex-col gap-1">
                  {FAQ_CATEGORIES.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSection(id);
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`w-full text-left font-sans text-[13px] px-3 py-2 rounded-[var(--r-md)] transition-colors ${
                          activeSection === id
                            ? "bg-[var(--ink)] text-[var(--paper)]"
                            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* FAQ categories */}
            <div className="flex flex-col gap-14">
              {filtered.map((cat) => (
                <section key={cat.id} id={cat.id} className="scroll-mt-20">
                  <h2 className="t-h3 text-[var(--ink)] mb-4 border-b border-[var(--rule)] pb-3">{cat.label}</h2>
                  {cat.items.map((item) => (
                    <FAQItem key={item.q} question={item.q} answer={item.a} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </>
  );
}
