"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileRow } from "@/components/molecules/tracker/FileRow";
import type { DocumentFile } from "@/lib/application-types";

interface DropzoneProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  multiple?: boolean;
  accept?: string;
  files: DocumentFile[];
  onFile: (files: File[]) => void;
  onRemove: (index: number) => void;
  onReplace?: (index: number, file: File) => void;
  showPhotoWarn?: boolean;
  onKeepPhoto?: () => void;
  onRetryPhoto?: () => void;
  className?: string;
}

export function Dropzone({
  label,
  required,
  optional,
  multiple = false,
  accept = "image/*,.pdf",
  files,
  onFile,
  onRemove,
  onReplace,
  showPhotoWarn,
  onKeepPhoto,
  onRetryPhoto,
  className,
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const replaceInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [replaceIndex, setReplaceIndex] = React.useState<number | null>(null);

  const doneFiles = files.filter((f) => f.status === "done");
  const uploadingFiles = files.filter((f) => f.status === "uploading");
  const hasFiles = files.length > 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) onFile(multiple ? dropped : [dropped[0]]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > 0) {
      if (replaceIndex !== null && onReplace) {
        onReplace(replaceIndex, selected[0]);
        setReplaceIndex(null);
      } else {
        onFile(multiple ? selected : [selected[0]]);
      }
    }
    e.target.value = "";
  };

  const handleReplace = (index: number) => {
    setReplaceIndex(index);
    replaceInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
          {label}
          {required && <span className="text-[var(--danger)] ml-0.5">*</span>}
        </span>
        {optional && (
          <span className="px-2 py-0.5 rounded-full bg-[var(--cream)] font-sans text-[10px] font-medium text-[var(--ink-subtle)] uppercase tracking-wide">
            Optional
          </span>
        )}
      </div>

      {/* Drop area — shown when no done files (or multiple allowed) */}
      {(!hasFiles || multiple || uploadingFiles.length > 0) && doneFiles.length === 0 && (
        <div
          role="button"
          tabIndex={0}
          aria-label={`Upload ${label}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "rounded-[var(--r-lg)] border-2 border-dashed p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors duration-[120ms]",
            isDragging
              ? "border-[var(--brand)] bg-[var(--brand-soft)]"
              : "border-[var(--rule-strong)] bg-[var(--paper)] hover:border-[var(--ink-muted)] hover:bg-[var(--cream)]"
          )}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="text-[var(--ink-subtle)]">
            <rect x="4" y="8" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 22v-8M12 17l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 8V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
              {isDragging ? "Drop to upload" : "Drag & drop or click to upload"}
            </span>
            <span className="font-sans text-[12px] text-[var(--ink-muted)]">
              JPG, PNG or PDF · max 10 MB{multiple ? " · multiple files" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] bg-[var(--paper)] font-sans text-[12px] text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors pointer-events-none">
              📷 Take a photo
            </span>
            <span className="px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] bg-[var(--paper)] font-sans text-[12px] text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors pointer-events-none">
              📁 Upload from device
            </span>
          </div>
        </div>
      )}

      {/* Uploading state */}
      {uploadingFiles.map((file, i) => (
        <div
          key={i}
          className="rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--paper)] p-3"
        >
          <FileRow
            file={file}
            onRemove={() => onRemove(files.indexOf(file))}
          />
        </div>
      ))}

      {/* Done files */}
      {doneFiles.map((file) => {
        const idx = files.indexOf(file);
        return (
          <div
            key={idx}
            className={cn(
              "rounded-[var(--r-md)] border p-3",
              "border-[var(--ok)] bg-[var(--ok-soft)]"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--ok)] text-white" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-sans text-[12px] text-[var(--ok)] font-medium">Uploaded</span>
            </div>
            <FileRow
              file={file}
              onReplace={() => handleReplace(idx)}
              onRemove={() => onRemove(idx)}
            />
          </div>
        );
      })}

      {/* Error files */}
      {files.filter((f) => f.status === "error").map((file) => {
        const idx = files.indexOf(file);
        return (
          <div
            key={idx}
            className="rounded-[var(--r-md)] border border-[var(--danger)] bg-[var(--danger-soft)] p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--danger)] text-white" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-sans text-[12px] text-[var(--danger)] font-medium">Upload failed</span>
            </div>
            <FileRow
              file={file}
              onRemove={() => onRemove(idx)}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--danger)] font-sans text-[12px] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white transition-colors"
            >
              Try again
            </button>
          </div>
        );
      })}

      {/* Photo quality warning */}
      {showPhotoWarn && (
        <div className="rounded-[var(--r-md)] border border-[var(--warn)] bg-[var(--warn-soft)] p-4">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5 text-[var(--warn)]" aria-hidden="true">
              <path d="M10 2L18 17H2L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
            </svg>
            <div className="flex-1">
              <p className="font-sans text-[13px] font-medium text-[var(--warn)] mb-1">
                Photo quality may be too low
              </p>
              <p className="font-sans text-[12px] text-[var(--ink-muted)] mb-3">
                The image might be blurry or have poor lighting. Officials may reject unclear documents.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onRetryPhoto}
                  className="px-3 py-1.5 rounded-[var(--r-md)] bg-[var(--warn)] text-white font-sans text-[12px] font-medium hover:opacity-90 transition-opacity"
                >
                  Try another photo
                </button>
                <button
                  type="button"
                  onClick={onKeepPhoto}
                  className="px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                >
                  Keep this one
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add more — shown when multiple and there are already done files */}
      {multiple && doneFiles.length > 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-[var(--r-md)] border border-dashed border-[var(--rule-strong)] font-sans text-[12px] text-[var(--ink-muted)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add another file
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
