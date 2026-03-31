#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://ka.adaptive-app.com}"
PASS=0
FAIL=0

green(){ printf "\033[32m✓ PASS\033[0m %s\n" "$1"; PASS=$((PASS+1)); }
red(){ printf "\033[31m✗ FAIL\033[0m %s\n" "$1"; FAIL=$((FAIL+1)); }
yellow(){ printf "\033[33m! INFO\033[0m %s\n" "$1"; }

check_200() {
  local url="$1"
  local label="$2"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null || echo "000")
  if [ "$status" = "200" ]; then
    green "$label returns 200"
  else
    red "$label returns HTTP $status (expected 200)"
  fi
}

echo "============================================"
echo "Lovable Cloud SEO Smoke: $BASE"
echo "============================================"

# Core public pages must render.
for p in / /our-mission /history /services /kings-network /contact /admin/login; do
  check_200 "$BASE$p" "GET $p"
done

# robots.txt expectations.
robots=$(curl -s --max-time 10 "$BASE/robots.txt" 2>/dev/null || true)
if echo "$robots" | grep -qi "sitemap.*ka.adaptive-app.com"; then
  green "robots.txt contains sitemap with production domain"
else
  red "robots.txt missing sitemap domain"
fi
if echo "$robots" | grep -qi "disallow.*ka-home"; then
  green "robots.txt disallows /ka-home/"
else
  red "robots.txt missing /ka-home/ disallow"
fi

# sitemap.xml expectations.
sitemap_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$BASE/sitemap.xml" 2>/dev/null || echo "000")
if [ "$sitemap_status" = "200" ]; then
  green "sitemap.xml returns 200"
else
  red "sitemap.xml returns HTTP $sitemap_status"
fi
sitemap=$(curl -s --max-time 10 "$BASE/sitemap.xml" 2>/dev/null || true)
if echo "$sitemap" | grep -q "ka.adaptive-app.com"; then
  green "sitemap.xml uses production domain"
else
  red "sitemap.xml missing production domain"
fi

# Homepage metadata in server HTML.
home=$(curl -s --max-time 10 "$BASE/" 2>/dev/null || true)
if echo "$home" | grep -qi 'rel="canonical".*ka.adaptive-app.com'; then
  green "homepage canonical points to production domain"
else
  red "homepage canonical missing/wrong in HTML"
fi
if echo "$home" | grep -qi 'og:url.*ka.adaptive-app.com'; then
  green "homepage og:url points to production domain"
else
  red "homepage og:url missing/wrong in HTML"
fi

# Legacy path behavior (informational on Lovable Cloud).
legacy_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$BASE/ka-home/our-mission" 2>/dev/null || echo "000")
if [ "$legacy_status" = "301" ]; then
  yellow "legacy path now returns 301 (improved behavior detected)"
elif [ "$legacy_status" = "200" ]; then
  yellow "legacy path returns 200 (expected on Lovable Cloud SPA fallback)"
else
  yellow "legacy path returned HTTP $legacy_status"
fi

echo "============================================"
echo "Results: $PASS passed, $FAIL failed"
echo "============================================"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
