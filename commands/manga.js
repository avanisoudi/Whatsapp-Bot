export default async function manga(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Manga** command executed!\n\n📝 Description: Search manga`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}