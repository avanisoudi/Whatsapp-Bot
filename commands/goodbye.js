export default async function goodbye(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Goodbye** command executed!\n\n📝 Description: Set goodbye message`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}