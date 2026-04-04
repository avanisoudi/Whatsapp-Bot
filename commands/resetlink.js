export default async function resetlink(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Resetlink** command executed!\n\n📝 Description: Reset group link`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}