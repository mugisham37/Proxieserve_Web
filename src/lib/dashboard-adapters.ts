import type {
  ApplicationDetail,
  ApplicationSummary,
  DashboardSummary as ApiDashboardSummary,
  DocumentItem,
  MessageItem,
  StatusHistoryItem,
} from "@/lib/api/types";
import type {
  AppProgress,
  DashboardAgent,
  DashboardApplication,
  DashboardDocument,
  DashboardMessage,
  DashboardStatus,
  DashboardSummary,
  DocumentCategory,
  HistoryEntry,
  MessageSender,
  PaymentStatus,
} from "@/lib/types/dashboard";
import { mapBackendStatusToTrackStatus } from "@/lib/tracker-adapters";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(iso);
}

export function splitServiceName(serviceName: string): { base: string; italic: string } {
  const words = serviceName.trim().split(/\s+/);
  if (words.length <= 1) return { base: serviceName, italic: "" };
  return {
    base: words.slice(0, -1).join(" "),
    italic: words[words.length - 1] ?? "",
  };
}

export function mapBackendStatusToDashboardStatus(status: string): DashboardStatus {
  const trackStatus = mapBackendStatusToTrackStatus(status);
  if (trackStatus === "rejected") return "discontinued";
  return trackStatus as DashboardStatus;
}

function mapPaymentStatus(status: string): PaymentStatus {
  const map: Record<string, PaymentStatus> = {
    pending: "unpaid",
    unpaid: "unpaid",
    paid: "paid",
    partial: "partial",
    refunded: "refunded",
  };
  return map[status] ?? "unpaid";
}

function buildProgress(status: string): AppProgress[] {
  const order = ["received", "under_review", "in_progress", "completed"];
  const currentIdx = order.indexOf(status);
  const labels = ["Submitted", "Under review", "In progress", "Complete"];

  return labels.map((label, i) => ({
    label,
    state:
      status === "completed"
        ? "done"
        : i < currentIdx
          ? "done"
          : i === currentIdx
            ? "active"
            : "todo",
  }));
}

function defaultAgent(assigned: boolean): DashboardAgent {
  if (assigned) {
    return {
      name: "Your agent",
      shortName: "Agent",
      role: "Hebuza Agent",
      initials: "AG",
      isOnline: true,
      avgReplyMinutes: 60,
      casesHandled: 0,
      workingSince: "",
      languages: "English, Kinyarwanda",
      whatsappUrl: "https://wa.me/250788000000",
    };
  }
  return {
    name: "Pending assignment",
    shortName: "Pending",
    role: "Hebuza Agent",
    initials: "—",
    isOnline: false,
    avgReplyMinutes: 0,
    casesHandled: 0,
    workingSince: "",
    languages: "",
    whatsappUrl: "https://wa.me/250788000000",
  };
}

function mapSenderRole(role: string | null, isSystem: boolean): MessageSender {
  if (isSystem) return "system";
  if (role === "client") return "user";
  return "agent";
}

function mapDocumentCategory(requirementKey: string): DocumentCategory {
  const key = requirementKey.toLowerCase();
  if (key.includes("photo") || key.includes("portrait")) return "photo";
  if (key.includes("id") || key.includes("passport")) return "id";
  if (key.includes("cert")) return "certificate";
  if (key.includes("bank") || key.includes("financial")) return "financial";
  return "other";
}

function getFileExt(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? (parts.pop()?.toUpperCase() ?? "FILE") : "FILE";
}

export function adaptApplicationSummary(item: ApplicationSummary): DashboardApplication {
  const { base, italic } = splitServiceName(item.service_name);
  const status = mapBackendStatusToDashboardStatus(item.status);

  return {
    code: item.code,
    serviceName: item.service_name,
    serviceNameBase: base,
    serviceNameItalic: italic,
    serviceSlug: item.service_slug,
    category: item.service_slug.replace(/-/g, " ").toUpperCase(),
    status,
    tier: item.tier,
    submittedAt: formatDate(item.submitted_at),
    estimatedDate: "—",
    estimatedCompletion: "—",
    serviceFee: 0,
    governmentFee: 0,
    paymentStatus: mapPaymentStatus(item.payment_status),
    agent: defaultAgent(false),
    progress: buildProgress(item.status),
    headline: item.status.replace(/_/g, " "),
    subheadline: `Your ${item.service_name} application is being processed.`,
    updatedAt: formatDate(item.submitted_at),
    messageCount: 0,
    unreadMessageCount: 0,
    documentCount: 0,
  };
}

export function adaptApplicationDetail(detail: ApplicationDetail): DashboardApplication {
  const { base, italic } = splitServiceName(detail.service_name);
  const status = mapBackendStatusToDashboardStatus(detail.status);
  const unreadCount = detail.messages.filter(
    (m) => !m.is_system && m.sender_role !== "client" && !m.is_read_by_client,
  ).length;

  return {
    code: detail.code,
    serviceName: detail.service_name,
    serviceNameBase: base,
    serviceNameItalic: italic,
    serviceSlug: detail.service_slug,
    category: detail.service_slug.replace(/-/g, " ").toUpperCase(),
    status,
    tier: detail.tier,
    submittedAt: formatDate(detail.submitted_at),
    estimatedDate: detail.sla_deadline ? formatDate(detail.sla_deadline) : "—",
    estimatedCompletion: detail.sla_deadline ? formatDate(detail.sla_deadline) : "—",
    serviceFee: detail.payment_info?.amount ?? detail.payment_amount ?? 0,
    governmentFee: detail.payment_info?.governmentFee ?? 0,
    paymentStatus: mapPaymentStatus(detail.payment_status),
    agent: defaultAgent(Boolean(detail.assigned_agent_id)),
    progress: buildProgress(detail.status),
    headline: detail.status_display,
    subheadline: detail.status_history.at(-1)?.note ?? `Your ${detail.service_name} application is being processed.`,
    updatedAt: detail.status_history.at(-1)
      ? formatDate(detail.status_history.at(-1)!.created_at)
      : formatDate(detail.submitted_at),
    messageCount: detail.messages.filter((m) => !m.is_internal).length,
    unreadMessageCount: unreadCount,
    documentCount: detail.documents.filter((d) => d.is_active).length,
  };
}

export function adaptMessageItem(
  message: MessageItem,
  applicationCode: string,
  applicationLabel: string,
  userInitials: string,
): DashboardMessage {
  const senderType = mapSenderRole(message.sender_role, message.is_system);
  const senderName =
    senderType === "user"
      ? "You"
      : senderType === "system"
        ? "System"
        : "Your agent";
  const senderInitials =
    senderType === "user" ? userInitials : senderType === "system" ? "SYS" : "AG";

  return {
    id: message.message_id,
    applicationCode,
    applicationLabel,
    senderType,
    senderName,
    senderInitials,
    avatarVariant: senderType === "user" ? "ink" : senderType === "system" ? "system" : "brand",
    timestamp: formatTime(message.created_at),
    timeAgo: formatRelativeTime(message.created_at),
    body: message.content,
    isRead: message.is_read_by_client,
    isOptimistic: message.message_id.startsWith("temp-"),
  };
}

export function adaptDocumentItem(doc: DocumentItem, applicationCode: string): DashboardDocument {
  const qcStatus = doc.qc_status?.toLowerCase() ?? "";
  const hasWarning = qcStatus === "warn" || qcStatus === "fail" || qcStatus === "rejected";
  const warningNote =
    hasWarning && doc.qc_notes && typeof doc.qc_notes.message === "string"
      ? doc.qc_notes.message
      : hasWarning
        ? "Needs attention"
        : undefined;

  return {
    id: doc.document_id,
    applicationCode,
    filename: doc.original_filename,
    fileSize: doc.file_size_bytes,
    uploadedAt: formatDate(doc.created_at),
    category: mapDocumentCategory(doc.requirement_key),
    categoryLabel: doc.requirement_key.replace(/_/g, " "),
    ext: getFileExt(doc.original_filename),
    hasWarning,
    warningNote,
    isRestricted: false,
  };
}

export function adaptHistoryEntry(item: ApplicationSummary): HistoryEntry {
  const { base, italic } = splitServiceName(item.service_name);
  return {
    code: item.code,
    serviceName: item.service_name,
    serviceNameBase: base,
    serviceNameItalic: italic || undefined,
    completedAt: formatDate(item.submitted_at),
    serviceFee: 0,
    status: item.status === "cancelled" ? "discontinued" : "completed",
  };
}

export function adaptStatusHistoryItem(item: StatusHistoryItem): {
  label: string;
  date: string;
  note: string | null;
} {
  return {
    label: item.status.replace(/_/g, " "),
    date: formatDate(item.created_at),
    note: item.note,
  };
}

export function adaptDashboardSummary(summary: ApiDashboardSummary): DashboardSummary {
  return {
    unreadCount: summary.unreadCount,
    actionCount: summary.actionCount,
    activeCount: summary.activeCount,
    completedCount: summary.completedCount,
    docCount: summary.docCount,
    docSizeMB: summary.docSizeMB,
    avgTurnaround: summary.avgTurnaround ?? 0,
  };
}

export function isActiveApplication(status: string): boolean {
  return !["completed", "cancelled", "rejected"].includes(status);
}

export function isCompletedApplication(status: string): boolean {
  return ["completed", "cancelled", "rejected"].includes(status);
}
