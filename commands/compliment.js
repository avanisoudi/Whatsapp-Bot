export default async function compliment(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Compliment** command executed!\n\n📝 Description: Get a compliment`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}