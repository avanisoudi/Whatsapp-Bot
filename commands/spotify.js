export default async function spotify(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Spotify** command executed!\n\n📝 Description: Spotify info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}