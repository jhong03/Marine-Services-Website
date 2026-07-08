#!/usr/bin/env bash
#
# Build a fully static export of the site into ./dist for CDN hosting
# (Cloudflare Pages, Netlify, Wasmer static, etc.).
#
# The site has no runtime PHP needs (no auth/admin/forms; content is seeded and
# read-only), so we build the assets, boot the app locally, snapshot each page
# to HTML, and bundle it with the compiled assets + media.
#
# Usage:  bash scripts/build-static.sh
# Deploy: npx wrangler pages deploy dist   (or drag ./dist into the CF dashboard)
#
set -euo pipefail
cd "$(dirname "$0")/.."

PORT=8123
DIST=dist

echo "[1/5] Building front-end assets..."
npm run build >/dev/null

echo "[2/5] Forcing built-asset mode (removing vite hot file)..."
rm -f public/hot

echo "[3/5] Booting a temporary server on :$PORT..."
php artisan serve --port="$PORT" >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null || true' EXIT
for _ in $(seq 1 30); do
    curl -sf -o /dev/null "http://127.0.0.1:$PORT/" && break
    sleep 1
done

echo "[4/5] Assembling ./$DIST ..."
rm -rf "$DIST"; mkdir -p "$DIST"
cp -r public/build "$DIST/build"
[ -d public/media ]  && cp -r public/media  "$DIST/media"
[ -d public/images ] && cp -r public/images "$DIST/images"
for f in favicon.ico favicon.png apple-touch-icon.png robots.txt; do
    [ -f "public/$f" ] && cp "public/$f" "$DIST/$f"
done

# route:output-file  (Cloudflare serves /marine from marine.html automatically)
ROUTES="/:index /industrial:industrial /marine:marine /spare-parts:spare-parts /projects:projects /about:about /contact:contact"
for pair in $ROUTES; do
    path="${pair%%:*}"; out="${pair##*:}"
    curl -s "http://127.0.0.1:$PORT$path" -o "$DIST/$out.html"
done
cp "$DIST/index.html" "$DIST/404.html"

echo "[5/5] Rewriting absolute localhost URLs -> root-relative..."
sed -i -E 's#https?://(localhost|127\.0\.0\.1):[0-9]+##g' "$DIST"/*.html

echo "Done -> ./$DIST"
