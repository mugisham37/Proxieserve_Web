import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 border-b border-border md:px-4 md:pt-10">
        <p className="font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3">
          Contact
        </p>
        <h1 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-3">
          Let&apos;s talk about your growth.
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[600px] leading-[1.7]">
          Book a demo, ask a question, or start building immediately.
        </p>
      </div>
      <ContactFormSection />
    </div>
  );
}
