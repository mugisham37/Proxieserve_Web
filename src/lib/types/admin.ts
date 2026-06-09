export type AdminRole = "OWNER" | "MANAGER" | "ANALYST";
export type AdminAgentStatus = "active" | "away" | "offline";
export type AuditKind = "Privileged" | "Money" | "Config" | "Assignment";
export type FieldType =
  | "short-text"
  | "long-text"
  | "single-choice"
  | "multi-select"
  | "date"
  | "document"
  | "phone";
export type DeltaDir = "up" | "down" | "flat";
export type DeltaColor = "ok" | "warn" | "danger" | "muted";
export type OversightTab = "attention" | "sla" | "disputes" | "all";
export type AuditFilter = "all" | "Privileged" | "Money" | "Config";

export interface AdminUser {
  id: string;
  fullName: string;
  firstName: string;
  initials: string;
  email: string;
  role: AdminRole;
  lastLogin: string;
}

export interface AdminAgent {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  skills: string[];
  load: number;
  capacity: number;
  twoFa: boolean;
  role: "AGENT" | "SENIOR" | "LEAD";
  status: AdminAgentStatus;
  activeCases: number;
  completedTotal: number;
  avgTurnaround: string;
  slaPercent: number;
  rating: number;
}

export interface AdminMetric {
  id: string;
  label: string;
  value: string | number;
  delta?: string;
  deltaDir?: DeltaDir;
  deltaColor?: DeltaColor;
}

export interface WeeklyBar {
  week: string;
  count: number;
}

export interface ServiceMixBar {
  service: string;
  pct: number;
  color: string;
}

export interface PaymentMixBar {
  method: string;
  pct: number;
  color: string;
}

export interface StatusBreakdown {
  label: string;
  count: number;
  pct: number;
  color: string;
}

export interface AlertItem {
  id: string;
  message: string;
  severity: "warn" | "danger" | "info";
  cta?: string;
  ctaHref?: string;
}

export interface ServiceRow {
  id: string;
  name: string;
  category: string;
  fee: number;
  eta: string;
  schemaVersion: string;
  volume30d: number;
  status: "active" | "inactive" | "draft";
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  conditional: boolean;
  isNew: boolean;
  helpText?: string;
  options?: string[];
}

export interface PricingRow {
  id: string;
  service: string;
  standardFee: number;
  urgentFee: number;
  govFeePassthrough: boolean;
  effectiveDate: string;
  scheduledChange?: {
    newStandardFee: number;
    newUrgentFee: number;
    effectiveDate: string;
  };
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: "admin" | "agent" | "system";
  description: string;
  kind: AuditKind;
}

export interface OversightCase {
  code: string;
  service: string;
  agent: string;
  client: string;
  status: "in-progress" | "sla-breach" | "disputed" | "escalated" | "resolved";
  issue?: string;
}

export interface BroadcastRecord {
  id: string;
  audience: string;
  channels: string[];
  message: string;
  sentAt: string;
  reach: number;
}

export interface AdminSettings {
  acceptNewApps: boolean;
  guestApps: boolean;
  dataRetention: string;
  compactTables: boolean;
  enforce2FA: boolean;
  sessionTimeout: number;
  ipAllowlist: string;
  maintenanceMode: boolean;
}

// ─── Context State & Actions ──────────────────────────────────────────────────

export interface ConfirmModalState {
  title: string;
  body: string;
  onConfirm: () => void;
}

export interface PermissionDialogState {
  caseCode: string;
  agentName: string;
}

export interface BroadcastConfirmState {
  reach: number;
  estimatedCost: string;
  optOuts: number;
  channels: string[];
}

export interface AdminState {
  user: AdminUser;
  agents: AdminAgent[];
  metrics: AdminMetric[];
  weeklyBars: WeeklyBar[];
  serviceMix: ServiceMixBar[];
  paymentMix: PaymentMixBar[];
  statusBreakdown: StatusBreakdown[];
  alerts: AlertItem[];
  settings: AdminSettings;
  services: ServiceRow[];
  activeSchemaServiceId: string | null;
  schemaFields: FieldDef[];
  pricingRows: PricingRow[];
  auditLog: AuditEntry[];
  oversightCases: OversightCase[];
  broadcasts: BroadcastRecord[];
  darkMode: boolean;
  isOffline: boolean;
  loading: boolean;
  confirmModal: ConfirmModalState | null;
  permissionDialog: PermissionDialogState | null;
  broadcastConfirm: BroadcastConfirmState | null;
  schemaPublishOpen: boolean;
  oversightTab: OversightTab;
  auditFilter: AuditFilter;
}

export type AdminAction =
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_DARK_MODE"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_OFFLINE"; payload: boolean }
  | { type: "SET_CONFIRM_MODAL"; payload: ConfirmModalState | null }
  | { type: "SET_PERMISSION_DIALOG"; payload: PermissionDialogState | null }
  | { type: "SET_BROADCAST_CONFIRM"; payload: BroadcastConfirmState | null }
  | { type: "SET_SCHEMA_PUBLISH"; payload: boolean }
  | { type: "SET_OVERSIGHT_TAB"; payload: OversightTab }
  | { type: "SET_AUDIT_FILTER"; payload: AuditFilter }
  | { type: "SET_ACTIVE_SCHEMA_SERVICE"; payload: string | null }
  | { type: "UPDATE_SCHEMA_FIELDS"; payload: FieldDef[] }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AdminSettings> }
  | { type: "DELETE_PRICING_ROW"; payload: string }
  | { type: "REMOVE_AGENT"; payload: string };
