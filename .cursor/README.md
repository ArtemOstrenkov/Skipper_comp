# Cloud Agent Instructions

## Quick Start: Deployment via Cursor Secrets

### If SSH is already configured via Secrets ✅

Just run:
```bash
npm run deploy
```

The script will automatically set up SSH from the `DEPLOY_SSH_KEY` secret.

### First Time Setup: Add SSH Key to Cursor Secrets

1. **Go to Cursor Dashboard**: https://cursor.com/settings/cloud-agents
2. **Add Secret**:
   - Name: `DEPLOY_SSH_KEY`
   - Value: Copy SSH key from existing session (see below)
   - Scope: This repo or "All repositories"
3. **Done!** All future Cloud Agents will have automatic SSH access

#### Get SSH Key from Current Session:
```bash
cat /home/ubuntu/.ssh/id_ed25519_deploy
```
Copy entire output including `-----BEGIN` and `-----END`.

---

## Deployment to Production

### SSH is Pre-Configured

SSH access to production server is already set up:

```bash
# Test connection
ssh deploy-server "echo 'Connection OK'"

# Should return: Connection OK
```

### Deploy Command

```bash
npm run deploy
```

This will:
1. Build production (`npm run build`)
2. Upload to `155.212.141.54:/var/www/skippers-companion`
3. Reload nginx
4. Deploy to https://skipper.p4e1.ru

### SSH Configuration Location

- **Config**: `/home/ubuntu/.ssh/config`
- **Key**: `/home/ubuntu/.ssh/id_ed25519_deploy`
- **Host alias**: `deploy-server`
- **Target**: `root@155.212.141.54`

### Important: Correct Deploy Path

⚠️ **Deploy to `/var/www/skippers-companion`** (correct)  
❌ NOT `/var/www/vhf-helper` (different project)

The `deploy/deploy.sh` script is already configured with the correct path.

### Troubleshooting

#### rsync not found
```bash
sudo apt-get update && sudo apt-get install -y rsync
```

#### SSH Permission Denied
Check that SSH config and key exist:
```bash
ls -la ~/.ssh/config ~/.ssh/id_ed25519_deploy
```

#### Translations Not Showing
- Build hash didn't change (files identical)
- Solution: Add version attribute or change code to force new hash
- See [DEPLOY.md](../DEPLOY.md) for details

### Verification After Deploy

1. Open https://skipper.p4e1.ru in incognito
2. Switch to Russian (RU)
3. Check Emergency Procedures article
4. Verify accordion sections are in Russian

### Quick Reference

```bash
# Full deployment
npm run deploy

# Just build
npm run build

# Test production build locally
npm run preview

# Check what's on server
ssh deploy-server "ls -lh /var/www/skippers-companion/assets/"

# View nginx config
ssh deploy-server "cat /etc/nginx/sites-available/skipper.p4e1.ru"

# Reload nginx manually
ssh deploy-server "systemctl reload nginx"
```

## Project Context

- **Live URL**: https://skipper.p4e1.ru
- **Repository**: ArtemOstrenkov/Skipper_comp
- **Languages**: EN, RU, ZH (full translations)
- **Knowledge Base**: 23 articles, 8 categories

## Related Documentation

- [DEPLOY.md](../DEPLOY.md) - Detailed deployment guide
- [README.md](../README.md) - Project overview
