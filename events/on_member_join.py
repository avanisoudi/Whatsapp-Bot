import discord
from discord.ext import commands
import logging

logger = logging.getLogger(__name__)

class MemberJoin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_member_join(self, member):
        logger.info(f"{member.name} a rejoint le serveur {member.guild.name}.")
        # Exemple: Envoyer un message de bienvenue dans un canal spécifique
        # channel = self.bot.get_channel(YOUR_WELCOME_CHANNEL_ID)
        # if channel:
        #     await channel.send(f"Bienvenue {member.mention} sur le serveur !")

async def setup(bot):
    await bot.add_cog(MemberJoin(bot))
