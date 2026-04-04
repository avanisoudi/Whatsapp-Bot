export default async function antilink(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Antilink** command executed!\n\n📝 Description: Anti link`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}