import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRoute from "@/components/shared/AdminRoute";

const mockAdminAccess = vi.fn();

vi.mock("@/hooks/useCmsBlocks", () => ({
  useCmsAdminAccess: () => mockAdminAccess(),
}));

function renderWithProviders(ui: React.ReactElement, initialEntries = ["/admin/cms"]) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe("AdminRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while checking access", () => {
    mockAdminAccess.mockReturnValue({ data: undefined, isLoading: true });
    renderWithProviders(
      <AdminRoute><div>CMS Content</div></AdminRoute>
    );
    expect(screen.getByText("Verifying access...")).toBeInTheDocument();
    expect(screen.queryByText("CMS Content")).not.toBeInTheDocument();
  });

  it("renders children for authenticated user", () => {
    mockAdminAccess.mockReturnValue({
      data: { userId: "user-1", role: "editor", canEdit: true },
      isLoading: false,
    });
    renderWithProviders(
      <AdminRoute><div>CMS Content</div></AdminRoute>
    );
    expect(screen.getByText("CMS Content")).toBeInTheDocument();
  });

  it("renders children for viewer role (read-only)", () => {
    mockAdminAccess.mockReturnValue({
      data: { userId: "user-2", role: "viewer", canEdit: false },
      isLoading: false,
    });
    renderWithProviders(
      <AdminRoute><div>CMS Content</div></AdminRoute>
    );
    expect(screen.getByText("CMS Content")).toBeInTheDocument();
  });

  it("redirects unauthenticated user (no userId)", () => {
    mockAdminAccess.mockReturnValue({
      data: { userId: null, role: "viewer", canEdit: false },
      isLoading: false,
    });
    renderWithProviders(
      <AdminRoute><div>CMS Content</div></AdminRoute>
    );
    expect(screen.queryByText("CMS Content")).not.toBeInTheDocument();
  });
});
