export default async function crypto(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Crypto** command executed!\n\n📝 Description: Cryptocurrency info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}