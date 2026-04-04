export default async function changelog(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Changelog** command executed!\n\n📝 Description: Bot changelog`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}