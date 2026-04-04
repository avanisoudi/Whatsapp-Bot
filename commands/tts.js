export default async function tts(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tts** command executed!\n\n📝 Description: Text to speech`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}