"use client";

import { useEffect, useRef, useState } from "react";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { CopilotMsg } from "@/src/components/molecules/CopilotMsg";
import { useDashboardUI } from "@/src/hooks/useDashboardUI";
import { DASH_COPILOT_MESSAGES } from "@/src/lib/data/dashboard";
import type { CopilotMsg as CopilotMsgType } from "@/src/types";

export function DashCopilot() {
  const { copilotOpen, setCopilotOpen } = useDashboardUI();
  const [input, setInput] = useState("");
  const [messages] = useState<CopilotMsgType[]>(DASH_COPILOT_MESSAGES);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (copilotOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [copilotOpen, messages.length]);

  if (!copilotOpen) {
    return (
      <button
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer border-none transition-transform hover:scale-110"
        style={{
          background: "var(--brand)",
          boxShadow: "0 4px 16px rgba(91,124,255,.3)",
          fontFamily: "inherit",
        }}
        onClick={() => setCopilotOpen(true)}
        aria-label="Open SolAI Copilot"
      >
        <MkIcon name="zap" size={20} />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] flex flex-col overflow-hidden"
      style={{
        width: "380px",
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "520px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "0 8px 32px rgba(0,0,0,.2)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: "var(--text)" }}>
          <span style={{ color: "var(--brand)" }}>
            <MkIcon name="zap" size={16} />
          </span>
          SolAI Copilot
        </div>
        <button
          className="flex rounded p-1 transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-subtle)" }}
          onClick={() => setCopilotOpen(false)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--text-subtle)";
          }}
        >
          <MkIcon name="x" size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map((m, i) => (
          <CopilotMsg key={i} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex gap-2 px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <input
          type="text"
          placeholder="Ask SolAI anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && setInput("")}
          className="flex-1 px-3 py-2 text-[13px] rounded-[var(--radius-md)] outline-none transition-colors"
          style={{
            background: "var(--bg)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brand)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <button
          className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-white border-none cursor-pointer flex-shrink-0 transition-opacity"
          style={{
            background: "var(--brand)",
            opacity: input.trim() ? 1 : 0.4,
            cursor: input.trim() ? "pointer" : "not-allowed",
            fontFamily: "inherit",
          }}
          disabled={!input.trim()}
          onClick={() => setInput("")}
          aria-label="Send message"
        >
          <MkIcon name="send" size={16} />
        </button>
      </div>
    </div>
  );
}
