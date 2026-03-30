import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllCmsBlocks,
  fetchCmsBlocksByPage,
  upsertCmsBlock,
} from "@/lib/cms/services";
import type { CmsBlockInput } from "@/lib/cms/types";

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
