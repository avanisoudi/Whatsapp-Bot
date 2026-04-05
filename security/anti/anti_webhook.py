import logging
import discord

logger = logging.getLogger(__name__)

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message provient d'un webhook suspect (création massive)."""
    # Note : Cette vérification se fait normalement via l'événement on_webhooks_update, 
    # mais peut être adaptée ici pour la détection via messages envoyés par des webhooks.
    if message.webhook_id:
        logger.warning(f"🛡️ Message Webhook détecté pour {message.author.display_name} dans {message.guild.name}.")
        # On pourrait vérifier si le webhook est autorisé ou s'il envoie trop de messages
        # return True
    return False

# Fonction à appeler lors de l'événement on_webhooks_update pour une détection plus précise
async def track_webhooks(guild):
    logger.info(f"🛡️ Webhooks mis à jour dans la guilde : {guild.name}")
    # Mesures de sécurité supplémentaires (ex: si trop de webhooks sont créés rapidement)
    # return True
    return False
