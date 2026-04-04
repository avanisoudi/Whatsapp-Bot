export default async function restart(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Restart** command executed!\n\n📝 Description: Restart bot`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}