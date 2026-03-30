import { describe, expect, it } from "vitest";
import { getCmsPublishGuardState } from "@/lib/cms/publishGuard";

describe("cms publish guard", () => {
  it("blocks publish when template validation fails", () => {
    const result = getCmsPublishGuardState(true, {
      valid: false,
      errors: ['Field "title" must be text; received number.'],
    });

    expect(result.canSave).toBe(false);
    expect(result.level).toBe("error");
    expect(result.message).toContain("cannot be published");
  });

  it("allows invalid content to be saved as draft", () => {
    const result = getCmsPublishGuardState(false, {
      valid: false,
      errors: ['Field "title" must be text; received number.'],
    });

    expect(result.canSave).toBe(true);
    expect(result.level).toBe("warning");
    expect(result.message).toContain("draft");
  });

  it("marks valid content as publish ready", () => {
    const result = getCmsPublishGuardState(true, {
      valid: true,
      errors: [],
    });

    expect(result.canSave).toBe(true);
    expect(result.level).toBe("success");
    expect(result.message).toContain("ready");
  });
});
