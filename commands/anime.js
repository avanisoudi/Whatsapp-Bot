export default async function anime(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Anime** command executed!\n\n📝 Description: Search anime`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}