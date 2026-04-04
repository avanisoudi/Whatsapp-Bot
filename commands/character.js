export default async function character(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Character** command executed!\n\n📝 Description: Character analysis`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}