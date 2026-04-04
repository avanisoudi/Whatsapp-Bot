export default async function anticall(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Anticall** command executed!\n\n📝 Description: Anti call`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}