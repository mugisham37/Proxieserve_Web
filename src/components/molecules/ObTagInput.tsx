"use client";

import { MkIcon } from "@/src/components/atoms/MkIcon";

interface ObTagInputProps {
  tags: string[];
  onRemove: (tag: string) => void;
}

export function ObTagInput({ tags, onRemove }: ObTagInputProps) {
  return (
    <div className="flex gap-[6px] flex-wrap p-2 bg-[var(--bg)] border border-[var(--border)] rounded-[10px] min-h-[40px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-[3px] text-[12px] font-medium bg-[var(--brand-soft)] text-[var(--brand)] rounded-[6px]"
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemove(tag)}
            className="opacity-60 hover:opacity-100 transition-opacity duration-[120ms] flex items-center bg-none border-none text-[var(--brand)] cursor-pointer p-0"
            aria-label={`Remove ${tag}`}
          >
            <MkIcon name="x" size={10} />
          </button>
        </span>
      ))}
    </div>
  );
}
