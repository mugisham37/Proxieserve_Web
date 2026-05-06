import { SectionLabel } from "@/components/atoms/SectionLabel";
import { FAQAccordion } from "@/components/molecules/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/data/faq";

export function FAQSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 py-10 border-t border-b border-border md:px-8 md:py-16">
        <SectionLabel>Questions</SectionLabel>
        <h2 className="text-[clamp(26px,3.5vw,36px)] font-semibold tracking-[-0.02em] text-text mb-8">
          Frequently asked.
        </h2>
        <FAQSection_Content />
      </div>
    </section>
  );
}

function FAQSection_Content() {
  return <FAQAccordion items={FAQ_ITEMS} />;
}
