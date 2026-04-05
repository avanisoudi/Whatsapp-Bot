import logging
import asyncio
import time

logger = logging.getLogger(__name__)

# Dictionnaire pour stocker les messages récents par utilisateur
# {guild_id: {user_id: [(timestamp, message_content), ...]}}
recent_messages = {}

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message est du spam et prend les mesures appropriées."""
    if not message.guild: # Ignorer les DMs
        return False

    guild_id = message.guild.id
    user_id = message.author.id
    current_time = time.time()

    # Initialiser la structure si elle n'existe pas
    if guild_id not in recent_messages:
        recent_messages[guild_id] = {}
    if user_id not in recent_messages[guild_id]:
        recent_messages[guild_id][user_id] = []

    # Nettoyer les messages expirés (garder seulement ceux des dernières secondes)
    recent_messages[guild_id][user_id] = [
        (t, m) for (t, m) in recent_messages[guild_id][user_id]
        if current_time - t < config_antispam.get("REPEATED_MESSAGES_THRESHOLD", 5) * 2 # Garder un peu plus longtemps pour l'analyse
    ]

    # Ajouter le message actuel
    recent_messages[guild_id][user_id].append((current_time, message.content))

    # --- Vérification Anti-Spam (messages répétés) ---
    message_count = 0
    for _, content in recent_messages[guild_id][user_id]:
        if content == message.content: # Vérifier le contenu exact
            message_count += 1
    
    if message_count >= config_antispam.get("REPEATED_MESSAGES_THRESHOLD", 5):
        logger.warning(f"Anti-Spam détecté pour {message.author.display_name} dans {message.guild.name} (messages répétés).")
        await message.delete()
        await message.channel.send(config_messages.get("ANTI_SPAM_MESSAGE", "⚠️ @user, les messages répétés ne sont pas autorisés ici !").replace("@user", message.author.mention))
        # Ici, on pourrait ajouter un mute temporaire
        return True

    # --- Vérification Anti-Caps ---
    if len(message.content) > 10: # Ne vérifier que les messages d'une certaine longueur
        caps_count = sum(1 for char in message.content if char.isupper())
        total_alphabetic = sum(1 for char in message.content if char.isalpha())
        if total_alphabetic > 0:
            caps_percentage = caps_count / total_alphabetic
            if caps_percentage >= config_antispam.get("MAX_CAPS_PERCENTAGE", 0.7):
                logger.warning(f"Anti-Caps détecté pour {message.author.display_name} dans {message.guild.name} ({caps_percentage*100:.2f}% majuscules).")
                await message.delete()
                await message.channel.send(config_messages.get("ANTI_CAPS_MESSAGE", "⚠️ @user, merci de ne pas crier (trop de majuscules) !").replace("@user", message.author.mention))
                return True

    # --- Vérification Anti-Emojis (simplifié) ---
    emoji_count = sum(1 for char in message.content if char in "😀😃😄😁😆😅😂🤣🥲😊😇🙂🙃😉😌-😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟-😠😡🤬🤯😳🥵🥶😱😨😰😥😢😭-🤥🤫🤭🤗 skillful") # Exemple simplifié
    if emoji_count >= config_antispam.get("MAX_EMOJIS_PER_MESSAGE", 10):
        logger.warning(f"Anti-Emojis détecté pour {message.author.display_name} dans {message.guild.name} (trop d'emojis).")
        await message.delete()
        await message.channel.send(config_messages.get("ANTI_SPAM_MESSAGE", "⚠️ @user, trop d'emojis ne sont pas autorisés ici !").replace("@user", message.author.mention))
        return True

    return False
