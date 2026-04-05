import discord
from discord.ext import commands
import time
import psutil
import logging

logger = logging.getLogger(__name__)

class Utils(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.start_time = time.time()

    @commands.command(name="ping")
    async def ping(self, ctx):
        """Affiche la latence du bot."""
        latency = round(self.bot.latency * 1000)
        await ctx.send(f"🏓 Pong ! Latence : {latency} ms")

    @commands.command(name="stats")
    async def stats(self, ctx):
        """Affiche les statistiques système du bot."""
        uptime = round(time.time() - self.start_time)
        cpu_usage = psutil.cpu_percent()
        memory_usage = psutil.virtual_memory().percent
        
        embed = discord.Embed(title="📊 Statistiques du Bot v3.0.0", color=discord.Color.blue())
        embed.add_field(name="⏱️ Uptime", value=f"{uptime} secondes")
        embed.add_field(name="💻 CPU Usage", value=f"{cpu_usage}%")
        embed.add_field(name="🧠 Memory Usage", value=f"{memory_usage}%")
        embed.add_field(name="🌐 Serveurs", value=len(self.bot.guilds))
        
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Utils(bot))
