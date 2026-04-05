import logging
import time

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [timestamp1, timestamp2, ...]}}
message_times = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un utilisateur envoie trop de messages/fichiers par seconde (flood)."""
    if not message.guild:
        return False

    guild_id = message.guild.id
    user_id = message.author.id
    current_time = time.time()

    if guild_id not in message_times:
        message_times[guild_id] = {}
    if user_id not in message_times[guild_id]:
        message_times[guild_id][user_id] = []

    # Nettoyer les temps de messages anciens (plus de 1 seconde)
    message_times[guild_id][user_id] = [t for t in message_times[guild_id][user_id] if current_time - t < 1]

    # Ajouter le nouveau temps de message
    message_times[guild_id][user_id].append(current_time)

    # Si plus de 3 messages en 1 seconde (seuil personnalisable)
    if len(message_times[guild_id][user_id]) >= 3:
        logger.warning(f"🛡️ Anti-Flood détecté pour {message.author.display_name} dans {message.guild.name} (plus de 3 messages par seconde).")
        
        try:
            await message.delete()
            await message.channel.send(
                config_messages.get("ANTI_FLOOD_MESSAGE", "⚠️ @user, merci de ralentir l'envoi de vos messages !")
                .replace("@user", message.author.mention),
                delete_after=10
            )
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du message (Anti-Flood) : {e}")
            
        return True

    return False
