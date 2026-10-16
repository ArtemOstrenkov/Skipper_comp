#!/usr/bin/env bash
set -euo pipefail

# Setup SSH from Cursor Secrets if available
if [ -n "${DEPLOY_SSH_KEY:-}" ]; then
  echo "Setting up SSH from Cursor Secrets..."
  mkdir -p ~/.ssh
  echo "$DEPLOY_SSH_KEY" > ~/.ssh/id_ed25519_deploy
  chmod 600 ~/.ssh/id_ed25519_deploy
  
  # Create SSH config if it doesn't exist
  if [ ! -f ~/.ssh/config ]; then
    cat > ~/.ssh/config << 'EOF'
Host deploy-server
    HostName 155.212.141.54
    User root
    IdentityFile ~/.ssh/id_ed25519_deploy
    StrictHostKeyChecking no
EOF
    chmod 600 ~/.ssh/config
  fi
  echo "SSH configured successfully"
fi

HOST="${DEPLOY_HOST:-deploy-server}"
REMOTE_ROOT="/var/www/skippers-companion"
DOMAIN="skipper.p4e1.ru"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT_DIR/dist"

if [[ ! -d "$DIST" ]]; then
  echo "dist/ is missing. Run npm run build first." >&2
  exit 1
fi

ssh "$HOST" "mkdir -p '$REMOTE_ROOT' /opt/vhf-helper /var/lib/vhf-helper && chown www-data:www-data /var/lib/vhf-helper"
rsync -avz --delete "$DIST/" "$HOST:$REMOTE_ROOT/"

scp "$ROOT_DIR/server/stats.py" "$HOST:/opt/vhf-helper/stats.py"
scp "$ROOT_DIR/deploy/vhf-helper-stats.service" "$HOST:/etc/systemd/system/vhf-helper-stats.service"
ssh "$HOST" "systemctl daemon-reload && systemctl enable --now vhf-helper-stats && systemctl restart vhf-helper-stats"

scp "$ROOT_DIR/deploy/vhf-helper.nginx.conf" "$HOST:/etc/nginx/sites-available/vhf-helper"
if ! ssh "$HOST" "test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem && nginx -t"; then
  scp "$ROOT_DIR/deploy/vhf-helper.http.nginx.conf" "$HOST:/etc/nginx/sites-available/vhf-helper"
fi

ssh "$HOST" "ln -sfn /etc/nginx/sites-available/vhf-helper /etc/nginx/sites-enabled/vhf-helper && nginx -t && systemctl reload nginx"

if ssh "$HOST" "test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem"; then
  echo "Deployed https://$DOMAIN"
  exit 0
fi

if ssh "$HOST" "certbot certonly --webroot -w '$REMOTE_ROOT' -d '$DOMAIN' --non-interactive --agree-tos --keep-until-expiring --register-unsafely-without-email"; then
  scp "$ROOT_DIR/deploy/vhf-helper.nginx.conf" "$HOST:/etc/nginx/sites-available/vhf-helper"
  ssh "$HOST" "nginx -t && systemctl reload nginx"
  echo "Deployed https://$DOMAIN"
else
  echo "HTTPS certificate was not issued."
  echo "Add an A-record at reg.ru: $DOMAIN -> 155.212.141.54"
  echo "Then rerun: npm run deploy"
fi
