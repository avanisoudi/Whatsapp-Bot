export default async function emotion(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Emotion** command executed!\n\n📝 Description: Emotion detection`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}