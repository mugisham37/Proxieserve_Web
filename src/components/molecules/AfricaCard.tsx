import { MkIcon } from "@/components/atoms/MkIcon";
import { RailBadge } from "@/components/atoms/RailBadge";
import { LangChip } from "@/components/atoms/LangChip";
import type { AfricaCardItem } from "@/types";

interface AfricaCardProps {
  item: AfricaCardItem;
}

export function AfricaCard({ item }: AfricaCardProps) {
  return (
    <div className="reveal bg-surface border border-border rounded-[14px] p-7">
      <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-4 bg-[rgba(52,168,83,0.1)] text-accent-rwanda">
        <MkIcon name={item.icon} size={24} />
      </div>

      <h3 className="text-[16px] font-semibold text-text mb-2">{item.title}</h3>
      <p className="text-[14px] text-text-muted leading-[1.6]">{item.desc}</p>

      {item.badges && item.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.badges.map((badge) => (
            <RailBadge key={badge}>{badge}</RailBadge>
          ))}
        </div>
      )}

      {item.chips && item.chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.chips.map((chip) => (
            <LangChip key={chip}>{chip}</LangChip>
          ))}
        </div>
      )}
    </div>
  );
}
