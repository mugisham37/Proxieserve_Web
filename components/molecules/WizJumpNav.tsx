"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface JumpNavItem {
  id: string;
  label: string;
}

interface WizJumpNavProps {
  items: JumpNavItem[];
  className?: string;
}

export function WizJumpNav({ items, className }: WizJumpNavProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Jump to section"
      className={cn(
        "hidden lg:flex flex-col gap-1 sticky top-[130px] border-l border-[var(--rule-soft)] pl-4",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleClick(item.id)}
          className={cn(
            "text-left font-sans text-[13px] py-1 transition-colors duration-[var(--m-fast)]",
            activeId === item.id
              ? "text-[var(--ink)] font-medium"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
