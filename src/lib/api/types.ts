"use client";

export type AuthRole = "client" | "staff:agent" | "staff:admin";
export type AuthLanguage = "en" | "rw" | "fr";
export type IdentifierType = "email" | "phone";
export type StaffRole = "agent" | "admin";
export type TwoFAMethod = "totp" | "sms" | "backup";

export type ApiErrorType =
  | "invalid-credentials"
  | "account-locked"
  | "account-disabled"
  | "account-exists"
  | "otp-wrong"
  | "otp-expired"
  | "reset-expired"
  | "claim-not-found"
  | "rate-limited"
  | "unauthorized"
  | "internal-error"
  | "network-error"
  | "timeout"
  | "validation-error"
  | "unknown-error";

export interface ApiResponse<T> {
  success: boolean;
  errorType: string | null;
  message: string;
  data: T | null;
}

export interface SessionData {
  userId: string;
  name: string;
  email: string;
  phone?: string | null;
  role: AuthRole;
  isEmailVerified: boolean;
  language: AuthLanguage;
  createdAt: string;
  expiresAt?: string | null;
}

export interface SessionResponse {
  session: SessionData;
}

export interface AuthFlowData {
  session: SessionData;
  maskedEmail: string;
}

export interface VerifyOtpData {
  verified: true;
}

export interface ForgotPasswordData {
  maskedEmail: string;
}

export interface SignOutData {
  signedOut: true;
}

export interface StaffLoginData {
  session: SessionData;
  pre2faToken: string;
}

export interface ApplicationLookupData {
  code: string;
  serviceName: string;
  submittedDate: string;
  status: string;
}

export interface ApplicationClaimData {
  claimed: true;
}

export interface SignupRequest {
  name: string;
  identifierType: IdentifierType;
  identifier: string;
  password: string;
  language: AuthLanguage;
  code?: string;
  terms: boolean;
}

export interface LoginRequest {
  identifierType: IdentifierType;
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface VerifyOtpRequest {
  code: string;
}

export interface ForgotPasswordRequest {
  identifierType: IdentifierType;
  identifier: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface StaffLoginRequest {
  email: string;
  password: string;
  role: StaffRole;
}

export interface StaffTwoFactorRequest {
  code: string;
  method: TwoFAMethod;
  trustDevice: boolean;
  pre2faToken: string;
}

export interface ApplicationClaimRequest {
  code: string;
  phone: string;
}

export interface AccountLockedData {
  lockoutUntil: string;
}

export interface OtpWrongData {
  attemptsRemaining: number;
}

export interface RateLimitedData {
  retryAfterSeconds: number;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.success === "boolean" &&
    (typeof value.errorType === "string" || value.errorType === null) &&
    typeof value.message === "string" &&
    "data" in value
  );
}

export function isAccountLockedData(value: unknown): value is AccountLockedData {
  return isRecord(value) && typeof value.lockoutUntil === "string";
}

export function isOtpWrongData(value: unknown): value is OtpWrongData {
  return isRecord(value) && typeof value.attemptsRemaining === "number";
}

export function isRateLimitedData(value: unknown): value is RateLimitedData {
  return isRecord(value) && typeof value.retryAfterSeconds === "number";
}

export class ApiError<TData = unknown> extends Error {
  readonly name = "ApiError";

  constructor(
    message: string,
    public readonly errorType: ApiErrorType,
    public readonly statusCode: number,
    public readonly data: TData | null = null,
  ) {
    super(message);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// ─── Services ───────────────────────────────────────────────────────────────

export interface ServiceStep {
  step_number: number;
  title: string;
  description: string | null;
}

export interface DocumentRequirement {
  key: string;
  label: string;
  description: string | null;
  doc_type: string;
  is_required: boolean;
  max_size_mb: number;
  allowed_mime_types: string[];
  sort_order: number;
}

export interface FormFieldOption {
  value: string;
  label: string;
  description: string | null;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  optional?: boolean;
  help: string | null;
  options: FormFieldOption[] | null;
  conditional: Record<string, unknown> | null;
  placeholder: string | null;
  maxLength: number | null;
}

export interface AppCard {
  id: string;
  title: string;
  fields: FormField[];
}

export interface ApplicationConfig {
  step2Title: string;
  step2Lede: string;
  cards: AppCard[];
}

export interface PricingTier {
  tier: string;
  label: string;
  fee: number;
  governmentFee: number;
  eta: string;
  etaBusinessDays: number;
  includes: string[];
  isAvailable: boolean;
}

export interface ServiceSummary {
  service_id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  color: string | null;
  icon: string | null;
  status: string;
  version: number;
  is_featured: boolean;
  pricing_tiers: PricingTier[];
}

export interface ServiceDetail extends ServiceSummary {
  description: string | null;
  created_at: string;
  updated_at: string;
  steps: ServiceStep[];
  requirements: DocumentRequirement[];
  application_config: ApplicationConfig | null;
}

export interface ServiceListResponse {
  services: ServiceSummary[];
}

export interface CreateServiceRequest {
  name: string;
  slug: string;
  category: string;
  short_description?: string | null;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  is_featured?: boolean;
  step2_title?: string | null;
  step2_lede?: string | null;
}

export interface UpdateServiceRequest {
  name?: string | null;
  category?: string | null;
  short_description?: string | null;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  is_featured?: boolean | null;
  step2_title?: string | null;
  step2_lede?: string | null;
}

export interface ServiceStepInput {
  step_number: number;
  title: string;
  description?: string | null;
}

export interface DocumentRequirementInput {
  key: string;
  label: string;
  description?: string | null;
  doc_type: string;
  is_required?: boolean;
  max_size_mb?: number;
  allowed_mime_types: string[];
  sort_order?: number;
}

export interface FormFieldOptionInput {
  value: string;
  label: string;
  description?: string | null;
}

export interface FormFieldInput {
  field_key: string;
  label: string;
  field_type: string;
  help_text?: string | null;
  is_required?: boolean;
  options?: FormFieldOptionInput[] | null;
  conditional_on_field?: string | null;
  conditional_on_value?: string | null;
  sort_order?: number;
  max_length?: number | null;
  placeholder?: string | null;
  card_id?: string | null;
  card_title?: string | null;
}

export interface UpdatePricingTierRequest {
  display_name?: string | null;
  description?: string | null;
  platform_fee?: number | null;
  government_fee?: number | null;
  eta_business_days?: number | null;
  features?: string[] | null;
  is_available?: boolean | null;
}

export interface CreateServiceResponse {
  service_id: string;
  slug: string;
  status: string;
}

// ─── Applications ───────────────────────────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  nationalId: string;
  dob: string;
  phone: string;
  email: string;
  whatsapp?: boolean;
  language?: string;
  consent?: boolean;
}

export interface SubmitApplicationRequest {
  service_slug: string;
  tier: string;
  personal_info: PersonalInfo;
  service_data?: Record<string, unknown>;
}

export interface SubmitApplicationResponse {
  application_id: string;
  code: string;
  service_name: string;
  tier: string;
  payment_required: boolean;
}

export interface ApplicationSummary {
  application_id: string;
  code: string;
  service_name: string;
  service_slug: string;
  status: string;
  tier: string;
  submitted_at: string;
  payment_status: string;
}

export interface ApplicationListResponse {
  applications: ApplicationSummary[];
}

export interface DashboardSummary {
  unreadCount: number;
  actionCount: number;
  activeCount: number;
  completedCount: number;
  docCount: number;
  docSizeMB: number;
  avgTurnaround: number | null;
}

export interface StatusHistoryItem {
  status: string;
  changed_by: string | null;
  changed_by_role: string | null;
  note: string | null;
  created_at: string;
}

export interface PaymentInfo {
  method: string;
  amount: number;
  governmentFee: number;
  vatRate: number;
  paidAt: string | null;
  receiptNumber: string | null;
}

export interface DocumentItem {
  document_id: string;
  application_id: string;
  requirement_key: string;
  original_filename: string;
  mime_type: string;
  file_size_bytes: number;
  uploaded_by: string;
  uploaded_by_role: string;
  version: number;
  qc_status: string;
  qc_notes: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
}

export interface MessageItem {
  message_id: string;
  sender_id: string | null;
  sender_role: string | null;
  content: string;
  is_internal: boolean;
  is_system: boolean;
  attachments: string[];
  is_read_by_client: boolean;
  read_by_agent_at: string | null;
  created_at: string;
}

export interface ApplicationDetail {
  application_id: string;
  code: string;
  service_name: string;
  service_slug: string;
  tier: string;
  status: string;
  personal_info: Record<string, unknown>;
  service_data: Record<string, unknown>;
  payment_status: string;
  payment_amount: number | null;
  status_display: string;
  payment_info: PaymentInfo | null;
  sla_deadline: string | null;
  submitted_at: string;
  assigned_agent_id: string | null;
  status_history: StatusHistoryItem[];
  documents: DocumentItem[];
  messages: MessageItem[];
}

export interface CancelApplicationRequest {
  reason?: string | null;
}

export interface TrackerResponse {
  code: string;
  service_name: string;
  status: string;
  current_step_number: number | null;
  current_step_title: string | null;
  estimated_completion: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface AdminApplicationListResponse {
  applications: ApplicationSummary[];
  total: number;
  offset: number;
  limit: number;
}

export interface AdminApplicationsFilter {
  status?: string;
  service_id?: string;
  agent_id?: string;
  tier?: string;
  payment_status?: string;
  offset?: number;
  limit?: number;
}

export interface AssignApplicationRequest {
  agent_id: string;
  note?: string | null;
}

export interface UpdateStatusRequest {
  status: string;
  note?: string | null;
  rejection_reason?: string | null;
}

export interface AgentCaseSummary {
  code: string;
  service_name: string;
  client_name: string;
  status: string;
  tier: string;
  submitted_at: string;
  sla_state: string;
  sla_deadline: string | null;
  unread_messages?: number;
}

export interface AgentCaseListResponse {
  cases: AgentCaseSummary[];
}

export interface UnassignedCase {
  code: string;
  service_name: string;
  submitted_at: string;
  tier: string;
  eta_business_days: number | null;
}

export interface UnassignedQueueResponse {
  count: number;
  cases: UnassignedCase[];
}

// ─── Documents ──────────────────────────────────────────────────────────────

export interface DocumentListResponse {
  documents: DocumentItem[];
}

export interface UpdateDocumentQcRequest {
  qc_status: string;
  qc_notes?: Record<string, unknown> | null;
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export interface MessageListResponse {
  messages: MessageItem[];
}

export interface SendMessageRequest {
  content: string;
  is_internal?: boolean;
  attachments?: string[];
}

// ─── Agent settings & metrics ─────────────────────────────────────────────────

export interface AgentSettings {
  accepting_cases: boolean;
  daily_case_cap: number | null;
  notification_new_case: boolean;
  notification_client_reply: boolean;
  notification_sla_alert: boolean;
  notification_daily_summary: boolean;
}

export interface UpdateAgentSettingsRequest {
  accepting_cases?: boolean | null;
  daily_case_cap?: number | null;
  notification_new_case?: boolean | null;
  notification_client_reply?: boolean | null;
  notification_sla_alert?: boolean | null;
  notification_daily_summary?: boolean | null;
}

export interface AgentSkill {
  service_category: string;
  proficiency_level: number;
  notes: string | null;
}

export interface AgentSkillsResponse {
  agent_id: string;
  skills: AgentSkill[];
}

export interface SetAgentSkillsRequest {
  skills: AgentSkill[];
}

export interface WeeklyBar {
  week: string;
  count: number;
  isCurrent?: boolean | null;
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

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export interface InitiatePaymentRequest {
  application_code: string;
  method: string;
  phone_number?: string;
  card_token?: string;
  operator?: string;
}

export interface InitiatePaymentResponse {
  paymentId: string;
  transactionId: string;
  status: string;
  expiresAt: string | null;
  sessionToken: string | null;
}

export interface PaymentStatusResponse {
  transactionId: string;
  status: string;
  paidAt: string | null;
}

export interface PaymentReceiptResponse {
  serviceName: string;
  trackingCode: string;
  amount: number;
  governmentFee: number;
  vatAmount: number;
  method: string;
  transactionId: string;
  receiptNumber: string;
  paidAt: string;
  applicationCode: string;
}

// ─── Admin analytics ────────────────────────────────────────────────────────────

export interface AdminMetric {
  id: string;
  label: string;
  value: string | number;
  delta?: string | null;
  deltaDir?: string | null;
  deltaColor?: string | null;
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
  severity: string;
  cta?: string | null;
  ctaHref?: string | null;
}

export interface AdminAgentItem {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  skills: string[];
  load: number;
  capacity: number;
  twoFa: boolean;
  role: string;
  status: string;
  activeCases: number;
  completedTotal: number;
  avgTurnaround: string;
  slaPercent: number;
  rating: number;
}

export interface AnalyticsResponse {
  metrics: AdminMetric[];
  weeklyBars: WeeklyBar[];
  serviceMix: ServiceMixBar[];
  paymentMix: PaymentMixBar[];
  statusBreakdown: StatusBreakdown[];
  alerts: AlertItem[];
  agents: AdminAgentItem[];
}

// ─── Oversight ──────────────────────────────────────────────────────────────────

export interface OversightCase {
  code: string;
  service: string;
  agent: string;
  client: string;
  status: string;
  issue: string | null;
}

export interface OversightCaseListResponse {
  cases: OversightCase[];
}

export interface EscalateCaseRequest {
  reason: string;
}

export interface ResolveCaseRequest {
  resolution_note?: string | null;
}

// ─── Audit ────────────────────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: string;
  description: string;
  kind: string;
}

export interface AuditLogResponse {
  entries: AuditEntry[];
  total: number;
  has_more: boolean;
}

export interface AuditLogFilter {
  kind?: string;
  limit?: number;
  offset?: number;
}

// ─── Broadcasts ─────────────────────────────────────────────────────────────────

export interface BroadcastRecord {
  id: string;
  audience: string;
  channels: string[];
  message: string;
  sentAt: string;
  reach: number;
}

export interface BroadcastListResponse {
  broadcasts: BroadcastRecord[];
}

export interface CreateBroadcastRequest {
  audience_description: string;
  audience_filter: Record<string, unknown>;
  channels: string[];
  message: string;
  scheduled_at?: string | null;
}

// ─── Platform settings ──────────────────────────────────────────────────────────

export interface PlatformSettings {
  acceptNewApps: boolean;
  guestApps: boolean;
  dataRetention: string;
  compactTables?: boolean;
  enforce2FA: boolean;
  sessionTimeout: number;
  ipAllowlist: string;
  maintenanceMode: boolean;
}

export interface UpdatePlatformSettingsRequest {
  acceptNewApps?: boolean | null;
  guestApps?: boolean | null;
  dataRetention?: string | null;
  enforce2FA?: boolean | null;
  sessionTimeout?: number | null;
  ipAllowlist?: string | null;
  maintenanceMode?: boolean | null;
}

// ─── Query key registry ───────────────────────────────────────────────────────

export const QUERY_KEYS = {
  session: ["session"] as const,
  services: ["services"] as const,
  service: (slug: string) => ["services", slug] as const,
  adminServices: ["admin", "services"] as const,
  adminService: (slug: string) => ["admin", "services", slug] as const,
  applications: ["applications"] as const,
  applicationSummary: ["applications", "summary"] as const,
  application: (code: string) => ["applications", code] as const,
  applicationLookup: (code: string) => ["application-lookup", code] as const,
  tracker: (code: string) => ["tracker", code] as const,
  adminApplications: (filters?: AdminApplicationsFilter) =>
    ["admin", "applications", filters ?? {}] as const,
  adminApplication: (code: string) => ["admin", "applications", code] as const,
  documents: (code: string) => ["documents", code] as const,
  messages: (code: string, isAgent?: boolean) =>
    ["messages", code, isAgent ? "agent" : "client"] as const,
  adminMessages: (code: string) => ["admin", "messages", code] as const,
  agentCases: ["agent-cases"] as const,
  agentCase: (code: string) => ["agent-cases", code] as const,
  unassignedCases: ["unassigned-cases"] as const,
  agentSettings: ["agent-settings"] as const,
  agentSkills: ["agent-skills"] as const,
  agentMetrics: ["agent-metrics"] as const,
  adminAgentSkills: (agentId: string) => ["admin", "agents", agentId, "skills"] as const,
  adminLeaderboard: ["admin", "leaderboard"] as const,
  adminAgents: ["admin", "agents"] as const,
  paymentStatus: (transactionId: string) => ["payment-status", transactionId] as const,
  paymentReceipt: (applicationCode: string) => ["payment-receipt", applicationCode] as const,
  adminAnalytics: ["admin-analytics"] as const,
  oversightCases: (tab?: string) => ["oversight-cases", tab ?? "all"] as const,
  auditLog: (filter?: AuditLogFilter) => ["audit-log", filter ?? {}] as const,
  broadcasts: ["broadcasts"] as const,
  platformSettings: ["platform-settings"] as const,
} as const;
