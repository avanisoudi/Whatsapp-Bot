export default async function coin(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Coin** command executed!\n\n📝 Description: Flip coin`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}