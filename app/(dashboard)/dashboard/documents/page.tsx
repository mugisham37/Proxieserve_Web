import * as React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { DashDocRow } from "@/components/molecules/DashDocRow";
import { MOCK_DOCUMENTS } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Documents",
};

export default function DocumentsPage() {
  return (
    <DashboardShell pageTitle="Documents" backHref="/dashboard">
      <div className="max-w-[800px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif font-medium text-[clamp(28px,4vw,40px)] text-[var(--ink)] m-0 leading-[1.1]">
            Documents
          </h1>
          <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-1">
            All documents across your applications — {MOCK_DOCUMENTS.length} files.
          </p>
        </div>

        {/* Grouped by application */}
        {MOCK_DOCUMENTS.length === 0 ? (
          <p className="font-sans text-[13.5px] text-[var(--ink-muted)]">No documents yet.</p>
        ) : (
          <ul className="flex flex-col gap-2" aria-label="All documents">
            {MOCK_DOCUMENTS.map((doc) => (
              <DashDocRow key={doc.id} doc={doc} />
            ))}
          </ul>
        )}
      </div>
    </DashboardShell>
  );
}
