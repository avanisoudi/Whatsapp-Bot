export default async function trivia(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Trivia** command executed!\n\n📝 Description: Play trivia game`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}