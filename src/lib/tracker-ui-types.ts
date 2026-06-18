export type TrackStatus =
  | "received"
  | "in-progress"
  | "action-required"
  | "on-hold"
  | "completed"
  | "rejected";

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  status: "done" | "current" | "upcoming";
  date?: string;
  estimated?: boolean;
}

export interface AgentData {
  name: string;
  role: string;
  location: string;
  initials: string;
  casesHandled: number;
  workingSince: string;
  avgReplyMinutes: number;
  languages: string;
  whatsappUrl: string;
}

export interface DocFile {
  label: string;
  ext: "JPG" | "PDF" | "PNG";
  uploadedAt: string;
  restricted: boolean;
}

export interface AppMeta {
  serviceType: string;
  tier: string;
  submittedAt: string;
  serviceFee: number;
  governmentFee: number;
}

export interface OutcomeData {
  message: string;
  collectMethod: string;
  address?: string;
}

export interface RejectionData {
  reason: string;
  whatNow: string;
}

export interface ActionData {
  agentName: string;
  missing: string;
  uploadLabel: string;
}

export interface OnHoldData {
  authority: string;
  originalEta: string;
  newEta: string;
  delayDays: number;
}

export interface PublicTrackerApplication {
  code: string;
  serviceName: string;
  serviceCategory?: string;
  status: TrackStatus;
  statusLabel: string;
  headline?: string;
  subheadline?: string;
  updatedAt: string;
  submittedAt: string;
  currentStepTitle?: string | null;
  estimatedCompletion?: string | null;
  workingDaysLeft?: number;
  timeline: TimelineStep[];
  agent?: AgentData;
  documents?: DocFile[];
  meta?: AppMeta;
  outcomeData?: OutcomeData;
  rejectionData?: RejectionData;
  actionData?: ActionData;
  onHoldData?: OnHoldData;
}

/** @deprecated Use PublicTrackerApplication */
export type TrackerApplication = PublicTrackerApplication;

export interface TrackerViewData extends PublicTrackerApplication {}
