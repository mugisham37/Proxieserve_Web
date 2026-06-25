import type { Metadata } from "next";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { SiteFooter } from "@/components/organisms/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Accessibility — Hebuza",
  description: "Hebuza's accessibility statement and our commitment to inclusive design.",
};

const NAV_ITEMS = [
  { id: "commitment", label: "Commitment" },
  { id: "standards", label: "Standards" },
  { id: "features", label: "Features" },
  { id: "known-issues", label: "Known issues" },
  { id: "contact-a11y", label: "Contact" },
];

const SECTIONS = [
  {
    id: "commitment",
    title: "Our commitment",
    plain: "We aim to meet WCAG 2.1 AA. Accessibility is not an afterthought — it is a requirement.",
    body: `Hebuza is committed to ensuring that our website and services are accessible to all people, including those with disabilities. We believe that access to government services should not be limited by a person's ability. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.`,
  },
  {
    id: "standards",
    title: "Standards we follow",
    plain: "WCAG 2.1 AA as a minimum. We also follow ARIA best practices and test with screen readers.",
    body: `We follow:\n• WCAG 2.1 Level AA (Web Content Accessibility Guidelines)\n• WAI-ARIA 1.2 authoring practices for interactive components\n• Rwanda's ICT Accessibility guidelines where published\n\nWe test with VoiceOver (macOS/iOS), NVDA (Windows), and keyboard-only navigation.`,
  },
  {
    id: "features",
    title: "Accessibility features",
    plain: "Skip links, focus indicators, ARIA labels, responsive text, and reduced motion support are all built in.",
    body: `Our site includes:\n• Skip-to-main-content link at the top of every page\n• Visible focus indicators on all interactive elements\n• ARIA labels and roles on all interactive components\n• Alt text on all meaningful images\n• Sufficient colour contrast (minimum 4.5:1 for text)\n• Responsive text that scales with browser font size settings\n• Full keyboard navigation support\n• Reduced motion support via prefers-reduced-motion media query\n• Language attribute on the HTML element`,
  },
  {
    id: "known-issues",
    title: "Known issues",
    plain: "Some PDF documents from government offices may not be fully accessible. We are working on this.",
    body: `We are aware of the following accessibility issues:\n\n1. Some PDF documents received from government offices may not be tagged for screen readers. We are working to provide HTML summaries of all received documents.\n\n2. The map on the contact page (coming soon) may not be fully accessible. A text alternative is provided.\n\nWe are committed to fixing these issues. If you find an issue not listed here, please contact us.`,
  },
  {
    id: "contact-a11y",
    title: "Accessibility feedback",
    plain: "Found a barrier? Let us know and we'll fix it within 5 business days.",
    body: `If you experience any accessibility barriers on our website or need content in an alternative format, please contact us:\n\nEmail: accessibility@hebuza.rw\nPhone: +250 788 000 000\n\nWe aim to respond within 2 business days and resolve confirmed issues within 5 business days. For urgent needs, please call us directly.`,
  },
];

export default function AccessibilityPage() {
  return (
    <>


      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Legal</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-2">Accessibility Statement</h1>
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
