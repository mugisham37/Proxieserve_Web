import { DashKpiCard } from "@/components/molecules/DashKpiCard";
import { DASH_KPI_CARDS } from "@/lib/data/dashboard";

interface DashKpiGridProps {
  whyOpen: number | null;
  onWhyToggle: (i: number | null) => void;
}

export function DashKpiGrid({ whyOpen, onWhyToggle }: DashKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {DASH_KPI_CARDS.map((card, i) => (
        <DashKpiCard
          key={i}
          data={card}
          index={i}
          whyOpen={whyOpen}
          onWhyToggle={onWhyToggle}
        />
      ))}
    </div>
  );
}
