import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
role_changes = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur ajoute/retire des rôles en boucle (mass role)."""
    # Note : Cette vérification se fait normalement via l'événement on_member_update, 
    # mais peut être adaptée ici pour la détection via messages publics.
    return False

# Fonction à appeler lors de l'événement on_member_update pour une détection plus précise
async def track_role_changes(before, after, config_antispam, config_messages):
    if before.roles != after.roles:
        guild_id = after.guild.id
        user_id = after.id
        current_time = time.time()

        if guild_id not in role_changes:
            role_changes[guild_id] = {}
        if user_id not in role_changes[guild_id]:
            role_changes[guild_id][user_id] = []

        # Nettoyer les temps de changements de rôles anciens (plus de 60 secondes)
        role_changes[guild_id][user_id] = [t for t in role_changes[guild_id][user_id] if current_time - t < 60]

        # Ajouter le nouveau temps de changement de rôle
        role_changes[guild_id][user_id].append(current_time)

        # Si plus de 5 changements de rôles en 60 secondes (seuil personnalisable)
        if len(role_changes[guild_id][user_id]) >= 5:
            logger.warning(f"🛡️ Anti-Mass-Role détecté pour l'utilisateur {after.display_name} (plus de 5 changements de rôles en 60 secondes).")
            # Mesures de sécurité supplémentaires (ex: bannir l'utilisateur pour éviter qu'il continue)
            # return True
    return False
