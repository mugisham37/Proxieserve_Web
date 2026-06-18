"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/shared/Tag";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import type { UiServiceSummary } from "@/lib/service-ui-types";
import { CATEGORY_LABELS, COLOUR_MAP } from "@/lib/service-constants";

interface CatalogueCardProps {
  service: UiServiceSummary;
  className?: string;
}

export function CatalogueCard({ service, className }: CatalogueCardProps) {
  const stripColour = COLOUR_MAP[service.colour];
  const isDisabled = service.status === "paused" || service.status === "unavailable" || service.status === "archived";

  return (
    <motion.article
      whileHover={isDisabled ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex flex-col bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden h-full",
        isDisabled && "opacity-60",
        className,
      )}
    >
      <div className="h-1.5 w-full" style={{ background: stripColour }} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <Eyebrow className="text-[var(--ink-subtle)]">
            {CATEGORY_LABELS[service.category]}
          </Eyebrow>
          {service.status !== "active" && (
            <StatusPill variant="warn" label={service.status} />
          )}
        </div>

        <h2 className="font-serif text-[20px] font-medium text-[var(--ink)] leading-snug">
          {service.name}
        </h2>

        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed flex-1 line-clamp-2">
          {service.lede}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--rule-soft)]">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[var(--ink-subtle)] uppercase tracking-wide">From</span>
            <span className="font-mono text-[14px] text-[var(--ink)] font-medium">
              RWF {service.fee.toLocaleString()}
            </span>
          </div>
          <Tag variant="default">{service.eta}</Tag>
        </div>

        {isDisabled ? (
          <span className="font-sans text-[13px] text-[var(--ink-muted)] text-center py-2">
            Currently unavailable
          </span>
        ) : (
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center justify-center gap-1 font-sans text-[13px] font-medium text-[var(--brand)] hover:underline mt-1"
          >
            View details →
          </Link>
        )}
      </div>
    </motion.article>
  );
}
