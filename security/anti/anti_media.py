import logging
import discord

logger = logging.getLogger(__name__)

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message contient des photos ou vidéos hors salon autorisé."""
    if not message.guild:
        return False

    # Si le message contient des pièces jointes (photos, vidéos)
    if message.attachments:
        # Vérifier si le canal actuel est autorisé pour les médias (whitelist)
        # whitelist = config_whitelist.get("AUTHORIZED_MEDIA_CHANNELS", [])
        # if message.channel.id in whitelist:
        #     return False

        # Vérifier si c'est une photo ou une vidéo
        for attachment in message.attachments:
            if attachment.content_type and (attachment.content_type.startswith("image/") or attachment.content_type.startswith("video/")):
                logger.warning(f"Anti-Media détecté pour {message.author.display_name} dans {message.guild.name} (canal non autorisé).")
                
                try:
                    await message.delete()
                    await message.channel.send(
                        config_messages.get("ANTI_PHOTO_MESSAGE", "⚠️ @user, l\"envoi de photos/vidéos est interdit dans ce salon !")
                        .replace("@user", message.author.mention),
                        delete_after=10
                    )
                except Exception as e:
                    logger.error(f"Erreur lors de la suppression du message (Anti-Media) : {e}")
                    
                return True

    return False
