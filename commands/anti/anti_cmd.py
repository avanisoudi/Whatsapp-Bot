import discord
from discord.ext import commands
import logging

logger = logging.getLogger(__name__)

class AntiCommands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.group(name="anti", invoke_without_command=True)
    @commands.has_permissions(administrator=True)
    async def anti(self, ctx):
        """Groupe de commandes pour gérer les protections Anti-X."""
        await ctx.send("🛡️ *Utilisation :* `.anti <type> <on/off>` (Types : spam, link, caps, mention, etc.)")

    @anti.command(name="spam")
    @commands.has_permissions(administrator=True)
    async def anti_spam(self, ctx, action: str):
        """Active ou désactive la protection Anti-Spam."""
        if action.lower() == "on":
            # Ici, on pourrait mettre à jour la base de données ou un fichier de config
            await ctx.send("✅ Protection **Anti-Spam** activée.")
        elif action.lower() == "off":
            await ctx.send("❌ Protection **Anti-Spam** désactivée.")
        else:
            await ctx.send("❌ Action invalide. Utilisez `on` ou `off`.")

    @anti.command(name="link")
    @commands.has_permissions(administrator=True)
    async def anti_link(self, ctx, action: str):
        """Active ou désactive la protection Anti-Lien."""
        if action.lower() == "on":
            await ctx.send("✅ Protection **Anti-Lien** activée.")
        elif action.lower() == "off":
            await ctx.send("❌ Protection **Anti-Lien** désactivée.")
        else:
            await ctx.send("❌ Action invalide. Utilisez `on` ou `off`.")

async def setup(bot):
    await bot.add_cog(AntiCommands(bot))
