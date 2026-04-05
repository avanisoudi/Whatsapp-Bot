import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: timestamp}}
join_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur rejoint et quitte rapidement (transfert suspect)."""
    # Note : Cette vérification se fait normalement dans les événements on_member_join et on_member_remove, 
    # mais peut être adaptée ici pour la détection via messages.
    return False

# Fonction à appeler lors de l'événement on_member_join pour une détection plus précise
async def track_join(member):
    guild_id = member.guild.id
    user_id = member.id
    current_time = time.time()

    if guild_id not in join_times:
        join_times[guild_id] = {}
    
    join_times[guild_id][user_id] = current_time

# Fonction à appeler lors de l'événement on_member_remove pour une détection plus précise
async def track_leave(member, config_antispam, config_messages):
    guild_id = member.guild.id
    user_id = member.id
    current_time = time.time()

    if guild_id in join_times and user_id in join_times[guild_id]:
        join_duration = current_time - join_times[guild_id][user_id]
        if join_duration < 60: # Moins de 60 secondes (seuil personnalisable)
            logger.warning(f"🛡️ Anti-Transfert détecté : {member.display_name} a quitté après seulement {join_duration:.2f} secondes.")
            # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur pour éviter qu'il revienne)
            # return True
    return False
