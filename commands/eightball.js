export default async function eightball(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Eightball** command executed!\n\n📝 Description: Magic 8-ball answer`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}