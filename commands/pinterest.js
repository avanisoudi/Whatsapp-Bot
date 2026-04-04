export default async function pinterest(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Pinterest** command executed!\n\n📝 Description: Search Pinterest`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}