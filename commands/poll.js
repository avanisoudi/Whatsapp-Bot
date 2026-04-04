export default async function poll(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Poll** command executed!\n\n📝 Description: Create poll`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}