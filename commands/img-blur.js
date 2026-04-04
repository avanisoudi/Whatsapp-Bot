export default async function img_blur(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Img Blur** command executed!\n\n📝 Description: Blur image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}