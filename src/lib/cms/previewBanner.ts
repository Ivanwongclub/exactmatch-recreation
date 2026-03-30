export type CmsPreviewBannerLevel = "success" | "warning";

export interface CmsPreviewBannerState {
  show: boolean;
  level: CmsPreviewBannerLevel;
  message: string;
}

export function getCmsPreviewBannerState(
  previewRequested: boolean,
  previewEnabled: boolean
): CmsPreviewBannerState {
  if (!previewRequested) {
    return {
      show: false,
      level: "success",
      message: "",
    };
  }

  if (previewEnabled) {
    return {
      show: true,
      level: "success",
      message: "Preview Mode Active: showing latest draft CMS content.",
    };
  }

  return {
    show: true,
    level: "warning",
    message: "Preview requested, but editor access is required. Showing published content.",
  };
}
