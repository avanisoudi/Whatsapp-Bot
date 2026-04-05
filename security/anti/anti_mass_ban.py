import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
ban_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur bannit des membres en rafale (mass ban)."""
    # Note : Cette vérification se fait normalement via l'événement on_member_ban, 
    # mais peut être adaptée ici pour la détection via messages publics.
    return False

# Fonction à appeler lors de l'événement on_member_ban pour une détection plus précise
async def track_ban(guild, user, config_antispam, config_messages):
    guild_id = guild.id
    current_time = time.time()

    if guild_id not in ban_times:
        ban_times[guild_id] = []

    # Nettoyer les temps de bannissements anciens (plus de 60 secondes)
    ban_times[guild_id] = [t for t in ban_times[guild_id] if current_time - t < 60]

    # Ajouter le nouveau temps de bannissement
    ban_times[guild_id].append(current_time)

    # Si plus de 5 bannissements en 60 secondes (seuil personnalisable)
    if len(ban_times[guild_id]) >= 5:
        logger.warning(f"🛡️ Anti-Mass-Ban détecté dans la guilde : {guild.name} (plus de 5 bannissements en 60 secondes).")
        # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur responsable)
        # return True
    return False
