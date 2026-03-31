import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  useCmsAdminAccess,
  useCmsAllBlocks,
  useCmsBlockRevisions,
  useCmsMediaAssets,
  useCmsSignIn,
  useCmsSignOut,
  useUploadCmsMediaFile,
  useUpsertCmsBlock,
  useUpsertCmsMediaAsset,
} from "@/hooks/useCmsBlocks";
import { hasSupabaseEnv } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import type { CmsMediaKind } from "@/lib/cms/types";
import {
  applyValueAtJsonPath,
  coerceTemplateFieldValue,
  readValueAtJsonPath,
} from "@/lib/cms/editorUtils";
import { getBlockTemplate } from "@/lib/cms/blockTemplates";
import { validateBlockContentForTemplate } from "@/lib/cms/blockValidation";
import { getCmsPublishGuardState } from "@/lib/cms/publishGuard";

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
  const { data: mediaAssets, isLoading: isMediaLoading } = useCmsMediaAssets();
  const saveMedia = useUpsertCmsMediaAsset();
  const uploadMedia = useUploadCmsMediaFile();
  const signIn = useCmsSignIn();
  const signOut = useCmsSignOut();

  const [pageSlug, setPageSlug] = useState("global");
  const [blockKey, setBlockKey] = useState("header_nav");
  const [isPublished, setIsPublished] = useState(true);
  const [contentText, setContentText] = useState(
    JSON.stringify(starterExamples.global_header_nav, null, 2)
  );
  const [mediaSlug, setMediaSlug] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAltText, setMediaAltText] = useState("");
  const [mediaKind, setMediaKind] = useState<CmsMediaKind>("image");
  const [mediaTags, setMediaTags] = useState("");
  const [mediaBucket, setMediaBucket] = useState("cms-media");
  const [mediaUploadFile, setMediaUploadFile] = useState<File | null>(null);
  const [selectedMediaSlugForEditor, setSelectedMediaSlugForEditor] = useState("");
  const [jsonPathForInsert, setJsonPathForInsert] = useState("");
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
  const blockTemplate = useMemo(() => getBlockTemplate(pageSlug, blockKey), [pageSlug, blockKey]);
  const templateValidationPreview = useMemo(() => {
    try {
      const parsed = JSON.parse(contentText);
      const validation = validateBlockContentForTemplate(pageSlug, blockKey, parsed);
      return { parseError: null as string | null, validation };
    } catch {
      return {
        parseError: "Invalid JSON. Fix formatting before saving or publishing.",
        validation: null,
      };
    }
  }, [contentText, pageSlug, blockKey]);
  const publishGuardState = useMemo(() => {
    if (templateValidationPreview.parseError) {
      return {
        canSave: false,
        level: "error" as const,
        message: templateValidationPreview.parseError,
      };
    }
    return getCmsPublishGuardState(isPublished, templateValidationPreview.validation);
  }, [isPublished, templateValidationPreview]);

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

    const validation = validateBlockContentForTemplate(pageSlug, blockKey, parsed);
    const publishGuard = getCmsPublishGuardState(isPublished, validation);
    if (!publishGuard.canSave) {
      const firstError = validation.errors[0] ?? "Template validation failed.";
      const extraCount = Math.max(validation.errors.length - 1, 0);
      toast.error(
        extraCount > 0
          ? `${publishGuard.message} ${firstError} (+${extraCount} more issue${extraCount === 1 ? "" : "s"})`
          : `${publishGuard.message} ${firstError}`
      );
      return;
    }

    try {
      await saveBlock.mutateAsync({
        page_slug: pageSlug.trim(),
        block_key: blockKey.trim(),
        content_json: parsed,
        is_published: isPublished,
      });
      if (!validation.valid && !isPublished) {
        const firstError = validation.errors[0] ?? "Template validation failed.";
        toast.warning(`${publishGuard.message} First issue: ${firstError}`);
        return;
      }
      toast.success(`Saved ${pageSlug}/${blockKey}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    }
  };

  const handleRequestSignIn = async () => {
    toast.info("Please sign in via /admin/login.");
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

  const handleLoadMedia = (slug: string) => {
    const selected = (mediaAssets ?? []).find((asset) => asset.slug === slug);
    if (!selected) {
      return;
    }

    setMediaSlug(selected.slug);
    setMediaUrl(selected.url);
    setMediaAltText(selected.alt_text ?? "");
    setMediaKind(selected.kind);
    setMediaTags((selected.tags ?? []).join(", "));
  };

  const handleSaveMedia = async () => {
    if (!canEdit) {
      toast.error("You do not have CMS edit permission.");
      return;
    }

    if (!mediaSlug.trim() || !mediaUrl.trim()) {
      toast.error("Media slug and URL are required.");
      return;
    }

    try {
      await saveMedia.mutateAsync({
        slug: mediaSlug,
        url: mediaUrl,
        alt_text: mediaAltText || null,
        kind: mediaKind,
        tags: mediaTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      toast.success(`Saved media asset: ${mediaSlug}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Media save failed");
    }
  };

  const handleInsertMediaUrlIntoBlock = () => {
    const selected = (mediaAssets ?? []).find((asset) => asset.slug === selectedMediaSlugForEditor);
    if (!selected) {
      toast.error("Please select a media asset first.");
      return;
    }

    if (!jsonPathForInsert.trim()) {
      const nextContent = `${contentText}\n${selected.url}`;
      setContentText(nextContent.trim());
      toast.success(`Appended media URL from ${selected.slug}`);
      return;
    }

    try {
      const parsed = JSON.parse(contentText);
      const updated = applyValueAtJsonPath(parsed, jsonPathForInsert, selected.url);
      setContentText(JSON.stringify(updated, null, 2));
      toast.success(`Inserted media URL at path: ${jsonPathForInsert}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to insert URL at path");
    }
  };

  const handleApplyTemplate = () => {
    if (!blockTemplate) {
      toast.error("No template defined for this block.");
      return;
    }
    setContentText(JSON.stringify(blockTemplate.defaultContent, null, 2));
    toast.success(`Applied template: ${blockTemplate.name}`);
  };

  const handleTemplateFieldChange = (
    path: string,
    fieldType: "text" | "textarea" | "number" | "boolean" | "list",
    value: string | boolean
  ) => {
    try {
      const parsed = JSON.parse(contentText);
      const updated = applyValueAtJsonPath(parsed, path, coerceTemplateFieldValue(value, fieldType));
      setContentText(JSON.stringify(updated, null, 2));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cannot update template field");
    }
  };

  const getTemplateFieldValue = (
    path: string,
    fieldType: "text" | "textarea" | "number" | "boolean" | "list"
  ): string | number | boolean => {
    try {
      const parsed = JSON.parse(contentText);
      const raw = readValueAtJsonPath(parsed, path);

      if (fieldType === "boolean") {
        return Boolean(raw);
      }
      if (fieldType === "number") {
        return typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
      }
      if (fieldType === "list") {
        return Array.isArray(raw)
          ? raw.map((item) => String(item ?? "")).join("\n")
          : "";
      }
      return typeof raw === "string" ? raw : "";
    } catch {
      return fieldType === "boolean" ? false : fieldType === "number" ? 0 : "";
    }
  };

  const handleUploadMediaFile = async () => {
    if (!canEdit) {
      toast.error("You do not have CMS edit permission.");
      return;
    }
    if (!mediaUploadFile) {
      toast.error("Please choose a file to upload.");
      return;
    }
    if (!mediaSlug.trim()) {
      toast.error("Please set Media Slug before upload.");
      return;
    }

    try {
      const uploadResult = await uploadMedia.mutateAsync({
        file: mediaUploadFile,
        slug: mediaSlug.trim(),
        bucket: mediaBucket.trim() || "cms-media",
      });
      setMediaUrl(uploadResult.publicUrl);
      toast.success("Media uploaded. URL has been populated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
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

                {blockTemplate && (
                  <div className="rounded-md border border-border p-3 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-sans text-sm font-semibold text-foreground">
                        Structured Editor: {blockTemplate.name}
                      </p>
                      <button
                        type="button"
                        onClick={handleApplyTemplate}
                        disabled={!canEdit}
                        className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
                      >
                        Apply Template
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {blockTemplate.fields.map((field) => (
                        <div
                          key={field.path}
                          className={field.type === "textarea" ? "md:col-span-2" : ""}
                        >
                          <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              value={String(getTemplateFieldValue(field.path, field.type))}
                              onChange={(e) =>
                                handleTemplateFieldChange(field.path, field.type, e.target.value)
                              }
                              rows={3}
                              className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                              placeholder={field.placeholder}
                              disabled={!canEdit}
                            />
                          ) : field.type === "boolean" ? (
                            <label className="inline-flex items-center gap-2 rounded border border-input bg-background px-3 py-2 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(getTemplateFieldValue(field.path, field.type))}
                                onChange={(e) =>
                                  handleTemplateFieldChange(
                                    field.path,
                                    field.type,
                                    e.target.checked
                                  )
                                }
                                disabled={!canEdit}
                              />
                              <span>{field.label}</span>
                            </label>
                          ) : field.type === "number" ? (
                            <input
                              type="number"
                              value={Number(getTemplateFieldValue(field.path, field.type))}
                              onChange={(e) =>
                                handleTemplateFieldChange(field.path, field.type, e.target.value)
                              }
                              className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                              placeholder={field.placeholder}
                              disabled={!canEdit}
                            />
                          ) : field.type === "list" ? (
                            <textarea
                              value={String(getTemplateFieldValue(field.path, field.type))}
                              onChange={(e) =>
                                handleTemplateFieldChange(field.path, field.type, e.target.value)
                              }
                              rows={4}
                              className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                              placeholder={field.placeholder ?? "One item per line"}
                              disabled={!canEdit}
                            />
                          ) : (
                            <input
                              value={String(getTemplateFieldValue(field.path, field.type))}
                              onChange={(e) =>
                                handleTemplateFieldChange(field.path, field.type, e.target.value)
                              }
                              className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                              placeholder={field.placeholder}
                              disabled={!canEdit}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(blockTemplate || templateValidationPreview.parseError) && (
                  <div
                    className={`rounded-md border p-3 mb-3 ${
                      publishGuardState.level === "success"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : publishGuardState.level === "warning"
                          ? "border-amber-300 bg-amber-50 text-amber-900"
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                    }`}
                  >
                    <p className="font-sans text-xs font-medium">{publishGuardState.message}</p>
                    {!templateValidationPreview.parseError &&
                      templateValidationPreview.validation &&
                      !templateValidationPreview.validation.valid && (
                        <p className="font-sans text-xs mt-1 opacity-90">
                          First issue: {templateValidationPreview.validation.errors[0]}
                        </p>
                      )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 mb-3">
                  <div className="space-y-2">
                    <select
                      value={selectedMediaSlugForEditor}
                      onChange={(e) => setSelectedMediaSlugForEditor(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      disabled={!canEdit}
                    >
                      <option value="">Insert media URL into block JSON...</option>
                      {(mediaAssets ?? []).map((asset) => (
                        <option key={asset.id} value={asset.slug}>
                          {asset.slug}
                        </option>
                      ))}
                    </select>
                    <input
                      value={jsonPathForInsert}
                      onChange={(e) => setJsonPathForInsert(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Optional JSON path, e.g. hero.imageUrl or cards.0.image"
                      disabled={!canEdit}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleInsertMediaUrlIntoBlock}
                    disabled={!canEdit}
                    className="rounded border border-border px-3 py-2 text-sm font-sans text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
                  >
                    Insert URL
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
                    disabled={!hasSupabaseEnv || !canEdit || saveBlock.isPending || !publishGuardState.canSave}
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

              <div className="rounded-lg border border-border bg-card p-6 mt-6">
                <h2 className="font-sans text-lg font-semibold text-foreground mb-2">Media Library</h2>
                <p className="text-sm font-sans text-muted-foreground mb-4">
                  Store reusable asset URLs for hero images and OG images.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Slug</label>
                    <input
                      value={mediaSlug}
                      onChange={(e) => setMediaSlug(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="e.g. hero-home"
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Kind</label>
                    <select
                      value={mediaKind}
                      onChange={(e) => setMediaKind(e.target.value as CmsMediaKind)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      disabled={!canEdit}
                    >
                      <option value="image">image</option>
                      <option value="video">video</option>
                      <option value="file">file</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Storage Bucket</label>
                    <input
                      value={mediaBucket}
                      onChange={(e) => setMediaBucket(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="cms-media"
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Upload File</label>
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => setMediaUploadFile(e.target.files?.[0] ?? null)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleUploadMediaFile}
                      disabled={!canEdit || uploadMedia.isPending}
                      className="w-full rounded border border-border px-3 py-2 text-sm font-sans text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
                    >
                      {uploadMedia.isPending ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-sans font-medium text-foreground mb-1.5">URL</label>
                  <input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                    placeholder="https://..."
                    disabled={!canEdit}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Alt Text</label>
                    <input
                      value={mediaAltText}
                      onChange={(e) => setMediaAltText(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Meaningful description"
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1.5">Tags (comma separated)</label>
                    <input
                      value={mediaTags}
                      onChange={(e) => setMediaTags(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                      placeholder="homepage, hero"
                      disabled={!canEdit}
                    />
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={handleSaveMedia}
                    disabled={!canEdit || saveMedia.isPending}
                    className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-sans font-semibold tracking-wide text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    {saveMedia.isPending ? "Saving..." : "Save Media"}
                  </button>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="font-sans text-sm text-muted-foreground mb-2">Existing assets</p>
                  {isMediaLoading ? (
                    <p className="text-muted-foreground font-sans text-sm">Loading media assets...</p>
                  ) : !mediaAssets || mediaAssets.length === 0 ? (
                    <p className="text-muted-foreground font-sans text-sm">No media assets yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {mediaAssets.map((asset) => (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => handleLoadMedia(asset.slug)}
                          className="rounded border border-border px-2.5 py-1 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                        >
                          {asset.slug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CmsAdmin;
