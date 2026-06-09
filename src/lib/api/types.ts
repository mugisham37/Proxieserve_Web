"use client";

export type AuthRole = "client" | "staff:agent" | "staff:admin";
export type AuthLanguage = "en" | "rw" | "fr";
export type IdentifierType = "email" | "phone";
export type StaffRole = "agent" | "admin";
export type TwoFAMethod = "totp" | "sms" | "backup";

export type ApiErrorType =
  | "invalid-credentials"
  | "account-locked"
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
