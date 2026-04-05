#!/bin/bash

# --- Script d'installation automatique v3.0.0 ---

echo "🚀 Début de l'installation du Bot de Modération v3.0.0..."

# 1. Vérifier la version de Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Erreur : Python 3 n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
if (( $(echo "$python_version < 3.9" | bc -l) )); then
    echo "❌ Erreur : Python version 3.9 ou supérieure est requise. (Actuelle: $python_version)"
    exit 1
fi
echo "✅ Python $python_version détecté."

# 2. Créer l'environnement virtuel
echo "📦 Création de l'environnement virtuel..."
python3 -m venv venv
source venv/bin/activate

# 3. Installer les dépendances
echo "📥 Installation des dépendances (pip install -r requirements.txt)..."
pip install --upgrade pip
pip install -r requirements.txt

# 4. Créer le fichier .env si nécessaire
if [ ! -f .env ]; then
    echo "📄 Création du fichier .env depuis .env.example..."
    cp .env.example .env
    echo "⚠️  N'oubliez pas d'éditer le fichier .env avec votre TOKEN !"
fi

# 5. Créer les dossiers nécessaires
echo "📂 Création des dossiers logs/ et data/..."
mkdir -p logs data config commands/moderation commands/anti commands/utils events security/anti

echo "✅ Installation terminée avec succès !"
echo "🚀 Pour lancer le bot, utilisez : source venv/bin/activate && python main.py"
echo "💡 Ou utilisez PM2 : pm2 start main.py --interpreter python3 --name bot-moderation"
