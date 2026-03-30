import { getBlockTemplate, type CmsTemplateFieldType } from "@/lib/cms/blockTemplates";
import { readValueAtJsonPath } from "@/lib/cms/editorUtils";

export interface CmsBlockValidationResult {
  valid: boolean;
  errors: string[];
}

function valueMatchesFieldType(value: unknown, fieldType: CmsTemplateFieldType): boolean {
  if (fieldType === "text" || fieldType === "textarea") {
    return typeof value === "string";
  }

  if (fieldType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }

  if (fieldType === "boolean") {
    return typeof value === "boolean";
  }

  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function validateBlockContentForTemplate(
  pageSlug: string,
  blockKey: string,
  content: unknown
): CmsBlockValidationResult {
  const template = getBlockTemplate(pageSlug, blockKey);
  if (!template) {
    return { valid: true, errors: [] };
  }

  if (!content || typeof content !== "object") {
    return {
      valid: false,
      errors: [`Block content must be a JSON object for template "${template.name}".`],
    };
  }

  const errors: string[] = [];
  for (const field of template.fields) {
    const value = readValueAtJsonPath(content, field.path);
    if (!valueMatchesFieldType(value, field.type)) {
      errors.push(`Field "${field.path}" must be ${field.type}.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
