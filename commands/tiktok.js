export default async function tiktok(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tiktok** command executed!\n\n📝 Description: Download TikTok`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}