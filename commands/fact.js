export default async function fact(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Fact** command executed!\n\n📝 Description: Get a fun fact`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}