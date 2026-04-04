export default async function grammar(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Grammar** command executed!\n\n📝 Description: Grammar check`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}