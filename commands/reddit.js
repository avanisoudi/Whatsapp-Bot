export default async function reddit(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Reddit** command executed!\n\n📝 Description: Search Reddit`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}