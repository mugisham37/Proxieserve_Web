"use client";

import * as React from "react";
import { useAgentDispatch, useAgentState } from "@/lib/agent-context";

/**
 * Wires ⌘K / Ctrl+K to open the command palette.
 * Normally used in AgentShell so it's globally active.
 * Import here for use in individual pages if the shell isn't present.
 */
export function useCommandPalette() {
  const dispatch = useAgentDispatch();
  const { commandPaletteOpen } = useAgentState();

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_PALETTE" });
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        dispatch({ type: "CLOSE_PALETTE" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch, commandPaletteOpen]);

  return {
    isOpen: commandPaletteOpen,
    open: () => dispatch({ type: "TOGGLE_PALETTE" }),
    close: () => dispatch({ type: "CLOSE_PALETTE" }),
  };
}
