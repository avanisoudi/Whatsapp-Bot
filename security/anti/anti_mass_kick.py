import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
kick_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur kicke des membres en rafale (mass kick)."""
    # Note : Cette vérification se fait normalement via l'événement on_member_remove (kicked), 
    # mais peut être adaptée ici pour la détection via messages publics.
    return False

# Fonction à appeler lors de l'événement on_member_remove pour une détection plus précise
async def track_kick(member, config_antispam, config_messages):
    guild_id = member.guild.id
    current_time = time.time()

    if guild_id not in kick_times:
        kick_times[guild_id] = []

    # Nettoyer les temps de kicks anciens (plus de 60 secondes)
    kick_times[guild_id] = [t for t in kick_times[guild_id] if current_time - t < 60]

    # Ajouter le nouveau temps de kick
    kick_times[guild_id].append(current_time)

    # Si plus de 5 kicks en 60 secondes (seuil personnalisable)
    if len(kick_times[guild_id]) >= 5:
        logger.warning(f"🛡️ Anti-Mass-Kick détecté dans la guilde : {member.guild.name} (plus de 5 kicks en 60 secondes).")
        # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur responsable)
        # return True
    return False
