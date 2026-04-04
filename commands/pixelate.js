export default async function pixelate(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Pixelate** command executed!\n\n📝 Description: Pixelate image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}