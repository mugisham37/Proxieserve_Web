import { SectionLabel } from "@/components/atoms/SectionLabel";
import { LOGO_ITEMS } from "@/lib/constants";

export function LogoStripSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-8 border-b border-border md:px-4">
      <SectionLabel>Built for sellers on</SectionLabel>
      <div className="flex gap-2 flex-wrap mt-3">
        {LOGO_ITEMS.map((item) => (
          <div
            key={item}
            className="px-5 py-2 text-[13px] font-medium text-text-muted bg-surface border border-border rounded-[10px]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
