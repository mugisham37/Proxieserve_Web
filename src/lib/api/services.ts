"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  CreateServiceRequest,
  CreateServiceResponse,
  DocumentRequirementInput,
  FormFieldInput,
  ServiceDetail,
  ServiceListResponse,
  ServiceStepInput,
  UpdatePricingTierRequest,
  UpdateServiceRequest,
} from "@/lib/api/types";

export function getServices(): Promise<ServiceListResponse> {
  return apiClient.get<ApiResponse<ServiceListResponse>, ServiceListResponse>("/api/services");
}

export function getServiceBySlug(slug: string): Promise<ServiceDetail> {
  return apiClient.get<ApiResponse<ServiceDetail>, ServiceDetail>(`/api/services/${slug}`);
}

export function getAdminServices(): Promise<ServiceListResponse> {
  return apiClient.get<ApiResponse<ServiceListResponse>, ServiceListResponse>("/api/admin/services");
}

export function getAdminServiceBySlug(slug: string): Promise<ServiceDetail> {
  return apiClient.get<ApiResponse<ServiceDetail>, ServiceDetail>(`/api/admin/services/${slug}`);
}

export function createService(payload: CreateServiceRequest): Promise<CreateServiceResponse> {
  return apiClient.post<ApiResponse<CreateServiceResponse>, CreateServiceResponse, CreateServiceRequest>(
    "/api/admin/services",
    payload,
  );
}

export function updateService(slug: string, payload: UpdateServiceRequest): Promise<ServiceDetail> {
  return apiClient.patch<ApiResponse<ServiceDetail>, ServiceDetail, UpdateServiceRequest>(
    `/api/admin/services/${slug}`,
    payload,
  );
}

export function setServiceSteps(slug: string, steps: ServiceStepInput[]): Promise<ServiceDetail> {
  return apiClient.post<ApiResponse<ServiceDetail>, ServiceDetail, ServiceStepInput[]>(
    `/api/admin/services/${slug}/steps`,
    steps,
  );
}

export function setDocumentRequirements(
  slug: string,
  requirements: DocumentRequirementInput[],
): Promise<ServiceDetail> {
  return apiClient.post<ApiResponse<ServiceDetail>, ServiceDetail, DocumentRequirementInput[]>(
    `/api/admin/services/${slug}/document-requirements`,
    requirements,
  );
}

export function setFormFields(slug: string, fields: FormFieldInput[]): Promise<ServiceDetail> {
  return apiClient.post<ApiResponse<ServiceDetail>, ServiceDetail, FormFieldInput[]>(
    `/api/admin/services/${slug}/form-fields`,
    fields,
  );
}

export function updatePricingTier(
  slug: string,
  tier: string,
  payload: UpdatePricingTierRequest,
): Promise<ServiceDetail> {
  return apiClient.patch<ApiResponse<ServiceDetail>, ServiceDetail, UpdatePricingTierRequest>(
    `/api/admin/services/${slug}/pricing/${tier}`,
    payload,
  );
}

export function updateServiceStatus(slug: string, status: string): Promise<ServiceDetail> {
  return apiClient.patch<ApiResponse<ServiceDetail>, ServiceDetail, { status: string }>(
    `/api/admin/services/${slug}/status`,
    { status },
  );
}
