import logging
import asyncio
import os
import importlib

logger = logging.getLogger(__name__)

class SecurityManager:
    def __init__(self, bot, config_antispam, config_whitelist, config_messages):
        self.bot = bot
        self.config_antispam = config_antispam
        self.config_whitelist = config_whitelist
        self.config_messages = config_messages
        self.anti_modules = []
        self._load_anti_modules()

    def _load_anti_modules(self):
        anti_dir = os.path.join(os.path.dirname(__file__), "anti")
        if not os.path.exists(anti_dir):
            logger.warning(f"Le dossier anti-X n\"existe pas : {anti_dir}")
            return

        for filename in os.listdir(anti_dir):
            if filename.endswith(".py") and not filename.startswith("__"):
                module_name = filename[:-3]
                try:
                    # Importation dynamique du module
                    module = importlib.import_module(f"bot.security.anti.{module_name}")
                    if hasattr(module, "check") and callable(module.check):
                        self.anti_modules.append(module.check)
                        logger.info(f"Module anti-X chargé : {module_name}")
                    else:
                        logger.warning(f"Module anti-X {module_name} ne contient pas de fonction 'check' valide.")
                except Exception as e:
                    logger.error(f"Erreur lors du chargement du module anti-X {module_name}: {e}")

    async def apply_security_checks(self, message):
        """Applique toutes les protections anti-X à un message donné."""
        if message.author.bot: # Ignorer les bots
            return False

        # Vérifier la whitelist
        if message.guild:
            if message.channel.id in self.config_whitelist.get("WHITELISTED_CHANNELS", []):
                return False
            for role in message.author.roles:
                if role.id in self.config_whitelist.get("WHITELISTED_ROLES", []):
                    return False
        if message.author.id in self.config_whitelist.get("WHITELISTED_USERS", []):
            return False

        for check_func in self.anti_modules:
            try:
                # Chaque fonction check doit retourner True si le message doit être bloqué
                # et False sinon. Elle doit aussi gérer l'action (suppression, mute, etc.)
                if await check_func(self.bot, message, self.config_antispam, self.config_messages):
                    return True # Message bloqué par une protection
            except Exception as e:
                logger.error(f"Erreur lors de l\"exécution d\"une protection anti-X : {e}")
        return False # Message non bloqué
