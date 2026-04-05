import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
channel_changes = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur crée/supprime des salons rapidement (mass channel)."""
    # Note : Cette vérification se fait normalement via les événements on_guild_channel_create et on_guild_channel_delete, 
    # mais peut être adaptée ici pour la détection via messages publics.
    return False

# Fonction à appeler lors de l'événement on_guild_channel_create pour une détection plus précise
async def track_channel_creation(channel, config_antispam, config_messages):
    guild_id = channel.guild.id
    current_time = time.time()

    if guild_id not in channel_changes:
        channel_changes[guild_id] = []

    # Nettoyer les temps de créations de salons anciens (plus de 60 secondes)
    channel_changes[guild_id] = [t for t in channel_changes[guild_id] if current_time - t < 60]

    # Ajouter le nouveau temps de création de salon
    channel_changes[guild_id].append(current_time)

    # Si plus de 5 salons sont créés en 60 secondes (seuil personnalisable)
    if len(channel_changes[guild_id]) >= 5:
        logger.warning(f"🛡️ Anti-Mass-Channel détecté dans la guilde : {channel.guild.name} (plus de 5 salons créés en 60 secondes).")
        # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur responsable)
        # return True
    return False
