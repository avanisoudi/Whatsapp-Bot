export default async function unmute(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Unmute** command executed!\n\n📝 Description: Unmute member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}