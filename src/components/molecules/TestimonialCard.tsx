import type { TestimonialItem } from "@/types";

interface TestimonialCardProps {
  item: TestimonialItem;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="reveal bg-surface border border-border rounded-[14px] p-6 flex flex-col">
      <p className="text-[15px] text-text leading-[1.7] italic mb-4 flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white shrink-0"
          style={{ backgroundColor: item.avatarColor }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <span className="block text-[14px] font-semibold text-text">
            {item.name}
          </span>
          <span className="block text-[12px] text-text-subtle">
            {item.company} · {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}
