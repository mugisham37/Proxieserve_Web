import type { Metadata } from "next";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { SiteFooter } from "@/components/organisms/marketing/SiteFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — ProxiServe",
  description: "A step-by-step guide to how ProxiServe handles your government paperwork from start to finish.",
};

const STEPS = [
  {
    id: "step-1",
    num: "01",
    title: "Choose your service",
    body: "Browse our catalogue or tell us what you need. Our intake form takes 5 minutes. No paperwork knowledge required — we'll ask the right questions.",
    detail: "We support 14 service categories covering everything from company registration to identity documents. If you're not sure which service you need, our team can advise.",
  },
  {
    id: "step-2",
    num: "02",
    title: "Upload your documents",
    body: "Securely upload any supporting documents — ID, proof of address, existing certificates. We accept PDFs, photos, and scans.",
    detail: "Documents are encrypted immediately on upload. We'll tell you exactly what's needed and reject nothing without explanation. WhatsApp delivery is also available.",
  },
  {
    id: "step-3",
    num: "03",
    title: "Pay your fee",
    body: "A transparent quote is shown before you commit. Payment is collected via MTN Mobile Money, Airtel Money, or card.",
    detail: "No hidden fees. The quote includes our service fee plus any government filing fees. We never markup official fees.",
  },
  {
    id: "step-4",
    num: "04",
    title: "We handle everything",
    body: "A dedicated agent navigates the government systems, queues, and offices on your behalf. You're notified at every milestone.",
    detail: "Our agents work Monday–Saturday and have established relationships with key government offices. Complex cases are escalated to senior agents.",
  },
  {
    id: "step-5",
    num: "05",
    title: "Receive your documents",
    body: "Completed documents are delivered digitally or by secure courier. Your tracking code remains active for 24 months.",
    detail: "Digital delivery via email and your ProxiServe dashboard. Physical delivery available in Kigali. Track every status change with your PRX code.",
  },
];

const NAV_ITEMS = STEPS.map((s) => ({ id: s.id, label: s.title }));

export default function HowItWorksPage() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Process</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-4 max-w-xl">Simple from start to finish</h1>
        <p className="t-lede text-[var(--ink-muted)] max-w-lg mb-16">
          Five clear steps. No guesswork. No waiting in queues.
        </p>

        <div className="flex flex-col gap-0 divide-y divide-[var(--rule)]">
          {STEPS.map((step) => (
            <section
              key={step.id}
              id={step.id}
              className="grid md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 py-14 scroll-mt-20"
            >
              <span className="font-serif italic text-[56px] leading-none text-[var(--brand)]">{step.num}</span>
              <div>
                <h2 className="t-h2 text-[var(--ink)] mb-3">{step.title}</h2>
                <p className="font-sans text-[16px] text-[var(--ink-muted)] leading-relaxed">{step.body}</p>
              </div>
              <div className="bg-[var(--cream-2)] rounded-[var(--r-xl)] border border-[var(--rule)] p-6">
                <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed">{step.detail}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <PillButton variant="solid" size="lg" asChild arrow>
            <Link href="/get-started">Get started</Link>
          </PillButton>
          <PillButton variant="ghost" size="lg" asChild>
            <Link href="/pricing">View pricing</Link>
          </PillButton>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
