export default async function wasted(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Wasted** command executed!\n\n📝 Description: Wasted effect`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}