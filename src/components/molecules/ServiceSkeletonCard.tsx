import * as React from "react";
import { cn } from "@/lib/utils";
import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";

export function ServiceSkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden p-5 flex flex-col gap-3",
        className
      )}
      aria-hidden="true"
    >
      {/* Strip */}
      <div className="absolute left-0 top-0 bottom-0 w-2 skeleton-shimmer" />
      <div className="pl-3">
        <SkeletonBlock width="80px" height="10px" className="mb-3" />
        <SkeletonBlock width="70%" height="18px" className="mb-1" />
        <SkeletonBlock width="90%" height="12px" />
        <SkeletonBlock width="60%" height="12px" className="mb-4" />
        <div className="flex items-center justify-between pt-2 border-t border-[var(--rule-soft)]">
          <SkeletonBlock width="100px" height="13px" />
          <SkeletonBlock width="60px" height="20px" />
        </div>
      </div>
    </div>
  );
}
