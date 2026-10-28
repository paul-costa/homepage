#!/usr/bin/env bash
# Builds the app and publishes it on costaserver (ssh alias `costaserver`), where Caddy serves costapaul.com behind
# a Cloudflare Tunnel. /infrastructure/ (server flow, homeassistant flow) is published from the private costaserver
# repo and is left alone here. The git-ignored private/server.json goes to the private area that only Cloudflare
# Access lets through (costapaul.com/private/*).
set -euo pipefail
cd "$(dirname "$0")/.."
HOST=costaserver
WEB='costapaul-web'

npm run build
rsync -a --delete --exclude /infrastructure/ dist/homepage/browser/ "$HOST:$WEB/site/"

if [ -f private/server.json ]; then
  node -e 'const c = require("./private/server.json"); process.stdout.write(JSON.stringify(c.server ?? c, null, 2))' \
    | ssh "$HOST" "mkdir -p $WEB/private/private/login && cat > $WEB/private/private/server.json"
fi
# After the Access login code, Cloudflare sends the browser here; it only forwards to the home page
printf '%s\n' '<!doctype html><meta charset="utf-8"><title>costapaul.com</title><meta http-equiv="refresh" content="0;url=/"><a href="/">costapaul.com</a>' \
  | ssh "$HOST" "mkdir -p $WEB/private/private/login && cat > $WEB/private/private/login/index.html"

ssh "$HOST" "curl -s -o /dev/null -w 'costaserver: HTTP %{http_code}\n' http://127.0.0.1:8091/"
