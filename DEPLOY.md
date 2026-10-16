# Deployment Guide for Skipper's Companion PWA

## Production Server

**Domain**: https://skipper.p4e1.ru  
**Server IP**: 155.212.141.54  
**Deploy Directory**: `/var/www/skippers-companion`  
**Nginx Config**: `/etc/nginx/sites-available/skipper.p4e1.ru`

## Quick Deploy

```bash
npm run deploy
```

This will:
1. Build production bundle (`npm run build`)
2. Upload to server via rsync
3. Reload nginx

## SSH Configuration

### For Cloud Agents (Recommended)

**Use Cursor Secrets** for automatic SSH setup:

1. Go to https://cursor.com/settings/cloud-agents
2. Add new Secret:
   - **Name**: `DEPLOY_SSH_KEY`
   - **Value**: Your SSH private key (see below)
   - **Scope**: `ArtemOstrenkov/Skipper_comp` or "All repositories"

The deploy script will automatically:
- Create `~/.ssh/id_ed25519_deploy` from the secret
- Create `~/.ssh/config` with deploy-server alias
- Set correct permissions

Then just run: `npm run deploy`

#### Getting the SSH Key

If you need the current SSH key, run in an existing Cloud Agent session:
```bash
cat /home/ubuntu/.ssh/id_ed25519_deploy
```

Copy the entire output (including `-----BEGIN` and `-----END` lines) into the Secret value.

### For Local Development

If deploying from your local machine, add to `~/.ssh/config`:

```
Host deploy-server
    HostName 155.212.141.54
    User root
    IdentityFile ~/.ssh/id_ed25519_deploy
    StrictHostKeyChecking no
```

Then place your SSH key in `~/.ssh/id_ed25519_deploy`.

### For Cloud Agents

Cloud Agents already have SSH configured. The key is stored in:
- **Config**: `/home/ubuntu/.ssh/config`
- **Key**: `/home/ubuntu/.ssh/id_ed25519_deploy`

Just run `npm run deploy` directly.

## Deploy Script Details

Location: `deploy/deploy.sh`

Key variables:
- `HOST`: `deploy-server` (SSH alias)
- `REMOTE_ROOT`: `/var/www/skippers-companion`
- `DOMAIN`: `skipper.p4e1.ru`

## Manual Deploy (if needed)

If automatic deploy fails:

```bash
# 1. Build
npm run build

# 2. Upload to server
rsync -avz --delete dist/ deploy-server:/var/www/skippers-companion/

# 3. Reload nginx
ssh deploy-server "nginx -t && systemctl reload nginx"
```

## Verification

After deploy, verify:

1. Open https://skipper.p4e1.ru
2. Check Network tab - should load `index-*.js` with today's date
3. Test language switching (EN/RU/ZH)
4. Verify translations work in articles

## Common Issues

### 1. SSH Permission Denied
- Ensure SSH key is in place: `~/.ssh/id_ed25519_deploy`
- Check SSH config: `~/.ssh/config`
- Test connection: `ssh deploy-server "echo OK"`

### 2. Translations Not Updating
- **Cause**: PWA Service Worker caching
- **Solution**: Users need to hard refresh (`Ctrl+Shift+R`) or clear site data
- **Note**: SW will auto-update within 24h

### 3. Wrong Directory
- ⚠️ Deploy to `/var/www/skippers-companion` NOT `/var/www/vhf-helper`
- `skipper.p4e1.ru` → `/var/www/skippers-companion`
- `vhf.p4e1.ru` → `/var/www/vhf-helper`

## Build Details

- **Framework**: Vite + TypeScript
- **Bundle**: ~451 KB (156 KB gzipped)
- **Languages**: EN, RU, ZH (dynamic content)
- **PWA**: Service Worker with precaching

## Related Domains

This project serves **skipper.p4e1.ru**.  
Different project serves **vhf.p4e1.ru** (same server, different directory).
