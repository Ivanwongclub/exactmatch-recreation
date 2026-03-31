import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { useCmsAdminAccess, useCmsSignIn } from "@/hooks/useCmsBlocks";
import { hasSupabaseEnv } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { data: adminAccess, isLoading: isAccessLoading } = useCmsAdminAccess();
  const signIn = useCmsSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect authenticated users to CMS admin
  useEffect(() => {
    if (!isAccessLoading && adminAccess?.userId) {
      navigate("/admin/cms", { replace: true });
    }
  }, [isAccessLoading, adminAccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      await signIn.mutateAsync({ email: trimmed, password });
      toast.success("Signed in successfully.");
      navigate("/admin/cms", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign-in failed");
    }
  };

  return (
    <Layout>
      <SEOHead title="Admin Login" description="Sign in to the CMS admin panel." noindex />

      <section className="bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Admin Login
          </h1>
          <p className="text-primary-foreground/70 font-sans text-lg max-w-2xl">
            Sign in to access the content management system.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-md">
          {!hasSupabaseEnv && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 mb-6">
              <p className="text-destructive font-sans text-sm">
                Supabase environment variables are missing. Admin login is unavailable.
              </p>
            </div>
          )}

          {isAccessLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-sans text-sm">Checking session...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="admin-email" className="font-sans text-sm font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="editor@yourdomain.com"
                    className="mt-1.5"
                    autoComplete="email"
                    required
                    disabled={!hasSupabaseEnv}
                  />
                </div>

                <div>
                  <Label htmlFor="admin-password" className="font-sans text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5"
                    autoComplete="current-password"
                    required
                    disabled={!hasSupabaseEnv}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!hasSupabaseEnv || signIn.isPending}
                  className="w-full font-sans font-semibold"
                >
                  {signIn.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </div>

              <p className="text-muted-foreground font-sans text-xs mt-4 text-center">
                Only pre-authorized CMS users can sign in.
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;