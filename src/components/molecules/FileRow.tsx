"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileThumb } from "@/components/atoms/shared/FileThumb";
import { ProgressBar } from "@/components/atoms/wizard/ProgressBar";
import type { DocumentFile } from "@/lib/application-types";

interface FileRowProps {
  file: DocumentFile;
  onPreview?: () => void;
  onReplace?: () => void;
  onRemove?: () => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExt(fileName: string): string {
  return fileName.split(".").pop()?.toUpperCase() ?? "FILE";
}

export function FileRow({ file, onPreview, onReplace, onRemove, className }: FileRowProps) {
  const ext = getExt(file.fileName);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-3">
        <FileThumb ext={ext} />
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[13px] text-[var(--ink)] truncate">{file.fileName}</p>
          <p className="font-mono text-[11px] text-[var(--ink-muted)]">{formatBytes(file.fileSize)}</p>
        </div>

        {file.status === "done" && (
          <div className="flex items-center gap-0.5">
            {onPreview && (
              <button
                type="button"
                onClick={onPreview}
                className="px-2 py-1 font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                Preview
              </button>
            )}
            {onReplace && (
              <button
                type="button"
                onClick={onReplace}
                className="px-2 py-1 font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                Replace
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="px-2 py-1 font-sans text-[12px] text-[var(--danger)] hover:text-[var(--danger)] transition-colors"
                aria-label={`Remove ${file.fileName}`}
              >
                Remove
              </button>
            )}
          </div>
        )}

        {file.status === "error" && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="px-2 py-1 font-sans text-[12px] text-[var(--danger)] transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {file.status === "uploading" && (
        <ProgressBar value={file.progress ?? 0} className="mt-0.5" />
      )}

      {file.status === "error" && file.errorMessage && (
        <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">{file.errorMessage}</p>
      )}
    </div>
  );
}
