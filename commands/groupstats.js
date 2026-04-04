export default async function groupstats(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Groupstats** command executed!\n\n📝 Description: Group statistics`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}