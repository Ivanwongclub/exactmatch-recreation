import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCanonicalPathname } from "@/lib/seo/urlCanonicalization";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ka.adaptive-app.com";
const SITE_NAME = "King Armour Family Office";
const DEFAULT_OG_IMAGE = "/logo.png";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  preloadImage?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  preloadImage,
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const normalizedPath = getCanonicalPathname(location.pathname);
  const fullCanonical = canonical || `${SITE_URL}${normalizedPath}`;
  const fullTitle = location.pathname === "/" ? title : `${title} | ${SITE_NAME}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    setMeta("name", "description", description);
    setLink("canonical", fullCanonical);

    // Optional image preload for LCP-heavy hero backgrounds.
    const existingPreload = document.querySelector(
      'link[data-seo-preload-image="true"]'
    ) as HTMLLinkElement | null;
    if (existingPreload) {
      existingPreload.remove();
    }
    if (preloadImage) {
      const preloadEl = document.createElement("link");
      preloadEl.setAttribute("rel", "preload");
      preloadEl.setAttribute("as", "image");
      preloadEl.setAttribute("href", preloadImage);
      preloadEl.setAttribute("data-seo-preload-image", "true");
      document.head.appendChild(preloadEl);
    }

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.remove();
    }

    // OG
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", fullCanonical);
    setMeta("property", "og:image", fullOgImage);
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullOgImage);
  }, [fullTitle, description, fullCanonical, ogType, fullOgImage, noindex, preloadImage]);

  return null;
};

export default SEOHead;
