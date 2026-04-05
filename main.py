import os
import discord
from discord.ext import commands
import asyncio
import yaml
import logging
from logging.handlers import RotatingFileHandler
from dotenv import load_dotenv

from bot.utils.database import Database
from bot.utils.permissions import PermissionsManager
from bot.security.security_manager import SecurityManager

# Charger les variables d'environnement
load_dotenv()

# --- Configuration du Logger ---
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
log_formatter = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Console Handler
console_handler = logging.StreamHandler()
console_handler.setFormatter(log_formatter)

# File Handler (rotation automatique)
log_file_path = "./logs/bot.log"
file_handler = RotatingFileHandler(
    log_file_path, maxBytes=5 * 1024 * 1024, backupCount=5
)  # 5 MB par fichier, 5 fichiers de backup
file_handler.setFormatter(log_formatter)

# Root Logger
logger = logging.getLogger()
logger.setLevel(LOG_LEVEL)
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# --- Charger les configurations ---
def load_config(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        logger.error(f"Fichier de configuration non trouvé : {file_path}")
        return {}
    except yaml.YAMLError as e:
        logger.error(f"Erreur de parsing YAML dans {file_path}: {e}")
        return {}

config_antispam = load_config("bot/config/antispam.yml")
config_whitelist = load_config("bot/config/whitelist.yml")
config_messages = load_config("bot/config/messages.yml")

# --- Initialisation du Bot Discord ---
intents = discord.Intents.default()
intents.message_content = True  # Nécessaire pour lire le contenu des messages
intents.members = True  # Nécessaire pour la gestion des membres/permissions
intents.presences = True # Nécessaire pour l'anti-statut

# Récupérer le préfixe depuis .env ou utiliser un défaut
BOT_PREFIX = os.getenv("PREFIX", ".")

bot = commands.Bot(command_prefix=BOT_PREFIX, intents=intents)

# --- Initialisation des utilitaires ---
db = Database()
permissions_manager = PermissionsManager(bot)
security_manager = SecurityManager(bot, config_antispam, config_whitelist, config_messages)

# --- Chargement des extensions (commandes et événements) ---
async def load_extensions():
    # Charger les événements
    for filename in os.listdir("./bot/events"):
        if filename.endswith(".py"):
            try:
                await bot.load_extension(f"bot.events.{filename[:-3]}")
                logger.info(f"Événement chargé : {filename}")
            except Exception as e:
                logger.error(f"Erreur lors du chargement de l'événement {filename}: {e}")
    
    # Charger les commandes (anti, moderation, utils)
    for category in ["anti", "moderation", "utils"]:
        for filename in os.listdir(f"./bot/commands/{category}"):
            if filename.endswith(".py"):
                try:
                    await bot.load_extension(f"bot.commands.{category}.{filename[:-3]}")
                    logger.info(f"Commande chargée : {category}/{filename}")
                except Exception as e:
                    logger.error(f"Erreur lors du chargement de la commande {category}/{filename}: {e}")

# --- Événements du Bot ---
@bot.event
async def on_ready():
    logger.info(f"🚀 Bot connecté en tant que {bot.user} (ID: {bot.user.id})")
    logger.info(f"Version : v3.0.0")
    logger.info(f"Préfixe : {BOT_PREFIX}")
    logger.info(f"Mode : {os.getenv("MODE", "production")}")
    # Créer le dossier data s'il n'est pas déjà fait (pour la DB)
    os.makedirs("bot/data", exist_ok=True)
    await load_extensions()

@bot.event
async def on_message(message):
    # Ignorer les messages des bots pour éviter les boucles et les traitements inutiles
    if message.author.bot:
        return

    # Appliquer les contrôles de sécurité Anti-X
    if await security_manager.apply_security_checks(message):
        return # Si le message est bloqué par une protection, ne pas le traiter davantage

    # Traiter les commandes après les vérifications de sécurité
    await bot.process_commands(message)

@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        return  # Ignorer les commandes non trouvées
    
    logger.error(f"Erreur de commande : {error}")
    await ctx.send(config_messages.get("DEFAULT_ERROR", "❌ Une erreur s'est produite."))

# --- Lancement du Bot ---
def run_bot():
    BOT_TOKEN = os.getenv("BOT_TOKEN")
    if not BOT_TOKEN:
        logger.critical("Le token du bot n'est pas configuré dans .env. Arrêt du bot.")
        exit(1)
    try:
        bot.run(BOT_TOKEN)
    except discord.LoginFailure:
        logger.critical("Échec de connexion : Token invalide. Vérifiez votre BOT_TOKEN dans .env.")
        exit(1)
    except Exception as e:
        logger.critical(f"Erreur fatale lors du lancement du bot : {e}")
        exit(1)

if __name__ == "__main__":
    run_bot()
