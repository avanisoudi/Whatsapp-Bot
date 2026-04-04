export default async function meme(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Meme** command executed!\n\n📝 Description: Get a random meme`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}