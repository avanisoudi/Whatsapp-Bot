export default async function rank(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Rank** command executed!\n\n📝 Description: User rank`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}