import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  useCmsAdminAccess,
  useCmsAllBlocks,
  useCmsBlockRevisions,
  useCmsSignIn,
  useCmsSignOut,
  useUpsertCmsBlock,
} from "@/hooks/useCmsBlocks";
import { hasSupabaseEnv } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";

const starterExamples: Record<string, unknown> = {
  global_header_nav: [
    {
      label: "ABOUT US",
      href: "/",
      dropdown: [
        { label: "Home", href: "/" },
        { label: "Our Mission", href: "/our-mission" },
      ],
    },
    { label: "SERVICES", href: "/services" },
  ],
  global_footer_nav: [
    { label: "ABOUT US", path: "/" },
    { label: "CONTACT US", path: "/contact" },
  ],
  our_mission_hero: {
    title: "Our Mission",
    subtitle: "Purpose-Driven Stewardship for Families of Substance",
    seoTitle: "Our Mission",
    seoDescription: "Purpose-driven stewardship for families of substance.",
  },
};

const CmsAdmin = () => {
  const { data: blocks, isLoading, isError } = useCmsAllBlocks();
  const { data: adminAccess, isLoading: isAccessLoading, refetch: refetchAdminAccess } =
    useCmsAdminAccess();
  const saveBlock = useUpsertCmsBlock();
  const signIn = useCmsSignIn();
  const signOut = useCmsSignOut();

  const [pageSlug, setPageSlug] = useState("global");
  const [blockKey, setBlockKey] = useState("header_nav");
  const [isPublished, setIsPublished] = useState(true);
  const [contentText, setContentText] = useState(
    JSON.stringify(starterExamples.global_header_nav, null, 2)
  );
  const [email, setEmail] = useState("");

  const { data: revisions, isLoading: isRevisionsLoading } = useCmsBlockRevisions(pageSlug, blockKey);

  const groupedBlocks = useMemo(() => {
    const list = blocks ?? [];
    return list.reduce<Record<string, string[]>>((acc, item) => {
      if (!acc[item.page_slug]) {
        acc[item.page_slug] = [];
      }
      acc[item.page_slug].push(item.block_key);
      return acc;
    }, {});
  }, [blocks]);

  const canEdit = adminAccess?.canEdit ?? false;

  const handleLoadBlock = (slug: string, key: string) => {
    const selected = (blocks ?? []).find((item) => item.page_slug === slug && item.block_key === key);
    if (!selected) {
      return;
    }

    setPageSlug(selected.page_slug);
    setBlockKey(selected.block_key);
    setIsPublished(selected.is_published);
    setContentText(JSON.stringify(selected.content_json, null, 2));
  };

  const handleUseTemplate = (templateKey: keyof typeof starterExamples) => {
    setContentText(JSON.stringify(starterExamples[templateKey], null, 2));
  };

  const handleSave = async () => {
    if (!canEdit) {
      toast.error("You do not have CMS edit permission.");
      return;
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(contentText);
    } catch {
      toast.error("Invalid JSON. Please fix formatting before saving.");
      return;
    }

    try {
      await saveBlock.mutateAsync({
        page_slug: pageSlug.trim(),
        block_key: blockKey.trim(),
        content_json: parsed,
        is_published: isPublished,
      });
      toast.success(`Saved ${pageSlug}/${blockKey}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    }
  };

  const handleRequestSignIn = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await signIn.mutateAsync(trimmed);
      toast.success("Sign-in link sent. Check your email and then click Refresh Access.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send sign-in link");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      toast.success("Signed out");
      refetchAdminAccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign out failed");
    }
  };

  const roleLabel = adminAccess?.role ?? "viewer";

  return (
    <Layout>
      <SEOHead title="CMS Admin" description="Manage dynamic CMS content blocks" noindex />

      <section className="bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight mb-4">CMS Admin</h1>
          <p className="text-primary-foreground/70 font-sans text-lg max-w-2xl">
            Edit dynamic content blocks with role-based control and revision history.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {!hasSupabaseEnv && (
            <AnimatedSection className="mb-6">
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-destructive font-sans text-sm">
                  Supabase environment variables are missing. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to use CMS admin.
                </p>
              </div>
            </AnimatedSection>
          )}

          {isError && (
            <AnimatedSection className="mb-6">
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-destructive font-sans text-sm">
                  Could not load CMS blocks. Check Supabase table/RLS permissions.
                </p>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection className="mb-6">
            <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-sans text-sm text-muted-foreground mb-1">Current Access</p>
                <p className="font-sans text-base font-semibold text-foreground">
                  Role: {roleLabel}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {isAccessLoading
                    ? "Checking session..."
                    : adminAccess?.userId
                      ? `Signed in user: ${adminAccess.userId}`
                      : "Not signed in"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {!adminAccess?.userId && (
                  <>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="editor@yourdomain.com"
                      className="rounded border border-input bg-background px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleRequestSignIn}
                      disabled={!hasSupabaseEnv || signIn.isPending}
                      className="rounded bg-primary px-4 py-2 text-sm font-sans font-semibold text-primary-foreground disabled:opacity-60"
                    >
                      {signIn.isPending ? "Sending..." : "Send Sign-in Link"}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => refetchAdminAccess()}
                  className="rounded border border-border px-4 py-2 text-sm font-sans hover:border-accent hover:text-accent transition-colors"
                >
                  Refresh Access
                </button>

                {adminAccess?.userId && (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signOut.isPending}
                    className="rounded border border-border px-4 py-2 text-sm font-sans hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>

          {!canEdit && (
            <AnimatedSection className="mb-6">
              <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-4">
                <p className="text-amber-800 dark:text-amber-300 font-sans text-sm">
                  You are currently in read-only mode. Assign `editor` or `super_admin` in `cms_user_roles` to enable publishing.
                </p>
              </div>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimatedSection className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-sans text-lg font-semibold text-foreground mb-4">Existing Blocks</h2>
                {isLoading ? (
                  <p className="text-muted-foreground font-sans text-sm">Loading...</p>
                ) : Object.keys(groupedBlocks).length === 0 ? (
                  <p className="text-muted-foreground font-sans text-sm">No blocks yet.</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedBlocks).map(([slug, keys]) => (
                      <div key={slug}>
                        <p className="font-sans text-sm font-semibold text-foreground mb-2">{slug}</p>
                        <div className="flex flex-wrap gap-2">
                          {keys.map((key) => (
                            <button
                              key={`${slug}-${key}`}
                              type="button"
                              onClick={() => handleLoadBlock(slug, key)}
                              className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                            >
                              {key}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-2" delay={0.08}>
              <div className="rounded-lg border border-border bg-card p-6 mb-6">
                <h2 className="font-sans text-lg font-semibold text-foreground mb-4">Edit Block</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Page Slug</label>
                    <input
                      value={pageSlug}
                      onChange={(e) => setPageSlug(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="e.g. kings-network"
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Block Key</label>
                    <input
                      value={blockKey}
                      onChange={(e) => setBlockKey(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="e.g. hero"
                      disabled={!canEdit}
                    />
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm font-sans text-foreground mb-4">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    disabled={!canEdit}
                  />
                  Published
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => handleUseTemplate("global_header_nav")}
                    className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                    disabled={!canEdit}
                  >
                    Use Header Template
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUseTemplate("global_footer_nav")}
                    className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                    disabled={!canEdit}
                  >
                    Use Footer Template
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUseTemplate("our_mission_hero")}
                    className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                    disabled={!canEdit}
                  >
                    Use Hero Template
                  </button>
                </div>

                <textarea
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  rows={16}
                  className="w-full rounded border border-input bg-background px-3 py-3 font-mono text-xs leading-relaxed"
                  disabled={!canEdit}
                />

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!hasSupabaseEnv || !canEdit || saveBlock.isPending}
                    className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-sans font-semibold tracking-wide text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    {saveBlock.isPending ? "Saving..." : "Save Block"}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-sans text-lg font-semibold text-foreground mb-2">Revision History</h2>
                <p className="text-sm font-sans text-muted-foreground mb-4">
                  Latest 30 snapshots for {pageSlug}/{blockKey}
                </p>

                {isRevisionsLoading ? (
                  <p className="text-muted-foreground font-sans text-sm">Loading revisions...</p>
                ) : !revisions || revisions.length === 0 ? (
                  <p className="text-muted-foreground font-sans text-sm">No revisions found for this block.</p>
                ) : (
                  <div className="space-y-2">
                    {revisions.map((revision) => (
                      <div
                        key={revision.id}
                        className="rounded border border-border p-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="font-sans text-sm text-foreground">
                            {format(new Date(revision.updated_at), "yyyy-MM-dd HH:mm:ss")}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            changed_by: {revision.changed_by ?? "system"} · published: {revision.is_published ? "yes" : "no"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setContentText(JSON.stringify(revision.content_json, null, 2));
                            setIsPublished(revision.is_published);
                            toast.success("Revision loaded into editor. Click Save Block to rollback.");
                          }}
                          disabled={!canEdit}
                          className="rounded border border-border px-3 py-1.5 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
                        >
                          Load Revision
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CmsAdmin;
