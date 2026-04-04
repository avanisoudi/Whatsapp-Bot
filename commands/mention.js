export default async function mention(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Mention** command executed!\n\n📝 Description: Mention members`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}