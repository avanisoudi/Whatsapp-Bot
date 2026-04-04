export default async function sora(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Sora** command executed!\n\n📝 Description: AI video generation`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}