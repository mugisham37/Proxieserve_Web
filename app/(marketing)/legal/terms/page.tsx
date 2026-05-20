import type { Metadata } from "next";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — ProxiServe",
  description: "The terms governing use of ProxiServe's government service intermediary platform.",
};

const NAV_ITEMS = [
  { id: "definitions", label: "Definitions" },
  { id: "services", label: "Our services" },
  { id: "payment", label: "Payment" },
  { id: "refunds", label: "Refunds" },
  { id: "liability", label: "Liability" },
  { id: "governing-law", label: "Governing law" },
];

const SECTIONS = [
  {
    id: "definitions",
    title: "Definitions",
    plain: "\"ProxiServe\" means us. \"Client\" means you. \"Service\" means any government application we process on your behalf.",
    body: `"ProxiServe Ltd" refers to the company registered in Rwanda providing government services intermediary services. "Client" refers to any individual or organisation using ProxiServe's services. "Service" refers to a specific government application, filing, or document request we process on your behalf. "Tracking code" refers to the PRX reference code assigned to your application.`,
  },
  {
    id: "services",
    title: "Our services",
    plain: "We act as your agent — we submit and follow up on your behalf. We are not a government body and don't guarantee outcomes.",
    body: `ProxiServe acts as your authorised representative in dealings with Rwandan government offices. We do not replace, modify, or guarantee the decisions of government authorities. Our role is to: collect your information, prepare and submit applications, follow up with government offices, and deliver results to you. We do not offer legal advice. For legal advice, please consult a qualified advocate.`,
  },
  {
    id: "payment",
    title: "Payment terms",
    plain: "Pay after we accept your application. We charge a fixed fee — no surprises.",
    body: `Payment is due after we confirm your application has been accepted for processing. Fees are as listed on our pricing page at the time of order. Government fees (where applicable) are included. Payment must be received in full before we submit your application to the relevant government office. We accept MTN Mobile Money, Airtel Money, bank transfer, and card payments.`,
  },
  {
    id: "refunds",
    title: "Refunds",
    plain: "Full refund if we can't complete your service. 50% refund if government rejects your application through no fault of ours.",
    body: `Full refund: if we are unable to process your application due to circumstances within our control.\n\n50% refund: if your application is rejected by the government due to eligibility issues or factors that were disclosed to us as accurate but were found to be inaccurate or incomplete.\n\nNo refund: if you provide false or misleading information, if you withdraw after submission, or if government fees have already been paid.\n\nRefunds are processed within 5 business days via the original payment method.`,
  },
  {
    id: "liability",
    title: "Limitation of liability",
    plain: "We're responsible for our own errors but not for government delays or decisions.",
    body: `ProxiServe is liable for errors made in preparing or submitting your application. We are not liable for: delays or decisions made by government authorities, loss of data due to events outside our control (force majeure), or indirect or consequential losses. Our total liability in any case is limited to the amount you paid for the affected service.`,
  },
  {
    id: "governing-law",
    title: "Governing law",
    plain: "These terms are governed by Rwandan law. Disputes go to Kigali courts first.",
    body: `These terms are governed by the laws of the Republic of Rwanda. Any disputes arising from or relating to these terms or your use of ProxiServe's services shall be subject to the exclusive jurisdiction of the courts of Kigali, Rwanda. We encourage resolving disputes through direct communication before any legal action.`,
  },
];

export default function TermsPage() {
  return (
    <>


      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Legal</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-2">Terms of Service</h1>
        <p className="font-mono text-[12px] text-[var(--ink-muted)] mb-16">Last updated: January 2026</p>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">
          <aside className="hidden lg:block sticky top-20">
            <nav aria-label="Section navigation">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors block px-3 py-1.5 rounded-[var(--r-md)] hover:bg-[var(--cream-2)]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex flex-col gap-12">
            {SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-20">
                <h2 className="t-h3 text-[var(--ink)] mb-4">{sec.title}</h2>
                <blockquote className="bg-[var(--brand-soft)] border-l-4 border-[var(--brand)] px-4 py-3 rounded-r-[var(--r-md)] mb-4">
                  <p className="font-serif italic text-[15px] text-[var(--ink-muted)]">{sec.plain}</p>
                </blockquote>
                <p className="font-sans text-[15px] text-[var(--ink-muted)] leading-relaxed whitespace-pre-line">{sec.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
