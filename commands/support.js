export default async function support(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Support** command executed!\n\n📝 Description: Support info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}