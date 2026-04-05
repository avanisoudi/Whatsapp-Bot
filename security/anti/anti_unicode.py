import logging
import re

logger = logging.getLogger(__name__)

# Regex pour détecter les caractères invisibles (ZWS, etc.)
INVISIBLE_CHARS_REGEX = r"[\u200b\u200c\u200d\u200e\u200f\ufeff]"

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message contient des caractères invisibles ou suspects."""
    if not message.guild:
        return False

    content = message.content
    
    # Détection de caractères invisibles
    if re.search(INVISIBLE_CHARS_REGEX, content):
        logger.warning(f"Anti-Unicode détecté pour {message.author.display_name} dans {message.guild.name}.")
        
        try:
            await message.delete()
            await message.channel.send(
                config_messages.get("ANTI_UNICODE_MESSAGE", "🚫 Les caractères invisibles ne sont pas autorisés !")
                .replace("@user", message.author.mention),
                delete_after=10
            )
        except Exception as e:
            logger.error(f"Erreur lors de la suppression du message (Anti-Unicode) : {e}")
            
        return True

    return False
