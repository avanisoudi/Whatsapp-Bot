export default async function antibadword(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Antibadword** command executed!\n\n📝 Description: Anti bad words`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}