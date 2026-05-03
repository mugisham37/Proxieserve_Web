import { MkIcon } from "@/components/atoms/MkIcon";
import { cn } from "@/lib/utils";

interface ComparisonColumnProps {
  title: string;
  titleEm?: string;
  items: string[];
  variant: "danger" | "success";
}

export function ComparisonColumn({
  title,
  titleEm,
  items,
  variant,
}: ComparisonColumnProps) {
  const isSuccess = variant === "success";

  return (
    <div className="bg-surface border border-border rounded-[14px] p-7 relative overflow-hidden">
      <h3 className="text-[20px] font-semibold text-text mb-5">
        {titleEm ? (
          <>
            <em className={isSuccess ? "text-brand" : "text-danger not-italic"}>
              {titleEm}
            </em>{" "}
            {title}
          </>
        ) : (
          title
        )}
      </h3>

      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-2.5 py-2 text-[14px] text-text-muted border-b border-border last:border-0"
            )}
          >
            <span
              className={cn(
                "shrink-0 mt-0.5",
                isSuccess ? "text-success" : "text-danger"
              )}
            >
              <MkIcon name={isSuccess ? "check" : "x"} size={16} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom accent bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[3px]",
          isSuccess ? "bg-success" : "bg-danger"
        )}
      />
    </div>
  );
}
