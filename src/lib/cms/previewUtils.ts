const TRUTHY_PREVIEW_VALUES = new Set(["1", "true", "yes", "on"]);

export function hasCmsPreviewFlag(search: string): boolean {
  const params = new URLSearchParams(search);
  const raw = params.get("preview");
  if (!raw) {
    return false;
  }
  return TRUTHY_PREVIEW_VALUES.has(raw.trim().toLowerCase());
}

export function shouldUseCmsDraftPreview(search: string, canEdit: boolean): boolean {
  return canEdit && hasCmsPreviewFlag(search);
}
