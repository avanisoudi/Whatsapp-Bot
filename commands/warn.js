export default async function warn(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Warn** command executed!\n\n📝 Description: Warn member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}