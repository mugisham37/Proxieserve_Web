import { HeroSection } from "@/src/components/sections/landing/HeroSection";
import { LogoStripSection } from "@/src/components/sections/landing/LogoStripSection";
import { HowItWorksSection } from "@/src/components/sections/landing/HowItWorksSection";
import { WhyShowcaseSection } from "@/src/components/sections/landing/WhyShowcaseSection";
import { ComparisonSection } from "@/src/components/sections/landing/ComparisonSection";
import { StatsSection } from "@/src/components/sections/landing/StatsSection";
import { TestimonialsSection } from "@/src/components/sections/landing/TestimonialsSection";
import { FAQSection } from "@/src/components/sections/landing/FAQSection";
import { CTASection } from "@/src/components/sections/landing/CTASection";

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
