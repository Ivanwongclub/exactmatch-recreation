import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Client-side redirect handler for legacy URLs.
 * Maps old /ka-home/... paths and trailing-slash variants to canonical routes.
 * For true 301s in production, configure at the hosting/CDN level.
 */

const legacyRedirects: Record<string, string> = {
  "/ka-home": "/",
  "/ka-home/": "/",
  "/ka-home/our-mission": "/our-mission",
  "/ka-home/our-mission/": "/our-mission",
  "/ka-home/executive-team": "/executive-team",
  "/ka-home/executive-team/": "/executive-team",
  "/ka-home/board-of-directors": "/board-of-directors",
  "/ka-home/board-of-directors/": "/board-of-directors",
  "/ka-home/legacy-and-business-expertise": "/legacy-and-business-expertise",
  "/ka-home/legacy-and-business-expertise/": "/legacy-and-business-expertise",
  "/ka-home/history": "/history",
  "/ka-home/history/": "/history",
  "/ka-home/services": "/services",
  "/ka-home/services/": "/services",
  "/ka-home/kings-network": "/kings-network",
  "/ka-home/kings-network/": "/kings-network",
  "/ka-home/members-only-events": "/members-only-events",
  "/ka-home/members-only-events/": "/members-only-events",
  "/ka-home/summer-program": "/summer-program",
  "/ka-home/summer-program/": "/summer-program",
  "/ka-home/event": "/event",
  "/ka-home/event/": "/event",
  "/ka-home/contact": "/contact",
  "/ka-home/contact/": "/contact",
};

// Trailing-slash normalization for canonical routes
const canonicalRoutes = new Set([
  "/", "/history", "/services", "/kings-network", "/our-mission",
  "/executive-team", "/board-of-directors", "/legacy-and-business-expertise",
  "/members-only-events", "/summer-program", "/event", "/contact", "/privacy",
]);

const LegacyRedirects = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    // Check legacy map first
    const redirect = legacyRedirects[path];
    if (redirect) {
      navigate(redirect, { replace: true });
      return;
    }

    // Normalize trailing slashes on canonical routes
    if (path !== "/" && path.endsWith("/")) {
      const trimmed = path.slice(0, -1);
      if (canonicalRoutes.has(trimmed)) {
        navigate(trimmed, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
};

export default LegacyRedirects;
