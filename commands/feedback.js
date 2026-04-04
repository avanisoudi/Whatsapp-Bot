export default async function feedback(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Feedback** command executed!\n\n📝 Description: Send feedback`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}