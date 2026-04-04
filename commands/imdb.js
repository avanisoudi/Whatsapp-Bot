export default async function imdb(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Imdb** command executed!\n\n📝 Description: IMDb search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}