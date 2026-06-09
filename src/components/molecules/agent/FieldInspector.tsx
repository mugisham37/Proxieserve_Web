"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { FieldDef, FieldType } from "@/lib/types/admin";

interface FieldInspectorProps {
  field: FieldDef | null;
  onUpdate: (patch: Partial<FieldDef>) => void;
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "short-text", label: "Short text" },
  { value: "long-text", label: "Long text" },
  { value: "single-choice", label: "Single choice" },
  { value: "multi-select", label: "Multi-select" },
  { value: "date", label: "Date" },
  { value: "document", label: "Document upload" },
  { value: "phone", label: "Phone" },
];

export function FieldInspector({ field, onUpdate }: FieldInspectorProps) {
  if (!field) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center px-[16px]">
        <p className="font-sans text-[13px] text-[var(--ink-muted)]">
          Select a field to edit its settings
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <h3 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
        Field settings
      </h3>

      {/* Label */}
      <div className="flex flex-col gap-[5px]">
        <label
          htmlFor="fi-label"
          className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
        >
          Label
        </label>
        <input
          id="fi-label"
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className={cn(
            "w-full h-[34px] px-[10px]",
            "bg-[var(--cream)] border border-[var(--rule)]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
            "focus:outline-none focus:border-[var(--ink)]",
            "transition-colors duration-[var(--m-fast)]"
          )}
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-[5px]">
        <label
          htmlFor="fi-type"
          className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
        >
          Type
        </label>
        <select
          id="fi-type"
          value={field.type}
          onChange={(e) => onUpdate({ type: e.target.value as FieldType })}
          className={cn(
            "w-full h-[34px] px-[10px]",
            "bg-[var(--cream)] border border-[var(--rule)]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
            "focus:outline-none focus:border-[var(--ink)]",
            "transition-colors duration-[var(--m-fast)]"
          )}
        >
          {FIELD_TYPES.map((ft) => (
            <option key={ft.value} value={ft.value}>
              {ft.label}
            </option>
          ))}
        </select>
      </div>

      {/* Help text */}
      <div className="flex flex-col gap-[5px]">
        <label
          htmlFor="fi-help"
          className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
        >
          Help text
        </label>
        <input
          id="fi-help"
          type="text"
          value={field.helpText ?? ""}
          onChange={(e) => onUpdate({ helpText: e.target.value })}
          placeholder="Optional hint shown to the applicant"
          className={cn(
            "w-full h-[34px] px-[10px]",
            "bg-[var(--cream)] border border-[var(--rule)]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
            "placeholder:text-[var(--ink-subtle)]",
            "focus:outline-none focus:border-[var(--ink)]",
            "transition-colors duration-[var(--m-fast)]"
          )}
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-[10px]">
        <label className="flex items-center gap-[10px] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-[15px] h-[15px] accent-[var(--brand)] rounded"
          />
          <span className="font-sans text-[13px] text-[var(--ink)]">Required</span>
        </label>
        <label className="flex items-center gap-[10px] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={field.conditional}
            onChange={(e) => onUpdate({ conditional: e.target.checked })}
            className="w-[15px] h-[15px] accent-[var(--brand)] rounded"
          />
          <span className="font-sans text-[13px] text-[var(--ink)]">Conditional</span>
        </label>
      </div>
    </div>
  );
}
