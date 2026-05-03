"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion className="max-w-[720px] mx-auto w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={i}
          className={cn(
            "border-b border-border last:border-0 data-open:border-b-warning"
          )}
        >
          <AccordionTrigger className="flex items-center gap-3 py-[18px] w-full text-left no-underline hover:no-underline">
            <span className="font-mono text-[13px] text-text-subtle shrink-0 w-7">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[16px] font-medium text-text">
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-10 text-[14px] text-text-muted leading-[1.7]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
