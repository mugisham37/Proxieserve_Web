import { StatBlock } from "@/src/components/atoms/StatBlock";
import { STATS } from "@/src/lib/constants";

export function StatsSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 py-10 border-t border-b border-border md:px-8 md:py-16">
        <div className="flex justify-center gap-12 flex-wrap">
          {STATS.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
