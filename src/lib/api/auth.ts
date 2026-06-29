"use client";

import {
  apiClient,
  AUTH_MUTATION_TIMEOUT_MS,
  AUTH_SESSION_TIMEOUT_MS,
} from "@/lib/api/client";
import type {
  ApiResponse,
  AuthFlowData,
  ForgotPasswordData,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SessionResponse,
  SignOutData,
  SignupRequest,
  StaffLoginData,
  StaffLoginRequest,
  StaffTwoFactorRequest,
  VerifyOtpData,
  VerifyOtpRequest,
} from "@/lib/api/types";

export function signup(data: SignupRequest): Promise<AuthFlowData> {
  return apiClient.post<ApiResponse<AuthFlowData>, AuthFlowData, SignupRequest>(
    "/api/auth/signup",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function login(data: LoginRequest): Promise<AuthFlowData> {
  return apiClient.post<ApiResponse<AuthFlowData>, AuthFlowData, LoginRequest>(
    "/api/auth/login",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData, VerifyOtpRequest>(
    "/api/auth/verify-otp",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function resendOtp(): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData>(
    "/api/auth/resend-otp",
    undefined,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordData> {
  return apiClient.post<ApiResponse<ForgotPasswordData>, ForgotPasswordData, ForgotPasswordRequest>(
    "/api/auth/forgot-password",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function resetPassword(data: ResetPasswordRequest): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData, ResetPasswordRequest>(
    "/api/auth/reset-password",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function signOut(): Promise<SignOutData> {
  return apiClient.post<ApiResponse<SignOutData>, SignOutData>("/api/auth/sign-out");
}

export function getSession(): Promise<SessionResponse> {
  return apiClient.get<ApiResponse<SessionResponse>, SessionResponse>("/api/auth/session", {
    timeout: AUTH_SESSION_TIMEOUT_MS,
  });
}

export function staffLogin(data: StaffLoginRequest): Promise<StaffLoginData> {
  return apiClient.post<ApiResponse<StaffLoginData>, StaffLoginData, StaffLoginRequest>(
    "/api/auth/staff/login",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}

export function staffTwoFactor(data: StaffTwoFactorRequest): Promise<SessionResponse> {
  return apiClient.post<ApiResponse<SessionResponse>, SessionResponse, StaffTwoFactorRequest>(
    "/api/auth/staff/2fa",
    data,
    { timeout: AUTH_MUTATION_TIMEOUT_MS },
  );
}
