"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RotateCcw, Download, Maximize2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilmstripThumb } from "@/components/molecules/FilmstripThumb";
import { QCCheckRow } from "@/components/molecules/QCCheckRow";
import { MOCK_CASE_DETAIL, MOCK_DOC_QC } from "@/lib/agent-data";

const ZOOM_STEPS = [50, 75, 100, 125, 150, 175, 200, 250];

export default function DocumentViewerPage() {
  const params = useParams();
  const code = params.code as string;
  const docId = params.docId as string;

  const doc = MOCK_CASE_DETAIL.documents.find((d) => d.id === docId) ?? MOCK_CASE_DETAIL.documents[0];
  const [zoomIndex, setZoomIndex] = React.useState(2); // 100%
  const [activeDocId, setActiveDocId] = React.useState(docId);
  const [manualChecks, setManualChecks] = React.useState([false, false, false]);

  const zoom = ZOOM_STEPS[zoomIndex];

  const zoomOut = () => setZoomIndex((i) => Math.max(0, i - 1));
  const zoomIn = () => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1));

  const toggleCheck = (idx: number) => {
    setManualChecks((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const allManualChecked = manualChecks.every(Boolean);

  const MANUAL_CONFIRM_LABELS = [
    "Matches the person on the ID",
    "Recent (taken < 6 months)",
    "Meets Immigration spec",
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      {/* Top bar */}
      <div
        className={cn(
          "flex items-center gap-[12px]",
          "px-[20px] min-[980px]:px-[32px] h-[52px]",
          "bg-[var(--paper)] border-b border-[var(--rule)]"
        )}
      >
        <Link
          href={`/agent/case/${code}`}
          aria-label="Back to case"
          className={cn(
            "flex items-center gap-[6px] shrink-0",
            "font-sans text-[12px] text-[var(--ink-muted)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to case
        </Link>

        <div className="flex-1 min-w-0">
          <p className="font-serif text-[15px] text-[var(--ink)] truncate">
            {doc.label}
          </p>
          <p className="font-mono text-[10px] text-[var(--ink-muted)] truncate">
            {doc.filename} · {code}
          </p>
        </div>

        <div className="flex items-center gap-[4px]">
          <button
            type="button"
            aria-label="Rotate document"
            className={cn(
              "flex items-center justify-center w-[34px] h-[34px] rounded-[var(--r-md)]",
              "text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            aria-label="Download document"
            className={cn(
              "flex items-center justify-center w-[34px] h-[34px] rounded-[var(--r-md)]",
              "text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Download size={15} />
          </button>
          <button
            type="button"
            aria-label="Enter fullscreen"
            className={cn(
              "flex items-center justify-center w-[34px] h-[34px] rounded-[var(--r-md)]",
              "text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {/* Main: canvas + rail */}
      <div className="flex-1 grid min-[860px]:grid-cols-[1fr_320px]">
        {/* Canvas */}
        <div
          className="relative bg-[var(--ink)] flex items-center justify-center overflow-hidden"
          aria-label="Document canvas"
        >
          {/* Filmstrip (desktop, left) */}
          <div className="hidden min-[860px]:flex flex-col gap-[8px] absolute left-[16px] top-1/2 -translate-y-1/2 z-10">
            {MOCK_CASE_DETAIL.documents.map((d) => (
              <FilmstripThumb
                key={d.id}
                label={d.label}
                isActive={d.id === activeDocId}
                onClick={() => setActiveDocId(d.id)}
              />
            ))}
          </div>

          {/* Document */}
          <div
            role="img"
            aria-label={`Preview of ${doc.label}`}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center center" }}
            className={cn(
              "transition-transform duration-[var(--m-base)]",
              "w-[280px] min-[500px]:w-[360px] aspect-[3/4] max-w-[440px]",
              "bg-[var(--paper)] rounded-[var(--r-md)] overflow-hidden",
              "shadow-[0_16px_40px_rgba(0,0,0,0.45)]",
              "flex flex-col"
            )}
          >
            {/* Mock passport document */}
            <div className="bg-[var(--ink)] px-[12px] py-[8px]">
              <p className="font-mono text-[10px] text-[var(--paper)] text-center tracking-[0.15em] uppercase">
                Republic of Rwanda · Passport Photo
              </p>
            </div>
            <div className="flex-1 p-[16px] flex gap-[12px]">
              <div className="w-[38%] aspect-[3/4] bg-[var(--cream-2)] rounded-[var(--r-sm)] flex items-center justify-center">
                <span className="font-sans text-[10px] text-[var(--ink-subtle)]">Photo</span>
              </div>
              <div className="flex-1 flex flex-col gap-[8px]">
                {[80, 65, 75, 55].map((w, i) => (
                  <div key={i} className={`h-[8px] rounded-full bg-[var(--cream-2)]`} style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            <div className="px-[12px] py-[8px] bg-[var(--cream-2)]">
              <p className="font-mono text-[8px] text-[var(--ink-muted)] tracking-[0.08em]">
                P&lt;RWAKABERA&lt;&lt;ALINE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
              </p>
            </div>
          </div>

          {/* Zoom control */}
          <div
            className={cn(
              "absolute bottom-[20px] left-1/2 -translate-x-1/2",
              "flex items-center gap-[2px]",
              "bg-[var(--ink)]/80 rounded-[var(--r-pill)]",
              "px-[6px] py-[4px]",
              "backdrop-blur-sm"
            )}
          >
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoomIndex === 0}
              aria-label="Zoom out"
              className={cn(
                "flex items-center justify-center w-[28px] h-[28px] rounded-full",
                "text-[var(--paper)] disabled:opacity-30",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--paper)]/10",
                "focus-visible:outline-none"
              )}
            >
              <Minus size={14} />
            </button>
            <span
              aria-live="polite"
              aria-label={`Zoom level: ${zoom}%`}
              className="font-mono text-[12px] text-[var(--paper)] w-[40px] text-center"
            >
              {zoom}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              aria-label="Zoom in"
              className={cn(
                "flex items-center justify-center w-[28px] h-[28px] rounded-full",
                "text-[var(--paper)] disabled:opacity-30",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--paper)]/10",
                "focus-visible:outline-none"
              )}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Rail */}
        <aside
          aria-label="Document review rail"
          className="bg-[var(--paper)] border-l border-[var(--rule)] p-[20px] overflow-y-auto"
        >
          <h2 className="font-serif text-[20px] font-normal text-[var(--ink)] mb-[4px]">
            Review <em className="italic font-normal">{doc.label.split(" ")[0].toLowerCase()}</em>
          </h2>
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)] mb-[20px]">
            Uploaded {doc.uploadedAt} · {doc.fileSize}
          </p>

          {/* Auto QC */}
          <div className="mb-[20px]">
            <h3 className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)] mb-[6px]">
              Automatic checks
            </h3>
            <div className="bg-[var(--paper-2)] rounded-[var(--r-md)] border border-[var(--rule)] px-[14px]">
              {MOCK_DOC_QC.map((check) => (
                <QCCheckRow key={check.id} check={check} />
              ))}
            </div>
          </div>

          {/* Manual confirm */}
          <div className="mb-[24px]">
            <h3 className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)] mb-[8px]">
              Manual confirm
            </h3>
            <div className="flex flex-col gap-[10px]">
              {MANUAL_CONFIRM_LABELS.map((label, i) => (
                <label
                  key={i}
                  className="flex items-center gap-[10px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={manualChecks[i]}
                    onChange={() => toggleCheck(i)}
                    aria-label={label}
                    className="w-[16px] h-[16px] accent-[var(--brand)] cursor-pointer"
                  />
                  <span className="font-sans text-[13px] text-[var(--ink)]">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className="flex flex-col gap-[8px]">
            <button
              type="button"
              disabled={!allManualChecked}
              aria-label="Accept document and mark checklist step done"
              className={cn(
                "w-full h-[40px] rounded-[var(--r-pill)]",
                "bg-[var(--ok)] text-white",
                "font-sans text-[13px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              )}
            >
              Accept &amp; mark step done
            </button>
            <button
              type="button"
              aria-label="Reject document and ask client to retake"
              className={cn(
                "w-full h-[40px] rounded-[var(--r-pill)]",
                "border border-[var(--danger)]/50 text-[var(--danger)]",
                "font-sans text-[13px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "hover:bg-[var(--danger-soft)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              )}
            >
              Reject — ask client to retake
            </button>
            <p className="font-mono text-[10px] text-[var(--ink-subtle)] text-center mt-[4px]">
              Rejecting opens a pre-filled message to the client
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
