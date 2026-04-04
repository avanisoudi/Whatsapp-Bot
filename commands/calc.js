export default async function calc(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Calc** command executed!\n\n📝 Description: Calculator`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}