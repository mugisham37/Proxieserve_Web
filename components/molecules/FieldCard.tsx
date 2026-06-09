"use client";

import * as React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Trash2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldDef } from "@/lib/types/admin";

interface FieldCardProps {
  field: FieldDef;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const typeLabels: Record<FieldDef["type"], string> = {
  "short-text": "Short text",
  "long-text": "Long text",
  "single-choice": "Single choice",
  "multi-select": "Multi-select",
  date: "Date",
  document: "Document upload",
  phone: "Phone",
};

function FieldPreview({ field }: { field: FieldDef }) {
  if (field.type === "single-choice" || field.type === "multi-select") {
    return (
      <select
        disabled
        aria-hidden="true"
        className={cn(
          "w-full h-[28px] px-[8px] text-[11px]",
          "bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-sm)]",
          "text-[var(--ink-subtle)] cursor-not-allowed font-sans"
        )}
      >
        <option>{field.options?.[0] ?? "Select…"}</option>
      </select>
    );
  }
  if (field.type === "date") {
    return (
      <input
        disabled
        type="date"
        aria-hidden="true"
        className={cn(
          "w-full h-[28px] px-[8px] text-[11px]",
          "bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-sm)]",
          "text-[var(--ink-subtle)] cursor-not-allowed font-sans"
        )}
      />
    );
  }
  return (
    <input
      disabled
      type="text"
      placeholder={field.label}
      aria-hidden="true"
      className={cn(
        "w-full h-[28px] px-[8px] text-[11px]",
        "bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-sm)]",
        "text-[var(--ink-subtle)] cursor-not-allowed font-sans",
        "placeholder:text-[var(--ink-subtle)]"
      )}
    />
  );
}

export function FieldCard({ field, isSelected, onSelect, onDelete }: FieldCardProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={field}
      dragListener={false}
      dragControls={controls}
      className={cn(
        "rounded-[var(--r-md)] border",
        "bg-[var(--paper)] p-[12px]",
        "flex flex-col gap-[8px]",
        "cursor-default select-none",
        isSelected
          ? "border-[var(--brand)] shadow-[0_0_0_2px_var(--brand-soft)]"
          : "border-[var(--rule)] hover:border-[var(--ink-muted)]",
        "transition-all duration-[var(--m-fast)]"
      )}
    >
      {/* Top row */}
      <div className="flex items-center gap-[8px]">
        {/* Drag handle */}
        <button
          type="button"
          onPointerDown={(e) => controls.start(e)}
          aria-label="Drag to reorder"
          className={cn(
            "shrink-0 cursor-grab active:cursor-grabbing",
            "text-[var(--ink-subtle)] hover:text-[var(--ink-muted)]",
            "focus-visible:outline-none"
          )}
        >
          <GripVertical size={14} />
        </button>

        {/* Label */}
        <span className="flex-1 font-sans text-[13px] font-medium text-[var(--ink)] truncate">
          {field.label}
        </span>

        {/* Badges */}
        <div className="flex items-center gap-[4px]">
          <span className="font-mono text-[9px] tracking-[0.06em] uppercase px-[5px] py-[1px] rounded-[var(--r-sm)] bg-[var(--paper-2)] text-[var(--ink-muted)]">
            {typeLabels[field.type]}
          </span>
          {field.required && (
            <span className="font-mono text-[9px] px-[5px] py-[1px] rounded-[var(--r-sm)] bg-[var(--brand-soft)] text-[var(--brand-ink)]">
              req
            </span>
          )}
          {field.conditional && (
            <span className="font-mono text-[9px] px-[5px] py-[1px] rounded-[var(--r-sm)] bg-[var(--info-soft)] text-[var(--info)]">
              cond
            </span>
          )}
          {field.isNew && (
            <span className="font-mono text-[9px] px-[5px] py-[1px] rounded-[var(--r-sm)] bg-[var(--ok-soft)] text-[var(--ok)]">
              new
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-[2px]">
          <button
            type="button"
            onClick={onSelect}
            aria-label={`Edit settings for ${field.label}`}
            aria-pressed={isSelected}
            className={cn(
              "w-[24px] h-[24px] rounded-[var(--r-sm)]",
              "flex items-center justify-center",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              isSelected
                ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                : "text-[var(--ink-muted)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"
            )}
          >
            <Settings2 size={12} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete field ${field.label}`}
            className={cn(
              "w-[24px] h-[24px] rounded-[var(--r-sm)]",
              "flex items-center justify-center",
              "text-[var(--ink-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Field preview */}
      <FieldPreview field={field} />
    </Reorder.Item>
  );
}
