# Deployment Migration Playbook — ka.adaptive-app.com

**Purpose:** Move the King Armour site from Lovable hosting to a platform that honors static files (`_redirects`, `robots.txt`, `sitemap.xml`) and server-level 301 redirects.

---

## 1. Supported Target Platforms

| Platform | Redirect source | Notes |
|---|---|---|
| **Netlify** | `public/_redirects` (auto-copied to `dist/`) | Zero config — just deploy. `netlify.toml` included for headers/build. |
| **Vercel** | `vercel.json` redirects array | All rules duplicated in `vercel.json`. |
| **Cloudflare Pages** | `public/_redirects` | Supports `_redirects` in output dir. Max 2000 rules (we use ~40). See notes below. |

---

## 2. Required Environment Variables

| Variable | Value | Where to set |
|---|---|---|
| `VITE_SITE_URL` | `https://ka.adaptive-app.com` | Build environment (Netlify/Vercel/CF dashboard) |

This variable controls `SEOHead.tsx` canonical/OG domain resolution. If unset, it defaults to `https://ka.adaptive-app.com`.

---

## 3. Build Command

```bash
npm run build
# Output: dist/
```

All platforms should use `dist` as the publish directory.

---

## 4. DNS Cutover Steps

### Pre-cutover
1. Deploy to target platform and verify on preview/staging URL.
2. Run `scripts/verify-production-seo.sh <staging-url>` against the staging deploy.
3. Confirm all checks pass.

### Cutover
1. Update DNS A/CNAME records for `ka.adaptive-app.com` to point to the new platform:
   - **Netlify:** CNAME to `<site-name>.netlify.app` or A to Netlify LB IP.
   - **Vercel:** CNAME to `cname.vercel-dns.com`.
   - **Cloudflare Pages:** CNAME to `<project>.pages.dev`.
2. If using Cloudflare proxy (orange cloud): enable proxy mode.
3. Wait for DNS propagation (check with `dig ka.adaptive-app.com` or dnschecker.org).
4. Provision SSL (automatic on all three platforms).

### Post-cutover
1. Run `scripts/verify-production-seo.sh https://ka.adaptive-app.com`.
2. Verify in browser: visit `/ka-home/our-mission` → should 301 to `/our-mission`.
3. Check Google Search Console for crawl errors within 48h.
4. Submit sitemap URL in Google Search Console: `https://ka.adaptive-app.com/sitemap.xml`.

---

## 5. Cache Purge Steps

| Platform | Command / Action |
|---|---|
| **Netlify** | Dashboard → Deploys → "Clear cache and deploy site" |
| **Vercel** | Redeploy triggers full purge. Manual: `vercel --force` |
| **Cloudflare Pages** | Dashboard → Caching → Purge Everything. Or API: `curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" -H "Authorization: Bearer {token}" -d '{"purge_everything":true}'` |

After purge, verify `robots.txt` and `sitemap.xml` serve fresh content (check `Last-Modified` or `ETag` headers).

---

## 6. Rollback Steps

1. **DNS rollback:** Point `ka.adaptive-app.com` back to Lovable hosting IP / CNAME.
2. **Republish on Lovable:** Click "Update" in Lovable publish dialog to ensure latest version is live.
3. **Verify:** Run `scripts/verify-production-seo.sh https://ka.adaptive-app.com` (expect known Lovable limitations: no 301s, platform robots.txt).
4. **TTL note:** If DNS TTL was lowered pre-cutover (recommended: 300s), rollback propagates in ~5 minutes.

---

## 7. Post-Cutover Validation Commands

```bash
# 1. Legacy redirect check (expect 301)
curl -sI https://ka.adaptive-app.com/ka-home | head -5
curl -sI https://ka.adaptive-app.com/ka-home/our-mission | head -5
curl -sI https://ka.adaptive-app.com/ka-home/contact | head -5

# 2. Trailing-slash normalization (expect 301)
curl -sI https://ka.adaptive-app.com/our-mission/ | head -5
curl -sI https://ka.adaptive-app.com/contact/ | head -5

# 3. SEO files
curl -s https://ka.adaptive-app.com/robots.txt
curl -s https://ka.adaptive-app.com/sitemap.xml | head -20

# 4. Canonical/OG check (after JS hydration — use headless browser or check source)
curl -s https://ka.adaptive-app.com/ | grep -i 'canonical\|og:url'

# 5. Full automated check
bash scripts/verify-production-seo.sh https://ka.adaptive-app.com
```

---

## 8. Cloudflare Pages Notes

- `_redirects` file is supported in the output directory (copied from `public/` during build).
- Max 2000 static redirects, 100 dynamic — this project uses ~40 static rules.
- Trailing-slash behavior: Cloudflare Pages strips trailing slashes by default. Our explicit rules will still fire first.
- `_headers` file can be added for custom headers (not included; use Cloudflare dashboard or add `public/_headers`).
- For SPA fallback: Cloudflare Pages does NOT need `/* /index.html 200` — it handles SPA mode via project settings. However, keeping it in `_redirects` as the last rule is harmless and provides compatibility.

---

## 9. Files in This Pack

| File | Purpose |
|---|---|
| `netlify.toml` | Netlify build + headers config |
| `vercel.json` | Vercel redirects/rewrites/headers |
| `public/_redirects` | Canonical redirect rules (Netlify + Cloudflare Pages) |
| `public/robots.txt` | Crawl directives |
| `public/sitemap.xml` | XML sitemap |
| `scripts/verify-production-seo.sh` | Automated post-deploy SEO verification |
| `docs/deployment-migration-playbook.md` | This file |
| `docs/live-deployment-verification.md` | Previous audit of Lovable hosting limitations |
| `docs/deployment-hardening-audit.md` | Pre-deploy codebase audit |
