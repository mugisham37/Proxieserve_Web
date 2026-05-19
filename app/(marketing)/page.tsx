import type { Metadata } from "next";
import { HeroSection } from "@/components/organisms/HeroSection";
import { TrackerSection } from "@/components/organisms/TrackerSection";
import { ServicesGrid } from "@/components/organisms/ServicesGrid";
import { HowItWorksSection } from "@/components/organisms/HowItWorksSection";
import { WhySection } from "@/components/organisms/WhySection";
import { PricingSnapshot } from "@/components/organisms/PricingSnapshot";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { CTABand } from "@/components/organisms/CTABand";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { StickyMobileCTA } from "@/components/organisms/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Hand it over. We'll handle it. — ProxiServe",
  description:
    "Government paperwork, business registrations, and official documents — sorted by local Rwandan experts. Fast, secure, and fully tracked.",
  openGraph: {
    title: "ProxiServe — Rwanda's Paperwork Service",
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
