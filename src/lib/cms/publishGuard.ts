import type { CmsBlockValidationResult } from "@/lib/cms/blockValidation";

export type CmsPublishGuardLevel = "success" | "warning" | "error";

export interface CmsPublishGuardState {
  canSave: boolean;
  level: CmsPublishGuardLevel;
  message: string;
}

export function getCmsPublishGuardState(
  isPublished: boolean,
  validation: CmsBlockValidationResult
): CmsPublishGuardState {
  if (validation.valid) {
    return {
      canSave: true,
      level: "success",
      message: isPublished
        ? "Template validation passed. Block is ready to publish."
        : "Template validation passed. Draft is clean and can be published anytime.",
    };
  }

  if (!isPublished) {
    return {
      canSave: true,
      level: "warning",
      message: "Validation issues detected. Save as draft is allowed, but publishing is blocked.",
    };
  }

  return {
    canSave: false,
    level: "error",
    message: "Validation issues detected. This block cannot be published until all issues are fixed.",
  };
}
