"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosProgressEvent } from "axios";
import {
  agentUploadDocument,
  deleteDocument,
  listDocuments,
  updateDocumentQc,
  uploadDocument,
} from "@/lib/api/documents";
import type { UpdateDocumentQcRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useDocuments(code: string) {
  return useQuery({
    queryKey: [...QK.documents(code)],
    queryFn: () => listDocuments(code),
    enabled: Boolean(code),
  });
}

export function useUploadDocument(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      requirementKey,
      onUploadProgress,
    }: {
      file: File;
      requirementKey: string;
      onUploadProgress?: (event: AxiosProgressEvent) => void;
    }) => uploadDocument(code, requirementKey, file, onUploadProgress),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.documents(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.application(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(code)] });
    },
  });
}

export function useDeleteDocument(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) => deleteDocument(code, documentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.documents(code)] });
    },
  });
}

export function useUpdateDocumentQc(caseCode: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, payload }: { documentId: string; payload: UpdateDocumentQcRequest }) =>
      updateDocumentQc(caseCode, documentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.documents(caseCode)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(caseCode)] });
    },
  });
}

export function useAgentUploadDocument(caseCode: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      requirementKey,
      onUploadProgress,
    }: {
      file: File;
      requirementKey: string;
      onUploadProgress?: (event: AxiosProgressEvent) => void;
    }) => agentUploadDocument(caseCode, requirementKey, file, onUploadProgress),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.documents(caseCode)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(caseCode)] });
    },
  });
}
