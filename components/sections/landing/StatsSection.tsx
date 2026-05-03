import { StatBlock } from "@/components/atoms/StatBlock";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="bg-surface border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 py-10 md:px-8 md:py-16">
        <div className="flex justify-center gap-12 flex-wrap">
          {STATS.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
