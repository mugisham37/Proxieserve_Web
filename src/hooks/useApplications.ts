"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignApplication,
  autoAssignApplication,
  cancelApplication,
  getAdminApplicationDetail,
  getAdminApplications,
  getApplicationDetail,
  getApplications,
  getApplicationSummary,
  getTrackerInfo,
  submitApplication,
  updateAdminApplicationStatus,
  updateCaseStatus,
} from "@/lib/api/applications";
import type { AdminApplicationsFilter, SubmitApplicationRequest, UpdateStatusRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useApplications() {
  return useQuery({
    queryKey: [...QK.applications],
    queryFn: getApplications,
  });
}

export function useApplicationSummary() {
  return useQuery({
    queryKey: [...QK.applicationSummary],
    queryFn: getApplicationSummary,
  });
}

export function useApplication(code: string) {
  return useQuery({
    queryKey: [...QK.application(code)],
    queryFn: () => getApplicationDetail(code),
    enabled: Boolean(code),
  });
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SubmitApplicationRequest) => submitApplication(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.applications] });
      void queryClient.invalidateQueries({ queryKey: [...QK.applicationSummary] });
    },
  });
}

export function useCancelApplication(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason?: string) => cancelApplication(code, reason),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.application(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.applications] });
      void queryClient.invalidateQueries({ queryKey: [...QK.applicationSummary] });
    },
  });
}

export function useTrackerLookup(code: string) {
  return useQuery({
    queryKey: [...QK.tracker(code)],
    queryFn: () => getTrackerInfo(code),
    enabled: Boolean(code),
    retry: false,
  });
}

export function useAdminApplications(filters?: AdminApplicationsFilter) {
  return useQuery({
    queryKey: [...QK.adminApplications(filters)],
    queryFn: () => getAdminApplications(filters),
  });
}

export function useAdminApplication(code: string) {
  return useQuery({
    queryKey: [...QK.adminApplication(code)],
    queryFn: () => getAdminApplicationDetail(code),
    enabled: Boolean(code),
  });
}

export function useAssignApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, agentId, note }: { code: string; agentId: string; note?: string }) =>
      assignApplication(code, agentId, note),
    onSuccess: (_data, { code }) => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplications()] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplication(code)] });
    },
  });
}

export function useAutoAssignApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => autoAssignApplication(code),
    onSuccess: (_data, code) => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplications()] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplication(code)] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, payload, scope }: { code: string; payload: UpdateStatusRequest; scope: "admin" | "agent" }) =>
      scope === "admin" ? updateAdminApplicationStatus(code, payload) : updateCaseStatus(code, payload),
    onSuccess: (_data, { code }) => {
      void queryClient.invalidateQueries({ queryKey: [...QK.application(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplication(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCases] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminApplications()] });
    },
  });
}
