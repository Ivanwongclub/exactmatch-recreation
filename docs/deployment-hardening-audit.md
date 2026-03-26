# Deployment Hardening Audit — ka.adaptive-app.com

**Audit date:** 2026-03-26
**Commit:** `a1c8108a71408e8238105b724ff8f08b04745a01`
**Files inspected:** 4 · **Files changed:** 0

---

## 1. SEOHead SITE_URL block

**File:** `src/components/shared/SEOHead.tsx` (lines 4–5)

```ts
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ka.adaptive-app.com";
const SITE_NAME = "King Armour Family Office";
```

✅ Environment-aware with correct production default.

---

## 2. public/_redirects (full contents)

```
# Legacy /ka-home/ redirects (301)
/ka-home          /           301
/ka-home/         /           301
/ka-home/our-mission          /our-mission          301
/ka-home/our-mission/         /our-mission          301
/ka-home/executive-team       /executive-team       301
/ka-home/executive-team/      /executive-team       301
/ka-home/board-of-directors   /board-of-directors   301
/ka-home/board-of-directors/  /board-of-directors   301
/ka-home/legacy-and-business-expertise   /legacy-and-business-expertise   301
/ka-home/legacy-and-business-expertise/  /legacy-and-business-expertise   301
/ka-home/history              /history              301
/ka-home/history/             /history              301
/ka-home/services             /services             301
/ka-home/services/            /services             301
/ka-home/kings-network        /kings-network        301
/ka-home/kings-network/       /kings-network        301
/ka-home/members-only-events  /members-only-events  301
/ka-home/members-only-events/ /members-only-events  301
/ka-home/summer-program       /summer-program       301
/ka-home/summer-program/      /summer-program       301
/ka-home/event                /event                301
/ka-home/event/               /event                301
/ka-home/contact              /contact              301
/ka-home/contact/             /contact              301

# Trailing-slash normalization (canonical routes)
/our-mission/                 /our-mission          301
/executive-team/              /executive-team       301
/board-of-directors/          /board-of-directors   301
/legacy-and-business-expertise/ /legacy-and-business-expertise 301
/history/                     /history              301
/services/                    /services             301
/kings-network/               /kings-network        301
/members-only-events/         /members-only-events  301
/summer-program/              /summer-program       301
/event/                       /event                301
/contact/                     /contact              301
/privacy/                     /privacy              301

# SPA fallback — must be last
/*    /index.html   200
```

✅ All legacy routes covered. Trailing-slash normalization present. SPA fallback last.

---

## 3. public/sitemap.xml (first 16 lines)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ka.adaptive-app.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/our-mission</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/history</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/executive-team</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/board-of-directors</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/services</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/kings-network</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/members-only-events</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/summer-program</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/event</loc><priority>0.6</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/legacy-and-business-expertise</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/contact</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://ka.adaptive-app.com/privacy</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
</urlset>
```

✅ All `<loc>` entries use `https://ka.adaptive-app.com`.

---

## 4. public/robots.txt

```
User-agent: *
Allow: /
Disallow: /ka-home/

Sitemap: https://ka.adaptive-app.com/sitemap.xml
```

✅ Sitemap directive points to production domain. Legacy path disallowed.

---

## 5. Checklist

| Check                        | Status |
|------------------------------|--------|
| Canonical domain default     | ✅ PASS |
| OG URL domain                | ✅ PASS |
| Twitter image domain         | ✅ PASS |
| /ka-home/* 301 redirects     | ✅ PASS |
| Trailing-slash normalization | ✅ PASS |
| SPA fallback rule            | ✅ PASS |
| Sitemap domain               | ✅ PASS |
| Robots sitemap domain        | ✅ PASS |
| 404 noindex                  | ✅ PASS |

**Result: ALL PASS — no changes required.**
