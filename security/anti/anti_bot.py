import logging
import discord
from datetime import datetime, timedelta, timezone

logger = logging.getLogger(__name__)

async def check(bot, message, config_antispam, config_messages):
    """Vérifie si un message provient d'un compte suspect ou nouveau (bot)."""
    if not message.guild:
        return False

    author = message.author
    
    # Vérification de l'âge du compte (moins de 24 heures par exemple)
    # Utilisation de timezone-aware datetime pour éviter les erreurs de comparaison
    now = datetime.now(timezone.utc)
    
    # S'assurer que author.created_at est aussi en UTC (ce qui est le cas par défaut dans discord.py)
    created_at = author.created_at
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)

    account_age = now - created_at
    
    if account_age < timedelta(hours=24):
        logger.warning(f"Anti-Bot détecté pour {author.display_name} dans {message.guild.name} (compte trop récent : {account_age.total_seconds() / 3600:.2f} heures).")
        return False # On ne bloque pas nécessairement, on trace

    return False
