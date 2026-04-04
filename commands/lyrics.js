export default async function lyrics(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Lyrics** command executed!\n\n📝 Description: Get song lyrics`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}