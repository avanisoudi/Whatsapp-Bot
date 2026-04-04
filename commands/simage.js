export default async function simage(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Simage** command executed!\n\n📝 Description: Search images`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}