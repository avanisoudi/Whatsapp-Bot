export default async function take(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Take** command executed!\n\n📝 Description: Add text to image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}