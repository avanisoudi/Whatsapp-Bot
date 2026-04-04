export default async function riddle(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Riddle** command executed!\n\n📝 Description: Get a riddle`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}