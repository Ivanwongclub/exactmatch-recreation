import { describe, expect, it } from "vitest";
import { getCmsPreviewBannerState } from "@/lib/cms/previewBanner";

describe("cms preview banner", () => {
  it("hides when preview is not requested", () => {
    const state = getCmsPreviewBannerState(false, false);
    expect(state.show).toBe(false);
  });

  it("shows success when preview is requested and enabled", () => {
    const state = getCmsPreviewBannerState(true, true);
    expect(state.show).toBe(true);
    expect(state.level).toBe("success");
    expect(state.message).toContain("Preview Mode Active");
  });

  it("shows warning when preview requested without editor access", () => {
    const state = getCmsPreviewBannerState(true, false);
    expect(state.show).toBe(true);
    expect(state.level).toBe("warning");
    expect(state.message).toContain("published");
  });
});
