export default async function dare(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Dare** command executed!\n\n📝 Description: Dare challenge`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}