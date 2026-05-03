import { HeroSection } from "@/components/sections/landing/HeroSection";
import { LogoStripSection } from "@/components/sections/landing/LogoStripSection";
import { HowItWorksSection } from "@/components/sections/landing/HowItWorksSection";
import { WhyShowcaseSection } from "@/components/sections/landing/WhyShowcaseSection";
import { ComparisonSection } from "@/components/sections/landing/ComparisonSection";
import { StatsSection } from "@/components/sections/landing/StatsSection";
import { TestimonialsSection } from "@/components/sections/landing/TestimonialsSection";
import { FAQSection } from "@/components/sections/landing/FAQSection";
import { CTASection } from "@/components/sections/landing/CTASection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <LogoStripSection />
      <HowItWorksSection />
      <WhyShowcaseSection />
      <ComparisonSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
