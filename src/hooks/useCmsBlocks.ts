import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
  fetchAllCmsBlocks,
  fetchCmsAdminAccess,
  fetchCmsMediaAssetBySlug,
  fetchCmsBlockRevisions,
  fetchCmsBlocksByPage,
  fetchCmsMediaAssets,
  requestCmsSignIn,
  signOutCms,
  uploadCmsMediaFile,
  upsertCmsBlock,
  upsertCmsMediaAsset,
} from "@/lib/cms/services";
import { hasCmsPreviewFlag, shouldUseCmsDraftPreview } from "@/lib/cms/previewUtils";
import type { CmsBlockInput, CmsMediaAssetInput, CmsMediaUploadInput } from "@/lib/cms/types";

export function useCmsPreviewMode() {
  const location = useLocation();
  const { data: adminAccess } = useCmsAdminAccess();
  const canEdit = adminAccess?.canEdit ?? false;
  const previewRequested = hasCmsPreviewFlag(location.search);
  const previewEnabled = shouldUseCmsDraftPreview(location.search, canEdit);

  return {
    canEdit,
    previewRequested,
    previewEnabled,
  };
}

export function useCmsBlocksByPage(pageSlug: string) {
  const { previewEnabled } = useCmsPreviewMode();

  return useQuery({
    queryKey: ["cms", "blocks", pageSlug, previewEnabled ? "preview" : "published"],
    queryFn: () => fetchCmsBlocksByPage(pageSlug, { includeDraft: previewEnabled }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useCmsAllBlocks() {
  return useQuery({
    queryKey: ["cms", "blocks", "all"],
    queryFn: fetchAllCmsBlocks,
    staleTime: 1000 * 30,
    retry: 1,
  });
}

export function useUpsertCmsBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CmsBlockInput) => upsertCmsBlock(input),
    onSuccess: (savedBlock) => {
      queryClient.invalidateQueries({ queryKey: ["cms", "blocks", "all"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "blocks", savedBlock.page_slug] });
    },
  });
}

export function useCmsAdminAccess() {
  return useQuery({
    queryKey: ["cms", "admin-access"],
    queryFn: fetchCmsAdminAccess,
    staleTime: 1000 * 20,
    retry: 1,
  });
}

export function useCmsSignIn() {
  return useMutation({
    mutationFn: (email: string) => requestCmsSignIn(email),
  });
}

export function useCmsSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOutCms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "admin-access"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "blocks", "all"] });
    },
  });
}

export function useCmsBlockRevisions(pageSlug: string, blockKey: string) {
  return useQuery({
    queryKey: ["cms", "revisions", pageSlug, blockKey],
    queryFn: () => fetchCmsBlockRevisions(pageSlug, blockKey),
    staleTime: 1000 * 20,
    retry: 1,
    enabled: Boolean(pageSlug.trim() && blockKey.trim()),
  });
}

export function useCmsMediaAssets() {
  return useQuery({
    queryKey: ["cms", "media"],
    queryFn: fetchCmsMediaAssets,
    staleTime: 1000 * 20,
    retry: 1,
  });
}

export function useUpsertCmsMediaAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CmsMediaAssetInput) => upsertCmsMediaAsset(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "media"] });
    },
  });
}

export function useCmsMediaAssetBySlug(slug: string) {
  return useQuery({
    queryKey: ["cms", "media", "slug", slug],
    queryFn: () => fetchCmsMediaAssetBySlug(slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: Boolean(slug.trim()),
  });
}

export function useUploadCmsMediaFile() {
  return useMutation({
    mutationFn: (input: CmsMediaUploadInput) => uploadCmsMediaFile(input),
  });
}
