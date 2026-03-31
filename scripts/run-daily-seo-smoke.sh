#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://ka.adaptive-app.com}"
STAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

echo "[${STAMP}] Running Lovable Cloud SEO smoke checks for ${BASE_URL}"
bash scripts/verify-lovable-cloud-seo.sh "${BASE_URL}"
