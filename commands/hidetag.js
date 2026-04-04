export default async function hidetag(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Hidetag** command executed!\n\n📝 Description: Hidden tag`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}