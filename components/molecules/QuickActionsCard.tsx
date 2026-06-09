"use client";

import * as React from "react";
import { FileQuestion, UserX, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgentDispatch } from "@/lib/agent-context";

interface QuickActionsCardProps {
  caseCode: string;
}

export function QuickActionsCard({ caseCode }: QuickActionsCardProps) {
  const dispatch = useAgentDispatch();

  const handleReassign = () => {
    dispatch({
      type: "SET_CONFIRM_MODAL",
      payload: {
        title: "Reassign to *another agent?*",
        body: `${caseCode} will leave your queue and go to the dispatcher for reassignment. The client won't be notified of the internal change. Add a handover note so the next agent has context.`,
        withNote: true,
        confirmLabel: "Reassign case",
        onConfirm: () => {
          // real implementation would call API
        },
      },
    });
  };

  const handleFlag = () => {
    dispatch({
      type: "SET_CONFIRM_MODAL",
      payload: {
        title: "Flag for *admin?*",
        body: `${caseCode} will be flagged for admin review. An admin will be notified and may intervene. Add a note describing the issue.`,
        withNote: true,
        confirmLabel: "Flag for admin",
        onConfirm: () => {
          // real implementation would call API
        },
      },
    });
  };

  return (
    <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[18px]">
      <h3 className="font-sans text-[12px] font-semibold text-[var(--ink)] mb-[10px]">
        Quick actions
      </h3>
      <div className="flex flex-col gap-[6px]">
        <button
          type="button"
          aria-label="Request a document from the client"
          className={cn(
            "flex items-center gap-[8px] px-[12px] h-[36px] rounded-[var(--r-pill)]",
            "border border-[var(--rule)]",
            "font-sans text-[12px] text-[var(--ink-muted)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <FileQuestion size={14} aria-hidden="true" />
          Request a document
        </button>

        <button
          type="button"
          onClick={handleReassign}
          aria-label="Reassign this case to another agent"
          className={cn(
            "flex items-center gap-[8px] px-[12px] h-[36px] rounded-[var(--r-pill)]",
            "border border-[var(--rule)]",
            "font-sans text-[12px] text-[var(--ink-muted)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <UserX size={14} aria-hidden="true" />
          Reassign case
        </button>

        <button
          type="button"
          onClick={handleFlag}
          aria-label="Flag this case for admin review"
          className={cn(
            "flex items-center gap-[8px] px-[12px] h-[36px] rounded-[var(--r-pill)]",
            "border border-[var(--danger)]/50",
            "font-sans text-[12px] text-[var(--danger)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--danger-soft)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <Flag size={14} aria-hidden="true" />
          Flag for admin
        </button>
      </div>
    </div>
  );
}
