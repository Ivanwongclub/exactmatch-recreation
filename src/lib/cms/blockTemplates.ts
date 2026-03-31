export type CmsTemplateFieldType = "text" | "textarea" | "number" | "boolean" | "list";

export interface CmsTemplateField {
  label: string;
  path: string;
  type: CmsTemplateFieldType;
  required?: boolean;
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
  "global:header_nav": {
    name: "Header Navigation",
    defaultContent: [
      {
        label: "ABOUT US",
        href: "/",
        dropdown: [
          { label: "Home", href: "/" },
          { label: "Our Mission", href: "/our-mission" },
          { label: "History", href: "/history" },
          { label: "Executive Team", href: "/executive-team" },
          { label: "Board of Directors", href: "/board-of-directors" },
        ],
      },
      { label: "SERVICES", href: "/services" },
      {
        label: "KINGS NETWORK",
        href: "/kings-network",
        dropdown: [
          { label: "Overview", href: "/kings-network" },
          { label: "Members-Only Events", href: "/members-only-events" },
          { label: "Summer Program", href: "/summer-program" },
          { label: "Event", href: "/event" },
        ],
      },
      { label: "EXPERTISE", href: "/legacy-and-business-expertise" },
      { label: "CONTACT", href: "/contact" },
    ],
    fields: [],
  },
  "global:footer_nav": {
    name: "Footer Navigation",
    defaultContent: [
      { label: "ABOUT US", path: "/" },
      { label: "OUR MISSION", path: "/our-mission" },
      { label: "HISTORY", path: "/history" },
      { label: "OUR SERVICES", path: "/services" },
      { label: "KINGS NETWORK", path: "/kings-network" },
      { label: "EXECUTIVE TEAM", path: "/executive-team" },
      { label: "BOARD OF DIRECTORS", path: "/board-of-directors" },
      { label: "EXPERTISE", path: "/legacy-and-business-expertise" },
      { label: "EVENTS", path: "/members-only-events" },
      { label: "SUMMER PROGRAM", path: "/summer-program" },
      { label: "CONTACT US", path: "/contact" },
      { label: "PRIVACY POLICY", path: "/privacy" },
    ],
    fields: [],
  },
  "global:footer_email": {
    name: "Footer Email",
    defaultContent: "info@king-armour.com",
    fields: [],
  },
  "global:footer_tagline": {
    name: "Footer Tagline",
    defaultContent: "Fortify Your Growth, Armour Your Assets, Unite Generations",
    fields: [],
  },
  "global:render_config": {
    name: "Global Render Config",
    defaultContent: {
      enableAnimations: true,
      homepageCardsLimit: 6,
      preferredHeroSlugs: ["hero-home", "hero-services", "hero-network"],
    },
    fields: [
      { label: "Enable Animations", path: "enableAnimations", type: "boolean", required: true },
      { label: "Homepage Cards Limit", path: "homepageCardsLimit", type: "number", required: true },
      { label: "Preferred Hero Slugs", path: "preferredHeroSlugs", type: "list", required: false },
    ],
  },
  "executive-team:hero": {
    name: "Executive Team Hero",
    defaultContent: {
      title: "Executive Team",
      subtitle: "The Leaders Behind King Armour",
      seoTitle: "Executive Team",
      seoDescription: "Meet the executive leadership of King Armour Family Office.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "board-of-directors:hero": {
    name: "Board of Directors Hero",
    defaultContent: {
      title: "Board of Directors",
      subtitle: "Governance and Oversight",
      seoTitle: "Board of Directors",
      seoDescription: "The board of directors governing King Armour Family Office.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "summer-program:hero": {
    name: "Summer Program Hero",
    defaultContent: {
      title: "Summer Program",
      subtitle: "Cultivating Next-Generation Leadership",
      seoTitle: "Summer Program",
      seoDescription: "King Armour summer program for next-generation family leaders.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "members-only-events:hero": {
    name: "Members Only Events Hero",
    defaultContent: {
      title: "Members-Only Events",
      subtitle: "Exclusive Gatherings for Distinguished Families",
      seoTitle: "Members-Only Events",
      seoDescription: "Exclusive invitation-only events hosted by King Armour.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "event:hero": {
    name: "Event Page Hero",
    defaultContent: {
      title: "Upcoming Event",
      subtitle: "Details and Registration",
      seoTitle: "Event",
      seoDescription: "Event details and registration for King Armour.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "legacy-and-business-expertise:hero": {
    name: "Legacy & Business Expertise Hero",
    defaultContent: {
      title: "Legacy & Business Expertise",
      subtitle: "Decades of Strategic Enterprise",
      seoTitle: "Legacy & Business Expertise",
      seoDescription: "King Armour legacy spanning decades of global business expertise.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "services:hero": {
    name: "Services Hero",
    defaultContent: {
      title: "Our Services",
      subtitle: "Comprehensive Family Office Solutions",
      seoTitle: "Our Services",
      seoDescription: "Comprehensive family office services by King Armour.",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Subtitle", path: "subtitle", type: "text" },
      { label: "SEO Title", path: "seoTitle", type: "text" },
      { label: "SEO Description", path: "seoDescription", type: "textarea" },
    ],
  },
  "our-mission:philosophy": {
    name: "Our Mission Philosophy",
    defaultContent: {
      headline: "Our Philosophy",
      body: "We combine global perspective with deep local knowledge to preserve and grow multi-generational wealth.",
      values: ["Integrity", "Discretion", "Excellence"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
      { label: "Values (list)", path: "values", type: "list" },
    ],
  },
  "our-mission:principles": {
    name: "Our Mission Principles",
    defaultContent: {
      headline: "Guiding Principles",
      principles: ["Client-first stewardship", "Long-term alignment", "Transparent governance"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Principles (list)", path: "principles", type: "list" },
    ],
  },
  "history:legacy": {
    name: "History Legacy",
    defaultContent: {
      headline: "A Legacy of Enterprise",
      body: "From humble beginnings in 1957, the Sunwah Group grew into a multi-sector global enterprise spanning real estate, financial services, and education.",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
    ],
  },
  "history:milestones": {
    name: "History Milestones",
    defaultContent: {
      headline: "Key Milestones",
      milestones: ["1957 — Founded in Vietnam", "1975 — Relocated to Hong Kong", "2000s — Global expansion"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Milestones (list)", path: "milestones", type: "list" },
    ],
  },
  "history:global_connections": {
    name: "History Global Connections",
    defaultContent: {
      headline: "Global Connections",
      body: "Today, the Sunwah Group operates across Asia, Europe, and North America with deep institutional relationships.",
      regions: ["Hong Kong", "Vietnam", "Japan", "Canada", "France"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
      { label: "Regions (list)", path: "regions", type: "list" },
    ],
  },
  "services:intro": {
    name: "Services Intro",
    defaultContent: {
      headline: "Tailored Solutions for Families of Substance",
      body: "Our services are designed to address the full spectrum of needs for distinguished families.",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
    ],
  },
  "services:cta": {
    name: "Services CTA",
    defaultContent: {
      title: "Ready to Begin?",
      body: "Schedule a confidential consultation to discuss your family's needs.",
      buttonLabel: "CONTACT US",
      buttonHref: "/contact",
    },
    fields: [
      { label: "Title", path: "title", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
      { label: "Button Label", path: "buttonLabel", type: "text" },
      { label: "Button Link", path: "buttonHref", type: "text" },
    ],
  },
  "contact:form_copy": {
    name: "Contact Form Copy",
    defaultContent: {
      headline: "Send Us a Message",
      disclaimer: "All inquiries are handled with the utmost confidentiality.",
      submitLabel: "Send Message",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Disclaimer", path: "disclaimer", type: "textarea" },
      { label: "Submit Button Label", path: "submitLabel", type: "text" },
    ],
  },
  "contact:form_error_copy": {
    name: "Contact Form Error Copy",
    defaultContent: {
      fallbackHeadline: "We're unable to process your request right now",
      fallbackBody: "Please reach out to us directly using the contact channels below.",
    },
    fields: [
      { label: "Fallback Headline", path: "fallbackHeadline", type: "text" },
      { label: "Fallback Body", path: "fallbackBody", type: "textarea" },
    ],
  },
  "contact:confidentiality": {
    name: "Contact Confidentiality",
    defaultContent: {
      headline: "Your Privacy Matters",
      body: "King Armour treats every inquiry with strict confidentiality. Your information will never be shared with third parties.",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
    ],
  },
  "contact:contact_channels": {
    name: "Contact Channels",
    defaultContent: {
      headline: "Direct Contact",
      email: "info@kingarmour.com",
      phone: "+852 0000 0000",
      address: "Hong Kong",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Email", path: "email", type: "text" },
      { label: "Phone", path: "phone", type: "text" },
      { label: "Address", path: "address", type: "text" },
    ],
  },
  "contact:presence_locations": {
    name: "Contact Presence Locations",
    defaultContent: {
      headline: "Our Presence",
      locations: ["Hong Kong", "Vietnam", "Japan", "Canada"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Locations (list)", path: "locations", type: "list" },
    ],
  },
  "kings-network:intro": {
    name: "Kings Network Intro",
    defaultContent: {
      headline: "A Curated Community",
      body: "The Kings Network connects distinguished families through exclusive events, shared wisdom, and strategic introductions.",
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Body", path: "body", type: "textarea" },
    ],
  },
  "kings-network:highlights": {
    name: "Kings Network Highlights",
    defaultContent: {
      headline: "Network Highlights",
      highlights: ["Curated peer introductions", "Exclusive investment forums", "Annual family summits"],
    },
    fields: [
      { label: "Headline", path: "headline", type: "text" },
      { label: "Highlights (list)", path: "highlights", type: "list" },
    ],
  },
};

/** All page slugs that have at least one template, with their block keys. */
export function getAllTemplatePages(): Record<string, string[]> {
  const pages: Record<string, string[]> = {};
  for (const compositeKey of Object.keys(templates)) {
    const [pageSlug, blockKey] = compositeKey.split(":");
    if (!pages[pageSlug]) pages[pageSlug] = [];
    pages[pageSlug].push(blockKey);
  }
  return pages;
}

/** Canonical page ordering for the CMS navigator. */
export const CMS_PAGE_ORDER: string[] = [
  "global",
  "our-mission",
  "history",
  "services",
  "kings-network",
  "contact",
  "executive-team",
  "board-of-directors",
  "members-only-events",
  "summer-program",
  "event",
  "legacy-and-business-expertise",
];

/** Human-readable page labels. */
export const CMS_PAGE_LABELS: Record<string, string> = {
  global: "Global",
  "our-mission": "Our Mission",
  history: "History",
  services: "Services",
  "kings-network": "Kings Network",
  contact: "Contact",
  "executive-team": "Executive Team",
  "board-of-directors": "Board of Directors",
  "members-only-events": "Members-Only Events",
  "summer-program": "Summer Program",
  event: "Event",
  "legacy-and-business-expertise": "Legacy & Business Expertise",
};

export function getBlockTemplate(pageSlug: string, blockKey: string): CmsBlockTemplate | null {
  const key = `${pageSlug.trim()}:${blockKey.trim()}`;
  return templates[key] ?? null;
}
