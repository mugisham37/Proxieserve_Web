"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { ProgressNodes } from "@/components/atoms/wizard/ProgressNodes";
import { STATUS_STRIP_COLOR, STATUS_LABEL, formatFeeShort } from "@/lib/dashboard-data";
import type { DashboardApplication } from "@/lib/types/dashboard";

interface ApplicationCardProps {
  application: DashboardApplication;
  className?: string;
}

export function ApplicationCard({ application, className }: ApplicationCardProps) {
  const prefersReduced = useReducedMotion();
  const isDiscontinued = application.status === "discontinued";

  const inner = (
    <>
      {/* Status strip */}
      <div
        className="h-[8px] w-full"
        style={{ backgroundColor: STATUS_STRIP_COLOR[application.status] }}
        aria-hidden="true"
      />

      <div className="p-[22px]">
        {/* Top row: category + status pill */}
        <div className="flex items-start justify-between gap-2 mb-[10px]">
          <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
            {application.category}
          </p>
          <StatusPill
            label={STATUS_LABEL[application.status]}
            variant={
              application.status === "action-required"
                ? "warn"
                : application.status === "in-progress"
                ? "brand"
                : application.status === "completed"
                ? "ok"
                : "info"
            }
          />
        </div>

        {/* Service name — mixed serif + italic */}
        <h3 className="font-serif text-[22px] font-normal text-[var(--ink)] leading-[1.25] mb-[4px]">
          {application.serviceNameBase}{" "}
          <em className="italic font-normal">{application.serviceNameItalic}</em>
        </h3>

        {/* Code */}
        <p className="font-mono text-[12px] tracking-[0.06em] text-[var(--ink-muted)] mb-[14px]">
          {application.code}
        </p>

        {/* Progress bar */}
        <ProgressNodes steps={application.progress} className="mb-[16px]" />

        {/* Discontinued note */}
        {isDiscontinued && (
          <p className="font-sans text-[12px] text-[var(--ink-muted)] bg-[var(--cream-2)] rounded-[var(--r-sm)] px-[10px] py-[6px] mb-[12px]">
            This service was discontinued. Your documents are safely archived.
          </p>
        )}

        {/* Meta rows — Agent / Est. / Fee */}
        <dl className="flex items-center flex-wrap gap-x-[20px] gap-y-[4px]">
          <div className="flex items-center gap-[6px]">
            <dt className="font-sans text-[11px] uppercase tracking-[0.06em] text-[var(--ink-muted)]">Agent</dt>
            <dd className="font-sans text-[12px] font-medium text-[var(--ink)]">
              {application.agent.shortName}
            </dd>
          </div>
          <div className="flex items-center gap-[6px]">
            <dt className="font-sans text-[11px] uppercase tracking-[0.06em] text-[var(--ink-muted)]">Est.</dt>
            <dd className="font-sans text-[12px] font-medium text-[var(--ink)]">
              {application.estimatedDate}
            </dd>
          </div>
          <div className="flex items-center gap-[6px]">
            <dt className="font-sans text-[11px] uppercase tracking-[0.06em] text-[var(--ink-muted)]">Fee</dt>
            <dd className="font-mono text-[12px] font-medium text-[var(--ink)]">
              {formatFeeShort(application.serviceFee)}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );

  if (isDiscontinued) {
    return (
      <div
        className={cn(
          "flex flex-col rounded-[var(--r-md)] border border-[var(--rule)]",
          "bg-[var(--paper)] overflow-hidden opacity-60",
          className
        )}
        aria-label={`${application.serviceName} — ${STATUS_LABEL[application.status]}`}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={prefersReduced ? {} : { y: -2 }}
      transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      <Link
        href={`/app/${application.code}`}
        className={cn(
          "flex flex-col rounded-[var(--r-md)] border border-[var(--rule)]",
          "bg-[var(--paper)] overflow-hidden",
          "transition-shadow duration-[var(--m-fast)]",
          "hover:shadow-[var(--sh-subtle)]",
          prefersReduced && "hover:border-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          "block"
        )}
        aria-label={`${application.serviceName} — ${STATUS_LABEL[application.status]}`}
      >
        {inner}
      </Link>
    </motion.div>
  );
}
