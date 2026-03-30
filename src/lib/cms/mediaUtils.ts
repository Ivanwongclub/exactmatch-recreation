import type { CmsMediaAsset, CmsMediaKind } from "@/lib/cms/types";

export function normalizeMediaKind(kind: string | null | undefined): CmsMediaKind {
  if (kind === "image" || kind === "video" || kind === "file") {
    return kind;
  }

  return "file";
}

export function sortMediaByNewest<T extends Pick<CmsMediaAsset, "updated_at">>(assets: T[]): T[] {
  return [...assets].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}
