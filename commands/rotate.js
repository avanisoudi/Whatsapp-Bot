export default async function rotate(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Rotate** command executed!\n\n📝 Description: Rotate image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}