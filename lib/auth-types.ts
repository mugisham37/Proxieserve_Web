// ---------------------------------------------------------------------------
// Flow 4 — Auth: Types, session keys, UI state
// ---------------------------------------------------------------------------

export type AuthRole = "client" | "staff:agent" | "staff:admin";
export type AuthLanguage = "en" | "rw" | "fr";

export type AuthErrorType =
  | "invalid-credentials"
  | "account-locked"
  | "account-exists"
  | "otp-wrong"
  | "otp-expired"
  | "new-device"
  | "reset-expired"
  | "reset-sent"
  | "claim-not-found"
  | null;

// ---------------------------------------------------------------------------
// Session stored in localStorage
// ---------------------------------------------------------------------------
export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: AuthRole;
  isEmailVerified: boolean;
  language: AuthLanguage;
  createdAt: string; // ISO
}

// ---------------------------------------------------------------------------
// Transient UI state (not persisted)
// ---------------------------------------------------------------------------
export interface AuthUiState {
  isLoading: boolean;
  submitError: string | null;
  errorType: AuthErrorType;
  lockoutUntil: string | null; // ISO — when lockout expires
  lockoutAttempts: number;
  otpAttemptsRemaining: number; // 3 max
  otpExpired: boolean;
  resetLinkSent: boolean;
  emailSent: string | null; // masked email for display
  showEmailVerifyBanner: boolean;
  claimFoundService: string | null; // service name when PRX code resolves
}

export const INITIAL_AUTH_UI_STATE: AuthUiState = {
  isLoading: false,
  submitError: null,
  errorType: null,
  lockoutUntil: null,
  lockoutAttempts: 0,
  otpAttemptsRemaining: 3,
  otpExpired: false,
  resetLinkSent: false,
  emailSent: null,
  showEmailVerifyBanner: false,
  claimFoundService: null,
};

// ---------------------------------------------------------------------------
// localStorage keys
// ---------------------------------------------------------------------------
export const AUTH_SESSION_KEY = "proxi:auth:session";
export const AUTH_VERIFIED_KEY = "proxi:auth:verified";
export const AUTH_LOCKOUT_KEY = "proxi:auth:lockout";
export const AUTH_RESET_TOKEN_KEY = "proxi:auth:resetToken";
export const AUTH_TRUSTED_DEVICES_KEY = "proxi:auth:trustedDevices";

// ---------------------------------------------------------------------------
// Mock test values that trigger specific states
// ---------------------------------------------------------------------------
export const MOCK = {
  EXISTING_EMAIL: "test@exists.rw",
  LOCKED_EMAIL: "locked@test.rw",
  VALID_OTP: "123456",
  VALID_PRX: "PRX-2026-00483",
  VALID_RESET_TOKEN: "valid-token-abc",
} as const;
