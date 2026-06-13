"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, UserX, UserCheck, KeyRound, ShieldOff } from "lucide-react";
import { useAgents, useCreateAgent, useUpdateAgent } from "@/hooks/useAdmin";
import type { AgentListItem } from "@/lib/api/admin";
import { isApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

// ─── Confirm dialog ───────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ open, title, description, confirmLabel, danger, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-[400px] bg-[var(--paper)] rounded-[var(--r-lg)] shadow-xl p-6 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-[20px] text-[var(--ink)] mb-2">{title}</h2>
            <p className="font-sans text-[13px] text-[var(--ink-muted)] mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="h-9 px-4 rounded-[var(--r-pill)] font-sans text-[13px] text-[var(--ink-muted)] bg-[var(--cream)] hover:bg-[var(--rule)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={cn(
                  "h-9 px-4 rounded-[var(--r-pill)] font-sans text-[13px] font-medium text-white transition-colors",
                  danger ? "bg-[var(--danger)] hover:opacity-90" : "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Add Agent sheet ──────────────────────────────────────────────────────────

interface AddAgentSheetProps {
  open: boolean;
  onClose: () => void;
}

function AddAgentSheet({ open, onClose }: AddAgentSheetProps) {
  const createAgent = useCreateAgent();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  function reset() {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
    setSuccess(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    try {
      await createAgent.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        temporary_password: password.trim() || undefined,
      });
      setSuccess(true);
      setTimeout(handleClose, 1200);
    } catch (err) {
      setError(isApiError(err) ? err.message : "Failed to create agent. Try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/40"
          onClick={handleClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-[440px] h-full bg-[var(--paper)] shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--rule)]">
              <h2 className="font-serif text-[20px] text-[var(--ink)]">Add agent</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--cream)] text-[var(--ink-muted)] transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6 flex-1 overflow-y-auto">
              {error && (
                <p className="font-sans text-[12px] text-[var(--danger)] bg-[var(--danger)]/8 border border-[var(--danger)]/20 rounded-[var(--r-md)] px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="font-sans text-[12px] text-[var(--ok)] bg-[var(--ok)]/8 border border-[var(--ok)]/20 rounded-[var(--r-md)] px-3 py-2">
                  Agent created — invite email sent.
                </p>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-medium text-[var(--ink)]">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Mukamana"
                  required
                  className="h-10 px-3 rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)] font-sans text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-medium text-[var(--ink)]">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@proxiserve.rw"
                  required
                  className="h-10 px-3 rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)] font-sans text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-medium text-[var(--ink)]">
                  Temporary password
                  <span className="ml-1 text-[var(--ink-subtle)] font-normal">(optional — auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to auto-generate"
                  className="h-10 px-3 rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)] font-sans text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  disabled={createAgent.isPending || success}
                  className="w-full h-10 rounded-[var(--r-pill)] bg-[var(--ink)] hover:bg-[var(--ink-2)] text-white font-sans text-[13px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createAgent.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Create agent & send invite"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Row actions dropdown ─────────────────────────────────────────────────────

interface AgentRowActionsProps {
  agent: AgentListItem;
  onDeactivate: () => void;
  onReactivate: () => void;
  onResetPassword: () => void;
  onForce2FA: () => void;
}

function AgentRowActions({ agent, onDeactivate, onReactivate, onResetPassword, onForce2FA }: AgentRowActionsProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 flex items-center justify-center rounded-[var(--r-md)] hover:bg-[var(--cream)] text-[var(--ink-muted)] transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-9 z-20 w-[200px] bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-md)] shadow-lg py-1 overflow-hidden"
          >
            {agent.is_active ? (
              <button
                onClick={() => { setOpen(false); onDeactivate(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 font-sans text-[12px] text-[var(--danger)] hover:bg-[var(--danger)]/8 transition-colors"
              >
                <UserX size={13} /> Deactivate account
              </button>
            ) : (
              <button
                onClick={() => { setOpen(false); onReactivate(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 font-sans text-[12px] text-[var(--ok)] hover:bg-[var(--ok)]/8 transition-colors"
              >
                <UserCheck size={13} /> Reactivate account
              </button>
            )}
            <button
              onClick={() => { setOpen(false); onResetPassword(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 font-sans text-[12px] text-[var(--ink)] hover:bg-[var(--cream)] transition-colors"
            >
              <KeyRound size={13} /> Reset password
            </button>
            <button
              onClick={() => { setOpen(false); onForce2FA(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 font-sans text-[12px] text-[var(--ink)] hover:bg-[var(--cream)] transition-colors"
            >
              <ShieldOff size={13} /> Force 2FA re-enroll
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[var(--rule)] last:border-0">
      <div className="w-8 h-8 rounded-full bg-[var(--rule)] animate-pulse" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="h-3 w-32 bg-[var(--rule)] rounded animate-pulse" />
        <div className="h-2.5 w-48 bg-[var(--rule)] rounded animate-pulse" />
      </div>
      <div className="h-5 w-14 bg-[var(--rule)] rounded-full animate-pulse" />
      <div className="h-5 w-10 bg-[var(--rule)] rounded-full animate-pulse" />
      <div className="h-3 w-20 bg-[var(--rule)] rounded animate-pulse" />
      <div className="w-8 h-8 bg-[var(--rule)] rounded animate-pulse" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type PendingAction =
  | { kind: "deactivate"; agent: AgentListItem }
  | { kind: "reactivate"; agent: AgentListItem }
  | { kind: "reset_password"; agent: AgentListItem }
  | { kind: "force_2fa"; agent: AgentListItem }
  | null;

function confirmDetails(action: PendingAction): { title: string; description: string; label: string; danger: boolean } {
  if (!action) return { title: "", description: "", label: "", danger: false };
  if (action.kind === "deactivate")
    return {
      title: `Deactivate ${action.agent.name}?`,
      description: "This agent will not be able to log in until reactivated. Their existing session will expire on its own.",
      label: "Deactivate",
      danger: true,
    };
  if (action.kind === "reactivate")
    return {
      title: `Reactivate ${action.agent.name}?`,
      description: "This agent will be able to log in again immediately.",
      label: "Reactivate",
      danger: false,
    };
  if (action.kind === "reset_password")
    return {
      title: `Reset password for ${action.agent.name}?`,
      description: "A new temporary password will be generated and emailed to the agent. Their current password will stop working immediately.",
      label: "Reset password",
      danger: false,
    };
  return {
    title: `Force 2FA re-enrollment for ${action.agent.name}?`,
    description: "Their TOTP secret will be cleared. They will need to re-enroll their authenticator app on next login.",
    label: "Force reset",
    danger: true,
  };
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-RW", { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

function AgentInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-[var(--brand-soft)] flex items-center justify-center flex-shrink-0">
      <span className="font-mono text-[11px] font-medium text-[var(--brand)]">{initials}</span>
    </div>
  );
}

export default function AdminAgentsPage() {
  const { data: agents, isLoading, error } = useAgents();
  const updateAgent = useUpdateAgent();
  const [addOpen, setAddOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState<PendingAction>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  async function executeAction() {
    if (!pendingAction) return;
    setActionError(null);
    try {
      if (pendingAction.kind === "deactivate") {
        await updateAgent.mutateAsync({ agentId: pendingAction.agent.agent_id, is_active: false });
      } else if (pendingAction.kind === "reactivate") {
        await updateAgent.mutateAsync({ agentId: pendingAction.agent.agent_id, is_active: true });
      } else if (pendingAction.kind === "reset_password") {
        await updateAgent.mutateAsync({ agentId: pendingAction.agent.agent_id, reset_password: true });
      } else {
        await updateAgent.mutateAsync({ agentId: pendingAction.agent.agent_id, force_2fa_reset: true });
      }
      setPendingAction(null);
    } catch (err) {
      setActionError(isApiError(err) ? err.message : "Action failed. Try again.");
      setPendingAction(null);
    }
  }

  const dialog = confirmDetails(pendingAction);

  return (
    <>
      <div className="px-[20px] min-[980px]:px-[32px] py-[28px] flex flex-col gap-[24px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] mb-1">STAFF</p>
            <h1 className="font-serif text-[28px] min-[980px]:text-[34px] text-[var(--ink)] leading-none">
              Agent <em>management</em>
            </h1>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 h-9 px-4 rounded-[var(--r-pill)] bg-[var(--ink)] hover:bg-[var(--ink-2)] text-white font-sans text-[13px] font-medium transition-colors flex-shrink-0"
          >
            <Plus size={14} />
            Add agent
          </button>
        </div>

        {/* Error banner */}
        {actionError && (
          <p className="font-sans text-[12px] text-[var(--danger)] bg-[var(--danger)]/8 border border-[var(--danger)]/20 rounded-[var(--r-md)] px-3 py-2">
            {actionError}
          </p>
        )}

        {/* Table */}
        <div className="border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden bg-[var(--paper)]">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-4 py-2.5 border-b border-[var(--rule)] bg-[var(--cream)]">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)]">Agent</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] w-[80px] text-center">Status</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] w-[50px] text-center">2FA</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] w-[100px]">Created</span>
            <span className="w-8" />
          </div>

          {/* Loading */}
          {isLoading && (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}

          {/* Error */}
          {error && (
            <div className="px-4 py-8 text-center">
              <p className="font-sans text-[13px] text-[var(--danger)]">Failed to load agents.</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && agents?.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="font-sans text-[13px] text-[var(--ink-muted)] mb-1">No agents yet</p>
              <p className="font-sans text-[12px] text-[var(--ink-subtle)]">
                Click &ldquo;Add agent&rdquo; to create the first staff account.
              </p>
            </div>
          )}

          {/* Rows */}
          {!isLoading && agents?.map((agent) => (
            <motion.div
              key={agent.agent_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-4 py-3.5 border-b border-[var(--rule)] last:border-0 hover:bg-[var(--cream)]/40 transition-colors"
            >
              {/* Name + email */}
              <div className="flex items-center gap-3 min-w-0">
                <AgentInitials name={agent.name} />
                <div className="min-w-0">
                  <p className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">{agent.name}</p>
                  <p className="font-sans text-[11px] text-[var(--ink-muted)] truncate">{agent.email}</p>
                </div>
              </div>

              {/* Status */}
              <div className="w-[80px] flex justify-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-medium",
                    agent.is_active
                      ? "bg-[var(--ok)]/12 text-[var(--ok)]"
                      : "bg-[var(--danger)]/10 text-[var(--danger)]",
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      agent.is_active ? "bg-[var(--ok)]" : "bg-[var(--danger)]",
                    )}
                  />
                  {agent.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* 2FA */}
              <div className="w-[50px] flex justify-center">
                <span
                  className={cn(
                    "inline-flex px-2 py-0.5 rounded-full font-mono text-[10px] font-medium",
                    agent.twofa_enabled
                      ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                      : "bg-[var(--rule)] text-[var(--ink-subtle)]",
                  )}
                >
                  {agent.twofa_enabled ? "On" : "Off"}
                </span>
              </div>

              {/* Created */}
              <div className="w-[100px]">
                <span className="font-mono text-[11px] text-[var(--ink-muted)]">{formatDate(agent.created_at)}</span>
              </div>

              {/* Actions */}
              <AgentRowActions
                agent={agent}
                onDeactivate={() => setPendingAction({ kind: "deactivate", agent })}
                onReactivate={() => setPendingAction({ kind: "reactivate", agent })}
                onResetPassword={() => setPendingAction({ kind: "reset_password", agent })}
                onForce2FA={() => setPendingAction({ kind: "force_2fa", agent })}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AddAgentSheet open={addOpen} onClose={() => setAddOpen(false)} />
      <ConfirmDialog
        open={pendingAction !== null}
        title={dialog.title}
        description={dialog.description}
        confirmLabel={dialog.label}
        danger={dialog.danger}
        onConfirm={executeAction}
        onCancel={() => setPendingAction(null)}
      />
    </>
  );
}
