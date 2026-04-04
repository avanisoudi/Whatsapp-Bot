export default async function podcast(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Podcast** command executed!\n\n📝 Description: Download podcast`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}