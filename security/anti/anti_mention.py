import logging
import discord

logger = logging.getLogger(__name__)

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message contient trop de mentions (rôles, everyone, here)."""
    if not message.guild:
        return False

    # Vérification des mentions everyone/here
    if message.mention_everyone:
        logger.warning(f"Anti-Mention (everyone/here) détecté pour {message.author.display_name} dans {message.guild.name}.")
        await message.delete()
        await message.channel.send(
            config_messages.get("ANTI_MENTION_MESSAGE", "⚠️ @user, merci de ne pas utiliser @everyone ou @here !")
            .replace("@user", message.author.mention),
            delete_after=10
        )
        return True

    # Vérification du nombre total de mentions (utilisateurs + rôles)
    total_mentions = len(message.mentions) + len(message.role_mentions)
    max_mentions = config_antispam.get("MAX_MENTIONS_PER_MESSAGE", 5)

    if total_mentions >= max_mentions:
        logger.warning(f"Anti-Mention (nombre: {total_mentions}) détecté pour {message.author.display_name} dans {message.guild.name}.")
        await message.delete()
        await message.channel.send(
            config_messages.get("ANTI_MENTION_MESSAGE", f"⚠️ @user, merci de limiter les mentions dans vos messages (max {max_mentions}) !")
            .replace("@user", message.author.mention),
            delete_after=10
        )
        return True

    return False
