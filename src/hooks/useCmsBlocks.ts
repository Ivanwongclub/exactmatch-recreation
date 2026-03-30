import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllCmsBlocks,
  fetchCmsAdminAccess,
  fetchCmsMediaAssetBySlug,
  fetchCmsBlockRevisions,
  fetchCmsBlocksByPage,
  fetchCmsMediaAssets,
  requestCmsSignIn,
  signOutCms,
  upsertCmsBlock,
  upsertCmsMediaAsset,
} from "@/lib/cms/services";
import type { CmsBlockInput, CmsMediaAssetInput } from "@/lib/cms/types";

export function useCmsBlocksByPage(pageSlug: string) {
  return useQuery({
    queryKey: ["cms", "blocks", pageSlug],
    queryFn: () => fetchCmsBlocksByPage(pageSlug),
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
