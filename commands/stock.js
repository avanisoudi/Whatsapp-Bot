export default async function stock(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Stock** command executed!\n\n📝 Description: Stock market info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}