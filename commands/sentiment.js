export default async function sentiment(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Sentiment** command executed!\n\n📝 Description: Sentiment analysis`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}