import logging
import re

logger = logging.getLogger(__name__)

# Regex pour détecter les liens Discord et les URLs classiques
URL_REGEX = r"(https?://[^\s]+)"
DISCORD_INVITE_REGEX = r"(discord\.(gg|io|me|li|com/invite)/[^\s]+)"

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si le message contient des liens interdits."""
    if not message.guild:
        return False

    content = message.content.lower()
    
    # Détection de liens (URL ou Invitations Discord)
    if re.search(URL_REGEX, content):
        logger.warning(f"Anti-Lien détecté pour {message.author.display_name} dans {message.guild.name}.")
        
        try:
            await message.delete()
            await message.channel.send(
                config_messages.get("ANTI_LINK_MESSAGE", "⚠️ @user, les liens publicitaires sont interdits ici !")
                .replace("@user", message.author.mention),
                delete_after=10
            )
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du message (Anti-Link) : {e}")
            
        return True

    return False
