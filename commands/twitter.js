export default async function twitter(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Twitter** command executed!\n\n📝 Description: Search Twitter`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}