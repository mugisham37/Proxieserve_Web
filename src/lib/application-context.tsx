"use client";

import * as React from "react";
import {
  type ApplicationDraft,
  type WizUiState,
  type DocumentFile,
  INITIAL_UI_STATE,
  DRAFT_SCHEMA_VERSION,
  DRAFT_KEY,
  DRAFT_WARN_HOURS,
  createDraft,
} from "./application-types";

/* ─── Actions ─── */

type ApplicationAction =
  | { type: "PATCH_PERSONAL"; payload: Partial<ApplicationDraft["personal"]> }
  | { type: "PATCH_SERVICE_CONFIG"; payload: Record<string, string | boolean | string[]> }
  | { type: "PATCH_DOCUMENT"; payload: { key: string; files: DocumentFile[] } }
  | { type: "REMOVE_DOCUMENT"; payload: { key: string; index: number } }
  | { type: "PATCH_CONSENTS"; payload: Partial<ApplicationDraft["consents"]> }
  | { type: "SET_HIGHEST_STEP"; payload: number }
  | { type: "HYDRATE"; payload: ApplicationDraft }
  | { type: "RESET"; payload: { slug: string } };

function reducer(draft: ApplicationDraft, action: ApplicationAction): ApplicationDraft {
  const now = new Date().toISOString();
  switch (action.type) {
    case "PATCH_PERSONAL":
      return { ...draft, personal: { ...draft.personal, ...action.payload }, updatedAt: now };
    case "PATCH_SERVICE_CONFIG":
      return { ...draft, serviceConfig: { ...draft.serviceConfig, ...action.payload }, updatedAt: now };
    case "PATCH_DOCUMENT": {
      return { ...draft, documents: { ...draft.documents, [action.payload.key]: action.payload.files }, updatedAt: now };
    }
    case "REMOVE_DOCUMENT": {
      const existing = draft.documents[action.payload.key] ?? [];
      return {
        ...draft,
        documents: {
          ...draft.documents,
          [action.payload.key]: existing.filter((_, i) => i !== action.payload.index),
        },
        updatedAt: now,
      };
    }
    case "PATCH_CONSENTS":
      return { ...draft, consents: { ...draft.consents, ...action.payload }, updatedAt: now };
    case "SET_HIGHEST_STEP":
      return action.payload > draft.highestStepReached
        ? { ...draft, highestStepReached: action.payload, updatedAt: now }
        : draft;
    case "HYDRATE":
      return action.payload;
    case "RESET":
      return createDraft(action.payload.slug);
    default:
      return draft;
  }
}

/* ─── Context ─── */

interface ApplicationContextValue {
  draft: ApplicationDraft;
  dispatch: React.Dispatch<ApplicationAction>;
  uiState: WizUiState;
  setUiState: React.Dispatch<React.SetStateAction<WizUiState>>;
  isHydrated: boolean;
  stagedFiles: Record<string, File[]>;
  setStagedFiles: React.Dispatch<React.SetStateAction<Record<string, File[]>>>;
}

const ApplicationContext = React.createContext<ApplicationContextValue | null>(null);

export function useApplication() {
  const ctx = React.useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplication must be used within ApplicationProvider");
  return ctx;
}

/* ─── Provider ─── */

interface ApplicationProviderProps {
  slug: string;
  children: React.ReactNode;
}

export function ApplicationProvider({ slug, children }: ApplicationProviderProps) {
  const [draft, dispatch] = React.useReducer(reducer, createDraft(slug));
  const [uiState, setUiState] = React.useState<WizUiState>(INITIAL_UI_STATE);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [stagedFiles, setStagedFiles] = React.useState<Record<string, File[]>>({});
  const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const channelRef = React.useRef<BroadcastChannel | null>(null);
  const isFirstDispatch = React.useRef(true);

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY(slug));
    if (raw) {
      try {
        const saved: ApplicationDraft = JSON.parse(raw);
        if (saved.schemaVersion !== DRAFT_SCHEMA_VERSION) {
          setUiState((s) => ({
            ...s,
            schemaMigrationRequired: true,
            migrationChanges: { added: ["policeRef (step 2)"], changed: [], removed: [] },
          }));
        } else {
          dispatch({ type: "HYDRATE", payload: saved });
          // Check draft expiry
          const createdAt = new Date(saved.createdAt).getTime();
          const hoursOld = (Date.now() - createdAt) / 1000 / 3600;
          if (hoursOld >= DRAFT_WARN_HOURS) {
            setUiState((s) => ({ ...s, draftExpiryWarning: true }));
          }
        }
      } catch {
        // corrupt draft — ignore
      }
    }
    setIsHydrated(true);
  }, [slug]);

  // Auto-save with 1.5s debounce
  React.useEffect(() => {
    if (!isHydrated) return;
    if (isFirstDispatch.current) {
      isFirstDispatch.current = false;
      return;
    }
    setUiState((s) => ({ ...s, saveStatus: "saving" }));
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY(slug), JSON.stringify(draft));
        // Broadcast to other tabs
        channelRef.current?.postMessage({ type: "DRAFT_UPDATED", slug });
      } catch {
        // storage full — ignore
      }
      setUiState((s) => ({ ...s, saveStatus: "saved" }));
      setTimeout(() => setUiState((s) => ({ ...s, saveStatus: "idle" })), 3000);
    }, 1500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [draft, isHydrated, slug]);

  // Multi-tab BroadcastChannel
  React.useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel("proxi:application");
    channelRef.current = channel;
    channel.onmessage = (e) => {
      if (e.data?.type === "DRAFT_UPDATED" && e.data?.slug === slug) {
        setUiState((s) => ({ ...s, multiTabConflict: true }));
      }
    };
    return () => channel.close();
  }, [slug]);

  // Online / offline detection
  React.useEffect(() => {
    const handleOffline = () => setUiState((s) => ({ ...s, isOffline: true }));
    const handleOnline = () => setUiState((s) => ({ ...s, isOffline: false }));
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    setUiState((s) => ({ ...s, isOffline: !navigator.onLine }));
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Draft expiry interval check (every 60s)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const hoursOld = (Date.now() - new Date(draft.createdAt).getTime()) / 1000 / 3600;
      if (hoursOld >= DRAFT_WARN_HOURS) {
        setUiState((s) => ({ ...s, draftExpiryWarning: true }));
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [draft.createdAt]);

  return (
    <ApplicationContext.Provider
      value={{ draft, dispatch, uiState, setUiState, isHydrated, stagedFiles, setStagedFiles }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
