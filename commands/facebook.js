export default async function facebook(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Facebook** command executed!\n\n📝 Description: Download Facebook video`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}