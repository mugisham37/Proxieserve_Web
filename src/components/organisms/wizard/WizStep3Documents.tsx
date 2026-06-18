"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { UiService } from "@/lib/service-ui-types";
import { useApplication } from "@/lib/application-context";
import type { DocumentFile } from "@/lib/application-types";
import { DocOverview } from "@/components/molecules/agent/DocOverview";
import { Dropzone } from "@/components/molecules/wizard/Dropzone";
import { WizFooter } from "@/components/molecules/wizard/WizFooter";
import { WizValidationBanner } from "@/components/molecules/wizard/WizValidationBanner";

interface WizStep3DocumentsProps {
  service: UiService;
}

function reqKey(req: UiService["requirements"][number]): string {
  return req.key ?? req.label;
}

export function WizStep3Documents({ service }: WizStep3DocumentsProps) {
  const router = useRouter();
  const { draft, dispatch, setUiState, uiState, stagedFiles, setStagedFiles } = useApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleFiles = (requirementKey: string, files: File[], req: UiService["requirements"][number]) => {
    files.forEach((file) => {
      const maxMb = req.maxSizeMb ?? 10;
      if (file.size > maxMb * 1024 * 1024) {
        const pending: DocumentFile = {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          status: "error",
          errorMessage: `File exceeds ${maxMb} MB limit`,
        };
        const existing = draft.documents[requirementKey] ?? [];
        dispatch({
          type: "PATCH_DOCUMENT",
          payload: { key: requirementKey, files: [...existing, pending] },
        });
        return;
      }

      const pending: DocumentFile = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        status: "done",
        progress: 100,
      };

      const existing = draft.documents[requirementKey] ?? [];
      dispatch({
        type: "PATCH_DOCUMENT",
        payload: { key: requirementKey, files: [...existing, pending] },
      });

      setStagedFiles((prev) => ({
        ...prev,
        [requirementKey]: [...(prev[requirementKey] ?? []), file],
      }));
    });
  };

  const handleRemove = (key: string, index: number) => {
    dispatch({ type: "REMOVE_DOCUMENT", payload: { key, index } });
    setStagedFiles((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((_, i) => i !== index),
    }));
    if (uiState.photoWarnKey === key) {
      setUiState((s) => ({ ...s, photoWarnKey: null }));
    }
  };

  const handleNext = () => {
    const missingRequired: string[] = [];
    service.requirements
      .filter((r) => r.status !== "optional")
      .forEach((r) => {
        const key = reqKey(r);
        const files = draft.documents[key] ?? [];
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

  const requiredReqs = service.requirements.filter((r) => r.status !== "optional");
  const optionalReqs = service.requirements.filter((r) => r.status === "optional");
  const requiredDone = requiredReqs.filter((r) =>
    (draft.documents[reqKey(r)] ?? []).some((f) => f.status === "done"),
  ).length;
  const optionalAdded = optionalReqs.filter((r) =>
    (draft.documents[reqKey(r)] ?? []).some((f) => f.status === "done"),
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
          const key = reqKey(req);
          const isOptional = req.status === "optional";
          const files = draft.documents[key] ?? [];
          const showPhotoWarn = uiState.photoWarnKey === key;

          return (
            <div
              key={key}
              id={`doc-${key.replace(/\s+/g, "-").toLowerCase()}`}
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
                onFile={(fs) => handleFiles(key, fs, req)}
                onRemove={(i) => handleRemove(key, i)}
                showPhotoWarn={showPhotoWarn}
                onKeepPhoto={() => setUiState((s) => ({ ...s, photoWarnKey: null }))}
                onRetryPhoto={() => handleRemove(key, files.length - 1)}
              />
            </div>
          );
        })}
      </div>

      <WizFooter step={3} serviceSlug={service.slug} onNext={handleNext} />
    </div>
  );
}
