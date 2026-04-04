export default async function promote(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Promote** command executed!\n\n📝 Description: Promote member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}