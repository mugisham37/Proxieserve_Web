import type {
  DashboardUser,
  DashboardApplication,
  DashboardMessage,
  DashboardDocument,
  HistoryEntry,
  DashboardSummary,
  TrustedDevice,
  NotificationPrefs,
} from "@/lib/types/dashboard";

// ─── Mock User ────────────────────────────────────────────────────────────────

export const MOCK_USER: DashboardUser = {
  id: "usr_am001",
  fullName: "Aline Mukamana",
  firstName: "Aline",
  initials: "AM",
  email: "aline.m@example.com",
  phone: "+250 78 8 *** 456",
  nationalId: "1 1992 8 0042847 0 31",
  dateOfBirth: "14 March 1992",
  role: "CLIENT",
  location: "Kigali, Rwanda",
  city: "KIGALI",
  language: "en",
  isEmailVerified: true,
  lastSeen: null,
  createdAt: "2025-11-15T08:00:00Z",
};

// ─── Agents ───────────────────────────────────────────────────────────────────

const AGENT_ALINE = {
  name: "Aline Mukamana",
  shortName: "Aline M.",
  role: "Processing Agent",
  initials: "AM",
  isOnline: true,
  avgReplyMinutes: 60,
  casesHandled: 847,
  workingSince: "2022",
  languages: "EN, RW, FR",
  whatsappUrl: "https://wa.me/250788123456",
};

const AGENT_JEAN = {
  name: "Jean Nkurunziza",
  shortName: "Jean N.",
  role: "Senior Processing Agent",
  initials: "JN",
  isOnline: false,
  avgReplyMinutes: 24,
  casesHandled: 412,
  workingSince: "2023",
  languages: "EN, RW",
  whatsappUrl: "https://wa.me/250788000002",
};

// ─── Applications ─────────────────────────────────────────────────────────────

export const MOCK_APPLICATIONS: DashboardApplication[] = [
  // 1. Passport renewal — action-required (PRX-2026-00483)
  // Reference progress: 3 done, 1 active, 3 todo
  {
    code: "PRX-2026-00483",
    serviceName: "Passport renewal",
    serviceNameBase: "Passport",
    serviceNameItalic: "renewal",
    serviceSlug: "passport-application",
    category: "Identity & civil",
    status: "action-required",
    tier: "Standard",
    submittedAt: "19 May 2026",
    estimatedDate: "26 May",
    estimatedCompletion: "26 May 2026",
    serviceFee: 15000,
    governmentFee: 75000,
    paymentStatus: "unpaid",
    agent: AGENT_ALINE,
    progress: [
      { label: "Submitted", state: "done" },
      { label: "Reviewed", state: "done" },
      { label: "Documents", state: "done" },
      { label: "Processing", state: "active" },
      { label: "Authority", state: "todo" },
      { label: "Ready", state: "todo" },
      { label: "Collected", state: "todo" },
    ],
    headline: "Action required",
    subheadline:
      "Aline M. needs a clearer photo of your passport bio page — yours is too dark to read. Once you upload it, we'll keep going.",
    updatedAt: "2h ago",
    messageCount: 5,
    unreadMessageCount: 2,
    documentCount: 4,
  },

  // 2. Tax registration — in-progress (PRX-2026-00516)
  // Reference progress: 2 done, 1 active, 4 todo
  {
    code: "PRX-2026-00516",
    serviceName: "Tax registration",
    serviceNameBase: "Tax",
    serviceNameItalic: "registration",
    serviceSlug: "tin-registration",
    category: "Tax & revenue",
    status: "in-progress",
    tier: "Standard",
    submittedAt: "20 Apr 2026",
    estimatedDate: "28 May",
    estimatedCompletion: "28 May 2026",
    serviceFee: 12000,
    governmentFee: 0,
    paymentStatus: "paid",
    agent: AGENT_JEAN,
    progress: [
      { label: "Submitted", state: "done" },
      { label: "Reviewed", state: "done" },
      { label: "Documents", state: "active" },
      { label: "Processing", state: "todo" },
      { label: "Authority", state: "todo" },
      { label: "Ready", state: "todo" },
      { label: "Collected", state: "todo" },
    ],
    headline: "In progress",
    subheadline:
      "Your TIN application is being processed with the Rwanda Revenue Authority. We'll notify you of any updates.",
    updatedAt: "1 day ago",
    messageCount: 2,
    unreadMessageCount: 0,
    documentCount: 3,
  },

];

// ─── Recent messages (dashboard list) ────────────────────────────────────────

export const MOCK_MESSAGES: DashboardMessage[] = [
  {
    id: "msg_001",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "PASSPORT",
    senderType: "agent",
    senderName: "Aline M.",
    senderInitials: "AM",
    avatarVariant: "brand",
    timestamp: "Today, 09:14",
    timeAgo: "2h ago",
    body: "Hi Aline — your bio-page photo came out a bit dark. Could you retake it in better light?",
    isRead: false,
  },
  {
    id: "msg_002",
    applicationCode: "PRX-2026-00516",
    applicationLabel: "TAX",
    senderType: "agent",
    senderName: "Jean N.",
    senderInitials: "JN",
    avatarVariant: "ink",
    timestamp: "Yesterday",
    timeAgo: "Yesterday",
    body: "Submitted to RRA today. They confirm in 1-2 working days.",
    isRead: false,
  },
  {
    id: "msg_003",
    applicationCode: "PRX-2026-00412",
    applicationLabel: "SYSTEM",
    senderType: "system",
    senderName: "ProxiServe",
    senderInitials: "PS",
    avatarVariant: "system",
    timestamp: "2 days ago",
    timeAgo: "2 days ago",
    body: "Your Mutuelle application was completed.",
    isRead: true,
  },
];

// ─── Full thread for PRX-2026-00483 (matching reference exactly) ──────────────

export const MOCK_THREAD_00483: DashboardMessage[] = [
  {
    id: "t_001",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "SYSTEM",
    senderType: "system",
    senderName: "ProxiServe",
    senderInitials: "PS",
    avatarVariant: "system",
    timestamp: "19 MAY · APPLICATION CREATED",
    timeAgo: "19 May",
    body: "19 MAY · APPLICATION CREATED",
    isRead: true,
  },
  {
    id: "t_002",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "PASSPORT",
    senderType: "agent",
    senderName: "Aline Mukamana",
    senderInitials: "AM",
    avatarVariant: "brand",
    timestamp: "19 MAY · 16:08",
    timeAgo: "19 May",
    body: "Hi Aline 👋 I'm Aline M. — your assigned agent for this passport renewal. I've reviewed everything and your documents look good. I'll prepare the application for Immigration today.",
    isRead: true,
  },
  {
    id: "t_003",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "PASSPORT",
    senderType: "user",
    senderName: "You",
    senderInitials: "AM",
    avatarVariant: "brand",
    timestamp: "19 MAY · 18:22",
    timeAgo: "19 May",
    body: "Thank you Aline! Let me know if you need anything from me.",
    isRead: true,
  },
  {
    id: "t_004",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "SYSTEM",
    senderType: "system",
    senderName: "ProxiServe",
    senderInitials: "PS",
    avatarVariant: "system",
    timestamp: "20 MAY · STATUS → UNDER REVIEW",
    timeAgo: "20 May",
    body: "20 MAY · STATUS → UNDER REVIEW",
    isRead: true,
  },
  {
    id: "t_005",
    applicationCode: "PRX-2026-00483",
    applicationLabel: "PASSPORT",
    senderType: "agent",
    senderName: "Aline Mukamana",
    senderInitials: "AM",
    avatarVariant: "brand",
    timestamp: "2h AGO",
    timeAgo: "2h ago",
    body: "Hi Aline — your bio-page photo came out a bit dark. Could you retake it in better light and upload? You can replace it directly in the Documents tab. Once I have a clearer one I'll keep moving.",
    isRead: false,
  },
];

// ─── Documents (matching reference exactly) ───────────────────────────────────

export const MOCK_DOCUMENTS: DashboardDocument[] = [
  {
    id: "doc_001",
    applicationCode: "PRX-2026-00483",
    filename: "passport-bio-page.jpg",
    fileSize: 1200000,
    uploadedAt: "19 May",
    category: "photo",
    ext: "JPG",
    hasWarning: true,
    warningNote: "needs replacing",
    categoryLabel: "current passport",
    isRestricted: false,
  },
  {
    id: "doc_002",
    applicationCode: "PRX-2026-00483",
    filename: "national-id-front.jpg",
    fileSize: 980000,
    uploadedAt: "19 May",
    category: "id",
    ext: "JPG",
    hasWarning: false,
    categoryLabel: "national ID",
    isRestricted: false,
  },
  {
    id: "doc_003",
    applicationCode: "PRX-2026-00483",
    filename: "national-id-back.jpg",
    fileSize: 1200000,
    uploadedAt: "19 May",
    category: "id",
    ext: "JPG",
    hasWarning: false,
    categoryLabel: "national ID",
    isRestricted: false,
  },
  {
    id: "doc_004",
    applicationCode: "PRX-2026-00483",
    filename: "portrait-may-2026.jpg",
    fileSize: 2400000,
    uploadedAt: "19 May",
    category: "photo",
    ext: "JPG",
    hasWarning: false,
    categoryLabel: "passport photo",
    isRestricted: false,
  },
];

// ─── History ──────────────────────────────────────────────────────────────────

export const MOCK_HISTORY: HistoryEntry[] = [
  {
    code: "PRX-2026-00412",
    serviceName: "Mutuelle de Santé",
    serviceNameBase: "Mutuelle",
    serviceNameItalic: "de Santé",
    completedAt: "21 MAY",
    serviceFee: 6000,
    status: "completed",
  },
  {
    code: "PRX-2026-00194",
    serviceName: "National ID",
    serviceNameBase: "National",
    serviceNameItalic: "ID",
    completedAt: "04 APR",
    serviceFee: 8000,
    status: "completed",
  },
  {
    code: "PRX-2026-00057",
    serviceName: "Birth certificate",
    serviceNameBase: "Birth",
    serviceNameItalic: "certificate",
    completedAt: "19 FEB",
    serviceFee: 5000,
    status: "completed",
  },
];

// ─── Summary ──────────────────────────────────────────────────────────────────

export const MOCK_SUMMARY: DashboardSummary = {
  unreadCount: 2,
  actionCount: 1,
  activeCount: 2,
  completedCount: 3,
  docCount: 14,
  docSizeMB: 18,
  avgTurnaround: 5,
};

// ─── Trusted devices ──────────────────────────────────────────────────────────

export const MOCK_TRUSTED_DEVICES: TrustedDevice[] = [
  {
    id: "dev_001",
    name: "iPhone 12",
    browser: "Safari",
    os: "iOS 17",
    location: "Kigali, Rwanda",
    lastUsed: "Today",
    isCurrent: true,
  },
  {
    id: "dev_002",
    name: "Chrome",
    browser: "Chrome",
    os: "Windows",
    location: "Kigali, Rwanda",
    lastUsed: "3 days ago",
    isCurrent: false,
  },
  {
    id: "dev_003",
    name: "Android Chrome",
    browser: "Chrome",
    os: "Android 14",
    location: "Musanze, Rwanda",
    lastUsed: "2 weeks ago",
    isCurrent: false,
  },
];

// ─── Notification prefs ───────────────────────────────────────────────────────

export const MOCK_NOTIF_PREFS: NotificationPrefs = {
  whatsapp: true,
  sms: true,
  email: false,
  tips: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getApplicationByCode(code: string): DashboardApplication | undefined {
  return MOCK_APPLICATIONS.find((a) => a.code === code);
}

export function getMessagesByCode(code: string): DashboardMessage[] {
  if (code === "PRX-2026-00483") return MOCK_THREAD_00483;
  return [];
}

export function getDocumentsByCode(code: string): DashboardDocument[] {
  return MOCK_DOCUMENTS.filter((d) => d.applicationCode === code);
}

export const STATUS_STRIP_COLOR: Record<string, string> = {
  "action-required": "var(--warn)",
  "in-progress": "var(--brand)",
  completed: "var(--ok)",
  discontinued: "var(--cream-2)",
  "on-hold": "var(--warn)",
};

export const STATUS_LABEL: Record<string, string> = {
  "action-required": "Action required",
  "in-progress": "In progress",
  completed: "Completed",
  discontinued: "Discontinued",
  "on-hold": "On hold",
};

export function formatFee(amount: number): string {
  return `RWF ${amount.toLocaleString()}`;
}

export function formatFeeShort(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `RWF ${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return `RWF ${amount}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1000)} KB`;
}

export function getTodayLabel(): string {
  return new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

// Badge count = active + completed (matches reference sidenav badge of 3)
export const TOTAL_APP_COUNT = MOCK_APPLICATIONS.length + 1; // 2 active + 1 most recent completed
