@echo off
setlocal

:: --- Script d'installation automatique v3.0.0 (Windows) ---

echo 🚀 Début de l'installation du Bot de Modération v3.0.0...

:: 1. Vérifier la version de Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Erreur : Python n'est pas installé. Veuillez l'installer depuis python.org avant de continuer.
    exit /b 1
)
echo ✅ Python détecté.

:: 2. Créer l'environnement virtuel
echo 📦 Création de l'environnement virtuel...
python -m venv venv
call venv\Scripts\activate

:: 3. Installer les dépendances
echo 📥 Installation des dépendances (pip install -r requirements.txt)...
pip install --upgrade pip
pip install -r requirements.txt

:: 4. Créer le fichier .env si nécessaire
if not exist .env (
    echo 📄 Création du fichier .env depuis .env.example...
    copy .env.example .env
    echo ⚠️  N'oubliez pas d'éditer le fichier .env avec votre TOKEN !
)

:: 5. Créer les dossiers nécessaires
echo 📂 Création des dossiers logs/ et data/...
if not exist logs mkdir logs
if not exist data mkdir data
if not exist config mkdir config
if not exist commands\moderation mkdir commands\moderation
if not exist commands\anti mkdir commands\anti
if not exist commands\utils mkdir commands\utils
if not exist events mkdir events
if not exist security\anti mkdir security\anti

echo ✅ Installation terminée avec succès !
echo 🚀 Pour lancer le bot, utilisez : venv\Scripts\activate && python main.py
echo 💡 Ou utilisez PM2 : pm2 start main.py --interpreter python --name bot-moderation

pause
endlocal
