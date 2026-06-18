"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createService,
  getAdminServiceBySlug,
  getAdminServices,
  getServiceBySlug,
  getServices,
  setDocumentRequirements,
  setFormFields,
  setServiceSteps,
  updatePricingTier,
  updateService,
  updateServiceStatus,
} from "@/lib/api/services";
import type {
  CreateServiceRequest,
  DocumentRequirementInput,
  FormFieldInput,
  ServiceStepInput,
  UpdatePricingTierRequest,
  UpdateServiceRequest,
} from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useServices() {
  return useQuery({
    queryKey: [...QK.services],
    queryFn: getServices,
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: [...QK.service(slug)],
    queryFn: () => getServiceBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useAdminServices() {
  return useQuery({
    queryKey: [...QK.adminServices],
    queryFn: getAdminServices,
  });
}

export function useAdminService(slug: string) {
  return useQuery({
    queryKey: [...QK.adminService(slug)],
    queryFn: () => getAdminServiceBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateServiceRequest) => createService(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminServices] });
      void queryClient.invalidateQueries({ queryKey: [...QK.services] });
    },
  });
}

export function useUpdateService(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateServiceRequest) => updateService(slug, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminServices] });
    },
  });
}

export function useSetServiceSteps(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (steps: ServiceStepInput[]) => setServiceSteps(slug, steps),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
    },
  });
}

export function useSetDocumentRequirements(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requirements: DocumentRequirementInput[]) => setDocumentRequirements(slug, requirements),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
    },
  });
}

export function useSetFormFields(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fields: FormFieldInput[]) => setFormFields(slug, fields),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
    },
  });
}

export function useUpdatePricingTier(slug: string, tier: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePricingTierRequest) => updatePricingTier(slug, tier, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminServices] });
    },
  });
}

export function useUpdateServiceStatus(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) => updateServiceStatus(slug, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminService(slug)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.adminServices] });
      void queryClient.invalidateQueries({ queryKey: [...QK.services] });
    },
  });
}
