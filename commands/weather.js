export default async function weather(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Weather** command executed!\n\n📝 Description: Get weather info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}