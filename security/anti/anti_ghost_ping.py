import logging
import discord

logger = logging.getLogger(__name__)

# {guild_id: {user_id: [message_id1, message_id2, ...]}}
mentions_per_message = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message contient des mentions et suit son état (ghost ping)."""
    if not message.guild:
        return False

    # Si le message contient des mentions (utilisateurs, rôles, everyone/here)
    if message.mentions or message.role_mentions or message.mention_everyone:
        # On ne bloque pas le message ici, mais on l'enregistre pour une analyse ultérieure
        # (ex: si le message est supprimé peu après son envoi)
        pass

    return False

# Fonction à appeler lors de l'événement on_message_delete pour une détection plus précise
async def detect_ghost_ping(message, config_antispam, config_messages):
    if not message.guild:
        return False

    # Si le message supprimé contenait des mentions
    if message.mentions or message.role_mentions or message.mention_everyone:
        logger.warning(f"🛡️ Ghost-Ping détecté pour {message.author.display_name} dans {message.guild.name}.")
        
        try:
            # On pourrait notifier le canal que l'utilisateur a supprimé un message avec des mentions
            await message.channel.send(
                config_messages.get("ANTI_GHOST_PING_MESSAGE", "👻 @user, merci de ne pas supprimer vos messages contenant des mentions !")
                .replace("@user", message.author.mention),
                delete_after=10
            )
        except Exception as e:
            logger.error(f"Erreur lors de la notification (Anti-Ghost-Ping) : {e}")
            
        return True

    return False
