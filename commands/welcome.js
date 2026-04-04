export default async function welcome(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Welcome** command executed!\n\n📝 Description: Set welcome message`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}