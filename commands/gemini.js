export default async function gemini(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Gemini** command executed!\n\n📝 Description: Gemini AI`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}