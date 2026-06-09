import * as React from "react";
import { FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilmstripThumbProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function FilmstripThumb({ label, isActive, onClick }: FilmstripThumbProps) {
  return (
    <button
      type="button"
      aria-label={`View ${label}`}
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center",
        "w-[48px] h-[60px] rounded-[var(--r-sm)] shrink-0",
        "bg-gradient-to-br from-[var(--cream-2)] to-[var(--cream)]",
        "border-2 transition-all duration-[var(--m-fast)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        isActive
          ? "border-[var(--brand)] opacity-100"
          : "border-transparent opacity-60 hover:opacity-80"
      )}
    >
      <FileImage size={18} className="text-[var(--ink-muted)]" aria-hidden="true" />
    </button>
  );
}
