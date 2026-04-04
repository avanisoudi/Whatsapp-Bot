export default async function clear(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Clear** command executed!\n\n📝 Description: Clear chat`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}