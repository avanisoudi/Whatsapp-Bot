export default async function playlist(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Playlist** command executed!\n\n📝 Description: Download playlist`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}