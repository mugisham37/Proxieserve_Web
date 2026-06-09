"use client";

import { apiClient } from "@/lib/api/client";
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
  return apiClient.post<ApiResponse<AuthFlowData>, AuthFlowData, SignupRequest>("/api/auth/signup", data);
}

export function login(data: LoginRequest): Promise<AuthFlowData> {
  return apiClient.post<ApiResponse<AuthFlowData>, AuthFlowData, LoginRequest>("/api/auth/login", data);
}

export function verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData, VerifyOtpRequest>("/api/auth/verify-otp", data);
}

export function resendOtp(): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData>("/api/auth/resend-otp");
}

export function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordData> {
  return apiClient.post<ApiResponse<ForgotPasswordData>, ForgotPasswordData, ForgotPasswordRequest>(
    "/api/auth/forgot-password",
    data,
  );
}

export function resetPassword(data: ResetPasswordRequest): Promise<VerifyOtpData> {
  return apiClient.post<ApiResponse<VerifyOtpData>, VerifyOtpData, ResetPasswordRequest>(
    "/api/auth/reset-password",
    data,
  );
}

export function signOut(): Promise<SignOutData> {
  return apiClient.post<ApiResponse<SignOutData>, SignOutData>("/api/auth/sign-out");
}

export function getSession(): Promise<SessionResponse> {
  return apiClient.get<ApiResponse<SessionResponse>, SessionResponse>("/api/auth/session");
}

export function staffLogin(data: StaffLoginRequest): Promise<StaffLoginData> {
  return apiClient.post<ApiResponse<StaffLoginData>, StaffLoginData, StaffLoginRequest>(
    "/api/auth/staff/login",
    data,
  );
}

export function staffTwoFactor(data: StaffTwoFactorRequest): Promise<SessionResponse> {
  return apiClient.post<ApiResponse<SessionResponse>, SessionResponse, StaffTwoFactorRequest>(
    "/api/auth/staff/2fa",
    data,
  );
}
