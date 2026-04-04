export default async function regex(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Regex** command executed!\n\n📝 Description: Regex tester`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}