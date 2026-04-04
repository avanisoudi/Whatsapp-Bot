export default async function chatbot(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Chatbot** command executed!\n\n📝 Description: Chat with bot`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}