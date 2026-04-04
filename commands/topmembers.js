export default async function topmembers(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Topmembers** command executed!\n\n📝 Description: Top members stats`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}