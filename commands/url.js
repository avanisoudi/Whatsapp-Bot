export default async function url(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Url** command executed!\n\n📝 Description: Shorten URL`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}