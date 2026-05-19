import type { Metadata } from "next";
import { SupportingTopBar } from "@/components/supporting/SupportingTopBar";
import { PageNav } from "@/components/supporting/PageNav";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — ProxiServe",
  description: "How ProxiServe collects, uses, and protects your personal data.",
};

const NAV_ITEMS = [
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-use", label: "How we use it" },
  { id: "sharing", label: "Sharing" },
  { id: "retention", label: "Retention" },
  { id: "rights", label: "Your rights" },
  { id: "contact-dpo", label: "Contact DPO" },
];

const SECTIONS = [
  {
    id: "what-we-collect",
    title: "What we collect",
    plain: "We collect your name, contact info, and the documents you upload. Nothing else unless you provide it.",
    body: `We collect information you provide directly: name, phone number, email address, and any documents uploaded to complete your service request. We also collect technical data including IP addresses, device type, and usage patterns to improve the service. We do not collect sensitive personal data (biometrics, health data, political opinions) beyond what is contained in government documents you upload for processing.`,
  },
  {
    id: "how-we-use",
    title: "How we use your data",
    plain: "To process your government applications and keep you updated. We never sell your data.",
    body: `Your data is used exclusively to: (1) process your government service requests, (2) communicate updates about your application, (3) comply with legal obligations, (4) improve our platform through aggregated, anonymised analytics. We do not sell, rent, or share your personal data with advertisers or data brokers.`,
  },
  {
    id: "sharing",
    title: "Data sharing",
    plain: "We only share your data with government offices as required to complete your application.",
    body: `We share your personal data only with: (1) relevant Rwandan government agencies (RDB, RSSB, RRA, etc.) as required to process your application, (2) trusted sub-processors who help us operate our platform (cloud hosting, payment processing) under strict data processing agreements, (3) law enforcement when legally compelled. All sub-processors are listed in our data processing register, available on request.`,
  },
  {
    id: "retention",
    title: "How long we keep your data",
    plain: "Documents and personal data are deleted after 24 months. Legal records may be kept longer.",
    body: `Active application data is retained for the duration of your application plus 24 months. After that, your documents and personal details are permanently deleted. We may retain minimal records (application reference, service type, outcome) for up to 7 years to comply with Rwanda's commercial and tax law. You can request early deletion at any time and we will comply within 30 days, subject to legal retention obligations.`,
  },
  {
    id: "rights",
    title: "Your rights",
    plain: "You can access, correct, delete, or export your data at any time. Just ask.",
    body: `Under Rwanda's Law No. 058/2021 on Personal Data Protection and Privacy, and where applicable GDPR, you have the right to: access your data, correct inaccurate data, request deletion, object to processing, request data portability, and withdraw consent at any time. To exercise these rights, contact our DPO at privacy@proxiserve.rw. We will respond within 30 days.`,
  },
  {
    id: "contact-dpo",
    title: "Contact our DPO",
    plain: "Our Data Protection Officer handles all privacy requests.",
    body: `Data Protection Officer: Claudine Niyomugabo\nEmail: privacy@proxiserve.rw\nAddress: KN 4 Ave, Kigali City Tower, 3rd Floor, Kigali, Rwanda\n\nFor complaints, you may also contact the Rwanda Utilities Regulatory Authority (RURA) which serves as the national data protection supervisory authority.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SupportingTopBar breadcrumb={[{ label: "Legal", href: "/" }, { label: "Privacy Policy" }]} />
      <PageNav items={NAV_ITEMS} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Legal</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-2">Privacy Policy</h1>
        <p className="font-mono text-[12px] text-[var(--ink-muted)] mb-16">Last updated: January 2026</p>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">
          {/* Sticky TOC */}
          <aside className="hidden lg:block sticky top-28">
            <nav aria-label="Section navigation">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors block px-3 py-1.5 rounded-[var(--r-md)] hover:bg-[var(--cream-2)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-12">
            {SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-28">
                <h2 className="t-h3 text-[var(--ink)] mb-4">{sec.title}</h2>
                {/* Plain language summary */}
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
