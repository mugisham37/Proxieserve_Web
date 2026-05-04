import { FeaturesHeaderSection } from "@/src/components/sections/features/FeaturesHeaderSection";
import { FeaturesGridSection } from "@/src/components/sections/features/FeaturesGridSection";
import { CTASection } from "@/src/components/sections/landing/CTASection";

export default function FeaturesPage() {
  return (
    <div>
      <FeaturesHeaderSection />
      <FeaturesGridSection />
      <CTASection />
    </div>
  );
}
