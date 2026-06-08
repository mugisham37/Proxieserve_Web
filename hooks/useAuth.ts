"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  forgotPassword as forgotPasswordRequest,
  login as loginRequest,
  resendOtp as resendOtpRequest,
  resetPassword as resetPasswordRequest,
  signOut as signOutRequest,
  signup as signupRequest,
  staffLogin as staffLoginRequest,
  staffTwoFactor as staffTwoFactorRequest,
  verifyOtp as verifyOtpRequest,
} from "@/lib/api/auth";
import { claimApplication } from "@/lib/api/applications";
import {
  ApiError,
  isAccountLockedData,
  isApiError,
  type ApplicationClaimRequest,
  type ForgotPasswordRequest,
  type LoginRequest,
  type ResetPasswordRequest,
  type SessionData,
  type SignupRequest,
  type StaffLoginRequest,
  type StaffTwoFactorRequest,
  type VerifyOtpRequest,
} from "@/lib/api/types";
import { useAuth } from "@/lib/auth-context";
import { AUTH_SESSION_KEY, AUTH_VERIFIED_KEY, SESSION_QUERY_KEY, STAFF_PRE_2FA_KEY } from "@/lib/auth-types";
import { removeItem } from "@/lib/storage";

function buildVerifyUrl(maskedEmail: string, nextPath: string): string {
  const params = new URLSearchParams({
    email: maskedEmail,
    next: nextPath,
  });

  return `/verify?${params.toString()}`;
}

function useSessionSync() {
  const queryClient = useQueryClient();
  const { dispatch, setUiState } = useAuth();

  const syncSession = React.useCallback(
    (session: SessionData) => {
      dispatch({ type: "SET_SESSION", payload: session });
      dispatch({ type: "RESET_UI" });
      queryClient.setQueryData([...SESSION_QUERY_KEY], session);
    },
    [dispatch, queryClient],
  );

  const clearSession = React.useCallback(() => {
    dispatch({ type: "CLEAR_SESSION" });
    dispatch({ type: "RESET_UI" });
    queryClient.setQueryData([...SESSION_QUERY_KEY], null);
    removeItem(AUTH_SESSION_KEY);
    removeItem(AUTH_VERIFIED_KEY);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STAFF_PRE_2FA_KEY);
    }
  }, [dispatch, queryClient]);

  return { clearSession, queryClient, setUiState, syncSession };
}

export function useSignup() {
  const router = useRouter();
  const { syncSession } = useSessionSync();

  return useMutation({
    mutationFn: (payload: SignupRequest) => signupRequest(payload),
    onSuccess: (data) => {
      syncSession(data.session);
      router.push(buildVerifyUrl(data.maskedEmail, "/"));
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUiState, syncSession } = useSessionSync();

  return useMutation({
    mutationFn: (payload: LoginRequest) => loginRequest(payload),
    onSuccess: (data) => {
      syncSession(data.session);

      const nextPath = searchParams.get("next") ?? "/dashboard";
      if (!data.session.isEmailVerified) {
        router.push(buildVerifyUrl(data.maskedEmail, nextPath));
        return;
      }

      router.push(nextPath);
    },
    onError: (error) => {
      if (isApiError(error) && error.errorType === "account-locked" && isAccountLockedData(error.data)) {
        setUiState({
          errorType: error.errorType,
          lockoutUntil: error.data.lockoutUntil,
          submitError: error.message,
        });
      }
    },
  });
}

export function useVerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { dispatch } = useAuth();

  return useMutation({
    mutationFn: (payload: VerifyOtpRequest) => verifyOtpRequest(payload),
    onSuccess: () => {
      dispatch({ type: "SET_EMAIL_VERIFIED" });
      queryClient.setQueryData([...SESSION_QUERY_KEY], (current) => {
        if (!current) {
          return current;
        }

        return { ...current, isEmailVerified: true };
      });
      router.push(searchParams.get("next") ?? "/");
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtpRequest,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => forgotPasswordRequest(payload),
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetPasswordRequest(payload),
    onSuccess: () => {
      router.push("/login?reset=success");
    },
  });
}

export function useSignOut() {
  const router = useRouter();
  const { clearSession } = useSessionSync();

  return useMutation({
    mutationFn: signOutRequest,
    onSettled: () => {
      clearSession();
      router.push("/login");
    },
  });
}

export function useStaffLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: StaffLoginRequest) => staffLoginRequest(payload),
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STAFF_PRE_2FA_KEY, data.pre2faToken);
      }

      router.push("/staff/2fa");
    },
  });
}

type StaffTwoFactorFormRequest = Omit<StaffTwoFactorRequest, "pre2faToken">;

export function useStaffTwoFactor() {
  const router = useRouter();
  const { syncSession } = useSessionSync();

  return useMutation({
    mutationFn: async (payload: StaffTwoFactorFormRequest) => {
      const pre2faToken = typeof window === "undefined" ? null : sessionStorage.getItem(STAFF_PRE_2FA_KEY);

      if (!pre2faToken) {
        throw new ApiError("Your sign-in session has expired. Please start again.", "otp-expired", 410);
      }

      return staffTwoFactorRequest({
        ...payload,
        pre2faToken,
      });
    },
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STAFF_PRE_2FA_KEY);
      }

      syncSession(data.session);
      router.push("/");
    },
    onError: (error) => {
      if (isApiError(error) && error.errorType === "otp-expired") {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(STAFF_PRE_2FA_KEY);
        }
        router.replace("/staff/login?error=expired");
      }
    },
  });
}

export function useClaimApplication() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ApplicationClaimRequest) => claimApplication(payload),
    onSuccess: () => {
      router.push("/login?claimed=1");
    },
  });
}
