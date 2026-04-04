export default async function mal(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Mal** command executed!\n\n📝 Description: MyAnimeList search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}