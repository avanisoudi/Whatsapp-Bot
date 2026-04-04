export default async function music_search(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Music Search** command executed!\n\n📝 Description: Search music`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}