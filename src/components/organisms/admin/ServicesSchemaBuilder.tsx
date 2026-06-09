"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";
import { ServiceCatalogueRow } from "@/components/molecules/ServiceCatalogueRow";
import { SchemaCanvas } from "@/components/organisms/admin/SchemaCanvas";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";
import type { ServiceRow } from "@/lib/types/admin";

type CatalogueFilter = "all" | "active" | "inactive" | "draft";

const FILTERS: { id: CatalogueFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  { id: "draft", label: "Draft" },
];

export function ServicesSchemaBuilder() {
  const { services, activeSchemaServiceId } = useAdminState();
  const dispatch = useAdminDispatch();
  const [filter, setFilter] = React.useState<CatalogueFilter>("all");

  const filtered: ServiceRow[] =
    filter === "all"
      ? services
      : services.filter((s) => s.status === filter);

  function handleBuildSchema(serviceId: string) {
    dispatch({
      type: "SET_ACTIVE_SCHEMA_SERVICE",
      payload: activeSchemaServiceId === serviceId ? null : serviceId,
    });
    // Scroll down to builder
    setTimeout(() => {
      document
        .getElementById("schema-builder-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[28px]">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
          Services & Schema
        </h1>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
          Manage the service catalogue and build application schemas
        </p>
      </div>

      {/* Catalogue section */}
      <section aria-label="Service catalogue">
        <div className="flex items-center justify-between mb-[14px] flex-wrap gap-[8px]">
          {/* Filter chips */}
          <div className="flex gap-[4px]" role="group" aria-label="Service filter">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-[12px] py-[6px] rounded-[var(--r-pill)]",
                  "font-sans text-[13px] font-medium",
                  "transition-colors duration-[var(--m-fast)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                  filter === f.id
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--paper)] text-[var(--ink-muted)] border border-[var(--rule)] hover:text-[var(--ink)]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <AppButton variant="default" size="sm">
            <Plus size={13} aria-hidden="true" />
            Add service
          </AppButton>
        </div>

        <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
          <table className="w-full min-w-[760px]" aria-label="Service catalogue">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                {[
                  { label: "Service", align: "left" },
                  { label: "Category", align: "left" },
                  { label: "Fee", align: "right" },
                  { label: "ETA", align: "left" },
                  { label: "Schema", align: "left" },
                  { label: "30d volume", align: "right" },
                  { label: "Status", align: "left" },
                  { label: "", align: "left" },
                ].map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={cn(
                      "px-[12px] py-[10px] first:pl-[16px] last:pr-[16px]",
                      "font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]",
                      col.align === "right" ? "text-right" : "text-left"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-[16px] py-[40px] text-center font-sans text-[13px] text-[var(--ink-muted)]"
                  >
                    No services match this filter
                  </td>
                </tr>
              ) : (
                filtered.map((service) => (
                  <ServiceCatalogueRow
                    key={service.id}
                    service={service}
                    isActive={activeSchemaServiceId === service.id}
                    onEdit={() => {/* TODO: open edit modal */}}
                    onBuild={() => handleBuildSchema(service.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Schema builder — animated slide-in */}
      <AnimatePresence>
        {activeSchemaServiceId && (
          <motion.section
            id="schema-builder-section"
            key="schema-canvas"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.32, ease: [0, 0, 0, 1] }}
            aria-label="Schema builder"
          >
            <SchemaCanvas />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
