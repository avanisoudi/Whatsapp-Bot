import logging
import discord

logger = logging.getLogger(__name__)

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur change son pseudo/statut de manière abusive."""
    # Note : Cette vérification se fait normalement dans l'événement on_member_update ou on_user_update, 
    # mais peut être adaptée ici pour la détection via messages.
    return False

# Fonction à appeler lors de l'événement on_member_update pour une détection plus précise
async def detect_status_change(before, after, config_antispam, config_messages):
    if before.display_name != after.display_name:
        logger.info(f"🛡️ Changement de pseudo détecté : {before.display_name} -> {after.display_name}")
        # Mesures de sécurité supplémentaires (ex: si le nouveau pseudo contient des mots interdits ou des liens)
        # return True
    return False
