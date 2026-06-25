import type { Metadata } from "next";
import { HeroSection } from "@/components/organisms/marketing/HeroSection";
import { TrackerSection } from "@/components/organisms/tracker/TrackerSection";
import { ServicesGrid } from "@/components/organisms/marketing/ServicesGrid";
import { HowItWorksSection } from "@/components/organisms/marketing/HowItWorksSection";
import { WhySection } from "@/components/organisms/marketing/WhySection";
import { PricingSnapshot } from "@/components/organisms/marketing/PricingSnapshot";
import { TestimonialsSection } from "@/components/organisms/marketing/TestimonialsSection";
import { FAQSection } from "@/components/organisms/marketing/FAQSection";
import { CTABand } from "@/components/organisms/marketing/CTABand";
import { SiteFooter } from "@/components/organisms/marketing/SiteFooter";
import { StickyMobileCTA } from "@/components/organisms/shared/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Hand it over. We'll handle it. — Hebuza",
  description:
    "Government paperwork, business registrations, and official documents — sorted by local Rwandan experts. Fast, secure, and fully tracked.",
  openGraph: {
    title: "Hebuza — Rwanda's Paperwork Service",
    description: "We handle government paperwork so you don't have to.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection data-hero-section />
      <TrackerSection />
      <ServicesGrid />
      <HowItWorksSection />
      <WhySection />
      <PricingSnapshot />
      <TestimonialsSection />
      <FAQSection />
      <CTABand />
      <SiteFooter />
      <StickyMobileCTA />
    </>
  );
}
