import { MkIcon } from "@/src/components/atoms/MkIcon";
import type { CopilotMsg as CopilotMsgType } from "@/src/types";

interface CopilotMsgProps {
  message: CopilotMsgType;
}

export function CopilotMsg({ message }: CopilotMsgProps) {
  const isAI = message.role === "ai";

  return (
    <div className={`flex gap-2 ${isAI ? "" : "justify-end"}`}>
      {isAI && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
        >
          <MkIcon name="zap" size={14} />
        </div>
      )}
      <div
        className="max-w-[85%] px-3.5 py-2.5 rounded-[var(--radius-lg)] text-[13px] leading-relaxed"
        style={
          isAI
            ? {
                background: "var(--surface-2)",
                color: "var(--text-muted)",
                borderBottomLeftRadius: "4px",
              }
            : {
                background: "var(--brand)",
                color: "#fff",
                borderBottomRightRadius: "4px",
              }
        }
      >
        <p className="m-0">{message.text}</p>
        {isAI && message.agent && (
          <div
            className="flex items-center gap-1.5 mt-2 pt-1.5 border-t text-[11px]"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-medium" style={{ color: "var(--brand)" }}>
              {message.agent}
            </span>
            <code
              className="font-mono text-[10px]"
              style={{ color: "var(--text-subtle)", fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              {message.runId}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
