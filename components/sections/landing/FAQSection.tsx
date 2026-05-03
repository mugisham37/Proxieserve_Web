import { SectionLabel } from "@/components/atoms/SectionLabel";
import { FAQAccordion } from "@/components/molecules/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/data/faq";

export function FAQSection() {
  return (
    <section className="bg-surface border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8 py-16 md:px-4 md:py-10">
        <SectionLabel>Questions</SectionLabel>
        <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-2 text-center">
          Frequently asked
        </h2>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted text-center mb-8">
          Can&apos;t find the answer? <a href="/contact" className="text-brand">Get in touch →</a>
        </p>
        <FAQSection_Content />
      </div>
    </section>
  );
}

function FAQSection_Content() {
  return <FAQAccordion items={FAQ_ITEMS} />;
}
