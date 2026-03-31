# Lovable Cloud SEO Operations

## Purpose
Daily smoke checks for SEO-critical behavior while staying on Lovable Cloud hosting.

## Important Constraint
Lovable Cloud serves SPA fallback (HTTP 200) for legacy and trailing-slash routes. This means true server-side `301` redirect checks will fail by design.

## Daily Automation
A GitHub Actions workflow runs every day:
- Workflow: `.github/workflows/daily-seo-smoke.yml`
- Script: `scripts/run-daily-seo-smoke.sh`
- Verifier: `scripts/verify-lovable-cloud-seo.sh`

## Manual Run
```bash
bash scripts/run-daily-seo-smoke.sh https://ka.adaptive-app.com
```

For strict 301 migration checks (non-Lovable hosting), run:
```bash
bash scripts/verify-production-seo.sh https://ka.adaptive-app.com
```

## Interpreting Results on Lovable Cloud
Expected pass set (today):
- `robots.txt` sitemap/disallow checks
- `sitemap.xml` availability/domain checks
- homepage canonical and `og:url` domain checks

Informational set (today):
- `/ka-home/*` may return `200` due SPA fallback
- trailing-slash paths may return `200` due SPA fallback

If pass/fail pattern changes unexpectedly, investigate deployment output and CMS SEO metadata first.
