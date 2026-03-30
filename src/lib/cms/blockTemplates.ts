export type CmsTemplateFieldType = "text" | "textarea" | "number" | "boolean" | "list";

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
  "our-mission:intro": {
    name: "Our Mission Intro",
    defaultContent: {
      headline:
        "King Armour exists to safeguard the interests of distinguished families — ensuring wealth, values, and vision endure across generations.",
      paragraph1:
        "We believe authentic family office stewardship extends beyond portfolio management and requires deep alignment with family aspirations.",
      paragraph2:
        "Our mission is to serve as a trusted partner with expertise, discretion, and global perspective.",
      highlights: ["Stewardship", "Governance", "Legacy"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "textarea" },
      { label: "Paragraph 1", path: "paragraph1", type: "textarea" },
      { label: "Paragraph 2", path: "paragraph2", type: "textarea" },
      { label: "Highlights (list)", path: "highlights", type: "list" },
    ],
  },
  "history:hero": {
    name: "History Hero",
    defaultContent: {
      title: "History",
      subtitle: "From 1957 to the Future",
      seoTitle: "History",
      seoDescription:
        "The story of King Armour and Sunwah Group legacy spanning six decades of global enterprise.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "kings-network:hero": {
    name: "Kings Network Hero",
    defaultContent: {
      title: "Kings Network",
      subtitle: "Where Legacy Meets Opportunity",
      seoTitle: "Kings Network",
      seoDescription:
        "An invitation-only community for distinguished families with curated events and peer access.",
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
  "global:render_config": {
    name: "Global Render Config",
    defaultContent: {
      enableAnimations: true,
      homepageCardsLimit: 6,
      preferredHeroSlugs: ["hero-home", "hero-services", "hero-network"],
    },
    fields: [
      { label: "Enable Animations", path: "enableAnimations", type: "boolean" },
      { label: "Homepage Cards Limit", path: "homepageCardsLimit", type: "number" },
      { label: "Preferred Hero Slugs", path: "preferredHeroSlugs", type: "list" },
    ],
  },
};

export function getBlockTemplate(pageSlug: string, blockKey: string): CmsBlockTemplate | null {
  const key = `${pageSlug.trim()}:${blockKey.trim()}`;
  return templates[key] ?? null;
}
