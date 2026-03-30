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

function describeValueType(value: unknown): string {
  if (value === undefined) {
    return "missing";
  }
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    const hasOnlyStrings = value.every((item) => typeof item === "string");
    return hasOnlyStrings ? "array<string>" : "array<mixed>";
  }
  return typeof value;
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
    const isRequired = field.required ?? true;

    if ((value === undefined || value === null) && !isRequired) {
      continue;
    }

    if (isRequired && (value === undefined || value === null)) {
      errors.push(`Field "${field.path}" is required but missing.`);
      continue;
    }

    if (!valueMatchesFieldType(value, field.type)) {
      errors.push(
        `Field "${field.path}" must be ${field.type}; received ${describeValueType(value)}.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
