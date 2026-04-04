export default async function ner(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ner** command executed!\n\n📝 Description: Named entity recognition`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}