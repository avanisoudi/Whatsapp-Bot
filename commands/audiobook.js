export default async function audiobook(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Audiobook** command executed!\n\n📝 Description: Download audiobook`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}