"use client";

import type { AxiosProgressEvent } from "axios";
import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  DocumentItem,
  DocumentListResponse,
  UpdateDocumentQcRequest,
} from "@/lib/api/types";

export function uploadDocument(
  code: string,
  requirementKey: string,
  file: File,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
): Promise<DocumentItem> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("requirement_key", requirementKey);

  return apiClient.post<ApiResponse<DocumentItem>, DocumentItem, FormData>(
    `/api/applications/${code}/documents`,
    formData,
    { onUploadProgress, timeout: 60_000 },
  );
}

export function listDocuments(code: string): Promise<DocumentListResponse> {
  return apiClient.get<ApiResponse<DocumentListResponse>, DocumentListResponse>(
    `/api/applications/${code}/documents`,
  );
}

export function downloadDocument(documentId: string, inline = false): Promise<Blob> {
  return apiClient.get<Blob, Blob>(`/api/documents/${documentId}`, {
    params: { inline },
    responseType: "blob",
  });
}

export function deleteDocument(code: string, documentId: string): Promise<null> {
  return apiClient.delete<ApiResponse<null>, null>(`/api/applications/${code}/documents/${documentId}`);
}

export function updateDocumentQc(
  caseCode: string,
  documentId: string,
  payload: UpdateDocumentQcRequest,
): Promise<DocumentItem> {
  return apiClient.patch<ApiResponse<DocumentItem>, DocumentItem, UpdateDocumentQcRequest>(
    `/api/agent/cases/${caseCode}/documents/${documentId}/qc`,
    payload,
  );
}

export function agentUploadDocument(
  caseCode: string,
  requirementKey: string,
  file: File,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
): Promise<DocumentItem> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("requirement_key", requirementKey);

  return apiClient.post<ApiResponse<DocumentItem>, DocumentItem, FormData>(
    `/api/agent/cases/${caseCode}/documents`,
    formData,
    { onUploadProgress, timeout: 60_000 },
  );
}
