export default async function translate(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Translate** command executed!\n\n📝 Description: Translate text`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}