export default async function faq(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Faq** command executed!\n\n📝 Description: FAQ`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}