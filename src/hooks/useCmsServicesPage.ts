import { useQuery } from "@tanstack/react-query";
import { fetchServicesPageCmsData } from "@/lib/cms/services";

export function useCmsServicesPage() {
  return useQuery({
    queryKey: ["cms", "services-page"],
    queryFn: fetchServicesPageCmsData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
