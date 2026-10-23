#!/usr/bin/env bash
set -e

echo "🚀 Quick Deploy для Skipper's Companion"
echo "========================================"

# Создать директорию
ssh root@155.212.141.54 "mkdir -p /var/www/skippers-companion && chown -R www-data:www-data /var/www/skippers-companion"

# Загрузить файлы
rsync -avz --delete dist/ root@155.212.141.54:/var/www/skippers-companion/

# Загрузить nginx конфиг
scp deploy/skipper.nginx.conf root@155.212.141.54:/etc/nginx/sites-available/skipper.p4e1.ru

# Включить сайт
ssh root@155.212.141.54 << 'ENDSSH'
ln -sf /etc/nginx/sites-available/skipper.p4e1.ru /etc/nginx/sites-enabled/skipper.p4e1.ru
nginx -t && systemctl reload nginx

# SSL сертификат
if [ ! -f /etc/letsencrypt/live/skipper.p4e1.ru/fullchain.pem ]; then
    echo "📜 Получение SSL сертификата..."
    certbot --nginx -d skipper.p4e1.ru --non-interactive --agree-tos --email admin@p4e1.ru
else
    echo "✅ SSL сертификат уже существует"
fi
ENDSSH

echo ""
echo "✨ Деплой завершён!"
echo "🌐 Сайт доступен: https://skipper.p4e1.ru"
