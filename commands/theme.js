export default async function theme(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Theme** command executed!\n\n📝 Description: Bot theme`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}