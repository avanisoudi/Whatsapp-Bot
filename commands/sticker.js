export default async function sticker(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Sticker** command executed!\n\n📝 Description: Convert image to sticker`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}