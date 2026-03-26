#!/usr/bin/env bash
# verify-production-seo.sh — Post-deploy SEO verification for ka.adaptive-app.com
# Usage: bash scripts/verify-production-seo.sh [BASE_URL]
# Default: https://ka.adaptive-app.com

set -euo pipefail

BASE="${1:-https://ka.adaptive-app.com}"
PASS=0
FAIL=0
WARN=0

green() { printf "\033[32m✓ PASS\033[0m %s\n" "$1"; PASS=$((PASS+1)); }
red()   { printf "\033[31m✗ FAIL\033[0m %s\n" "$1"; FAIL=$((FAIL+1)); }
yellow(){ printf "\033[33m⚠ WARN\033[0m %s\n" "$1"; WARN=$((WARN+1)); }

check_redirect() {
  local url="$1" expected_target="$2" label="$3"
  local status location
  local headers
  headers=$(curl -sI --max-time 10 "$url" 2>/dev/null || echo "")
  status=$(echo "$headers" | head -1 | awk '{print $2}')
  location=$(echo "$headers" | grep -i '^location:' | tr -d '\r' | awk '{print $2}')

  if [ "$status" = "301" ]; then
    # Check destination contains expected path
    if echo "$location" | grep -q "$expected_target"; then
      green "$label → 301 to $expected_target"
    else
      red "$label → 301 but to '$location' (expected $expected_target)"
    fi
  elif [ "$status" = "302" ] || [ "$status" = "308" ]; then
    yellow "$label → $status (not 301) to '$location'"
  else
    red "$label → HTTP $status (expected 301)"
  fi
}

echo "============================================"
echo "SEO Verification: $BASE"
echo "============================================"
echo ""

# --- 1. Legacy redirects ---
echo "--- Legacy /ka-home/* redirects (expect 301) ---"
check_redirect "$BASE/ka-home"                                 "/"                                "GET /ka-home"
check_redirect "$BASE/ka-home/our-mission"                     "/our-mission"                     "GET /ka-home/our-mission"
check_redirect "$BASE/ka-home/executive-team"                  "/executive-team"                  "GET /ka-home/executive-team"
check_redirect "$BASE/ka-home/board-of-directors"              "/board-of-directors"              "GET /ka-home/board-of-directors"
check_redirect "$BASE/ka-home/legacy-and-business-expertise"   "/legacy-and-business-expertise"   "GET /ka-home/legacy-and-business-expertise"
check_redirect "$BASE/ka-home/history"                         "/history"                         "GET /ka-home/history"
check_redirect "$BASE/ka-home/services"                        "/services"                        "GET /ka-home/services"
check_redirect "$BASE/ka-home/kings-network"                   "/kings-network"                   "GET /ka-home/kings-network"
check_redirect "$BASE/ka-home/members-only-events"             "/members-only-events"             "GET /ka-home/members-only-events"
check_redirect "$BASE/ka-home/summer-program"                  "/summer-program"                  "GET /ka-home/summer-program"
check_redirect "$BASE/ka-home/event"                           "/event"                           "GET /ka-home/event"
check_redirect "$BASE/ka-home/contact"                         "/contact"                         "GET /ka-home/contact"
echo ""

# --- 2. Trailing-slash normalization ---
echo "--- Trailing-slash normalization (expect 301) ---"
check_redirect "$BASE/our-mission/"                     "/our-mission"                     "GET /our-mission/"
check_redirect "$BASE/executive-team/"                  "/executive-team"                  "GET /executive-team/"
check_redirect "$BASE/board-of-directors/"              "/board-of-directors"              "GET /board-of-directors/"
check_redirect "$BASE/legacy-and-business-expertise/"   "/legacy-and-business-expertise"   "GET /legacy-and-business-expertise/"
check_redirect "$BASE/history/"                         "/history"                         "GET /history/"
check_redirect "$BASE/services/"                        "/services"                        "GET /services/"
check_redirect "$BASE/kings-network/"                   "/kings-network"                   "GET /kings-network/"
check_redirect "$BASE/members-only-events/"             "/members-only-events"             "GET /members-only-events/"
check_redirect "$BASE/summer-program/"                  "/summer-program"                  "GET /summer-program/"
check_redirect "$BASE/event/"                           "/event"                           "GET /event/"
check_redirect "$BASE/contact/"                         "/contact"                         "GET /contact/"
check_redirect "$BASE/privacy/"                         "/privacy"                         "GET /privacy/"
echo ""

# --- 3. robots.txt ---
echo "--- robots.txt ---"
robots=$(curl -s "$BASE/robots.txt" 2>/dev/null)
if echo "$robots" | grep -qi "sitemap.*ka.adaptive-app.com"; then
  green "robots.txt contains sitemap directive with correct domain"
else
  red "robots.txt missing sitemap directive or wrong domain"
fi
if echo "$robots" | grep -qi "disallow.*ka-home"; then
  green "robots.txt disallows /ka-home/"
else
  yellow "robots.txt does not explicitly disallow /ka-home/"
fi
echo ""

# --- 4. sitemap.xml ---
echo "--- sitemap.xml ---"
sitemap_status=$(curl -sI -o /dev/null -w "%{http_code}" "$BASE/sitemap.xml" 2>/dev/null || echo "000")
if [ "$sitemap_status" = "200" ]; then
  green "sitemap.xml returns 200"
else
  red "sitemap.xml returns HTTP $sitemap_status"
fi
sitemap=$(curl -s "$BASE/sitemap.xml" 2>/dev/null)
if echo "$sitemap" | grep -q "ka.adaptive-app.com"; then
  green "sitemap.xml uses correct domain"
else
  red "sitemap.xml uses wrong domain or is empty"
fi
echo ""

# --- 5. Homepage canonical/OG ---
echo "--- Homepage metadata ---"
homepage=$(curl -s "$BASE/" 2>/dev/null)
if echo "$homepage" | grep -qi 'rel="canonical".*ka.adaptive-app.com'; then
  green "Homepage canonical points to ka.adaptive-app.com"
else
  yellow "Homepage canonical may be set client-side (JS hydration)"
fi
if echo "$homepage" | grep -qi 'og:url.*ka.adaptive-app.com'; then
  green "Homepage og:url points to ka.adaptive-app.com"
else
  yellow "Homepage og:url may be set client-side (JS hydration)"
fi
echo ""

# --- Summary ---
echo "============================================"
echo "Results: $PASS passed, $FAIL failed, $WARN warnings"
echo "============================================"
if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
