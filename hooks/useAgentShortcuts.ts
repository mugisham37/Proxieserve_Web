"use client";

import * as React from "react";

interface AgentShortcutsConfig {
  onChangeStatus?: () => void;
  onReply?: () => void;
  onInternalNote?: () => void;
  onDocuments?: () => void;
  onSend?: () => void;
  onPrevCase?: () => void;
  onNextCase?: () => void;
  onGoToToday?: () => void;
  onShowHelp?: () => void;
}

/**
 * Case-detail keyboard shortcuts:
 * E → change status  R → reply  N → internal note
 * D → documents  ⌘↵ → send  [ ] → prev/next case
 * G then T → go to Today  ? → help
 */
export function useAgentShortcuts(config: AgentShortcutsConfig) {
  const gPressed = React.useRef(false);
  const gTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      // ⌘↵ — send (works inside textarea)
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        config.onSend?.();
        return;
      }

      if (inInput) return;

      // G then T sequence
      if (e.key === "g" || e.key === "G") {
        gPressed.current = true;
        if (gTimer.current) clearTimeout(gTimer.current);
        gTimer.current = setTimeout(() => {
          gPressed.current = false;
        }, 800);
        return;
      }
      if (gPressed.current && (e.key === "t" || e.key === "T")) {
        gPressed.current = false;
        config.onGoToToday?.();
        return;
      }

      switch (e.key) {
        case "e":
        case "E":
          e.preventDefault();
          config.onChangeStatus?.();
          break;
        case "r":
        case "R":
          e.preventDefault();
          config.onReply?.();
          break;
        case "n":
        case "N":
          e.preventDefault();
          config.onInternalNote?.();
          break;
        case "d":
        case "D":
          e.preventDefault();
          config.onDocuments?.();
          break;
        case "[":
          e.preventDefault();
          config.onPrevCase?.();
          break;
        case "]":
          e.preventDefault();
          config.onNextCase?.();
          break;
        case "?":
          e.preventDefault();
          config.onShowHelp?.();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (gTimer.current) clearTimeout(gTimer.current);
    };
  }, [config]);
}
