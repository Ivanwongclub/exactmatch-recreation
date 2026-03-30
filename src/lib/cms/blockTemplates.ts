export type CmsTemplateFieldType = "text" | "textarea";

export interface CmsTemplateField {
  label: string;
  path: string;
  type: CmsTemplateFieldType;
  placeholder?: string;
}

export interface CmsBlockTemplate {
  name: string;
  defaultContent: unknown;
  fields: CmsTemplateField[];
}

const templates: Record<string, CmsBlockTemplate> = {
  "our-mission:hero": {
    name: "Our Mission Hero",
    defaultContent: {
      title: "Our Mission",
      subtitle: "Purpose-Driven Stewardship for Families of Substance",
      seoTitle: "Our Mission",
      seoDescription: "Purpose-driven stewardship for families of substance.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "kings-network:cta": {
    name: "Kings Network CTA",
    defaultContent: {
      title: "Membership by Invitation",
      body: "The Kings Network is an invitation-only community.",
      buttonLabel: "REQUEST AN INTRODUCTION",
      buttonHref: "/contact",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
      { label: "Button Label", path: "buttonLabel", type: "text" },
      { label: "Button Link", path: "buttonHref", type: "text" },
    ],
  },
  "contact:hero": {
    name: "Contact Hero",
    defaultContent: {
      title: "Contact Us",
      subtitle: "Begin a confidential conversation about what matters most to your family.",
      seoTitle: "Contact Us",
      seoDescription: "Begin a confidential conversation with King Armour Family Office.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "textarea" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
};

export function getBlockTemplate(pageSlug: string, blockKey: string): CmsBlockTemplate | null {
  const key = `${pageSlug.trim()}:${blockKey.trim()}`;
  return templates[key] ?? null;
}
