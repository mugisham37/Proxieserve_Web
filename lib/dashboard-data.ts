/** Flow 6 — Client Dashboard: types and mock data */

import type { AgentData } from "@/lib/tracker-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AppStatus =
  | "received"
  | "in-progress"
  | "action-required"
  | "on-hold"
  | "completed"
  | "rejected"
  | "archived";

export interface UserProfile {
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: "client";
  joinedAt: string;
  lastSeen: string; // ISO — >90 days triggers returning-user banner
  isEmailVerified: boolean;
  isReturning: boolean;
}

export interface ApplicationSummary {
  code: string;
  serviceName: string;
  serviceCategory: string;
  status: AppStatus;
  tier: "Standard" | "Express" | "Urgent";
  submittedAt: string;
  updatedAt: string;
  estimatedCompletion: string;
  progressSteps: number;  // total timeline nodes (always 7)
  completedSteps: number; // done nodes
  unreadMessages: number;
}

export interface Message {
  id: string;
  sender: "agent" | "client" | "system";
  senderName?: string;
  senderInitials?: string;
  body: string;
  sentAt: string;
  status?: "sending" | "sent" | "failed";
}

export interface DashboardDocument {
  id: string;
  applicationCode: string;
  label: string;
  ext: "JPG" | "PDF" | "PNG";
  uploadedAt: string;
  size: string; // e.g. "1.2 MB"
  verificationStatus: "verified" | "pending" | "rejected";
}

export interface PaymentRecord {
  id: string;
  description: string;
  amount: number; // RWF
  paidAt: string;
  method: "Mobile Money" | "Card" | "Bank Transfer";
  status: "paid" | "pending" | "refunded";
}

export interface DashboardStats {
  active: number;
  completed: number;
  documents: number;
  avgTurnaroundDays: number;
}

// ---------------------------------------------------------------------------
// Mock user
// ---------------------------------------------------------------------------

export const MOCK_USER_PROFILE: UserProfile = {
  name: "Aline Uwimana",
  initials: "AU",
  email: "test@exists.rw",
  phone: "+250 780 123 456",
  role: "client",
  joinedAt: "12 Jan 2026",
  lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  isEmailVerified: false, // triggers EmailVerifyBanner in shell
  isReturning: false,
};

// ---------------------------------------------------------------------------
// Mock applications (PRX codes match tracker-data.ts)
// ---------------------------------------------------------------------------

export const MOCK_DASHBOARD_APPLICATIONS: ApplicationSummary[] = [
  {
    code: "PRX-2026-00483",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "received",
    tier: "Standard",
    submittedAt: "9 May 2026",
    updatedAt: "10 May 2026",
    estimatedCompletion: "5 Jun 2026",
    progressSteps: 7,
    completedSteps: 2,
    unreadMessages: 3,
  },
  {
    code: "PRX-2026-00100",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "completed",
    tier: "Express",
    submittedAt: "2 May 2026",
    updatedAt: "21 May 2026",
    estimatedCompletion: "21 May 2026",
    progressSteps: 7,
    completedSteps: 7,
    unreadMessages: 0,
  },
  {
    code: "PRX-2026-09999",
    serviceName: "Business licence registration",
    serviceCategory: "Business & commerce",
    status: "rejected",
    tier: "Standard",
    submittedAt: "28 Apr 2026",
    updatedAt: "20 May 2026",
    estimatedCompletion: "20 May 2026",
    progressSteps: 7,
    completedSteps: 6,
    unreadMessages: 1,
  },
  {
    code: "PRX-2026-00777",
    serviceName: "Passport renewal",
    serviceCategory: "Identity & civil",
    status: "action-required",
    tier: "Standard",
    submittedAt: "7 May 2026",
    updatedAt: "13 May 2026",
    estimatedCompletion: "8 Jun 2026",
    progressSteps: 7,
    completedSteps: 3,
    unreadMessages: 2,
  },
  {
    code: "PRX-2026-00555",
    serviceName: "Driving licence renewal",
    serviceCategory: "Transport & mobility",
    status: "on-hold",
    tier: "Standard",
    submittedAt: "1 May 2026",
    updatedAt: "14 May 2026",
    estimatedCompletion: "6 Jun 2026",
    progressSteps: 7,
    completedSteps: 4,
    unreadMessages: 1,
  },
  {
    // State 9: archived service — ink-subtle strip + "Discontinued" label
    code: "PRX-2026-00001",
    serviceName: "Vehicle import permit",
    serviceCategory: "Transport & mobility",
    status: "archived",
    tier: "Standard",
    submittedAt: "3 Jan 2026",
    updatedAt: "1 Mar 2026",
    estimatedCompletion: "N/A",
    progressSteps: 7,
    completedSteps: 2,
    unreadMessages: 0,
  },
];

// ---------------------------------------------------------------------------
// Mock messages (keyed by PRX code)
// ---------------------------------------------------------------------------

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "PRX-2026-00483": [
    {
      id: "m1",
      sender: "system",
      body: "Application PRX-2026-00483 received. Aline Uwimana has been assigned as your agent.",
      sentAt: "2026-05-09T10:14:00Z",
      status: "sent",
    },
    {
      id: "m2",
      sender: "agent",
      senderName: "Aline Uwimana",
      senderInitials: "AU",
      body: "Hello! I've received your passport renewal application. Your documents look good. I'll begin the document review shortly.",
      sentAt: "2026-05-10T09:05:00Z",
      status: "sent",
    },
    {
      id: "m3",
      sender: "client",
      senderName: "You",
      senderInitials: "AU",
      body: "Thank you, Aline. How long does the review typically take?",
      sentAt: "2026-05-10T09:22:00Z",
      status: "sent",
    },
    {
      id: "m4",
      sender: "agent",
      senderName: "Aline Uwimana",
      senderInitials: "AU",
      body: "Usually 2–3 working days. I'll notify you as soon as it's submitted to the immigration authority.",
      sentAt: "2026-05-10T09:45:00Z",
      status: "sent",
    },
  ],
  "PRX-2026-00100": [
    {
      id: "m5",
      sender: "system",
      body: "Application PRX-2026-00100 completed. Your passport has been delivered.",
      sentAt: "2026-05-21T14:30:00Z",
      status: "sent",
    },
    {
      id: "m6",
      sender: "agent",
      senderName: "Aline Uwimana",
      senderInitials: "AU",
      body: "Your new passport has been delivered to your registered address. Please let me know if you have any questions!",
      sentAt: "2026-05-21T14:35:00Z",
      status: "sent",
    },
  ],
  "PRX-2026-09999": [
    {
      id: "m7",
      sender: "agent",
      senderName: "Eric Habimana",
      senderInitials: "EH",
      body: "Unfortunately, Rwanda Development Board has rejected the application due to an invalid certificate. Please see the rejection details in your application overview.",
      sentAt: "2026-05-20T11:10:00Z",
      status: "sent",
    },
  ],
  "PRX-2026-00777": [
    {
      id: "m8",
      sender: "system",
      body: "Action required: Your agent has requested an additional document.",
      sentAt: "2026-05-13T10:00:00Z",
      status: "sent",
    },
    {
      id: "m9",
      sender: "agent",
      senderName: "Aline Uwimana",
      senderInitials: "AU",
      body: "Hi! The passport photo you submitted doesn't meet ICAO biometric standards. Could you please upload a new one with a plain white background? The photo should be 35×45 mm, taken within the last 6 months.",
      sentAt: "2026-05-13T10:22:00Z",
      status: "sent",
    },
  ],
  "PRX-2026-00555": [
    {
      id: "m10",
      sender: "system",
      body: "Application PRX-2026-00555 is on hold due to Rwanda Driving Authority system upgrade.",
      sentAt: "2026-05-14T08:45:00Z",
      status: "sent",
    },
  ],
};

// ---------------------------------------------------------------------------
// Mock documents
// ---------------------------------------------------------------------------

export const MOCK_DOCUMENTS: DashboardDocument[] = [
  {
    id: "doc1",
    applicationCode: "PRX-2026-00483",
    label: "National ID — Front",
    ext: "JPG",
    uploadedAt: "9 May 2026",
    size: "1.2 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc2",
    applicationCode: "PRX-2026-00483",
    label: "Application form (signed)",
    ext: "PDF",
    uploadedAt: "9 May 2026",
    size: "0.4 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc3",
    applicationCode: "PRX-2026-00100",
    label: "National ID — Front",
    ext: "JPG",
    uploadedAt: "2 May 2026",
    size: "1.1 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc4",
    applicationCode: "PRX-2026-00100",
    label: "Passport photo",
    ext: "JPG",
    uploadedAt: "2 May 2026",
    size: "0.8 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc5",
    applicationCode: "PRX-2026-00100",
    label: "Application form (signed)",
    ext: "PDF",
    uploadedAt: "2 May 2026",
    size: "0.4 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc6",
    applicationCode: "PRX-2026-09999",
    label: "Business registration certificate",
    ext: "PDF",
    uploadedAt: "28 Apr 2026",
    size: "2.1 MB",
    verificationStatus: "rejected",
  },
  {
    id: "doc7",
    applicationCode: "PRX-2026-09999",
    label: "Director National ID",
    ext: "JPG",
    uploadedAt: "28 Apr 2026",
    size: "1.0 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc8",
    applicationCode: "PRX-2026-09999",
    label: "KRA TIN certificate",
    ext: "PDF",
    uploadedAt: "28 Apr 2026",
    size: "0.6 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc9",
    applicationCode: "PRX-2026-00777",
    label: "National ID — Front",
    ext: "JPG",
    uploadedAt: "7 May 2026",
    size: "1.2 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc10",
    applicationCode: "PRX-2026-00777",
    label: "Application form (signed)",
    ext: "PDF",
    uploadedAt: "7 May 2026",
    size: "0.4 MB",
    verificationStatus: "pending",
  },
  {
    id: "doc11",
    applicationCode: "PRX-2026-00555",
    label: "Current driving licence",
    ext: "JPG",
    uploadedAt: "1 May 2026",
    size: "0.9 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc12",
    applicationCode: "PRX-2026-00555",
    label: "Medical clearance",
    ext: "PDF",
    uploadedAt: "1 May 2026",
    size: "1.4 MB",
    verificationStatus: "verified",
  },
  {
    id: "doc13",
    applicationCode: "PRX-2026-00555",
    label: "National ID",
    ext: "JPG",
    uploadedAt: "1 May 2026",
    size: "1.1 MB",
    verificationStatus: "verified",
  },
];

// ---------------------------------------------------------------------------
// Mock payments (keyed by PRX code)
// ---------------------------------------------------------------------------

export const MOCK_PAYMENTS: Record<string, PaymentRecord[]> = {
  "PRX-2026-00483": [
    {
      id: "pay1",
      description: "Service fee — Passport renewal (Standard)",
      amount: 25000,
      paidAt: "9 May 2026",
      method: "Mobile Money",
      status: "paid",
    },
    {
      id: "pay2",
      description: "Government fee — Rwanda Immigration Directorate",
      amount: 50000,
      paidAt: "9 May 2026",
      method: "Mobile Money",
      status: "paid",
    },
  ],
  "PRX-2026-00100": [
    {
      id: "pay3",
      description: "Service fee — Passport renewal (Express)",
      amount: 40000,
      paidAt: "2 May 2026",
      method: "Card",
      status: "paid",
    },
    {
      id: "pay4",
      description: "Government fee — Rwanda Immigration Directorate",
      amount: 50000,
      paidAt: "2 May 2026",
      method: "Card",
      status: "paid",
    },
  ],
  "PRX-2026-09999": [
    {
      id: "pay5",
      description: "Service fee — Business licence registration",
      amount: 30000,
      paidAt: "28 Apr 2026",
      method: "Mobile Money",
      status: "refunded",
    },
    {
      id: "pay6",
      description: "Government fee — Rwanda Development Board",
      amount: 20000,
      paidAt: "28 Apr 2026",
      method: "Mobile Money",
      status: "refunded",
    },
  ],
  "PRX-2026-00777": [
    {
      id: "pay7",
      description: "Service fee — Passport renewal (Standard)",
      amount: 25000,
      paidAt: "7 May 2026",
      method: "Mobile Money",
      status: "paid",
    },
    {
      id: "pay8",
      description: "Government fee — Rwanda Immigration Directorate",
      amount: 50000,
      paidAt: "7 May 2026",
      method: "Mobile Money",
      status: "pending",
    },
  ],
  "PRX-2026-00555": [
    {
      id: "pay9",
      description: "Service fee — Driving licence renewal",
      amount: 15000,
      paidAt: "1 May 2026",
      method: "Bank Transfer",
      status: "paid",
    },
    {
      id: "pay10",
      description: "Government fee — Rwanda Driving Authority",
      amount: 12000,
      paidAt: "1 May 2026",
      method: "Bank Transfer",
      status: "paid",
    },
  ],
};

// ---------------------------------------------------------------------------
// Mock stats (derived from applications)
// ---------------------------------------------------------------------------

export const MOCK_STATS: DashboardStats = {
  active: MOCK_DASHBOARD_APPLICATIONS.filter(
    (a) => !["completed", "rejected", "archived"].includes(a.status)
  ).length,
  completed: MOCK_DASHBOARD_APPLICATIONS.filter((a) => a.status === "completed").length,
  documents: MOCK_DOCUMENTS.length,
  avgTurnaroundDays: 19,
};

// ---------------------------------------------------------------------------
// Shared agent fixtures (match tracker-data.ts)
// ---------------------------------------------------------------------------

export const DASH_AGENT_ALINE: AgentData = {
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

export const DASH_AGENT_ERIC: AgentData = {
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

// Map application code → agent
export const APPLICATION_AGENTS: Record<string, AgentData> = {
  "PRX-2026-00483": DASH_AGENT_ALINE,
  "PRX-2026-00100": DASH_AGENT_ALINE,
  "PRX-2026-09999": DASH_AGENT_ERIC,
  "PRX-2026-00777": DASH_AGENT_ALINE,
  "PRX-2026-00555": DASH_AGENT_ERIC,
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getDashboardApplication(code: string): ApplicationSummary | undefined {
  return MOCK_DASHBOARD_APPLICATIONS.find((a) => a.code === code);
}

export function getApplicationMessages(code: string): Message[] {
  return MOCK_MESSAGES[code] ?? [];
}

export function getApplicationDocuments(code: string): DashboardDocument[] {
  return MOCK_DOCUMENTS.filter((d) => d.applicationCode === code);
}

export function getApplicationPayments(code: string): PaymentRecord[] {
  return MOCK_PAYMENTS[code] ?? [];
}

export function getApplicationAgent(code: string): AgentData {
  return APPLICATION_AGENTS[code] ?? DASH_AGENT_ALINE;
}

/** Total unread messages across all applications */
export function getTotalUnreadMessages(): number {
  return MOCK_DASHBOARD_APPLICATIONS.reduce((sum, a) => sum + a.unreadMessages, 0);
}

/** All PRX codes in the dashboard */
export const MOCK_DASHBOARD_CODES = MOCK_DASHBOARD_APPLICATIONS.map((a) => a.code);
