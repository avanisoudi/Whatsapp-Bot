#!/bin/bash

# --- Script de démarrage avec PM2 v3.0.0 ---

# Vérifier si PM2 est installé
if ! command -v pm2 &> /dev/null; then
    echo "❌ Erreur : PM2 n'est pas installé. Veuillez l'installer avec : npm install -g pm2"
    exit 1
fi

# Lancement du bot avec PM2
echo "🚀 Lancement du Bot de Modération v3.0.0 avec PM2..."
pm2 start bot/main.py --interpreter python3 --name bot-moderation --watch --ignore-watch "bot/logs/* bot/data/*"

# Sauvegarder la liste PM2 pour redémarrage automatique après reboot serveur
pm2 save

echo "✅ Bot lancé avec succès !"
echo "📊 Pour voir les logs en temps réel : pm2 logs bot-moderation"
echo "🛑 Pour arrêter le bot : pm2 stop bot-moderation"
