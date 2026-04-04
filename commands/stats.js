export default async function stats(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Stats** command executed!\n\n📝 Description: User statistics`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}