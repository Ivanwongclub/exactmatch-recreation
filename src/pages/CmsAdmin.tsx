import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import {
  useCmsAdminAccess,
  useCmsAllBlocks,
  useCmsBlockRevisions,
  useCmsMediaAssets,
  useCmsSignOut,
  useUploadCmsMediaFile,
  useUpsertCmsBlock,
  useUpsertCmsMediaAsset,
} from "@/hooks/useCmsBlocks";
import { hasSupabaseEnv } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import type { CmsContentBlock, CmsMediaKind } from "@/lib/cms/types";
import {
  applyValueAtJsonPath,
  coerceTemplateFieldValue,
  readValueAtJsonPath,
} from "@/lib/cms/editorUtils";
import {
  getAllTemplatePages,
  getBlockTemplate,
  CMS_PAGE_ORDER,
  CMS_PAGE_LABELS,
} from "@/lib/cms/blockTemplates";
import { validateBlockContentForTemplate } from "@/lib/cms/blockValidation";
import { getCmsPublishGuardState } from "@/lib/cms/publishGuard";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle2,
  FileEdit,
  Eye,
  EyeOff,
  Plus,
  ExternalLink,
  RotateCcw,
  LogOut,
  Code,
  FormInput,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Types ──────────────────────────────────────────────────────────
interface SelectedBlock {
  pageSlug: string;
  blockKey: string;
}

// ── Component ──────────────────────────────────────────────────────
const CmsAdmin = () => {
  // Data hooks
  const { data: blocks, isLoading, isError } = useCmsAllBlocks();
  const {
    data: adminAccess,
    isLoading: isAccessLoading,
    refetch: refetchAdminAccess,
  } = useCmsAdminAccess();
  const saveBlock = useUpsertCmsBlock();
  const { data: mediaAssets, isLoading: isMediaLoading } = useCmsMediaAssets();
  const saveMedia = useUpsertCmsMediaAsset();
  const uploadMedia = useUploadCmsMediaFile();
  const signOut = useCmsSignOut();

  // UI state
  const [selected, setSelected] = useState<SelectedBlock | null>(null);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set(["global"]));
  const [isPublished, setIsPublished] = useState(false);
  const [contentText, setContentText] = useState("{}");
  const [editorMode, setEditorMode] = useState<"structured" | "json">("structured");

  // Media state
  const [mediaSlug, setMediaSlug] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAltText, setMediaAltText] = useState("");
  const [mediaKind, setMediaKind] = useState<CmsMediaKind>("image");
  const [mediaTags, setMediaTags] = useState("");
  const [mediaBucket, setMediaBucket] = useState("cms-media");
  const [mediaUploadFile, setMediaUploadFile] = useState<File | null>(null);
  const [showMediaPanel, setShowMediaPanel] = useState(false);

  const canEdit = adminAccess?.canEdit ?? false;

  // Revisions for selected block
  const { data: revisions, isLoading: isRevisionsLoading } = useCmsBlockRevisions(
    selected?.pageSlug ?? "",
    selected?.blockKey ?? ""
  );

  // ── Derived data ──────────────────────────────────────────────────
  const blockMap = useMemo(() => {
    const map = new Map<string, CmsContentBlock>();
    for (const b of blocks ?? []) {
      map.set(`${b.page_slug}:${b.block_key}`, b);
    }
    return map;
  }, [blocks]);

  const templatePages = useMemo(() => getAllTemplatePages(), []);

  // Build ordered page list combining template pages + any DB-only pages
  const pageList = useMemo(() => {
    const allSlugs = new Set([
      ...CMS_PAGE_ORDER,
      ...Object.keys(templatePages),
      ...(blocks ?? []).map((b) => b.page_slug),
    ]);
    const ordered: string[] = [];
    for (const slug of CMS_PAGE_ORDER) {
      if (allSlugs.has(slug)) {
        ordered.push(slug);
        allSlugs.delete(slug);
      }
    }
    for (const slug of allSlugs) ordered.push(slug);
    return ordered;
  }, [templatePages, blocks]);

  // Block keys per page: union of template keys + DB keys
  const pageBlockKeys = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const slug of pageList) {
      const templateKeys = templatePages[slug] ?? [];
      const dbKeys = (blocks ?? [])
        .filter((b) => b.page_slug === slug)
        .map((b) => b.block_key);
      const combined = new Set([...templateKeys, ...dbKeys]);
      result[slug] = [...combined];
    }
    return result;
  }, [pageList, templatePages, blocks]);

  const blockTemplate = useMemo(
    () => (selected ? getBlockTemplate(selected.pageSlug, selected.blockKey) : null),
    [selected]
  );

  const validationPreview = useMemo(() => {
    if (!selected) return null;
    try {
      const parsed = JSON.parse(contentText);
      return {
        parseError: null as string | null,
        validation: validateBlockContentForTemplate(selected.pageSlug, selected.blockKey, parsed),
      };
    } catch {
      return {
        parseError: "Invalid JSON.",
        validation: null,
      };
    }
  }, [contentText, selected]);

  const publishGuardState = useMemo(() => {
    if (!validationPreview)
      return { canSave: false, level: "error" as const, message: "No block selected." };
    if (validationPreview.parseError)
      return { canSave: false, level: "error" as const, message: validationPreview.parseError };
    return getCmsPublishGuardState(isPublished, validationPreview.validation!);
  }, [isPublished, validationPreview]);

  // ── Handlers ──────────────────────────────────────────────────────
  const togglePage = (slug: string) => {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const selectBlock = (pageSlug: string, blockKey: string) => {
    const existing = blockMap.get(`${pageSlug}:${blockKey}`);
    setSelected({ pageSlug, blockKey });
    if (existing) {
      setIsPublished(existing.is_published);
      setContentText(JSON.stringify(existing.content_json, null, 2));
    } else {
      const tmpl = getBlockTemplate(pageSlug, blockKey);
      setIsPublished(false);
      setContentText(JSON.stringify(tmpl?.defaultContent ?? {}, null, 2));
    }
    setEditorMode(getBlockTemplate(pageSlug, blockKey) ? "structured" : "json");
  };

  const handleCreateFromTemplate = async (pageSlug: string, blockKey: string) => {
    if (!canEdit) {
      toast.error("You do not have CMS edit permission.");
      return;
    }
    const tmpl = getBlockTemplate(pageSlug, blockKey);
    if (!tmpl) return;

    try {
      await saveBlock.mutateAsync({
        page_slug: pageSlug,
        block_key: blockKey,
        content_json: tmpl.defaultContent,
        is_published: false,
      });
      toast.success(`Created draft block: ${pageSlug}/${blockKey}`);
      selectBlock(pageSlug, blockKey);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create block");
    }
  };

  const handleSave = async (publishOverride?: boolean) => {
    if (!selected || !canEdit) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(contentText);
    } catch {
      toast.error("Invalid JSON. Fix formatting before saving.");
      return;
    }

    const targetPublished = publishOverride ?? isPublished;
    const validation = validateBlockContentForTemplate(
      selected.pageSlug,
      selected.blockKey,
      parsed
    );
    const guard = getCmsPublishGuardState(targetPublished, validation);

    if (!guard.canSave) {
      const firstError = validation.errors[0] ?? "Template validation failed.";
      toast.error(`${guard.message} ${firstError}`);
      return;
    }

    try {
      await saveBlock.mutateAsync({
        page_slug: selected.pageSlug,
        block_key: selected.blockKey,
        content_json: parsed,
        is_published: targetPublished,
      });
      setIsPublished(targetPublished);
      if (!validation.valid && !targetPublished) {
        toast.warning(`Saved as draft with warnings: ${validation.errors[0]}`);
      } else {
        toast.success(
          `${targetPublished ? "Published" : "Saved draft"}: ${selected.pageSlug}/${selected.blockKey}`
        );
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    }
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
      toast.error(error instanceof Error ? error.message : "Cannot update field");
    }
  };

  const getFieldValue = (
    path: string,
    fieldType: "text" | "textarea" | "number" | "boolean" | "list"
  ): string | number | boolean => {
    try {
      const parsed = JSON.parse(contentText);
      const raw = readValueAtJsonPath(parsed, path);
      if (fieldType === "boolean") return Boolean(raw);
      if (fieldType === "number") return typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
      if (fieldType === "list")
        return Array.isArray(raw) ? raw.map((i) => String(i ?? "")).join("\n") : "";
      return typeof raw === "string" ? raw : "";
    } catch {
      return fieldType === "boolean" ? false : fieldType === "number" ? 0 : "";
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

  const handleSaveMedia = async () => {
    if (!canEdit || !mediaSlug.trim() || !mediaUrl.trim()) {
      toast.error("Media slug and URL are required.");
      return;
    }
    try {
      await saveMedia.mutateAsync({
        slug: mediaSlug,
        url: mediaUrl,
        alt_text: mediaAltText || null,
        kind: mediaKind,
        tags: mediaTags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast.success(`Saved media: ${mediaSlug}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Media save failed");
    }
  };

  const handleUploadMediaFile = async () => {
    if (!canEdit || !mediaUploadFile || !mediaSlug.trim()) {
      toast.error("Set media slug and choose a file.");
      return;
    }
    try {
      const result = await uploadMedia.mutateAsync({
        file: mediaUploadFile,
        slug: mediaSlug.trim(),
        bucket: mediaBucket.trim() || "cms-media",
      });
      setMediaUrl(result.publicUrl);
      toast.success("Uploaded. URL populated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  };

  const getBlockStatus = (
    pageSlug: string,
    blockKey: string
  ): { exists: boolean; published: boolean } => {
    const block = blockMap.get(`${pageSlug}:${blockKey}`);
    return { exists: !!block, published: block?.is_published ?? false };
  };

  const previewUrl = selected
    ? `/${selected.pageSlug === "global" ? "" : selected.pageSlug}?preview=1`
    : null;

  const roleLabel = adminAccess?.role ?? "viewer";

  // ── Render ──────────────────────────────────────────────────────
  return (
    <Layout>
      <SEOHead title="CMS Admin" description="Manage dynamic CMS content blocks" noindex />

      {/* Header bar */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div>
            <h1 className="font-sans text-2xl font-extrabold tracking-tight">CMS Admin</h1>
            <p className="text-primary-foreground/70 font-sans text-sm">
              Role: {roleLabel} · {isAccessLoading ? "checking..." : adminAccess?.userId ? "signed in" : "no session"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {previewUrl && (
              <Button variant="secondary" size="sm" asChild>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Preview
                </a>
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => setShowMediaPanel(!showMediaPanel)}>
              Media
            </Button>
            {adminAccess?.userId && (
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground/70 hover:text-primary-foreground">
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Alerts */}
      <div className="container mx-auto px-6 lg:px-12 mt-4 space-y-2">
        {!hasSupabaseEnv && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <p className="text-destructive font-sans text-sm">
              Backend environment variables missing. CMS features are disabled.
            </p>
          </div>
        )}
        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <p className="text-destructive font-sans text-sm">
              Could not load CMS blocks. Check database permissions.
            </p>
          </div>
        )}
        {!canEdit && adminAccess?.userId && (
          <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3">
            <p className="text-amber-800 dark:text-amber-300 font-sans text-sm">
              Read-only mode. You need an editor or super_admin role to make changes.
            </p>
          </div>
        )}
      </div>

      {/* Main content: sidebar + editor */}
      <section className="bg-background py-6 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* ── LEFT: Page Navigator ── */}
            <div className="rounded-lg border border-border bg-card p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="font-sans text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Pages & Blocks
              </h2>
              {isLoading ? (
                <p className="text-muted-foreground font-sans text-sm">Loading...</p>
              ) : (
                <nav className="space-y-1">
                  {pageList.map((slug) => {
                    const keys = pageBlockKeys[slug] ?? [];
                    const isExpanded = expandedPages.has(slug);
                    const label = CMS_PAGE_LABELS[slug] ?? slug;

                    return (
                      <div key={slug}>
                        <button
                          type="button"
                          onClick={() => togglePage(slug)}
                          className="w-full flex items-center gap-2 rounded px-2 py-1.5 text-sm font-sans font-medium text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          )}
                          <span className="truncate">{label}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{keys.length}</span>
                        </button>

                        {isExpanded && (
                          <div className="ml-5 mt-0.5 space-y-0.5">
                            {keys.map((key) => {
                              const status = getBlockStatus(slug, key);
                              const isActive =
                                selected?.pageSlug === slug && selected?.blockKey === key;

                              return (
                                <div
                                  key={key}
                                  className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs font-sans transition-colors cursor-pointer ${
                                    isActive
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-foreground hover:bg-muted/50"
                                  }`}
                                >
                                  {status.exists ? (
                                    <CheckCircle2
                                      className={`h-3 w-3 shrink-0 ${
                                        status.published ? "text-emerald-500" : "text-amber-500"
                                      }`}
                                    />
                                  ) : (
                                    <Circle className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                                  )}

                                  <button
                                    type="button"
                                    className="truncate text-left flex-1"
                                    onClick={() => selectBlock(slug, key)}
                                  >
                                    {key}
                                  </button>

                                  {status.exists ? (
                                    <Badge
                                      variant={status.published ? "default" : "secondary"}
                                      className="text-[10px] px-1 py-0 leading-tight"
                                    >
                                      {status.published ? "Live" : "Draft"}
                                    </Badge>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCreateFromTemplate(slug, key);
                                      }}
                                      className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
                                      disabled={!canEdit}
                                    >
                                      <Plus className="h-2.5 w-2.5" /> Create
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              )}
            </div>

            {/* ── RIGHT: Editor ── */}
            <div className="space-y-4">
              {!selected ? (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <FileEdit className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                  <h2 className="font-sans text-lg font-semibold text-foreground mb-2">
                    Select a Block
                  </h2>
                  <p className="text-muted-foreground font-sans text-sm max-w-md mx-auto">
                    Choose a page and block from the left panel to begin editing. Missing blocks can
                    be initialized from templates.
                  </p>
                </div>
              ) : (
                <>
                  {/* Block header */}
                  <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h2 className="font-sans text-base font-semibold text-foreground">
                        {CMS_PAGE_LABELS[selected.pageSlug] ?? selected.pageSlug} / {selected.blockKey}
                      </h2>
                      {blockTemplate && (
                        <p className="text-xs text-muted-foreground font-sans">
                          Template: {blockTemplate.name}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Editor mode toggle */}
                      {blockTemplate && (
                        <div className="flex rounded-md border border-border overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setEditorMode("structured")}
                            className={`px-2.5 py-1 text-xs font-sans flex items-center gap-1 transition-colors ${
                              editorMode === "structured"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <FormInput className="h-3 w-3" /> Fields
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditorMode("json")}
                            className={`px-2.5 py-1 text-xs font-sans flex items-center gap-1 transition-colors ${
                              editorMode === "json"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Code className="h-3 w-3" /> JSON
                          </button>
                        </div>
                      )}

                      {/* Publish toggle */}
                      <Button
                        variant={isPublished ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (isPublished) {
                            setIsPublished(false);
                            toast.info("Switched to draft. Save to apply.");
                          } else {
                            setIsPublished(true);
                          }
                        }}
                        disabled={!canEdit}
                        className="text-xs"
                      >
                        {isPublished ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" /> Draft
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Validation status */}
                  {validationPreview && (
                    <div
                      className={`rounded-md border p-3 text-xs font-sans ${
                        publishGuardState.level === "success"
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
                          : publishGuardState.level === "warning"
                            ? "border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                      }`}
                    >
                      <p className="font-medium">{publishGuardState.message}</p>
                      {validationPreview.validation &&
                        !validationPreview.validation.valid &&
                        validationPreview.validation.errors.length > 0 && (
                          <ul className="mt-1 list-disc list-inside opacity-90">
                            {validationPreview.validation.errors.slice(0, 3).map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        )}
                    </div>
                  )}

                  {/* Structured editor */}
                  {blockTemplate && editorMode === "structured" && (
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blockTemplate.fields.map((field) => (
                          <div
                            key={field.path}
                            className={
                              field.type === "textarea" || field.type === "list"
                                ? "md:col-span-2"
                                : ""
                            }
                          >
                            <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                              {field.label}
                              {field.required === false && (
                                <span className="text-muted-foreground/60 ml-1">(optional)</span>
                              )}
                            </label>
                            {field.type === "textarea" ? (
                              <textarea
                                value={String(getFieldValue(field.path, field.type))}
                                onChange={(e) =>
                                  handleTemplateFieldChange(field.path, field.type, e.target.value)
                                }
                                rows={3}
                                className="w-full rounded border border-input bg-background px-3 py-2 text-sm font-sans"
                                placeholder={field.placeholder}
                                disabled={!canEdit}
                              />
                            ) : field.type === "boolean" ? (
                              <label className="inline-flex items-center gap-2 rounded border border-input bg-background px-3 py-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={Boolean(getFieldValue(field.path, field.type))}
                                  onChange={(e) =>
                                    handleTemplateFieldChange(field.path, field.type, e.target.checked)
                                  }
                                  disabled={!canEdit}
                                />
                                <span className="font-sans text-sm">{field.label}</span>
                              </label>
                            ) : field.type === "number" ? (
                              <input
                                type="number"
                                value={Number(getFieldValue(field.path, field.type))}
                                onChange={(e) =>
                                  handleTemplateFieldChange(field.path, field.type, e.target.value)
                                }
                                className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                                placeholder={field.placeholder}
                                disabled={!canEdit}
                              />
                            ) : field.type === "list" ? (
                              <textarea
                                value={String(getFieldValue(field.path, field.type))}
                                onChange={(e) =>
                                  handleTemplateFieldChange(field.path, field.type, e.target.value)
                                }
                                rows={4}
                                className="w-full rounded border border-input bg-background px-3 py-2 text-sm font-sans"
                                placeholder={field.placeholder ?? "One item per line"}
                                disabled={!canEdit}
                              />
                            ) : (
                              <input
                                value={String(getFieldValue(field.path, field.type))}
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

                  {/* JSON editor (fallback or primary for non-templated blocks) */}
                  {(editorMode === "json" || !blockTemplate) && (
                    <div className="rounded-lg border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground font-sans mb-2">Raw JSON Editor</p>
                      <textarea
                        value={contentText}
                        onChange={(e) => setContentText(e.target.value)}
                        rows={18}
                        className="w-full rounded border border-input bg-background px-3 py-3 font-mono text-xs leading-relaxed"
                        disabled={!canEdit}
                      />
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      onClick={() => handleSave(false)}
                      disabled={!canEdit || saveBlock.isPending}
                      variant="outline"
                      size="sm"
                    >
                      {saveBlock.isPending ? "Saving..." : "Save Draft"}
                    </Button>
                    <Button
                      onClick={() => handleSave(true)}
                      disabled={!canEdit || saveBlock.isPending || !publishGuardState.canSave}
                      size="sm"
                    >
                      {saveBlock.isPending ? "Publishing..." : "Save & Publish"}
                    </Button>
                    {blockTemplate && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setContentText(
                            JSON.stringify(blockTemplate.defaultContent, null, 2)
                          );
                          setIsPublished(false);
                          toast.info("Reset to template defaults.");
                        }}
                        disabled={!canEdit}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" /> Reset to Template
                      </Button>
                    )}
                  </div>

                  {/* Revision history */}
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="font-sans text-sm font-semibold text-foreground mb-2">
                      Revision History
                    </h3>
                    {isRevisionsLoading ? (
                      <p className="text-muted-foreground font-sans text-xs">Loading...</p>
                    ) : !revisions || revisions.length === 0 ? (
                      <p className="text-muted-foreground font-sans text-xs">No revisions yet.</p>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {revisions.map((rev) => (
                          <div
                            key={rev.id}
                            className="flex items-center justify-between rounded border border-border px-3 py-1.5"
                          >
                            <div>
                              <p className="font-sans text-xs text-foreground">
                                {format(new Date(rev.updated_at), "yyyy-MM-dd HH:mm")}
                              </p>
                              <p className="font-sans text-[10px] text-muted-foreground">
                                {rev.is_published ? "published" : "draft"} · by{" "}
                                {rev.changed_by?.slice(0, 8) ?? "system"}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => {
                                setContentText(JSON.stringify(rev.content_json, null, 2));
                                setIsPublished(rev.is_published);
                                toast.success("Revision loaded. Save to apply.");
                              }}
                              disabled={!canEdit}
                            >
                              Load
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ── Media Panel ── */}
              {showMediaPanel && (
                <div className="rounded-lg border border-border bg-card p-4 mt-4">
                  <h3 className="font-sans text-sm font-semibold text-foreground mb-3">
                    Media Library
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        Slug
                      </label>
                      <input
                        value={mediaSlug}
                        onChange={(e) => setMediaSlug(e.target.value)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        placeholder="hero-home"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        Kind
                      </label>
                      <select
                        value={mediaKind}
                        onChange={(e) => setMediaKind(e.target.value as CmsMediaKind)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        disabled={!canEdit}
                      >
                        <option value="image">image</option>
                        <option value="video">video</option>
                        <option value="file">file</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        Bucket
                      </label>
                      <input
                        value={mediaBucket}
                        onChange={(e) => setMediaBucket(e.target.value)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        File
                      </label>
                      <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        onChange={(e) => setMediaUploadFile(e.target.files?.[0] ?? null)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        disabled={!canEdit}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUploadMediaFile}
                        disabled={!canEdit || uploadMedia.isPending}
                      >
                        {uploadMedia.isPending ? "..." : "Upload"}
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                      URL
                    </label>
                    <input
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                      placeholder="https://..."
                      disabled={!canEdit}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        Alt Text
                      </label>
                      <input
                        value={mediaAltText}
                        onChange={(e) => setMediaAltText(e.target.value)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-muted-foreground mb-1">
                        Tags
                      </label>
                      <input
                        value={mediaTags}
                        onChange={(e) => setMediaTags(e.target.value)}
                        className="w-full rounded border border-input bg-background px-3 py-1.5 text-sm"
                        placeholder="hero, homepage"
                        disabled={!canEdit}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mb-3">
                    <Button
                      onClick={handleSaveMedia}
                      disabled={!canEdit || saveMedia.isPending}
                      size="sm"
                    >
                      {saveMedia.isPending ? "Saving..." : "Save Media"}
                    </Button>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="font-sans text-xs text-muted-foreground mb-2">Existing assets</p>
                    {isMediaLoading ? (
                      <p className="text-muted-foreground font-sans text-xs">Loading...</p>
                    ) : !mediaAssets || mediaAssets.length === 0 ? (
                      <p className="text-muted-foreground font-sans text-xs">No assets yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {mediaAssets.map((asset) => (
                          <button
                            key={asset.id}
                            type="button"
                            onClick={() => {
                              setMediaSlug(asset.slug);
                              setMediaUrl(asset.url);
                              setMediaAltText(asset.alt_text ?? "");
                              setMediaKind(asset.kind);
                              setMediaTags((asset.tags ?? []).join(", "));
                            }}
                            className="rounded border border-border px-2 py-0.5 text-xs font-sans text-foreground hover:border-accent hover:text-accent transition-colors"
                          >
                            {asset.slug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CmsAdmin;