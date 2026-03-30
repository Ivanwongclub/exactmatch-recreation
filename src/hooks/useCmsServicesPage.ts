import { useQuery } from "@tanstack/react-query";
import { fetchServicesPageCmsData } from "@/lib/cms/services";
import { useCmsPreviewMode } from "@/hooks/useCmsBlocks";

export function useCmsServicesPage() {
  const { previewEnabled } = useCmsPreviewMode();

  return useQuery({
    queryKey: ["cms", "services-page", previewEnabled ? "preview" : "published"],
    queryFn: () => fetchServicesPageCmsData({ includeDraft: previewEnabled }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
