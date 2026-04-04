export default async function language_detect(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Language Detect** command executed!\n\n📝 Description: Detect language`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}