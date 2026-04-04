export default async function language(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Language** command executed!\n\n📝 Description: Change language`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}