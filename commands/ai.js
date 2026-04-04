export default async function ai(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ai** command executed!\n\n📝 Description: AI chat`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}