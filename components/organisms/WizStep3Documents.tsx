"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/services-data";
import { useApplication } from "@/lib/application-context";
import type { DocumentFile } from "@/lib/application-types";
import { DocOverview } from "@/components/molecules/DocOverview";
import { Dropzone } from "@/components/molecules/Dropzone";
import { WizFooter } from "@/components/molecules/WizFooter";
import { WizValidationBanner } from "@/components/molecules/WizValidationBanner";

interface WizStep3DocumentsProps {
  service: Service;
}

const MAX_FILE_MB = 10;

function simulateUpload(
  file: File,
  onProgress: (pct: number) => void,
  onDone: () => void,
  onError: (msg: string) => void
) {
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    onError(`File exceeds ${MAX_FILE_MB} MB limit`);
    return;
  }

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct >= 100) {
      clearInterval(interval);
      onDone();
    } else {
      onProgress(Math.min(pct, 95));
    }
  }, 220);
}

export function WizStep3Documents({ service }: WizStep3DocumentsProps) {
  const router = useRouter();
  const { draft, dispatch, setUiState, uiState } = useApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleFiles = (requirementLabel: string, files: File[]) => {
    files.forEach((file) => {
      const key = requirementLabel;
      // Start with uploading state
      const pending: DocumentFile = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        status: "uploading",
        progress: 0,
      };

      const existing = draft.documents[key] ?? [];
      dispatch({
        type: "PATCH_DOCUMENT",
        payload: { key, files: [...existing, pending] },
      });

      const currentIndex = existing.length;

      simulateUpload(
        file,
        (pct) => {
          dispatch({
            type: "PATCH_DOCUMENT",
            payload: {
              key,
              files: (draft.documents[key] ?? []).map((f, i) =>
                i === currentIndex ? { ...f, progress: pct } : f
              ),
            },
          });
        },
        () => {
          // Done — check if it's a photo type to trigger photo warn
          const isPhoto = file.type.startsWith("image/");
          const docType = service.requirements.find((r) => r.label === key)?.docType;

          dispatch({
            type: "PATCH_DOCUMENT",
            payload: {
              key,
              files: (draft.documents[key] ?? []).map((f, i) =>
                i === currentIndex ? { ...f, status: "done", progress: 100 } : f
              ),
            },
          });

          if (isPhoto && docType === "photo") {
            // Simulate AI quality check after 1.5s
            setTimeout(() => {
              setUiState((s) => ({ ...s, photoWarnKey: key }));
            }, 1500);
          }
        },
        (msg) => {
          dispatch({
            type: "PATCH_DOCUMENT",
            payload: {
              key,
              files: (draft.documents[key] ?? []).map((f, i) =>
                i === currentIndex ? { ...f, status: "error", errorMessage: msg } : f
              ),
            },
          });
        }
      );
    });
  };

  const handleRemove = (key: string, index: number) => {
    dispatch({ type: "REMOVE_DOCUMENT", payload: { key, index } });
    if (uiState.photoWarnKey === key) {
      setUiState((s) => ({ ...s, photoWarnKey: null }));
    }
  };

  const handleNext = () => {
    // Check required docs
    const missingRequired: string[] = [];
    service.requirements
      .filter((r) => !r.note?.includes("optional"))
      .forEach((r) => {
        const files = draft.documents[r.label] ?? [];
        const doneFiles = files.filter((f) => f.status === "done");
        if (doneFiles.length === 0) missingRequired.push(r.label);
      });

    if (missingRequired.length > 0) {
      const errs: Record<string, string> = {};
      missingRequired.forEach((l) => (errs[l] = `${l} is required`));
      setUiState((s) => ({ ...s, showValidationBanner: true, validationErrors: errs }));
      return;
    }

    dispatch({ type: "SET_HIGHEST_STEP", payload: 3 });
    setUiState((s) => ({ ...s, showValidationBanner: false, validationErrors: {} }));
    router.push(`/services/${service.slug}/apply/4`);
  };

  // Compute stats
  const requiredReqs = service.requirements.filter((r) => !r.note?.includes("optional"));
  const optionalReqs = service.requirements.filter((r) => r.note?.includes("optional"));
  const requiredDone = requiredReqs.filter((r) =>
    (draft.documents[r.label] ?? []).some((f) => f.status === "done")
  ).length;
  const optionalAdded = optionalReqs.filter((r) =>
    (draft.documents[r.label] ?? []).some((f) => f.status === "done")
  ).length;
  const totalBytes = Object.values(draft.documents)
    .flat()
    .filter((f) => f.status === "done")
    .reduce((sum, f) => sum + f.fileSize, 0);

  const validationErrors = uiState.showValidationBanner ? uiState.validationErrors : {};

  return (
    <div>
      <div className="flex flex-col gap-2 mb-6">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-[clamp(24px,3.5vw,36px)] font-medium italic text-[var(--ink)] outline-none"
        >
          Upload documents
        </h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          Provide the supporting documents for your {service.name} application
        </p>
      </div>

      <DocOverview
        requiredDone={requiredDone}
        requiredTotal={requiredReqs.length}
        optionalAdded={optionalAdded}
        optionalTotal={optionalReqs.length}
        totalBytes={totalBytes}
        className="mb-6"
      />

      {Object.keys(validationErrors).length > 0 && (
        <WizValidationBanner errors={validationErrors} className="mb-6" />
      )}

      <div className="flex flex-col gap-5">
        {service.requirements.map((req) => {
          const isOptional = !!req.note?.includes("optional");
          const files = draft.documents[req.label] ?? [];
          const showPhotoWarn = uiState.photoWarnKey === req.label;

          return (
            <div
              key={req.label}
              id={`doc-${req.label.replace(/\s+/g, "-").toLowerCase()}`}
              className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5"
            >
              {req.note && !isOptional && (
                <p className="font-sans text-[12px] text-[var(--ink-muted)] mb-3 italic">{req.note}</p>
              )}

              <Dropzone
                label={req.label}
                required={!isOptional}
                optional={isOptional}
                multiple={req.docType === "id"}
                accept={req.docType === "photo" || req.docType === "id" ? "image/*,.pdf" : "image/*,.pdf"}
                files={files}
                onFile={(fs) => handleFiles(req.label, fs)}
                onRemove={(i) => handleRemove(req.label, i)}
                showPhotoWarn={showPhotoWarn}
                onKeepPhoto={() => setUiState((s) => ({ ...s, photoWarnKey: null }))}
                onRetryPhoto={() => setUiState((s) => ({ ...s, photoWarnKey: null }))}
              />
            </div>
          );
        })}
      </div>

      <WizFooter
        step={3}
        serviceSlug={service.slug}
        onNext={handleNext}
      />
    </div>
  );
}
