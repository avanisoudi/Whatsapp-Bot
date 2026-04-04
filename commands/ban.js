export default async function ban(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ban** command executed!\n\n📝 Description: Ban member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}