import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
dm_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur envoie des messages en masse (DM suspect)."""
    # Note : Cette vérification se fait normalement via l'événement on_message_dm, 
    # mais peut être adaptée ici pour la détection via messages publics.
    return False

# Fonction à appeler lors de l'événement on_message (DM) pour une détection plus précise
async def track_dm(message, config_antispam, config_messages):
    if not message.guild: # C'est un message privé (DM)
        user_id = message.author.id
        current_time = time.time()

        if user_id not in dm_times:
            dm_times[user_id] = []

        # Nettoyer les temps de DMs anciens (plus de 60 secondes)
        dm_times[user_id] = [t for t in dm_times[user_id] if current_time - t < 60]

        # Ajouter le nouveau temps de DM
        dm_times[user_id].append(current_time)

        # Si plus de 5 DMs en 60 secondes (seuil personnalisable)
        if len(dm_times[user_id]) >= 5:
            logger.warning(f"🛡️ Anti-Mass-DM détecté pour l'utilisateur {message.author.display_name} (plus de 5 DMs en 60 secondes).")
            # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur de tous les serveurs communs)
            # return True
    return False
