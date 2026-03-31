import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCmsAdminAccess } from "@/hooks/useCmsBlocks";

interface AdminRouteProps {
  children: ReactNode;
}

/**
 * Route guard for /admin/cms.
 * Redirects unauthenticated users to /admin/login.
 * Authenticated users (any role) pass through — read-only mode is handled inside CmsAdmin.
 */
const AdminRoute = ({ children }: AdminRouteProps) => {
  const { data: adminAccess, isLoading } = useCmsAdminAccess();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-sans text-sm">Verifying access...</p>
      </div>
    );
  }

  if (!adminAccess?.userId) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
