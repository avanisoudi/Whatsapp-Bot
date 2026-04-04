export default async function badge(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Badge** command executed!\n\n📝 Description: User badges`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}