import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { FAQItem } from "@/components/molecules/FAQItem";

const FAQS = [
  {
    question: "Do I need to visit any government office?",
    answer: "No. ProxiServe handles all in-person visits on your behalf. You only need to upload documents and provide information online or via WhatsApp.",
  },
  {
    question: "How do I know my documents are safe?",
    answer: "All documents are encrypted in transit and at rest using AES-256. We are compliant with Rwanda's data protection law and GDPR. Documents are deleted after 24 months unless you request otherwise.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept MTN Mobile Money, Airtel Money, bank transfers, and major debit/credit cards. Payment is collected after your application is accepted.",
  },
  {
    question: "What happens if my application is rejected?",
    answer: "We'll notify you immediately with the reason and advise on next steps. If the rejection is due to an error on our part, we'll resubmit at no additional cost.",
  },
  {
    question: "Can I use ProxiServe from outside Rwanda?",
    answer: "Yes. Many of our clients are diaspora members managing affairs in Rwanda remotely. We can handle everything without you being physically present in Rwanda.",
  },
  {
    question: "How are the turnaround times calculated?",
    answer: "Turnaround time starts from when we receive all required documents from you. Government processing times vary and are outside our control, but our estimates are based on recent actual processing times.",
  },
  {
    question: "Can I use ProxiServe for ongoing compliance (annual returns, renewals)?",
    answer: "Yes. We offer recurring compliance packages for businesses that need regular filings, renewals, and updates. Contact us to discuss a subscription.",
  },
];

export function FAQSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-[var(--cream)] py-16 sm:py-20", className)}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
          {/* Sticky label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="md:sticky md:top-24"
          >
            <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">FAQ</Eyebrow>
            <h2 id="faq-heading" className="t-h2 text-[var(--ink)] mb-4">
              Common questions
            </h2>
            <Link href="/faq" className="lnk-arrow font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)]">
              More questions
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
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
