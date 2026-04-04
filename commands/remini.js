export default async function remini(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Remini** command executed!\n\n📝 Description: Enhance image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}