"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/shared/Tag";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { type Service, COLOUR_MAP, CATEGORY_LABELS } from "@/lib/services-data";

interface CatalogueCardProps {
  service: Service;
  className?: string;
}

export function CatalogueCard({ service, className }: CatalogueCardProps) {
  const stripColour = COLOUR_MAP[service.colour];
  const isDisabled = service.status === "paused" || service.status === "unavailable" || service.status === "archived";

  const cardContent = (
    <motion.div
      whileHover={isDisabled ? undefined : { y: -2, boxShadow: "var(--sh-raised)" }}
      transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "relative bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden flex flex-col h-full",
        "transition-colors duration-[var(--m-fast)]",
        isDisabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* Coloured left strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 shrink-0"
        style={{ background: stripColour }}
        aria-hidden="true"
      />

      <div className="pl-6 pr-5 pt-5 pb-5 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <Eyebrow className="text-[var(--ink-muted)]">
            {CATEGORY_LABELS[service.category]}
          </Eyebrow>
          {service.status !== "active" && (
            <StatusPill
              variant={
                service.status === "paused"
                  ? "warn"
                  : service.status === "archived"
                  ? "danger"
                  : "info"
              }
              size="md"
              label={
                service.status === "paused"
                  ? "Paused"
                  : service.status === "archived"
                  ? "Archived"
                  : "Unavailable"
              }
            />
          )}
        </div>

        <h3 className="t-h3 text-[var(--ink)] leading-tight">{service.name}</h3>

        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed flex-1">
          {service.lede}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-[var(--rule-soft)]">
          <span className="font-mono text-[13px] text-[var(--ink)]">
            RWF {service.fee.toLocaleString()}
          </span>
          <Tag variant="default" className="font-mono text-[11px]">
            {service.eta}
          </Tag>
        </div>

        {!isDisabled && (
          <span className="font-sans text-[12px] text-[var(--brand)] font-medium group-hover:underline">
            Learn more →
          </span>
        )}
      </div>
    </motion.div>
  );

  if (isDisabled) {
    return <div aria-disabled="true" className="group">{cardContent}</div>;
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-[var(--r-lg)]"
    >
      {cardContent}
    </Link>
  );
}
