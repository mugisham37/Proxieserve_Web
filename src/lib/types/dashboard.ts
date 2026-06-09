export type DashboardStatus =
  | "action-required"
  | "in-progress"
  | "completed"
  | "discontinued"
  | "on-hold";

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export type MessageSender = "agent" | "user" | "system";

export type MessageAvatarVariant = "brand" | "ink" | "system";

export type DocumentCategory =
  | "id"
  | "photo"
  | "certificate"
  | "financial"
  | "other";

export type DeltaColor = "muted" | "ok" | "brand";

export interface DashboardUser {
  id: string;
  fullName: string;
  firstName: string;
  initials: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  role: "CLIENT";
  location: string;
  city: string;
  language: "en" | "rw" | "fr";
  isEmailVerified: boolean;
  lastSeen: string | null;
  createdAt: string;
}

export interface AppProgress {
  label: string;
  state: "done" | "active" | "todo";
}

export interface DashboardAgent {
  name: string;
  shortName: string;
  role: string;
  initials: string;
  isOnline: boolean;
  avgReplyMinutes: number;
  casesHandled: number;
  workingSince: string;
  languages: string;
  whatsappUrl: string;
}

export interface DashboardApplication {
  code: string;
  serviceName: string;
  serviceNameBase: string;
  serviceNameItalic: string;
  serviceSlug: string;
  category: string;
  status: DashboardStatus;
  tier: string;
  submittedAt: string;
  estimatedDate: string;
  estimatedCompletion: string;
  serviceFee: number;
  governmentFee: number;
  paymentStatus: PaymentStatus;
  agent: DashboardAgent;
  progress: AppProgress[];
  headline: string;
  subheadline: string;
  updatedAt: string;
  messageCount: number;
  unreadMessageCount: number;
  documentCount: number;
}

export interface DashboardMessage {
  id: string;
  applicationCode: string;
  applicationLabel: string;
  senderType: MessageSender;
  senderName: string;
  senderInitials: string;
  avatarVariant: MessageAvatarVariant;
  timestamp: string;
  timeAgo: string;
  body: string;
  isRead: boolean;
  isOptimistic?: boolean;
  optimisticStatus?: "sending" | "sent" | "failed";
}

export interface DashboardDocument {
  id: string;
  applicationCode: string;
  filename: string;
  fileSize: number;
  uploadedAt: string;
  category: DocumentCategory;
  categoryLabel: string;
  ext: string;
  hasWarning: boolean;
  warningNote?: string;
  isRestricted: boolean;
}

export interface HistoryEntry {
  code: string;
  serviceName: string;
  serviceNameBase: string;
  serviceNameItalic?: string;
  completedAt: string;
  serviceFee: number;
  status: "completed" | "discontinued";
}

export interface DashboardSummary {
  unreadCount: number;
  actionCount: number;
  activeCount: number;
  completedCount: number;
  docCount: number;
  docSizeMB: number;
  avgTurnaround: number;
}

export interface OptimisticMessage {
  id: string;
  body: string;
  timestamp: string;
  status: "sending" | "sent" | "failed";
}

export interface TrustedDevice {
  id: string;
  name: string;
  browser: string;
  os: string;
  location: string;
  lastUsed: string;
  isCurrent: boolean;
}

export interface NotificationPrefs {
  whatsapp: boolean;
  sms: boolean;
  email: boolean;
  tips: boolean;
}
