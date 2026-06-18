export const DRAFT_SCHEMA_VERSION = 1;

export const DRAFT_KEY = (slug: string) => `proxi:draft:${slug}`;
export const SUBMITTED_KEY = (idempotencyKey: string) => `proxi:submitted:${idempotencyKey}`;

export interface DocumentFile {
  fileName: string;
  fileSize: number;
  mimeType: string;
  dataUrl?: string;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number;
  errorMessage?: string;
}

export interface ApplicationDraft {
  slug: string;
  schemaVersion: number;
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
  highestStepReached: number;
  personal: {
    fullName: string;
    nationalId: string;
    dob: string;
    phone: string;
    whatsapp: boolean;
    email: string;
    language: "en" | "rw" | "fr";
    consent: boolean;
  };
  serviceConfig: Record<string, string | boolean | string[]>;
  documents: Record<string, DocumentFile[]>;
  selectedTier: string;
  consents: {
    accuracy: boolean;
    terms: boolean;
  };
}

export function createDraft(slug: string): ApplicationDraft {
  return {
    slug,
    schemaVersion: DRAFT_SCHEMA_VERSION,
    idempotencyKey: generateUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    highestStepReached: 0,
    personal: {
      fullName: "",
      nationalId: "",
      dob: "",
      phone: "",
      whatsapp: true,
      email: "",
      language: "en",
      consent: false,
    },
    serviceConfig: {},
    documents: {},
    selectedTier: "standard",
    consents: { accuracy: false, terms: false },
  };
}

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export interface WizUiState {
  saveStatus: "idle" | "saving" | "saved";
  validationErrors: Record<string, string>;
  showValidationBanner: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  isDuplicateSubmit: boolean;
  isOffline: boolean;
  multiTabConflict: boolean;
  schemaMigrationRequired: boolean;
  migrationChanges?: { added: string[]; changed: string[]; removed: string[] };
  draftExpiryWarning: boolean;
  resumeBannerDismissed: boolean;
  serviceArchived: boolean;
  photoWarnKey: string | null;
  confirmedCode: string | null;
}

export const INITIAL_UI_STATE: WizUiState = {
  saveStatus: "idle",
  validationErrors: {},
  showValidationBanner: false,
  isSubmitting: false,
  submitError: null,
  isDuplicateSubmit: false,
  isOffline: false,
  multiTabConflict: false,
  schemaMigrationRequired: false,
  draftExpiryWarning: false,
  resumeBannerDismissed: false,
  serviceArchived: false,
  photoWarnKey: null,
  confirmedCode: null,
};

export const DRAFT_EXPIRY_HOURS = 24;
export const DRAFT_WARN_HOURS = 20;
