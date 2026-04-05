import discord
from discord.ext import commands
import logging

logger = logging.getLogger(__name__)

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name="kick")
    @commands.has_permissions(kick_members=True)
    async def kick(self, ctx, member: discord.Member, *, reason=None):
        """Expulse un membre du serveur."""
        try:
            await member.kick(reason=reason)
            await ctx.send(f"✅ {member.display_name} a été expulsé. Raison : {reason}")
            logger.info(f"{ctx.author.name} a expulsé {member.name} de {ctx.guild.name}.")
        except Exception as e:
            logger.error(f"Erreur lors de l'expulsion de {member.name} : {e}")
            await ctx.send(f"❌ Impossible d'expulser {member.display_name}.")

    @commands.command(name="ban")
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason=None):
        """Bannit un membre du serveur."""
        try:
            await member.ban(reason=reason)
            await ctx.send(f"✅ {member.display_name} a été banni. Raison : {reason}")
            logger.info(f"{ctx.author.name} a banni {member.name} de {ctx.guild.name}.")
        except Exception as e:
            logger.error(f"Erreur lors du bannissement de {member.name} : {e}")
            await ctx.send(f"❌ Impossible de bannir {member.display_name}.")

    @commands.command(name="clear")
    @commands.has_permissions(manage_messages=True)
    async def clear(self, ctx, amount: int):
        """Supprime un nombre spécifié de messages."""
        try:
            await ctx.channel.purge(limit=amount + 1)
            await ctx.send(f"✅ {amount} messages ont été supprimés.", delete_after=5)
            logger.info(f"{ctx.author.name} a supprimé {amount} messages dans {ctx.channel.name}.")
        except Exception as e:
            logger.error(f"Erreur lors de la suppression des messages : {e}")
            await ctx.send("❌ Impossible de supprimer les messages.")

async def setup(bot):
    await bot.add_cog(Moderation(bot))
