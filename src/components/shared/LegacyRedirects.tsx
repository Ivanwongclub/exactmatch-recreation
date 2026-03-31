import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCanonicalClientUrl } from "@/lib/seo/urlCanonicalization";

/**
 * Client-side redirect handler for legacy URLs and canonical URL normalization.
 * For true 301s in production, configure at the hosting/CDN level.
 */
const LegacyRedirects = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = `${location.pathname}${location.search}`;
    const canonicalUrl = getCanonicalClientUrl(location.pathname, location.search, location.hash);

    if (canonicalUrl !== currentUrl) {
      navigate(canonicalUrl, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
};

export default LegacyRedirects;
