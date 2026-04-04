export default async function stickertelegram(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Stickertelegram** command executed!\n\n📝 Description: Telegram sticker`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}