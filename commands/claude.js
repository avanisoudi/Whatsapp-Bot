export default async function claude(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Claude** command executed!\n\n📝 Description: Claude AI`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}