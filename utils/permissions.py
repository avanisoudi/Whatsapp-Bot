import discord
import logging
import asyncio

logger = logging.getLogger(__name__)

class PermissionsManager:
    def __init__(self, bot):
        self.bot = bot
        self.locks = {}

    async def check_bot_permissions(self, ctx, permissions: list):
        """Vérifie si le bot a les permissions nécessaires dans le canal du contexte."""
        if not ctx.guild:
            return True # Les permissions de bot ne s'appliquent pas en DM

        me = ctx.guild.me
        channel_permissions = ctx.channel.permissions_for(me)

        missing_permissions = [perm for perm in permissions if not getattr(channel_permissions, perm)]

        if missing_permissions:
            logger.warning(f"Bot manque de permissions dans le canal {ctx.channel.name} (Guilde: {ctx.guild.name}): {', '.join(missing_permissions)}")
            await ctx.send(f"❌ Je n\"ai pas les permissions nécessaires pour effectuer cette action : {', '.join(missing_permissions)}")
            return False
        return True

    async def check_user_permissions(self, ctx, permissions: list):
        """Vérifie si l'utilisateur a les permissions nécessaires dans le canal du contexte."""
        if not ctx.guild:
            return True # Les permissions d'utilisateur ne s'appliquent pas en DM

        user_permissions = ctx.channel.permissions_for(ctx.author)

        missing_permissions = [perm for perm in permissions if not getattr(user_permissions, perm)]

        if missing_permissions:
            logger.warning(f"Utilisateur {ctx.author.name} manque de permissions dans le canal {ctx.channel.name} (Guilde: {ctx.guild.name}): {', '.join(missing_permissions)}")
            await ctx.send(f"❌ Vous n\"avez pas les permissions nécessaires pour effectuer cette action : {', '.join(missing_permissions)}")
            return False
        return True

    async def sanitize_input(self, ctx, *args, check_empty=True, check_mentions=False, check_roles=False):
        """Sanitise les entrées pour éviter les crashs."""
        if check_empty:
            for arg in args:
                if not arg or (isinstance(arg, str) and not arg.strip()):
                    await ctx.send("❌ L\"entrée ne peut pas être vide ou mal formée.")
                    return False
        
        if check_mentions:
            # Exemple de vérification de mention (peut être étendu)
            for arg in args:
                if isinstance(arg, str) and ("@everyone" in arg or "@here" in arg):
                    await ctx.send("❌ Les mentions @everyone ou @here ne sont pas autorisées.")
                    return False

        if check_roles and ctx.guild:
            # Exemple de vérification de rôle (peut être étendu)
            for arg in args:
                if isinstance(arg, str):
                    role = discord.utils.get(ctx.guild.roles, name=arg)
                    if not role:
                        await ctx.send(f"❌ Le rôle \`{arg}\` n\"existe pas.")
                        return False
        return True

    async def acquire_lock(self, key):
        """Acquiert un verrou asynchrone pour éviter les conditions de course."""
        if key not in self.locks:
            self.locks[key] = asyncio.Lock()
        await self.locks[key].acquire()

    def release_lock(self, key):
        """Libère un verrou asynchrone."""
        if key in self.locks and self.locks[key].locked():
            self.locks[key].release()


# Exemple d'utilisation (à intégrer dans les commandes ou événements)
# permissions_manager = PermissionsManager(bot)
# if not await permissions_manager.check_bot_permissions(ctx, ["manage_messages"]):
#     return
# if not await permissions_manager.sanitize_input(ctx, user_input, check_empty=True):
#     return
