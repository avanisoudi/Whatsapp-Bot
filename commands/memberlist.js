export default async function memberlist(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Memberlist** command executed!\n\n📝 Description: List all members`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}