#!/usr/bin/env bash
set -euo pipefail

# Configuration
HOST="${DEPLOY_HOST:-root@155.212.141.54}"
REMOTE_ROOT="/var/www/skippers-companion"
DOMAIN="skipper.p4e1.ru"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT_DIR/dist"

echo "🚀 Deploying Skipper's Companion to $DOMAIN"

# Check if dist exists
if [[ ! -d "$DIST" ]]; then
  echo "❌ dist/ is missing. Run 'npm run build' first." >&2
  exit 1
fi

# Create directories on server
echo "📁 Creating directories on server..."
ssh "$HOST" "mkdir -p '$REMOTE_ROOT' && chown -R www-data:www-data '$REMOTE_ROOT'"

# Upload files
echo "📤 Uploading files..."
rsync -avz --delete "$DIST/" "$HOST:$REMOTE_ROOT/"

# Upload nginx configuration
echo "⚙️  Uploading Nginx configuration..."
scp "$ROOT_DIR/deploy/skipper.nginx.conf" "$HOST:/etc/nginx/sites-available/skipper.p4e1.ru"

# Enable site
echo "🔗 Enabling site in Nginx..."
ssh "$HOST" "ln -sf /etc/nginx/sites-available/skipper.p4e1.ru /etc/nginx/sites-enabled/skipper.p4e1.ru"

# Test nginx configuration
echo "✅ Testing Nginx configuration..."
ssh "$HOST" "nginx -t"

# Reload nginx
echo "🔄 Reloading Nginx..."
ssh "$HOST" "systemctl reload nginx"

# Get SSL certificate if not exists
echo "🔒 Checking SSL certificate..."
ssh "$HOST" "if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
  echo '📜 Obtaining SSL certificate...'
  certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@p4e1.ru || true
else
  echo '✅ SSL certificate already exists'
fi"

echo "✨ Deployment complete!"
echo "🌐 Site available at: https://$DOMAIN"
