import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: [timestamp1, timestamp2, ...]}
join_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un raid est en cours (afflux massif de membres)."""
    # Note : Cette vérification se fait normalement dans l'événement on_member_join, 
    # mais peut être adaptée ici pour la détection de raid en cours via messages.
    return False

# Fonction à appeler lors de l'événement on_member_join pour une détection plus précise
async def detect_raid(member, config_antispam, config_messages):
    guild_id = member.guild.id
    current_time = time.time()

    if guild_id not in join_times:
        join_times[guild_id] = []

    # Nettoyer les temps de jointure anciens (plus de 60 secondes)
    join_times[guild_id] = [t for t in join_times[guild_id] if current_time - t < 60]

    # Ajouter le nouveau temps de jointure
    join_times[guild_id].append(current_time)

    # Si plus de 10 personnes rejoignent en 60 secondes (seuil personnalisable)
    if len(join_times[guild_id]) >= 10:
        logger.warning(f"🛡️ Raid détecté dans la guilde : {member.guild.name}")
        # Mesures de sécurité supplémentaires (ex: passer le serveur en mode lent, bannir les nouveaux arrivants)
        # return True
    return False
