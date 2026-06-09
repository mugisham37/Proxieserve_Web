"use client";

import * as React from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { Plus, Eye, Save, Send, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";
import { FieldCard } from "@/components/molecules/FieldCard";
import { FieldInspector } from "@/components/molecules/FieldInspector";
import { SchemaPublishDialog } from "@/components/molecules/SchemaPublishDialog";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";
import type { FieldDef, FieldType } from "@/lib/types/admin";

const FIELD_PALETTE: { type: FieldType; label: string; icon: string }[] = [
  { type: "short-text", label: "Short text", icon: "T" },
  { type: "long-text", label: "Long text", icon: "¶" },
  { type: "single-choice", label: "Single choice", icon: "◉" },
  { type: "multi-select", label: "Multi-select", icon: "☑" },
  { type: "date", label: "Date", icon: "📅" },
  { type: "document", label: "Document upload", icon: "📎" },
  { type: "phone", label: "Phone", icon: "#" },
];

function useWindowWidth() {
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export function SchemaCanvas() {
  const { schemaFields, activeSchemaServiceId, schemaPublishOpen, services } =
    useAdminState();
  const dispatch = useAdminDispatch();
  const width = useWindowWidth();
  const isDesktop = width >= 1000;

  const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>(null);
  const selectedField = schemaFields.find((f) => f.id === selectedFieldId) ?? null;

  const activeService = services.find(
    (s) => s.id === activeSchemaServiceId
  );

  function handleReorder(newOrder: FieldDef[]) {
    dispatch({ type: "UPDATE_SCHEMA_FIELDS", payload: newOrder });
  }

  function addField(type: FieldType) {
    const label =
      FIELD_PALETTE.find((p) => p.type === type)?.label ?? "New field";
    const newField: FieldDef = {
      id: `f-${Date.now()}`,
      label,
      type,
      required: false,
      conditional: false,
      isNew: true,
    };
    dispatch({
      type: "UPDATE_SCHEMA_FIELDS",
      payload: [...schemaFields, newField],
    });
    setSelectedFieldId(newField.id);
  }

  function deleteField(id: string) {
    dispatch({
      type: "UPDATE_SCHEMA_FIELDS",
      payload: schemaFields.filter((f) => f.id !== id),
    });
    if (selectedFieldId === id) setSelectedFieldId(null);
  }

  function updateField(id: string, patch: Partial<FieldDef>) {
    dispatch({
      type: "UPDATE_SCHEMA_FIELDS",
      payload: schemaFields.map((f) =>
        f.id === id ? { ...f, ...patch } : f
      ),
    });
  }

  function handlePublish(mode: "auto" | "manual") {
    void mode; // In production: submit to backend
    dispatch({ type: "SET_SCHEMA_PUBLISH", payload: false });
  }

  // Desktop-only guard for schema builder
  if (!isDesktop) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[12px]",
          "py-[40px] px-[20px] text-center",
          "rounded-[var(--r-lg)] border border-dashed border-[var(--rule)]",
          "bg-[var(--paper)]"
        )}
        aria-live="polite"
      >
        <Monitor
          size={28}
          className="text-[var(--ink-subtle)]"
          aria-hidden="true"
        />
        <p className="font-sans text-[14px] font-medium text-[var(--ink)]">
          Best on desktop
        </p>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] max-w-[280px]">
          The schema builder works best on screens 1000px or wider.
          Please switch to a desktop to build and publish schemas.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)]",
          "overflow-hidden"
        )}
      >
        {/* Builder header */}
        <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[var(--rule)]">
          <div>
            <h3 className="font-sans text-[14px] font-medium text-[var(--ink)]">
              {activeService?.name ?? "Service"} — Schema builder
            </h3>
            <p className="font-mono text-[10px] text-[var(--ink-muted)] mt-[1px]">
              {schemaFields.length} field{schemaFields.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <AppButton variant="ghost" size="sm">
              <Eye size={13} aria-hidden="true" />
              Preview
            </AppButton>
            <AppButton variant="default" size="sm">
              <Save size={13} aria-hidden="true" />
              Save draft
            </AppButton>
            <AppButton
              variant="brand"
              size="sm"
              onClick={() => dispatch({ type: "SET_SCHEMA_PUBLISH", payload: true })}
            >
              <Send size={13} aria-hidden="true" />
              Publish
            </AppButton>
          </div>
        </div>

        {/* Canvas + Palette split */}
        <div className="grid grid-cols-[1fr_280px]">
          {/* Canvas */}
          <div className="p-[20px] border-r border-[var(--rule)] min-h-[400px]">
            {schemaFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <p className="font-sans text-[13px] text-[var(--ink-muted)]">
                  No fields yet — add one from the palette →
                </p>
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={schemaFields}
                onReorder={handleReorder}
                className="flex flex-col gap-[8px]"
                role="list"
                aria-label="Schema fields — drag to reorder"
              >
                <AnimatePresence>
                  {schemaFields.map((field) => (
                    <FieldCard
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onSelect={() =>
                        setSelectedFieldId(
                          selectedFieldId === field.id ? null : field.id
                        )
                      }
                      onDelete={() => deleteField(field.id)}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            )}
          </div>

          {/* Palette */}
          <div className="flex flex-col bg-[var(--paper-2)]">
            {/* Field type palette */}
            <div className="p-[12px] border-b border-[var(--rule)]">
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[8px]">
                Add field
              </p>
              <div className="flex flex-col gap-[3px]">
                {FIELD_PALETTE.map((p) => (
                  <button
                    key={p.type}
                    type="button"
                    onClick={() => addField(p.type)}
                    aria-label={`Add ${p.label} field`}
                    className={cn(
                      "flex items-center gap-[8px] px-[10px] py-[7px]",
                      "rounded-[var(--r-md)]",
                      "font-sans text-[12px] text-[var(--ink-muted)]",
                      "transition-colors duration-[var(--m-fast)]",
                      "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
                      "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    )}
                  >
                    <Plus size={12} aria-hidden="true" />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector */}
            <FieldInspector
              field={selectedField}
              onUpdate={(patch) => {
                if (selectedFieldId) updateField(selectedFieldId, patch);
              }}
            />
          </div>
        </div>
      </div>

      {/* Schema publish dialog — state #1 */}
      <AnimatePresence>
        {schemaPublishOpen && (
          <SchemaPublishDialog
            draftCount={142}
            onPublish={handlePublish}
            onCancel={() => dispatch({ type: "SET_SCHEMA_PUBLISH", payload: false })}
          />
        )}
      </AnimatePresence>
    </>
  );
}
