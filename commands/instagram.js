export default async function instagram(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Instagram** command executed!\n\n📝 Description: Download Instagram post`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}