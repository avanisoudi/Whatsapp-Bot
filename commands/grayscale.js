export default async function grayscale(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Grayscale** command executed!\n\n📝 Description: Grayscale image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}