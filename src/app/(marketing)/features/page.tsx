import { FeaturesHeaderSection } from "@/components/sections/features/FeaturesHeaderSection";
import { FeaturesGridSection } from "@/components/sections/features/FeaturesGridSection";
import { CTASection } from "@/components/sections/landing/CTASection";

export default function FeaturesPage() {
  return (
    <div>
      <FeaturesHeaderSection />
      <FeaturesGridSection />
      <CTASection />
    </div>
  );
}
