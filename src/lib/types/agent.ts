export type AgentStatus =
  | "action-required"
  | "received"
  | "under-review"
  | "in-progress"
  | "submitted-to-authority"
  | "awaiting-response"
  | "completed"
  | "rejected";

export type Priority = "high" | "mid" | "low";

export type SLAState = "over" | "warn" | "ok";

export type AvailabilityStatus = "available" | "away";

export type AgentMessageType = "client" | "agent" | "internal_note" | "system";

export type DocumentQCState = "pass" | "warn" | "fail";

export type DocumentVerifyStatus = "verified" | "new" | "rejected" | "pending";

export type QueueTab =
  | "all"
  | "action-required"
  | "in-progress"
  | "awaiting-authority"
  | "completed";

// ─── User ────────────────────────────────────────────────────────────────────

export interface AgentUser {
  id: string;
  fullName: string;
  firstName: string;
  initials: string;
  email: string;
  role: "AGENT" | "STAFF";
  city: string;
  availability: AvailabilityStatus;
  dailyCap: number | null;
  acceptNewCases: boolean;
}

// ─── Case ────────────────────────────────────────────────────────────────────

export interface AgentCase {
  code: string;
  serviceName: string;
  serviceNameBase: string;
  serviceNameItalic: string;
  clientName: string;
  clientInitials: string;
  status: AgentStatus;
  priority: Priority;
  ageDisplay: string;
  slaState: SLAState;
  nextAction: string;
  fee: number;
  submittedAt: string;
  category: string;
}

// ─── Checklist ───────────────────────────────────────────────────────────────

export interface ChecklistStep {
  id: string;
  label: string;
  sublabel: string;
  doneAt?: string;
  isDone: boolean;
  isCurrent: boolean;
}

// ─── Conversation ─────────────────────────────────────────────────────────────

export interface ConversationMessage {
  id: string;
  type: AgentMessageType;
  senderName: string;
  senderInitials: string;
  body: string;
  timestamp: string;
  isRead?: boolean;
}

// ─── Documents ───────────────────────────────────────────────────────────────

export interface CaseDocument {
  id: string;
  filename: string;
  label: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentVerifyStatus;
}

export interface DocumentQCCheck {
  id: string;
  label: string;
  sublabel: string;
  state: DocumentQCState;
}

// ─── Case Detail (full) ───────────────────────────────────────────────────────

export interface CaseDetail extends AgentCase {
  clientPhone: string;
  clientNationalId: string;
  clientLanguage: string;
  clientMemberSince: string;
  clientOtherCases: string;
  paymentStatus: "paid" | "unpaid" | "partial";
  paymentAmount: number;
  paymentMethod: string;
  paymentDate?: string;
  slaTarget: string;
  turnaroundEst: string;
  applicationAnswers: { label: string; value: string }[];
  history: { timestamp: string; body: string }[];
  checklist: ChecklistStep[];
  conversation: ConversationMessage[];
  documents: CaseDocument[];
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

export interface WeeklyBar {
  week: string;
  count: number;
  isCurrent?: boolean;
}

export interface LeaderboardEntry {
  initials: string;
  name: string;
  count: number;
  isMe: boolean;
}

export interface AgentMetrics {
  completedCount: number;
  completedDelta: string;
  avgTurnaround: number;
  avgTurnaroundDelta: string;
  onTimeSLAPercent: number;
  clientRating: number;
  ratingsCount: number;
  weeklyBars: WeeklyBar[];
  leaderboard: LeaderboardEntry[];
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface AgentNotificationSettings {
  newCaseAssigned: boolean;
  clientReplied: boolean;
  slaApproaching: boolean;
  dailySummary: boolean;
}

export interface AgentAppearanceSettings {
  darkMode: boolean;
  compactTables: boolean;
}

export interface AgentSecuritySettings {
  twoFactorEnabled: boolean;
  trustedDevicesCount: number;
  passwordLastChangedLabel: string;
}

export interface AgentSettings {
  acceptNewCases: boolean;
  dailyCap: number | null;
  notifications: AgentNotificationSettings;
  appearance: AgentAppearanceSettings;
  security: AgentSecuritySettings;
}

// ─── Agent Context State ──────────────────────────────────────────────────────

export interface AgentState {
  user: AgentUser;
  cases: AgentCase[];
  settings: AgentSettings;
  availability: AvailabilityStatus;
  queueFocusIndex: number;
  commandPaletteOpen: boolean;
  activeTab: QueueTab;
  darkMode: boolean;
  isOffline: boolean;
  offlineQueueCount: number;
  slaBreachCount: number;
  confirmModal: ConfirmModalState | null;
}

export interface ConfirmModalState {
  title: string;
  body: string;
  withNote?: boolean;
  confirmLabel: string;
  onConfirm: () => void;
}

// ─── Context Actions ──────────────────────────────────────────────────────────

export type AgentAction =
  | { type: "SET_AVAILABILITY"; payload: AvailabilityStatus }
  | { type: "SET_FOCUS_INDEX"; payload: number }
  | { type: "TOGGLE_PALETTE" }
  | { type: "CLOSE_PALETTE" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_DARK_MODE"; payload: boolean }
  | { type: "SET_TAB"; payload: QueueTab }
  | { type: "SET_OFFLINE"; payload: boolean }
  | { type: "SET_CONFIRM_MODAL"; payload: ConfirmModalState | null }
  | { type: "CHANGE_CASE_STATUS"; payload: { code: string; status: AgentStatus } }
  | { type: "SET_SLA_BREACH_COUNT"; payload: number };
