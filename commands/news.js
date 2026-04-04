export default async function news(sock, chatId, message, args, config) {
  try {
    const response = `✅ **News** command executed!\n\n📝 Description: Get latest news`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}