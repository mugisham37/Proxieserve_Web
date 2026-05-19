"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

interface PageNavProps {
  items: NavItem[];
  className?: string;
}

export function PageNav({ items, className }: PageNavProps) {
  const [active, setActive] = React.useState(items[0]?.id ?? "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "flex items-center gap-1 overflow-x-auto scrollbar-none",
        "bg-[var(--paper)] border-b border-[var(--rule)] sticky top-14 z-40",
        "px-5 sm:px-8",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto w-full flex items-center gap-1 py-3">
        {items.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className={cn(
              "font-sans text-[13px] font-medium px-3 py-1.5 rounded-[999px] whitespace-nowrap transition-all duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
              active === id
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
