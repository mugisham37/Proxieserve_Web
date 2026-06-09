import type { ApiErrorType, AuthLanguage, AuthRole, SessionData } from "@/lib/api/types";

export type AuthErrorType = ApiErrorType | "new-device" | "reset-sent" | null;
export type AuthSession = SessionData;

export interface AuthUiState {
  isLoading: boolean;
  submitError: string | null;
  errorType: AuthErrorType;
  lockoutUntil: string | null;
  lockoutAttempts: number;
  otpAttemptsRemaining: number;
  otpExpired: boolean;
  resetLinkSent: boolean;
  emailSent: string | null;
  showEmailVerifyBanner: boolean;
  claimFoundService: string | null;
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

export const AUTH_SESSION_KEY = "proxi:auth:session";
export const AUTH_VERIFIED_KEY = "proxi:auth:verified";
export const STAFF_PRE_2FA_KEY = "proxi:staff:pre2fa";
export const SESSION_QUERY_KEY = ["session"] as const;

export type { AuthLanguage, AuthRole };
