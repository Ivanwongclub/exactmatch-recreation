import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRecovery, setHasRecovery] = useState(false);

  useEffect(() => {
    // Listen for PASSWORD_RECOVERY event from the hash fragment
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setHasRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setConfirmed(true);
    toast.success("Password updated successfully!");
    setTimeout(() => navigate("/admin/login", { replace: true }), 2000);
  };

  return (
    <Layout>
      <SEOHead title="Reset Password" description="Set a new admin password." noindex />

      <section className="bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Reset Password
          </h1>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-md">
          {confirmed ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="font-sans text-xl font-semibold text-foreground mb-2">Password Updated</h2>
              <p className="text-muted-foreground font-sans text-sm">Redirecting to login...</p>
            </div>
          ) : !hasRecovery ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground font-sans text-sm">
                Waiting for recovery token... If you arrived here directly, please use the reset link from your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-password" className="font-sans text-sm font-medium text-foreground">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="mt-1.5"
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full font-sans font-semibold">
                  {loading ? "Updating..." : "Set New Password"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminResetPassword;