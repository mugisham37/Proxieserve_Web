/** Flow 5 — Public Tracker: types and mock application data */

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
  /** Formatted date, e.g. "12 May 2026". Present on done/current steps. */
  date?: string;
  /** Show "EST." prefix for upcoming nodes */
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
  /** Guests cannot view/download restricted files */
  restricted: boolean;
}

export interface AppMeta {
  serviceType: string;
  tier: "Standard" | "Express" | "Urgent";
  submittedAt: string;
  serviceFee: number;   // RWF
  governmentFee: number; // RWF
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

export interface TrackerApplication {
  code: string;
  serviceName: string;
  serviceCategory: string;
  status: TrackStatus;
  updatedAt: string;
  submittedAt: string;
  estimatedCompletion: string;
  workingDaysLeft?: number;
  /** H1 text on status hero */
  headline: string;
  /** Sub-text below H1 */
  subheadline: string;
  timeline: TimelineStep[];
  agent: AgentData;
  documents: DocFile[];
  meta: AppMeta;
  outcomeData?: OutcomeData;
  rejectionData?: RejectionData;
  actionData?: ActionData;
  onHoldData?: OnHoldData;
}

// ---------------------------------------------------------------------------
// Shared agent fixture
// ---------------------------------------------------------------------------

const AGENT_ALINE: AgentData = {
  name: "Aline Uwimana",
  role: "Senior Processing Agent",
  location: "Kigali, Rwanda",
  initials: "AU",
  casesHandled: 1842,
  workingSince: "Jan 2022",
  avgReplyMinutes: 18,
  languages: "Kinyarwanda, French, English",
  whatsappUrl: "https://wa.me/250780000001",
};

const AGENT_ERIC: AgentData = {
  name: "Eric Habimana",
  role: "Processing Agent",
  location: "Kigali, Rwanda",
  initials: "EH",
  casesHandled: 934,
  workingSince: "Jun 2023",
  avgReplyMinutes: 24,
  languages: "Kinyarwanda, English",
  whatsappUrl: "https://wa.me/250780000002",
};

// ---------------------------------------------------------------------------
// Shared document fixtures
// ---------------------------------------------------------------------------

const DOCS_PASSPORT: DocFile[] = [
  { label: "National ID — Front", ext: "JPG", uploadedAt: "9 May 2026", restricted: true },
  { label: "Passport photo", ext: "JPG", uploadedAt: "9 May 2026", restricted: true },
  { label: "Application form (signed)", ext: "PDF", uploadedAt: "9 May 2026", restricted: false },
];

const DOCS_BUSINESS: DocFile[] = [
  { label: "Business registration certificate", ext: "PDF", uploadedAt: "2 May 2026", restricted: false },
  { label: "Director National ID", ext: "JPG", uploadedAt: "2 May 2026", restricted: true },
  { label: "KRA TIN certificate", ext: "PDF", uploadedAt: "2 May 2026", restricted: false },
];

// ---------------------------------------------------------------------------
// Timeline builder helpers
// ---------------------------------------------------------------------------

const PASSPORT_TIMELINE_RECEIVED: TimelineStep[] = [
  {
    id: "submitted",
    title: "Application received",
    description: "Your documents and payment have been confirmed.",
    status: "done",
    date: "9 May 2026",
  },
  {
    id: "assigned",
    title: "Agent assigned",
    description: "Aline Uwimana is your dedicated processing agent.",
    status: "current",
    date: "10 May 2026",
  },
  {
    id: "review",
    title: "Document review",
    description: "Your submitted documents are being verified.",
    status: "upcoming",
    date: "13 May 2026",
    estimated: true,
  },
  {
    id: "authority",
    title: "Submitted to authority",
    description: "Application forwarded to Rwanda Immigration Directorate.",
    status: "upcoming",
    date: "15 May 2026",
    estimated: true,
  },
  {
    id: "processing",
    title: "Processing in progress",
    description: "Authority is processing your application.",
    status: "upcoming",
    date: "22 May 2026",
    estimated: true,
  },
  {
    id: "ready",
    title: "Document ready",
    description: "Your passport has been issued.",
    status: "upcoming",
    date: "3 Jun 2026",
    estimated: true,
  },
  {
    id: "delivered",
    title: "Collected / Delivered",
    description: "Physical document in your hands.",
    status: "upcoming",
    date: "5 Jun 2026",
    estimated: true,
  },
];

const PASSPORT_TIMELINE_COMPLETED: TimelineStep[] = [
  {
    id: "submitted",
    title: "Application received",
    description: "Your documents and payment were confirmed.",
    status: "done",
    date: "2 May 2026",
  },
  {
    id: "assigned",
    title: "Agent assigned",
    status: "done",
    date: "3 May 2026",
  },
  {
    id: "review",
    title: "Document review",
    status: "done",
    date: "5 May 2026",
  },
  {
    id: "authority",
    title: "Submitted to authority",
    status: "done",
    date: "7 May 2026",
  },
  {
    id: "processing",
    title: "Processing in progress",
    status: "done",
    date: "14 May 2026",
  },
  {
    id: "ready",
    title: "Document ready",
    description: "Your passport has been issued and is awaiting collection.",
    status: "done",
    date: "19 May 2026",
  },
  {
    id: "delivered",
    title: "Collected / Delivered",
    description: "Delivered to your registered address.",
    status: "current",
    date: "21 May 2026",
  },
];

const BUSINESS_TIMELINE_REJECTED: TimelineStep[] = [
  {
    id: "submitted",
    title: "Application received",
    status: "done",
    date: "28 Apr 2026",
  },
  {
    id: "assigned",
    title: "Agent assigned",
    status: "done",
    date: "29 Apr 2026",
  },
  {
    id: "review",
    title: "Document review",
    description: "RDB raised concerns with your registration certificate.",
    status: "done",
    date: "3 May 2026",
  },
  {
    id: "authority",
    title: "Submitted to authority",
    status: "done",
    date: "5 May 2026",
  },
  {
    id: "processing",
    title: "Application under review",
    status: "done",
    date: "12 May 2026",
  },
  {
    id: "decision",
    title: "Decision issued",
    description: "Authority returned a rejection decision.",
    status: "current",
    date: "20 May 2026",
  },
  {
    id: "closed",
    title: "Case closed",
    status: "upcoming",
    estimated: true,
    date: "25 May 2026",
  },
];

const PASSPORT_TIMELINE_ACTION_REQUIRED: TimelineStep[] = [
  {
    id: "submitted",
    title: "Application received",
    status: "done",
    date: "7 May 2026",
  },
  {
    id: "assigned",
    title: "Agent assigned",
    status: "done",
    date: "8 May 2026",
  },
  {
    id: "review",
    title: "Document review",
    description: "Your photo did not meet the authority's biometric standards.",
    status: "current",
    date: "13 May 2026",
  },
  {
    id: "authority",
    title: "Submitted to authority",
    status: "upcoming",
    estimated: true,
    date: "17 May 2026",
  },
  {
    id: "processing",
    title: "Processing in progress",
    status: "upcoming",
    estimated: true,
    date: "26 May 2026",
  },
  {
    id: "ready",
    title: "Document ready",
    status: "upcoming",
    estimated: true,
    date: "6 Jun 2026",
  },
  {
    id: "delivered",
    title: "Collected / Delivered",
    status: "upcoming",
    estimated: true,
    date: "8 Jun 2026",
  },
];

const DRIVERS_TIMELINE_ON_HOLD: TimelineStep[] = [
  {
    id: "submitted",
    title: "Application received",
    status: "done",
    date: "1 May 2026",
  },
  {
    id: "assigned",
    title: "Agent assigned",
    status: "done",
    date: "2 May 2026",
  },
  {
    id: "review",
    title: "Document review",
    status: "done",
    date: "4 May 2026",
  },
  {
    id: "authority",
    title: "Submitted to authority",
    status: "done",
    date: "6 May 2026",
  },
  {
    id: "hold",
    title: "Processing on hold",
    description: "Rwanda Driving Authority paused all licence renewals pending system upgrade.",
    status: "current",
    date: "14 May 2026",
  },
  {
    id: "resume",
    title: "Processing resumes",
    status: "upcoming",
    estimated: true,
    date: "2 Jun 2026",
  },
  {
    id: "delivered",
    title: "Licence ready for collection",
    status: "upcoming",
    estimated: true,
    date: "6 Jun 2026",
  },
];

// ---------------------------------------------------------------------------
// Mock Applications
// ---------------------------------------------------------------------------

export const TRACKER_APPLICATIONS: TrackerApplication[] = [
  // -------------------------------------------------------------------------
  // PRX-2026-00483 — received (matches MOCK.VALID_PRX from auth flow)
  // -------------------------------------------------------------------------
  {
    code: "PRX-2026-00483",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "received",
    updatedAt: "10 May 2026, 09:14",
    submittedAt: "9 May 2026",
    estimatedCompletion: "5 Jun 2026",
    workingDaysLeft: 18,
    headline: "We've received your application.",
    subheadline: "Your documents are confirmed and your agent has been assigned. Sit tight — we'll keep you updated at every step.",
    timeline: PASSPORT_TIMELINE_RECEIVED,
    agent: AGENT_ALINE,
    documents: DOCS_PASSPORT,
    meta: {
      serviceType: "Passport renewal",
      tier: "Standard",
      submittedAt: "9 May 2026",
      serviceFee: 25000,
      governmentFee: 50000,
    },
  },

  // -------------------------------------------------------------------------
  // PRX-2026-00100 — completed (outcome card shown)
  // -------------------------------------------------------------------------
  {
    code: "PRX-2026-00100",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "completed",
    updatedAt: "21 May 2026, 14:30",
    submittedAt: "2 May 2026",
    estimatedCompletion: "21 May 2026",
    headline: "All done — your passport is ready.",
    subheadline: "Your new passport has been issued and delivered. Download your completion certificate below.",
    timeline: PASSPORT_TIMELINE_COMPLETED,
    agent: AGENT_ALINE,
    documents: DOCS_PASSPORT,
    meta: {
      serviceType: "Passport renewal",
      tier: "Express",
      submittedAt: "2 May 2026",
      serviceFee: 40000,
      governmentFee: 50000,
    },
    outcomeData: {
      message: "Your passport is ready to collect.",
      collectMethod: "Visit the Kigali office or request delivery",
      address: "KN 5 Rd, Kigali Innovation City, Kigali",
    },
  },

  // -------------------------------------------------------------------------
  // PRX-2026-09999 — rejected (rejection panel)
  // -------------------------------------------------------------------------
  {
    code: "PRX-2026-09999",
    serviceName: "Business licence registration",
    serviceCategory: "Business & commerce",
    status: "rejected",
    updatedAt: "20 May 2026, 11:05",
    submittedAt: "28 Apr 2026",
    estimatedCompletion: "20 May 2026",
    headline: "Your application was not approved.",
    subheadline: "Rwanda Development Board returned a rejection. See the reason below and find out what you can do next.",
    timeline: BUSINESS_TIMELINE_REJECTED,
    agent: AGENT_ERIC,
    documents: DOCS_BUSINESS,
    meta: {
      serviceType: "Business licence",
      tier: "Standard",
      submittedAt: "28 Apr 2026",
      serviceFee: 30000,
      governmentFee: 20000,
    },
    rejectionData: {
      reason: "The submitted business registration certificate is invalid or expired. The certificate number does not match RDB records.",
      whatNow: "You may resubmit with a valid certificate obtained directly from RDB, or contact your agent to dispute the decision within 30 days.",
    },
  },

  // -------------------------------------------------------------------------
  // PRX-2026-00777 — action-required (upload photo prompt)
  // -------------------------------------------------------------------------
  {
    code: "PRX-2026-00777",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "action-required",
    updatedAt: "13 May 2026, 10:22",
    submittedAt: "7 May 2026",
    estimatedCompletion: "8 Jun 2026",
    workingDaysLeft: 19,
    headline: "Action needed from you.",
    subheadline: "Your agent needs one more document before we can continue. Please upload it as soon as possible to avoid delays.",
    timeline: PASSPORT_TIMELINE_ACTION_REQUIRED,
    agent: AGENT_ALINE,
    documents: [
      { label: "National ID — Front", ext: "JPG", uploadedAt: "7 May 2026", restricted: true },
      { label: "Application form (signed)", ext: "PDF", uploadedAt: "7 May 2026", restricted: false },
    ],
    meta: {
      serviceType: "Passport renewal",
      tier: "Standard",
      submittedAt: "7 May 2026",
      serviceFee: 25000,
      governmentFee: 50000,
    },
    actionData: {
      agentName: "Aline Uwimana",
      missing: "A clear, recent passport photo meeting ICAO biometric standards (plain white background, 35×45 mm, taken within the last 6 months).",
      uploadLabel: "Upload passport photo",
    },
  },

  // -------------------------------------------------------------------------
  // PRX-2026-00555 — on-hold (waiting on authority)
  // -------------------------------------------------------------------------
  {
    code: "PRX-2026-00555",
    serviceName: "Driving licence renewal",
    serviceCategory: "Transport & mobility",
    status: "on-hold",
    updatedAt: "14 May 2026, 08:45",
    submittedAt: "1 May 2026",
    estimatedCompletion: "6 Jun 2026",
    workingDaysLeft: 11,
    headline: "Your application is on hold.",
    subheadline: "The processing authority has paused operations temporarily. This is outside our control — we'll resume the moment they do.",
    timeline: DRIVERS_TIMELINE_ON_HOLD,
    agent: AGENT_ERIC,
    documents: [
      { label: "Current driving licence", ext: "JPG", uploadedAt: "1 May 2026", restricted: true },
      { label: "National ID", ext: "JPG", uploadedAt: "1 May 2026", restricted: true },
      { label: "Medical clearance", ext: "PDF", uploadedAt: "1 May 2026", restricted: false },
    ],
    meta: {
      serviceType: "Driving licence renewal",
      tier: "Standard",
      submittedAt: "1 May 2026",
      serviceFee: 15000,
      governmentFee: 12000,
    },
    onHoldData: {
      authority: "Rwanda Driving Authority",
      originalEta: "23 May 2026",
      newEta: "6 Jun 2026",
      delayDays: 14,
    },
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/** All valid PRX codes in this mock data set */
export const MOCK_TRACKER_CODES = TRACKER_APPLICATIONS.map((a) => a.code);

/** Returns the application for a given code, or undefined if not found */
export function getApplicationByCode(code: string): TrackerApplication | undefined {
  return TRACKER_APPLICATIONS.find((a) => a.code === code);
}
