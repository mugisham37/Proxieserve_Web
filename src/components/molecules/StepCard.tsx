import { MkIcon } from "@/src/components/atoms/MkIcon";
import type { StepItem } from "@/src/types";

interface StepCardProps {
  item: StepItem;
}

export function StepCard({ item }: StepCardProps) {
  return (
    <div className="reveal bg-surface border border-border rounded-lg px-5 py-6 relative">
      <div className="font-mono text-[12px] text-text-subtle mb-3">{item.num}</div>
      <div className="w-10 h-10 rounded-md bg-brand-soft text-brand flex items-center justify-center mb-3">
        <MkIcon name={item.icon} size={24} />
      </div>
      <h3 className="text-[16px] font-semibold text-text mb-2">{item.title}</h3>
      <p className="text-[13px] text-text-muted leading-[1.6]">{item.desc}</p>
    </div>
  );
}
