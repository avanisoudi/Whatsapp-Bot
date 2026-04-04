export default async function attp(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Attp** command executed!\n\n📝 Description: Create text art sticker`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}