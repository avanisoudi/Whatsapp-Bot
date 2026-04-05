import logging
import discord
import re

logger = logging.getLogger(__name__)

# Regex pour détecter les liens d'invitation de bots (OAuth2)
BOT_INVITE_REGEX = r"(discord\.com/oauth2/authorize\?client_id=\d+)"

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message contient des liens d'invitation de bots (OAuth2)."""
    if not message.guild:
        return False

    content = message.content.lower()
    
    # Détection de liens d'invitation de bots
    if re.search(BOT_INVITE_REGEX, content):
        logger.warning(f"🛡️ Anti-Invite-Bot détecté pour {message.author.display_name} dans {message.guild.name}.")
        
        try:
            await message.delete()
            await message.channel.send(
                config_messages.get("ANTI_INVITE_BOT_MESSAGE", "⚠️ @user, les liens d'invitation de bots sont interdits ici !")
                .replace("@user", message.author.mention),
                delete_after=10
            )
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du message (Anti-Invite-Bot) : {e}")
            
        return True

    return False
