export function applyValueAtJsonPath(input: unknown, path: string, value: unknown): unknown {
  if (!path.trim()) {
    return input;
  }

  const segments = path
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    return input;
  }

  const clone = structuredClone(input) as unknown;
  let cursor: unknown = clone;

  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    const nextIsIndex = /^\d+$/.test(nextSegment);

    if (Array.isArray(cursor)) {
      const index = Number(segment);
      if (!Number.isInteger(index) || index < 0) {
        throw new Error(`Invalid array index in path: ${segment}`);
      }
      if (cursor[index] === undefined || cursor[index] === null) {
        cursor[index] = nextIsIndex ? [] : {};
      }
      cursor = cursor[index];
      continue;
    }

    if (cursor && typeof cursor === "object") {
      const record = cursor as Record<string, unknown>;
      if (record[segment] === undefined || record[segment] === null) {
        record[segment] = nextIsIndex ? [] : {};
      }
      cursor = record[segment];
      continue;
    }

    throw new Error(`Cannot traverse path at segment: ${segment}`);
  }

  const finalSegment = segments[segments.length - 1];

  if (Array.isArray(cursor)) {
    const index = Number(finalSegment);
    if (!Number.isInteger(index) || index < 0) {
      throw new Error(`Invalid array index in final path segment: ${finalSegment}`);
    }
    cursor[index] = value;
    return clone;
  }

  if (cursor && typeof cursor === "object") {
    (cursor as Record<string, unknown>)[finalSegment] = value;
    return clone;
  }

  throw new Error(`Cannot set value at path: ${path}`);
}

export function readValueAtJsonPath(input: unknown, path: string): unknown {
  if (!path.trim()) {
    return input;
  }

  const segments = path
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

  let cursor: unknown = input;
  for (const segment of segments) {
    if (Array.isArray(cursor)) {
      const index = Number(segment);
      cursor = Number.isInteger(index) ? cursor[index] : undefined;
      continue;
    }
    if (cursor && typeof cursor === "object") {
      cursor = (cursor as Record<string, unknown>)[segment];
      continue;
    }
    return undefined;
  }

  return cursor;
}

type TemplateFieldType = "text" | "textarea" | "number" | "boolean" | "list";

export function coerceTemplateFieldValue(
  rawValue: string | boolean,
  fieldType: TemplateFieldType
): unknown {
  if (fieldType === "boolean") {
    if (typeof rawValue === "boolean") {
      return rawValue;
    }
    const normalized = rawValue.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  }

  if (fieldType === "number") {
    if (typeof rawValue === "boolean") {
      return rawValue ? 1 : 0;
    }
    const parsed = Number(rawValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (fieldType === "list") {
    if (typeof rawValue === "boolean") {
      return [];
    }
    return rawValue
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof rawValue === "boolean") {
    return rawValue ? "true" : "false";
  }

  return rawValue;
}
