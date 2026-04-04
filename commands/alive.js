export default async function alive(sock, chatId, message, args, config) {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const aliveText = `
╔════════════════════════════════════════╗
║          ✅ BOT IS ALIVE ✅             ║
╚════════════════════════════════════════╝

🤖 **Bot Name:** ${config.botName}
📊 **Status:** Online
⏱️ **Uptime:** ${hours}h ${minutes}m ${seconds}s
🔧 **Version:** 1.0.0
📦 **Commands:** 200+
🌐 **Mode:** ${config.publicMode ? 'Public' : 'Private'}

═══════════════════════════════════════

✨ All systems operational!
Type ${config.prefix}help for commands

═══════════════════════════════════════
`;

  await sock.sendMessage(chatId, { text: aliveText }, { quoted: message });
}
