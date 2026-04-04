export default async function translate_ai(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Translate Ai** command executed!\n\n📝 Description: AI translation`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}