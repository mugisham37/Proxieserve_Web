import type {
  AgentCaseSummary,
  AgentMetrics as ApiAgentMetrics,
  AgentSettings as ApiAgentSettings,
  ApplicationDetail,
  DocumentItem,
  MessageItem,
  UnassignedCase as ApiUnassignedCase,
  UpdateAgentSettingsRequest,
} from "@/lib/api/types";
import type {
  AgentCase,
  AgentMetrics,
  AgentSettings,
  AgentStatus,
  CaseDocument,
  ConversationMessage,
  Priority,
  SLAState,
} from "@/lib/types/agent";

function splitServiceName(name: string): { base: string; italic: string; full: string } {
  const words = name.trim().split(/\s+/);
  if (words.length <= 1) return { base: name, italic: "", full: name };
  const italic = words.pop() ?? "";
  return { base: words.join(" "), italic, full: name };
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatAgeDisplay(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms)) return "—";
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function normalizeAgentStatus(status: string): AgentStatus {
  const normalized = status.toLowerCase().replace(/_/g, "-") as AgentStatus;
  const valid: AgentStatus[] = [
    "action-required",
    "received",
    "under-review",
    "in-progress",
    "submitted-to-authority",
    "awaiting-response",
    "completed",
    "rejected",
  ];
  return valid.includes(normalized) ? normalized : "in-progress";
}

function normalizeSlaState(state: string): SLAState {
  if (state === "over" || state === "warn" || state === "ok") return state;
  return "ok";
}

function derivePriority(tier: string, slaState: SLAState): Priority {
  if (slaState === "over") return "high";
  if (tier === "urgent") return "high";
  if (tier === "standard") return "mid";
  return "low";
}

export function adaptAgentCaseSummary(summary: AgentCaseSummary): AgentCase {
  const { base, italic, full } = splitServiceName(summary.service_name);
  const slaState = normalizeSlaState(summary.sla_state);
  return {
    code: summary.code,
    serviceName: full,
    serviceNameBase: base,
    serviceNameItalic: italic,
    clientName: summary.client_name,
    clientInitials: getInitials(summary.client_name),
    status: normalizeAgentStatus(summary.status),
    priority: derivePriority(summary.tier, slaState),
    ageDisplay: formatAgeDisplay(summary.submitted_at),
    slaState,
    nextAction: summary.unread_messages
      ? `${summary.unread_messages} unread`
      : "Review case",
    fee: 0,
    submittedAt: summary.submitted_at,
    category: summary.tier,
  };
}

export function adaptUnassignedCase(summary: ApiUnassignedCase): AgentCase {
  const { base, italic, full } = splitServiceName(summary.service_name);
  return {
    code: summary.code,
    serviceName: full,
    serviceNameBase: base,
    serviceNameItalic: italic,
    clientName: "Unassigned",
    clientInitials: "—",
    status: "received",
    priority: summary.tier === "urgent" ? "high" : "mid",
    ageDisplay: formatAgeDisplay(summary.submitted_at),
    slaState: "ok",
    nextAction: "Claim case",
    fee: 0,
    submittedAt: summary.submitted_at,
    category: summary.tier,
  };
}

export function adaptApiAgentSettings(settings: ApiAgentSettings): AgentSettings {
  return {
    acceptNewCases: settings.accepting_cases,
    dailyCap: settings.daily_case_cap,
    notifications: {
      newCaseAssigned: settings.notification_new_case,
      clientReplied: settings.notification_client_reply,
      slaApproaching: settings.notification_sla_alert,
      dailySummary: settings.notification_daily_summary,
    },
    appearance: {
      darkMode: false,
      compactTables: true,
    },
    security: {
      twoFactorEnabled: true,
      trustedDevicesCount: 0,
      passwordLastChangedLabel: "—",
    },
  };
}

export function adaptUiAgentSettingsPatch(
  patch: Partial<AgentSettings>
): UpdateAgentSettingsRequest {
  const payload: UpdateAgentSettingsRequest = {};
  if (patch.acceptNewCases !== undefined) payload.accepting_cases = patch.acceptNewCases;
  if (patch.dailyCap !== undefined) payload.daily_case_cap = patch.dailyCap;
  if (patch.notifications?.newCaseAssigned !== undefined) {
    payload.notification_new_case = patch.notifications.newCaseAssigned;
  }
  if (patch.notifications?.clientReplied !== undefined) {
    payload.notification_client_reply = patch.notifications.clientReplied;
  }
  if (patch.notifications?.slaApproaching !== undefined) {
    payload.notification_sla_alert = patch.notifications.slaApproaching;
  }
  if (patch.notifications?.dailySummary !== undefined) {
    payload.notification_daily_summary = patch.notifications.dailySummary;
  }
  return payload;
}

export function adaptAgentMetrics(metrics: ApiAgentMetrics): AgentMetrics {
  return {
    completedCount: metrics.completedCount,
    completedDelta: metrics.completedDelta,
    avgTurnaround: metrics.avgTurnaround,
    avgTurnaroundDelta: metrics.avgTurnaroundDelta,
    onTimeSLAPercent: metrics.onTimeSLAPercent,
    clientRating: metrics.clientRating,
    ratingsCount: metrics.ratingsCount,
    weeklyBars: metrics.weeklyBars.map((bar) => ({
      week: bar.week,
      count: bar.count,
      isCurrent: bar.isCurrent ?? undefined,
    })),
    leaderboard: metrics.leaderboard,
  };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function adaptDocumentItem(doc: DocumentItem): CaseDocument {
  return {
    id: doc.document_id,
    filename: doc.original_filename,
    label: doc.requirement_key,
    fileSize: formatFileSize(doc.file_size_bytes),
    uploadedAt: doc.created_at,
    status:
      doc.qc_status === "pass"
        ? "verified"
        : doc.qc_status === "fail"
          ? "rejected"
          : doc.qc_status === "warn"
            ? "pending"
            : "new",
  };
}

export function adaptMessageItem(message: MessageItem): ConversationMessage {
  const isSystem = message.is_system;
  const isInternal = message.is_internal;
  const type: ConversationMessage["type"] = isSystem
    ? "system"
    : isInternal
      ? "internal_note"
      : message.sender_role?.includes("agent") || message.sender_role?.includes("staff")
        ? "agent"
        : "client";

  return {
    id: message.message_id,
    type,
    senderName: message.sender_role ?? "System",
    senderInitials: getInitials(message.sender_role ?? "S"),
    body: message.content,
    timestamp: message.created_at,
    isRead: Boolean(message.read_by_agent_at),
  };
}

export function getClientNameFromDetail(detail: ApplicationDetail): string {
  const info = detail.personal_info;
  if (typeof info.fullName === "string" && info.fullName.trim()) return info.fullName;
  if (typeof info.full_name === "string" && info.full_name.trim()) return info.full_name;
  return "Client";
}
