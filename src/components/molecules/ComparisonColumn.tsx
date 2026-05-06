import { MkIcon } from "@/components/atoms/MkIcon";

interface ComparisonColumnProps {
  titleEm: string;
  title: string;
  items: string[];
  variant: "danger" | "success";
}

export function ComparisonColumn({ titleEm, title, items, variant }: ComparisonColumnProps) {
  const isSuccess = variant === "success";

  return (
    <div className="bg-surface border border-border rounded-lg p-7 relative overflow-hidden">
      {/* Title: em is italic brand-colored per reference global em { color: var(--brand) } */}
      <h3 className="text-[20px] font-semibold text-text mb-5">
        <em>{titleEm}</em> {title}
      </h3>

      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 py-2 text-[14px] text-text-muted border-b border-border last:border-0"
          >
            <span className={`shrink-0 mt-0.5 ${isSuccess ? "text-success" : "text-danger"}`}>
              <MkIcon name={isSuccess ? "check" : "x"} size={14} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${isSuccess ? "bg-success" : "bg-danger"}`} />
    </div>
  );
}
