"use client";

import { MkIcon } from "@/components/atoms/MkIcon";
import { RecoveryCode } from "@/components/atoms/RecoveryCode";

interface RecoveryCodesGridProps {
  codes: readonly string[];
}

export function RecoveryCodesGrid({ codes }: RecoveryCodesGridProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(codes.join("\n"));
  };

  const handleDownload = () => {
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solai-recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[6px] mb-4">
        {codes.map((code, i) => (
          <RecoveryCode key={code} index={i} code={code} />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-[10px] px-5 text-[14px] font-medium bg-transparent text-[var(--text)] border border-[var(--border)] rounded-[10px] hover:bg-[var(--surface-2)] hover:border-[var(--text-subtle)] transition-all duration-[120ms]"
        >
          <MkIcon name="copy" size={14} /> Copy all
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 py-[10px] px-5 text-[14px] font-medium bg-transparent text-[var(--text)] border border-[var(--border)] rounded-[10px] hover:bg-[var(--surface-2)] hover:border-[var(--text-subtle)] transition-all duration-[120ms]"
        >
          <MkIcon name="download" size={14} /> Download .txt
        </button>
      </div>
    </div>
  );
}
