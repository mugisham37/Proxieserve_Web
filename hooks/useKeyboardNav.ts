"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAgentDispatch, useAgentState } from "@/lib/agent-context";
import type { AgentCase } from "@/lib/types/agent";

/**
 * Wires J/K navigation and Enter-to-open for the agent case queue.
 * Call this in any page that renders a QueueTable.
 */
export function useKeyboardNav(cases: AgentCase[]) {
  const router = useRouter();
  const dispatch = useAgentDispatch();
  const { queueFocusIndex } = useAgentState();

  const focusRef = React.useRef(queueFocusIndex);
  focusRef.current = queueFocusIndex;

  const openCases = React.useMemo(
    () => cases.filter((c) => c.status !== "completed"),
    [cases]
  );

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      )
        return;

      switch (e.key) {
        case "j":
        case "J":
          e.preventDefault();
          dispatch({
            type: "SET_FOCUS_INDEX",
            payload: Math.min(focusRef.current + 1, openCases.length - 1),
          });
          break;
        case "k":
        case "K":
          e.preventDefault();
          dispatch({
            type: "SET_FOCUS_INDEX",
            payload: Math.max(focusRef.current - 1, 0),
          });
          break;
        case "Enter":
          if (openCases[focusRef.current]) {
            router.push(`/agent/case/${openCases[focusRef.current].code}`);
          }
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openCases, dispatch, router]);
}
