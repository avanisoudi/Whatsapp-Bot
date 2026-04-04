export default async function warnings(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Warnings** command executed!\n\n📝 Description: View warnings`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}