export default async function terms(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Terms** command executed!\n\n📝 Description: Terms of service`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}