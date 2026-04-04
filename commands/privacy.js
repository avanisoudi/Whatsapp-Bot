export default async function privacy(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Privacy** command executed!\n\n📝 Description: Privacy policy`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}