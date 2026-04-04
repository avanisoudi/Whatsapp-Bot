export default async function viewonce(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Viewonce** command executed!\n\n📝 Description: View once message`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}