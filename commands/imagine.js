export default async function imagine(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Imagine** command executed!\n\n📝 Description: Generate image`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}